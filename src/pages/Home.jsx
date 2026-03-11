import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Modules.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="module-container" style={{ minHeight: "100vh", paddingBottom: "60px" }}>
      {/* ===== HERO SECTION ===== */}
      <header className="module-header" style={{ textAlign: "center", padding: "64px 20px 48px" }}>
        <div style={{ fontSize: "56px", marginBottom: "12px" }}>🛡️</div>
        <h1 style={{ color: "var(--text-primary)", fontSize: "2.4rem", fontWeight: "800", marginBottom: "10px" }}>
          Cybersecurity Training Portal
        </h1>
        <p className="subtitle" style={{ margin: "0 auto 28px" }}>
          Helping employees build the knowledge and awareness needed to protect
          our organization from modern cyber threats.
        </p>

        {/* START BUTTON */}
        <button
          onClick={() => navigate("/module1")}
          className="nav-button next"
          style={{ margin: "0 auto", padding: "14px 40px", minWidth: "280px" }}
        >
          <span>▶ Start Cybersecurity Training</span>
        </button>
      </header>

      {/* ===== ABOUT SECTION ===== */}
      <div className="infobox" style={{ maxWidth: "900px", margin: "0 auto 36px", padding: "26px" }}>
        <h2 style={{ color: "var(--text-primary)", marginBottom: "10px", fontSize: "1.35rem" }}>
          About This Training
        </h2>
        <p className="module-text" style={{ fontSize: "0.95rem", marginBottom: "12px" }}>
          Cybersecurity is no longer just an IT responsibility — it is everyone’s
          responsibility. This training helps employees recognize risks and act
          safely.
        </p>
        <p className="module-text" style={{ fontSize: "0.95rem" }}>
          By completing these modules, you become an active part of our defense
          against phishing, malware, ransomware, and social engineering attacks.
        </p>
      </div>

      {/* ===== MODULE OVERVIEW ===== */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          padding: "0 20px",
        }}
      >
        {/* Module 1 */}
        <div className="threat-card" style={{ textAlign: "left", padding: "24px" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔐</div>
          <h3 style={{ color: "var(--text-primary)", marginBottom: "8px", fontSize: "1.15rem" }}>
            Module 1: Cybersecurity Essentials
          </h3>
          <p className="module-text" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
            Understand core cybersecurity concepts, physical security, and your
            critical role in daily organizational protection.
          </p>
          <div style={{ marginTop: "16px", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "600" }}>
            ⏱️ Duration: ~15-20 minutes
          </div>
        </div>

        {/* Module 2 */}
        <div className="threat-card" style={{ textAlign: "left", padding: "24px" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>🎣</div>
          <h3 style={{ color: "var(--text-primary)", marginBottom: "8px", fontSize: "1.15rem" }}>
            Module 2: Phishing & Anti-Fraud
          </h3>
          <p className="module-text" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
            Deep dive into identifying phishing emails, Smishing (SMS), and Vishing
            with real-world situational examples.
          </p>
          <div style={{ marginTop: "16px", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "600" }}>
            ⏱️ Duration: ~20-25 minutes
          </div>
        </div>
      </div>

      {/* ===== FOOTER NOTE ===== */}
      <footer
        style={{
          marginTop: "60px",
          textAlign: "center",
          color: "var(--text-secondary)",
          fontSize: "0.9rem",
          fontWeight: "500",
          opacity: 0.8
        }}
      >
        🛡️ Protecting Wissda, one employee at a time.
      </footer>
    </div>
  );
}

export default Home;
