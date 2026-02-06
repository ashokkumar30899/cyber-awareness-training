import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { useRef } from "react";


const PASS_PERCENTAGE = 80;

// 🔹 SharePoint IDs
const SITE_ID =
  "wissda.sharepoint.com,c9e2a476-43ad-4a56-8943-0ffae551fe66,a96716b6-614b-4972-bfee-9273bfc74d21";
const LIST_ID = "f173c1e2-02fa-4d26-9a60-02aa3211b418";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { instance, accounts } = useMsal();

  const [saveStatus, setSaveStatus] = useState("saving"); // saving | saved | error
  const hasSavedRef = useRef(false);
  const {
    correctAnswers = 0,
    wrongAnswers = 0,
    totalQuestions = 0,
    percentage = 0,
  } = location.state || {};

  const passed = percentage >= PASS_PERCENTAGE;
  const moduleName = "Cybersecurity Essentials";

  useEffect(() => {
    if (accounts.length > 0 && !hasSavedRef.current) {
      hasSavedRef.current = true;
      upsertResult();
    }
  }, [accounts]);


  /* ===== CREATE OR UPDATE RESULT ===== */
  const upsertResult = async () => {
    const sessionKey = `${accounts[0].username}_${moduleName}_${percentage}`;

    if (sessionStorage.getItem(sessionKey)) {
      console.log("ℹ️ Result already saved this session");
      return;
    }

    sessionStorage.setItem(sessionKey, "true");

    try {
      const token = await instance.acquireTokenSilent({
        scopes: ["Sites.ReadWrite.All"],
        account: accounts[0],
      });

      const headers = {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      };

      /* 🔍 Step 1: Check if record already exists */
      const searchUrl =
        `https://graph.microsoft.com/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items` +
        `?$expand=fields&$filter=fields/EmployeeEmail eq '${encodeURIComponent(
          accounts[0].username
        )}'`;

      const searchRes = await fetch(searchUrl, { headers });
      const searchData = await searchRes.json();

      const payload = {
        fields: {
          Title: accounts[0].username,
          EmployeeName: accounts[0].name,
          EmployeeEmail: accounts[0].username,
          ModuleName: moduleName,
          CorrectAnswers: String(correctAnswers),
          WrongAnswers: String(wrongAnswers),
          TotalQuestions: String(totalQuestions),
          Percentage: percentage / 100, // decimal for SP
          Result: passed ? "PASS" : "FAIL",
          Status: passed ? "Completed" : "Pending",
          CompletedOn: new Date().toISOString().split("T")[0],
        },
      };

      /* 🔁 UPDATE */
      const existingItem = searchData.value?.find(
        (item) => item.fields?.ModuleName === moduleName
      );

      if (existingItem) {
        const itemId = existingItem.id;


        await fetch(
          `https://graph.microsoft.com/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items/${itemId}`,
          {
            method: "PATCH",
            headers,
            body: JSON.stringify(payload),
          }
        );
      }
      /* ➕ CREATE */
      else {
        await fetch(
          `https://graph.microsoft.com/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
          }
        );
      }

      console.log("✅ Result saved/updated in SharePoint");
      setSaveStatus("saved");
    } catch (err) {
      console.error("❌ SharePoint error:", err);
      setSaveStatus("error");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* HEADER */}
        <div style={styles.header(passed)}>
          <div style={{ fontSize: "48px" }}>
            {passed ? "🏆" : "⚠️"}
          </div>
          <h1 style={styles.heading}>
            {passed ? "Assessment Passed" : "Assessment Not Passed"}
          </h1>
          <p style={styles.subHeading}>
            Cybersecurity Training Result
          </p>
        </div>

        {/* SCORE */}
        <div style={styles.scoreBox}>
          <div style={styles.scoreLabel}>Assessment Score</div>
          <div style={styles.scoreValue(passed)}>
            {percentage}%
          </div>
          <div style={styles.scoreMeta}>
            {correctAnswers} / {totalQuestions} correct
          </div>
        </div>

        {/* SAVE STATUS */}
        {saveStatus === "saving" && (
          <p style={styles.info}>⏳ Recording your result…</p>
        )}
        {saveStatus === "saved" && (
          <p style={styles.success}>✅ Result successfully recorded</p>
        )}
        {saveStatus === "error" && (
          <p style={styles.error}>
            ⚠️ Could not save result. Please contact IT.
          </p>
        )}

        {/* ACTIONS */}
        <div style={styles.actions}>
          {!passed && (
            <button
              style={styles.retryBtn}
              onClick={() => navigate("/module1")}
            >
              🔁 Retake Training
            </button>
          )}

          <button
            style={styles.exitBtn}
            onClick={() => navigate("/")}
          >
            Exit Training
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#eef2ff,#e0e7ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Work Sans, sans-serif",
    padding: "2rem",
  },
  card: {
    width: "100%",
    maxWidth: "640px",
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
    overflow: "hidden",
    textAlign: "center",
  },
  header: (passed) => ({
    padding: "2.5rem",
    background: passed
      ? "linear-gradient(135deg,#059669,#10b981)"
      : "linear-gradient(135deg,#b91c1c,#dc2626)",
    color: "#fff",
  }),
  heading: {
    fontSize: "1.9rem",
    fontWeight: "800",
    margin: "12px 0 6px",
  },
  subHeading: {
    opacity: 0.9,
    fontSize: "0.95rem",
  },
  scoreBox: {
    margin: "2rem auto",
    padding: "1.8rem",
    width: "260px",
    borderRadius: "16px",
    background: "#f8fafc",
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
  },
  scoreLabel: {
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#64748b",
    marginBottom: "6px",
  },
  scoreValue: (passed) => ({
    fontSize: "2.4rem",
    fontWeight: "800",
    color: passed ? "#059669" : "#dc2626",
  }),
  scoreMeta: {
    fontSize: "0.9rem",
    color: "#475569",
  },
  info: {
    color: "#64748b",
    marginBottom: "12px",
  },
  success: {
    color: "#059669",
    marginBottom: "12px",
    fontWeight: 600,
  },
  error: {
    color: "#dc2626",
    marginBottom: "12px",
    fontWeight: 600,
  },
  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    paddingBottom: "2rem",
  },
  retryBtn: {
    padding: "12px 22px",
    borderRadius: "10px",
    border: "none",
    background: "#dc2626",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  exitBtn: {
    padding: "12px 22px",
    borderRadius: "10px",
    border: "none",
    background: "#0f172a",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
};
