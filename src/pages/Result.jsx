import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { useRef } from "react";
import { SHAREPOINT_CONFIG, GRAPH_SCOPES } from "../config";
import "../styles/Modules.css";

const PASS_PERCENTAGE = 80;

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { instance, accounts } = useMsal();

  const [saveStatus, setSaveStatus] = useState("saving");
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
      recordResult();
    }
  }, [accounts]);

  const recordResult = async () => {
    const sessionKey = `${accounts[0].username}_${moduleName}_${percentage}_${new Date().getTime()}`;
    if (sessionStorage.getItem(sessionKey)) return;
    sessionStorage.setItem(sessionKey, "true");

    try {
      const token = await instance.acquireTokenSilent({
        scopes: GRAPH_SCOPES.WRITE,
        account: accounts[0],
      }).catch(async (error) => {
        if (error.name === "InteractionRequiredAuthError") {
          return await instance.acquireTokenPopup({ scopes: GRAPH_SCOPES.WRITE });
        }
        throw error;
      });

      const headers = {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      };

      const getNextTrainingDate = () => {
        const d = new Date();
        d.setMonth(d.getMonth() + 6);
        return d.toISOString().split('T')[0];
      };

      const payload = {
        fields: {
          Title: accounts[0].username,
          EmployeeName: accounts[0].name,
          EmployeeEmail: accounts[0].username,
          ModuleName: moduleName,
          CorrectAnswers: String(correctAnswers),
          WrongAnswers: String(wrongAnswers),
          TotalQuestions: String(totalQuestions),
          Percentage: percentage / 100,
          Result: passed ? "PASS" : "FAIL",
          Status: passed ? "Completed" : "Pending",
          CompletedOn: new Date().toISOString(),
          nexttrainingdate: passed ? getNextTrainingDate() : null,
        },
      };

      await fetch(
        `https://graph.microsoft.com/v1.0/sites/${SHAREPOINT_CONFIG.SITE_ID}/lists/${SHAREPOINT_CONFIG.LIST_ID}/items`,
        { method: "POST", headers, body: JSON.stringify(payload) }
      );
      setSaveStatus("saved");
    } catch (err) {
      console.error("❌ SharePoint error:", err);
      setSaveStatus("error");
    }
  };

  return (
    <div className="module-container" style={{ maxWidth: '640px', marginTop: '60px' }}>
      <header className="module-header" style={{ 
        background: passed 
          ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)' 
          : 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)' 
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{passed ? "🏆" : "⚠️"}</div>
        <h1>{passed ? "Assessment Passed" : "Assessment Failed"}</h1>
        <p className="subtitle" style={{ color: '#ffffff', opacity: 1 }}>{moduleName}</p>
      </header>

      <div className="module-content" style={{ textAlign: 'center' }}>
        <div style={{
          background: 'var(--bg-primary)',
          padding: '2rem',
          borderRadius: '24px',
          display: 'inline-block',
          marginBottom: '2rem',
          border: '1px solid var(--border-color)',
          minWidth: '200px'
        }}>
          <div style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px' }}>Your Score</div>
          <div style={{ fontSize: '3.5rem', fontWeight: '900', color: passed ? '#10b981' : '#ef4444' }}>{percentage}%</div>
          <div style={{ color: 'var(--text-secondary)' }}>{correctAnswers} / {totalQuestions} Correct</div>
        </div>

        {saveStatus === "saving" && <p style={{ color: 'var(--text-secondary)' }}>⏳ Recording result...</p>}
        {saveStatus === "saved" && <p style={{ color: '#10b981', fontWeight: 'bold' }}>✅ Result recorded successfully</p>}
        {saveStatus === "error" && <p style={{ color: '#ef4444', fontWeight: 'bold' }}>⚠️ Error saving result. Please inform IT.</p>}

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '2rem' }}>
          {!passed && (
            <button onClick={() => navigate("/module1")} className="nav-btn primary" style={{ background: '#ef4444' }}>Retake Training</button>
          )}
          <button onClick={() => navigate("/")} className="nav-btn secondary">Go to Home</button>
        </div>
      </div>
    </div>
  );
}
