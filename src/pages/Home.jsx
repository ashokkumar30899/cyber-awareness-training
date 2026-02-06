import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
        paddingBottom: "60px",
      }}
    >
      {/* ===== HERO SECTION ===== */}
      <div
        style={{
          padding: "64px 20px 48px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "56px", marginBottom: "12px" }}>🛡️</div>

        <h1
          style={{
            fontSize: "2.4rem", // reduced from 2.8
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "10px",
          }}
        >
          Cybersecurity Training Portal
        </h1>

        <p
          style={{
            maxWidth: "640px",
            margin: "0 auto 28px",
            fontSize: "1rem", // reduced
            color: "#475569",
            lineHeight: "1.6",
          }}
        >
          Helping employees build the knowledge and awareness needed to protect
          our organization from modern cyber threats.
        </p>

        {/* START BUTTON */}
        <button
          onClick={() => navigate("/module1")}
          style={{
            background: "linear-gradient(135deg, #2563eb, #1e40af)",
            color: "#ffffff",
            padding: "14px 32px",
            borderRadius: "10px",
            fontSize: "1rem",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 26px rgba(37,99,235,0.35)",
          }}
        >
          ▶ Start Cybersecurity Training
        </button>
      </div>

      {/* ===== ABOUT SECTION (SMALLER & LIGHTER) ===== */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto 36px",
          background: "#ffffff",
          borderRadius: "14px",
          padding: "22px 26px", // reduced padding
          boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            color: "#0f172a",
            marginBottom: "10px",
            fontSize: "1.35rem", // reduced
          }}
        >
          About This Training
        </h2>

        <p
          style={{
            color: "#475569",
            lineHeight: "1.7",
            marginBottom: "10px",
            fontSize: "0.95rem", // reduced
          }}
        >
          Cybersecurity is no longer just an IT responsibility — it is everyone’s
          responsibility. This training helps employees recognize risks and act
          safely.
        </p>

        <p
          style={{
            color: "#475569",
            lineHeight: "1.7",
            fontSize: "0.95rem",
          }}
        >
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
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          padding: "0 20px",
        }}
      >
        {/* Module 1 */}
        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e5e7eb",
            padding: "22px",
            borderRadius: "12px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔐</div>
          <h3
            style={{
              color: "#0f172a",
              marginBottom: "6px",
              fontSize: "1.15rem",
            }}
          >
            Module 1: Cybersecurity Awareness
          </h3>
          <p
            style={{
              color: "#475569",
              fontSize: "0.9rem",
              lineHeight: "1.6",
            }}
          >
            Understand core cybersecurity concepts, common threats, and your
            role in protecting the organization.
          </p>
          <p
            style={{
              marginTop: "8px",
              fontSize: "0.85rem",
              color: "#64748b",
            }}
          >
            ⏱️ Duration: ~30 minutes
          </p>
        </div>

        {/* Module 2 */}
        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e5e7eb",
            padding: "22px",
            borderRadius: "12px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
            opacity: 0.75,
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>🎣</div>
          <h3
            style={{
              color: "#0f172a",
              marginBottom: "6px",
              fontSize: "1.15rem",
            }}
          >
            Module 2: Phishing Awareness
          </h3>
          <p
            style={{
              color: "#475569",
              fontSize: "0.9rem",
              lineHeight: "1.6",
            }}
          >
            Learn how to identify phishing attacks and respond safely to social
            engineering threats.
          </p>
          <p
            style={{
              marginTop: "8px",
              fontSize: "0.85rem",
              color: "#64748b",
            }}
          >
            ⏱️ Duration: ~30 minutes
          </p>
        </div>
      </div>

      {/* ===== FOOTER NOTE ===== */}
      <div
        style={{
          marginTop: "48px",
          textAlign: "center",
          color: "#64748b",
          fontSize: "0.85rem",
        }}
      >
        Protecting our organization, one employee at a time.
      </div>
    </div>
  );
}
console.log("Home Success")
export default Home;
