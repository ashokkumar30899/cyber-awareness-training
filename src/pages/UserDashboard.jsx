import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { SHAREPOINT_CONFIG, GRAPH_SCOPES } from "../config";

const UserDashboard = () => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [latestPass, setLatestPass] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      fetchUserResults();
    }
  }, [accounts]);

  const fetchUserResults = async () => {
    console.log("Fetching results (v4 - Client-side filter)...");
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

      // Fetch all recent items and filter in JS to avoid 400 OData filter errors
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
      const currentUserEmail = accounts[0].username.toLowerCase();
      
      // Use createdDateTime for precise sorting since CompletedOn might only have the date part
      const results = (data.value || [])
        .map(item => ({
          ...item.fields,
          CreatedTime: item.createdDateTime
        }))
        .filter(f => f.EmployeeEmail?.toLowerCase() === currentUserEmail || f.Title?.toLowerCase() === currentUserEmail)
        .sort((a, b) => new Date(b.CreatedTime) - new Date(a.CreatedTime));
      
      setHistory(results);
      
      const passResult = results.find(r => r.Result === "PASS");
      setLatestPass(passResult);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching results:", err);
      setLoading(false);
    }
  };

  const calculateNextTraining = (item) => {
    if (item?.nexttrainingdate) return new Date(item.nexttrainingdate).toLocaleDateString();
    if (!item?.CompletedOn) return "Now";
    const date = new Date(item.CompletedOn);
    date.setMonth(date.getMonth() + 6);
    return date.toLocaleDateString();
  };

  const isTrainingDue = () => {
    if (!latestPass) return true;
    const nextDate = latestPass.nexttrainingdate 
      ? new Date(latestPass.nexttrainingdate)
      : new Date(latestPass.CompletedOn);
    
    if (!latestPass.nexttrainingdate) {
      nextDate.setMonth(nextDate.getMonth() + 6);
    }
    return new Date() > nextDate;
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

  if (loading) return <div style={styles.loading}>Loading your dashboard...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome back, {accounts[0].name}</h1>
        <p style={styles.subtitle}>Track your cybersecurity training and compliance status.</p>
      </header>

      <div style={styles.statsGrid}>
        <div style={{...styles.statCard, borderTop: isTrainingDue() ? "4px solid #ef4444" : "4px solid #10b981"}}>
          <span style={styles.statLabel}>Compliance Status</span>
          <div style={{
            ...styles.badgeLarge,
            backgroundColor: isTrainingDue() ? "#fee2e2" : "#dcfce7",
            color: isTrainingDue() ? "#b91c1c" : "#15803d",
          }}>
            {isTrainingDue() ? "⚠️ Training Due" : "✅ Compliant"}
          </div>
          <p style={styles.statDesc}>
            {isTrainingDue() ? "Please take the assessment now." : `Next training due: ${calculateNextTraining(latestPass)}`}
          </p>
        </div>

        <div style={styles.statCard}>
          <span style={styles.statLabel}>Last Passed Result</span>
          <div style={styles.resultBadge}>
            <span style={styles.statValue}>{latestPass?.Percentage ? Math.round(latestPass.Percentage * 100) : 0}%</span>
            <span style={{
              ...styles.badgeSmall,
              backgroundColor: "#dcfce7",
              color: "#15803d",
              marginLeft: "12px"
            }}>PASS</span>
          </div>
          <p style={styles.statDesc}>
            {latestPass ? `Completed on ${formatToIST(latestPass.CreatedTime)}` : "No passing record found"}
          </p>
        </div>

        <div style={styles.statCard}>
          <span style={styles.statLabel}>Total Attempts</span>
          <span style={styles.statValue}>{history.length}</span>
          <p style={styles.statDesc}>In current 6-month cycle</p>
        </div>
      </div>

      <div style={styles.actionSection}>
        <button onClick={() => navigate("/module1")} style={styles.primaryBtn}>
          {isTrainingDue() ? "🚀 Start Training Now" : "🔄 Refresh Training"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "12px",
  },
  header: {
    marginBottom: "24px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "var(--text-primary)",
    marginBottom: "4px",
  },
  subtitle: {
    color: "var(--text-secondary)",
    fontSize: "1rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  },
  statCard: {
    background: "var(--bg-secondary)",
    padding: "24px",
    borderRadius: "20px",
    boxShadow: "var(--card-shadow)",
    display: "flex",
    flexDirection: "column",
    border: "1px solid var(--border-color)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  statLabel: {
    fontSize: "0.75rem",
    fontWeight: "700",
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "12px",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: "900",
    color: "var(--text-primary)",
    letterSpacing: "-0.02em",
  },
  badgeLarge: {
    padding: "8px 20px",
    borderRadius: "12px",
    fontSize: "1.5rem",
    fontWeight: "800",
    display: "inline-flex",
    alignItems: "center",
    width: "fit-content",
    marginBottom: "16px",
    letterSpacing: "-0.02em",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  badgeSmall: {
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "0.8rem",
    fontWeight: "800",
    textTransform: "uppercase",
  },
  resultBadge: {
    display: "flex",
    alignItems: "baseline",
    marginBottom: "8px",
  },
  statDesc: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    fontWeight: "600",
  },
  actionSection: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
    padding: "32px",
    borderRadius: "20px",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: "40px",
    boxShadow: "0 20px 25px -5px rgba(30, 58, 138, 0.2)",
  },
  primaryBtn: {
    background: "#ffffff",
    color: "#2563eb",
    padding: "12px 28px",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  historySection: {
    background: "var(--bg-secondary)",
    padding: "24px",
    borderRadius: "20px",
    boxShadow: "var(--card-shadow)",
    border: "1px solid var(--border-color)",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "var(--text-primary)",
    marginBottom: "16px",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    borderBottom: "2px solid var(--border-color)",
  },
  th: {
    textAlign: "left",
    padding: "12px",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "var(--text-secondary)",
  },
  tableRow: {
    borderBottom: "1px solid var(--border-color)",
  },
  td: {
    padding: "12px",
    fontSize: "0.9rem",
    color: "var(--text-primary)",
  },
  badge: {
    padding: "4px 10px",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "700",
  },
  emptyTd: {
    padding: "40px",
    textAlign: "center",
    color: "var(--text-secondary)",
  },
  loading: {
    padding: "40px",
    textAlign: "center",
    fontSize: "1.2rem",
    color: "var(--text-secondary)",
  }
};

export default UserDashboard;
