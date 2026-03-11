import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { SHAREPOINT_CONFIG, GRAPH_SCOPES } from "../config";

const AdminDashboard = () => {
  const { instance, accounts } = useMsal();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    completedUsers: 0,
    completionRate: 0,
    avgAttempts: 0,
    successRate: 0,
    pendingUsers: 0
  });
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (accounts.length > 0) {
      fetchGlobalStats();
    }
  }, [accounts]);

  const fetchGlobalStats = async () => {
    if (!refreshing) setLoading(true);
    setRefreshing(true);
    console.log("Syncing Admin Data (v5 - Robust Merge)...");
    
    try {
      const token = await instance.acquireTokenSilent({
        scopes: GRAPH_SCOPES.READ,
        account: accounts[0],
      }).catch(async (error) => {
        if (error.name === "InteractionRequiredAuthError") {
          return await instance.acquireTokenPopup({ scopes: GRAPH_SCOPES.READ });
        }
        throw error;
      });

      // 1. Fetch training records from SharePoint
      const spUrl = `https://graph.microsoft.com/v1.0/sites/${SHAREPOINT_CONFIG.SITE_ID}/lists/${SHAREPOINT_CONFIG.LIST_ID}/items?$expand=fields&$top=999`;
      const spResponse = await fetch(spUrl, {
        headers: { 
          Authorization: `Bearer ${token.accessToken}`,
          "Prefer": "HonorNonIndexedQueriesWarningMayFailHoistedQueries"
        },
      });
      
      const spData = await spResponse.json();
      const items = (spData.value || []).map(item => ({
        ...item.fields,
        CreatedTime: item.createdDateTime
      }));

      // 2. Fetch Assigned Users from Entra ID
      const appFilter = `appId eq '${instance.getConfiguration().auth.clientId}'`;
      const spSearchUrl = `https://graph.microsoft.com/v1.0/servicePrincipals?$filter=${appFilter}&$select=id`;
      const searchRes = await fetch(spSearchUrl, { headers: { Authorization: `Bearer ${token.accessToken}` } });
      const searchData = await searchRes.json();
      const spId = searchData.value?.[0]?.id;

      let assignedUsers = [];
      if (spId) {
        const assignmentsUrl = `https://graph.microsoft.com/v1.0/servicePrincipals/${spId}/appRoleAssignedTo`;
        const assignRes = await fetch(assignmentsUrl, { headers: { Authorization: `Bearer ${token.accessToken}` } });
        const assignData = await assignRes.json();
        
        // Dedup by principalId (User ID)
        const uniqueAssignments = [];
        const seenIds = new Set();
        (assignData.value || []).forEach(a => {
          if (a.principalType === "User" && !seenIds.has(a.principalId)) {
            uniqueAssignments.push(a);
            seenIds.add(a.principalId);
          }
        });
        assignedUsers = uniqueAssignments;
      }

      // 3. Process SharePoint Records
      const latestItemsByEmail = {};
      const attemptsCountByEmail = {}; 
      const passedUsers = new Set();

      items.forEach(item => {
        const email = item.EmployeeEmail?.toLowerCase();
        if (!email) return;
        
        latestItemsByEmail[email] = (!latestItemsByEmail[email] || new Date(item.CreatedTime) > new Date(latestItemsByEmail[email].CreatedTime)) 
          ? item : latestItemsByEmail[email];
        
        attemptsCountByEmail[email] = (attemptsCountByEmail[email] || 0) + 1;
        if (item.Result === "PASS") passedUsers.add(email);
      });

      // 4. Robust Merging Strategy
      const finalMap = new Map();

      // Start with SharePoint test-takers (Ground Truth for results)
      Object.keys(latestItemsByEmail).forEach(email => {
        const record = latestItemsByEmail[email];
        finalMap.set(email, {
          email: email,
          name: record.EmployeeName || email,
          latestResult: record.Result || "N/A",
          lastDate: record.CreatedTime || null,
          attempts: attemptsCountByEmail[email] || 0,
          hasPassed: passedUsers.has(email),
          status: record.Result === "PASS" ? "Compliant" : "Overdue"
        });
      });

      // Add Assigned Users who haven't taken the test or weren't matched
      assignedUsers.forEach(assign => {
        // Resolve email from UPN, Display Name (if it looks like email), or Accounts
        let email = (assign.userPrincipalName || assign.principalDisplayName)?.toLowerCase();
        
        // Check if current user
        if (assign.principalId === accounts[0].localAccountId) {
          email = accounts[0].username.toLowerCase();
        }

        // If not in map already, add as "Not Started"
        if (email && !finalMap.has(email)) {
          finalMap.set(email, {
            email: email,
            name: assign.principalDisplayName,
            latestResult: "N/A",
            lastDate: null,
            attempts: 0,
            hasPassed: false,
            status: "Not Started"
          });
        }
      });

      const finalUserList = Array.from(finalMap.values())
        .sort((a, b) => {
          if (a.lastDate && b.lastDate) return new Date(b.lastDate) - new Date(a.lastDate);
          if (a.lastDate) return -1;
          if (b.lastDate) return 1;
          return a.name.localeCompare(b.name);
        });

      // Stats Calculation
      const totalUsers = finalUserList.length;
      const completedUsers = finalUserList.filter(u => u.hasPassed).length;

      setStats({
        totalUsers,
        completedUsers,
        completionRate: totalUsers ? Math.round((completedUsers / totalUsers) * 100) : 0,
        avgAttempts: totalUsers ? (items.length / totalUsers).toFixed(1) : 0,
        successRate: items.length ? Math.round((items.filter(i => i.Result === "PASS").length / items.length) * 100) : 0,
        pendingUsers: totalUsers - completedUsers
      });

      setUserList(finalUserList);
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      console.error("Admin sync error:", err);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const exportToCSV = () => {
    const headers = ["Employee Name", "Email", "Latest Result", "Last Attempt Date", "Total Attempts", "Status"];
    const rows = userList.map(u => [
      u.name,
      u.email,
      u.latestResult,
      formatToIST(u.lastDate),
      u.attempts,
      u.hasPassed ? "Compliant" : "Overdue"
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Compliance_Report_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatToIST = (dateString) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } catch (e) {
      return dateString;
    }
  };

  if (loading && !refreshing) return <div style={styles.loading}>Loading Admin Analytics...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Organization Insights</h1>
        <p style={styles.subtitle}>Overview of cybersecurity compliance and assessment performance.</p>
      </header>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Total Users</span>
          <span style={styles.statValue}>{stats.totalUsers}</span>
          <p style={styles.statDesc}>Registered in system</p>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Completed Users</span>
          <span style={{...styles.statValue, color: "#10b981"}}>{stats.completedUsers}</span>
          <p style={styles.statDesc}>Users who have passed</p>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Completion Rate</span>
          <span style={{...styles.statValue, color: "#10b981"}}>{stats.completionRate}%</span>
          <div style={styles.progressBar}><div style={{...styles.progressFill, width: `${stats.completionRate}%`, background: "#10b981"}} /></div>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Success Rate</span>
          <span style={{...styles.statValue, color: "#2563eb"}}>{stats.successRate}%</span>
          <p style={styles.statDesc}>Overall pass vs fail ratio</p>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Avg Attempts</span>
          <span style={styles.statValue}>{stats.avgAttempts}</span>
          <p style={styles.statDesc}>Tries to reach a PASS</p>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Pending Users</span>
          <span style={{...styles.statValue, color: "#ef4444"}}>{stats.pendingUsers}</span>
          <p style={styles.statDesc}>Require training</p>
        </div>
      </div>

      <section style={styles.tableSection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ ...styles.sectionTitle, margin: 0 }}>User Compliance Status</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={fetchGlobalStats} 
              style={{...styles.refreshBtn, opacity: refreshing ? 0.7 : 1}}
              disabled={refreshing}
            >
              {refreshing ? "🔄 Syncing..." : "🔄 Refresh"}
            </button>
            <button onClick={exportToCSV} style={styles.exportBtn}>
              📥 Export CSV
            </button>
          </div>
        </div>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Employee</th>
                <th style={styles.th}>Latest Result</th>
                <th style={styles.th}>Last Date (IST)</th>
                <th style={styles.th}>Attempts</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, i) => (
                <tr key={i} style={styles.tableRow}>
                  <td style={styles.td}>
                    <div style={styles.userName}>{user.name}</div>
                    <div style={styles.userEmail}>{user.email}</div>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: user.latestResult === "PASS" ? "#dcfce7" : (user.latestResult === "N/A" ? "#f1f5f9" : "#fee2e2"),
                      color: user.latestResult === "PASS" ? "#166534" : (user.latestResult === "N/A" ? "#475569" : "#991b1b")
                    }}>
                      {user.latestResult}
                    </span>
                  </td>
                  <td style={styles.td}>{formatToIST(user.lastDate)}</td>
                  <td style={styles.td}>{user.attempts}</td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {user.status === "Compliant" && (
                        <span style={{...styles.statusBadge, backgroundColor: "#dcfce7", color: "#166534"}}>
                          ✅ Compliant
                        </span>
                      )}
                      {user.status === "Overdue" && (
                        <span style={{...styles.statusBadge, backgroundColor: "#fee2e2", color: "#991b1b"}}>
                          ⚠️ Overdue
                        </span>
                      )}
                      {user.status === "Not Started" && (
                        <span style={{...styles.statusBadge, backgroundColor: "#f1f5f9", color: "#475569"}}>
                          ⏳ Not Started
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: { padding: "12px" },
  header: { marginBottom: "24px" },
  title: { fontSize: "1.5rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "4px" },
  subtitle: { color: "var(--text-secondary)", fontSize: "1rem" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  },
  statCard: {
    background: "var(--bg-secondary)",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "var(--card-shadow)",
    border: "1px solid var(--border-color)",
    transition: "transform 0.2s",
  },
  statLabel: { fontSize: "0.7rem", fontWeight: "700", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px", display: "block" },
  statValue: { fontSize: "1.75rem", fontWeight: "900", color: "var(--text-primary)", marginBottom: "4px", display: "block", letterSpacing: "-0.02em" },
  statDesc: { fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" },
  progressBar: { height: "8px", background: "var(--bg-primary)", borderRadius: "10px", overflow: "hidden", marginTop: "12px" },
  progressFill: { height: "100%", borderRadius: "10px" },
  tableSection: { background: "var(--bg-secondary)", padding: "24px", borderRadius: "20px", boxShadow: "var(--card-shadow)", border: "1px solid var(--border-color)" },
  sectionTitle: { fontSize: "1.25rem", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.01em" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  tableHeader: { borderBottom: "2px solid var(--border-color)" },
  th: { textAlign: "left", padding: "12px", fontSize: "0.875rem", fontWeight: "600", color: "var(--text-secondary)" },
  tableRow: { borderBottom: "1px solid var(--border-color)" },
  td: { padding: "12px", fontSize: "0.9rem", color: "var(--text-primary)" },
  userName: { fontWeight: "600", fontSize: "0.9rem", color: "var(--text-primary)" },
  userEmail: { fontSize: "0.75rem", color: "var(--text-secondary)" },
  badge: { padding: "4px 10px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "700" },
  statusBadge: {
    padding: "6px 12px",
    borderRadius: "10px",
    fontSize: "0.85rem",
    fontWeight: "700",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  refreshBtn: {
    padding: "10px 18px",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-color)",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "0.9rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s"
  },
  exportBtn: {
    padding: "10px 18px",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "0.9rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s",
    boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)"
  },
  loading: { padding: "40px", textAlign: "center", fontSize: "1.2rem", color: "#64748b" }
};

export default AdminDashboard;
