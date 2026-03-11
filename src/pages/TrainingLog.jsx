
import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { SHAREPOINT_CONFIG, GRAPH_SCOPES } from "../config";

const TrainingLog = () => {
  const { instance, accounts } = useMsal();
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (accounts.length > 0) {
      fetchLogs();
    }
  }, [accounts]);

  const fetchLogs = async () => {
    console.log("Fetching TrainingLog (v3 - No Orderby)...");
    try {
      const token = await instance.acquireTokenSilent({
        scopes: GRAPH_SCOPES.READ,
        account: accounts[0],
      }).catch(async (error) => {
        if (error.name === "InteractionRequiredAuthError") {
          return await instance.acquireTokenPopup({
            scopes: GRAPH_SCOPES.READ
          });
        }
        throw error;
      });

      // Top limited to 999; removed field-based orderby which can cause 400s
      const url = `https://graph.microsoft.com/v1.0/sites/${SHAREPOINT_CONFIG.SITE_ID}/lists/${SHAREPOINT_CONFIG.LIST_ID}/items?$expand=fields&$top=999`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "Prefer": "HonorNonIndexedQueriesWarningMayFailHoistedQueries"
        },
      });

      if (!response.ok) {
        throw new Error(`Graph API returned ${response.status}`);
      }

      const data = await response.json();
      const items = (data.value || [])
        .map(item => ({
          ...item.fields,
          CreatedTime: item.createdDateTime
        }))
        .sort((a, b) => new Date(b.CreatedTime) - new Date(a.CreatedTime));
        
      setLogs(items);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching logs:", err);
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log =>
    log.EmployeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.EmployeeEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (loading) return <div style={styles.loading}>Loading System Audit Logs...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Training Audit Logs</h1>
        <p style={styles.subtitle}>Detailed historical record of all assessment attempts.</p>
      </header>

      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="Search by name or email..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={fetchLogs} style={styles.refreshBtn}>🔄 Refresh</button>
      </div>

      <div style={styles.tableSection}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Timestamp (IST)</th>
                <th style={styles.th}>Employee</th>
                <th style={styles.th}>Module</th>
                <th style={styles.th}>Score</th>
                <th style={styles.th}>Result</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, i) => (
                <tr key={i} style={styles.tableRow}>
                  <td style={styles.td}>{formatToIST(log.CreatedTime)}</td>
                  <td style={styles.td}>
                    <div style={styles.userName}>{log.EmployeeName}</div>
                    <div style={styles.userEmail}>{log.EmployeeEmail}</div>
                  </td>
                  <td style={styles.td}>{log.ModuleName}</td>
                  <td style={styles.td}>{Math.round(log.Percentage * 100)}%</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: log.Result === "PASS" ? "#dcfce7" : "#fee2e2",
                      color: log.Result === "PASS" ? "#166534" : "#991b1b"
                    }}>
                      {log.Result}
                    </span>
                  </td>
                  <td style={styles.td}>{log.Status}</td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan="6" style={styles.emptyTd}>No logs found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "12px" },
  header: { marginBottom: "32px" },
  title: { fontSize: "1.875rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "8px" },
  subtitle: { color: "var(--text-secondary)", fontSize: "1.1rem" },
  filterBar: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
    alignItems: "center",
  },
  searchInput: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid var(--border-color)",
    background: "var(--bg-secondary)",
    color: "var(--text-primary)",
    fontSize: "0.95rem",
    width: "100%",
    maxWidth: "400px",
  },
  refreshBtn: {
    padding: "12px 20px",
    background: "var(--bg-secondary)",
    border: "1px solid var(--border-color)",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    color: "var(--text-primary)",
  },
  tableSection: { background: "var(--bg-secondary)", padding: "24px", borderRadius: "16px", boxShadow: "var(--card-shadow)", border: "1px solid var(--border-color)" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  tableHeader: { borderBottom: "2px solid var(--border-color)" },
  th: { textAlign: "left", padding: "12px", fontSize: "0.875rem", fontWeight: "600", color: "var(--text-secondary)" },
  tableRow: { borderBottom: "1px solid var(--border-color)" },
  td: { padding: "16px 12px", fontSize: "0.95rem", color: "var(--text-primary)" },
  userName: { fontWeight: "600", color: "var(--text-primary)" },
  userEmail: { fontSize: "0.80rem", color: "var(--text-secondary)" },
  badge: { padding: "4px 10px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "700" },
  emptyTd: { padding: "40px", textAlign: "center", color: "var(--text-secondary)" },
  loading: { padding: "40px", textAlign: "center", fontSize: "1.2rem", color: "var(--text-secondary)" }
};

export default TrainingLog;
