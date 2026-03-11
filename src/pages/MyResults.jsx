import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { SHAREPOINT_CONFIG, GRAPH_SCOPES } from "../config";

const MyResults = () => {
  const { instance, accounts } = useMsal();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (accounts.length > 0) {
      fetchUserResults();
    }
  }, [accounts]);

  const fetchUserResults = async () => {
    console.log("Fetching MyResults (v4 - Client-side filter)...");
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

      // Use createdDateTime for precise sorting
      const results = (data.value || [])
        .map(item => ({
          ...item.fields,
          CreatedTime: item.createdDateTime
        }))
        .filter(f => f.EmployeeEmail?.toLowerCase() === currentUserEmail || f.Title?.toLowerCase() === currentUserEmail)
        .sort((a, b) => new Date(b.CreatedTime) - new Date(a.CreatedTime));
        
      setHistory(results);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching results:", err);
      setLoading(false);
    }
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

  if (loading) return <div style={styles.loading}>Loading history...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>All Training history</h1>
        <p style={styles.subtitle}>Full record of your cybersecurity training attempts.</p>
      </header>

      <div style={styles.tableSection}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Date & Time (IST)</th>
                <th style={styles.th}>Module</th>
                <th style={styles.th}>Score</th>
                <th style={styles.th}>Result</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row, i) => (
                <tr key={i} style={styles.tableRow}>
                  <td style={styles.td}>{formatToIST(row.CreatedTime)}</td>
                  <td style={styles.td}>{row.ModuleName}</td>
                  <td style={styles.td}>{Math.round(row.Percentage * 100)}%</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: row.Result === "PASS" ? "#dcfce7" : "#fee2e2",
                      color: row.Result === "PASS" ? "#166534" : "#991b1b"
                    }}>
                      {row.Result}
                    </span>
                  </td>
                  <td style={styles.td}>{row.Status}</td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan="5" style={styles.emptyTd}>No records found.</td>
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
  tableSection: { background: "var(--bg-secondary)", padding: "24px", borderRadius: "16px", boxShadow: "var(--card-shadow)", border: "1px solid var(--border-color)" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  tableHeader: { borderBottom: "2px solid var(--border-color)" },
  th: { textAlign: "left", padding: "12px", fontSize: "0.875rem", fontWeight: "600", color: "var(--text-secondary)" },
  tableRow: { borderBottom: "1px solid var(--border-color)" },
  td: { padding: "16px 12px", fontSize: "0.95rem", color: "var(--text-primary)" },
  badge: { padding: "4px 10px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "700" },
  emptyTd: { padding: "40px", textAlign: "center", color: "var(--text-secondary)" },
  loading: { padding: "40px", textAlign: "center", fontSize: "1.2rem", color: "var(--text-secondary)" }
};

export default MyResults;
