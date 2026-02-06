import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Module2() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* INLINE CSS FOR MODULE 2 */}
      <style>{`
        :root {
          --primary: #0A2540;
          --secondary: #00D4FF;
          --accent: #FF6B35;
          --warning: #FFB800;
          --danger: #FF3366;
          --success: #00C853;
          --text-dark: #1A1A1A;
          --text-light: #6B7280;
          --bg-light: #F8FAFC;
          --bg-card: #FFFFFF;
          --border: #E2E8F0;
        }

        body {
          font-family: 'Work Sans', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .container {
          max-width: 1000px;
          margin: 2rem auto;
          background: var(--bg-card);
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
        }

        .header {
          background: linear-gradient(135deg, #1E3A5F);
          color: white;
          padding: 3rem 2rem;
          text-align: center;
        }
.module-badge {
          display: inline-block;
          background: var(--secondary);
          color: var(--primary);
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.875rem;
          margin-top: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .header h1 {
          font-family: 'Space Mono', monospace;
          font-size: 2.5rem;
        }

        .module-badge {
          display: inline-block;
          background: var(--warning);
          color: var(--primary);
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-weight: 700;
          margin-top: 1rem;
        }

        .content {
          padding: 3rem 2.5rem;
        }

        .section {
          margin-bottom: 3rem;
          animation: fadeInUp 0.6s ease forwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .section-number {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #0c57ad, #0c57ad);
          color: white;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          font-weight: 700;
        }

        h2 {
          display: flex;
          align-items: center;
          color: var(--primary);
          margin-bottom: 1.25rem;
        }

        .navigation {
          display: flex;
          gap: 1rem;
          padding: 2rem;
          background: var(--bg-light);
          border-top: 2px solid var(--border);
        }
/* Navigation container */
.navigation {
  display: flex;
  gap: 1.5rem;
  padding: 2.5rem;
  background: var(--bg-light);
  border-top: 2px solid var(--border);
}

/* Base button style */
.nav-button {
  flex: 1;
  padding: 1.4rem 2.5rem;
  border: none;
  border-radius: 16px;
  font-family: 'Work Sans', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.35s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  letter-spacing: 0.3px;
}

/* Previous button */
.nav-button.prev {
  background: linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%);
  color: #ffffff;
}

.nav-button.prev:hover {
  background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%);
  transform: translateX(-10px) scale(1.03);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
}

/* Next button */
.nav-button.next {
  background: linear-gradient(135deg, var(--secondary) 0%, #00A8CC 100%);
  color: var(--primary);
}

.nav-button.next:hover {
  background: linear-gradient(135deg, #00E0FF 0%, #0099B8 100%);
  transform: translateX(10px) scale(1.03);
  box-shadow: 0 14px 35px rgba(0, 212, 255, 0.45);
}

/* Icon size */
.nav-button .icon {
  font-size: 1.4rem;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .navigation {
    flex-direction: column;
  }

  .nav-button {
    width: 100%;
  }
}
        .nav-button {
          flex: 1;
          padding: 1rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }

        .nav-button.prev {
          background: #6B7280;
          color: white;
        }

        .nav-button.next {
          background:#00A8CC;
          color: white;
        }

        .scroll-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #B91C1C;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      `}</style>

      <div className="container">
        {/* HEADER */}
        <div className="header">
          <h1>🎣 Phishing Awareness Training</h1>
          <p>Module 2: Recognizing and Preventing Phishing Attacks</p>
          <span className="module-badge">Critical Security Training</span>
        </div>

        {/* CONTENT (WE WILL ADD SECTIONS HERE ONE BY ONE) */}
        <div className="section">
          {/* SECTION--1 */}
          {/* Title */}
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <span className="section-number">
              1
            </span>
            What is Phishing?
          </h2>

          {/* Intro text */}
          <p
            style={{
              marginBottom: "1.25rem",
              color: "#1F2937",
              lineHeight: "1.75",
              maxWidth: "900px",
            }}
          >
            Phishing is a form of cyber attack in which attackers pretend to be trusted
            organizations or individuals in order to trick people into revealing
            sensitive or confidential information.
          </p>

          {/* Info Box (soft, not alert) */}
          <div
            style={{
              background: "#F1F5F9",
              borderLeft: "4px solid #2563EB",
              padding: "1rem 1.25rem",
              borderRadius: "6px",
              marginBottom: "1.75rem",
              color: "#0F172A",
            }}
          >
            <strong>Important:</strong> Phishing is responsible for a majority of
            successful cyber attacks globally and remains one of the most common entry
            points for security incidents.
          </div>

          {/* Targets */}
          <h3
            style={{
              marginBottom: "0.75rem",
              fontSize: "1.25rem",
              color: "#0A2540",
            }}
          >
            Common targets of phishing attacks
          </h3>

          <ul style={{ marginBottom: "1.75rem" }}>
            <li>Account login credentials such as usernames and passwords</li>
            <li>Financial details including credit card or bank information</li>
            <li>One-Time Passwords (OTPs) and multi-factor authentication codes</li>
            <li>Personal identity information</li>
            <li>Internal or confidential company data</li>
          </ul>

          {/* Effectiveness */}
          <h3
            style={{
              marginBottom: "0.75rem",
              fontSize: "1.25rem",
              color: "#0A2540",
            }}
          >
            Why phishing is effective
          </h3>

          <ul>
            <li>Relies on human behavior rather than technical vulnerabilities</li>
            <li>Uses urgency, fear, or trust to influence quick decisions</li>
            <li>Often appears legitimate and familiar to the recipient</li>
            <li>Continuously adapts to bypass security awareness and controls</li>
          </ul>
        </div>
        {/* Section== 2 */}
        <div classname="section">

          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <span className="section-number">
              2
            </span>
            Types of Phishing Attacks
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              marginTop: "24px",
            }}
          >
            {/* Email Phishing */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "26px 22px",
                textAlign: "center",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 14px 32px rgba(239,68,68,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 18px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  borderRadius: "12px",
                  background: "#fee2e2",
                  color: "#b91c1c",
                }}
              >
                📧
              </div>
              <h4 style={{ fontSize: "1.1rem", marginBottom: "10px", color: "#0f172a" }}>
                Email Phishing
              </h4>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#475569" }}>
                Fraudulent emails pretending to be from trusted sources, asking you to
                click links or download malicious attachments.
              </p>
            </div>

            {/* SMS Phishing */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "26px 22px",
                textAlign: "center",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 14px 32px rgba(234,179,8,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 18px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  borderRadius: "12px",
                  background: "#fef9c3",
                  color: "#a16207",
                }}
              >
                💬
              </div>
              <h4 style={{ fontSize: "1.1rem", marginBottom: "10px", color: "#0f172a" }}>
                SMS Phishing (Smishing)
              </h4>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#475569" }}>
                Malicious text messages impersonating banks, couriers, or services to
                steal personal or financial information.
              </p>
            </div>

            {/* Voice Phishing */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "26px 22px",
                textAlign: "center",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 14px 32px rgba(59,130,246,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 18px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  borderRadius: "12px",
                  background: "#dbeafe",
                  color: "#1d4ed8",
                }}
              >
                📞
              </div>
              <h4 style={{ fontSize: "1.1rem", marginBottom: "10px", color: "#0f172a" }}>
                Voice Phishing (Vishing)
              </h4>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#475569" }}>
                Phone calls pretending to be IT support, banks, or government agencies to
                trick victims into sharing sensitive data.
              </p>
            </div>

            {/* Spear Phishing */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "26px 22px",
                textAlign: "center",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 14px 32px rgba(168,85,247,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 18px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  borderRadius: "12px",
                  background: "#f3e8ff",
                  color: "#7e22ce",
                }}
              >
                🎯
              </div>
              <h4 style={{ fontSize: "1.1rem", marginBottom: "10px", color: "#0f172a" }}>
                Spear Phishing
              </h4>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#475569" }}>
                Highly targeted attacks using personalized information to appear
                legitimate and increase success rates.
              </p>
            </div>

            {/* Whaling */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "26px 22px",
                textAlign: "center",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 14px 32px rgba(15,23,42,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 18px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  borderRadius: "12px",
                  background: "#e5e7eb",
                  color: "#0f172a",
                }}
              >
                👔
              </div>
              <h4 style={{ fontSize: "1.1rem", marginBottom: "10px", color: "#0f172a" }}>
                Whaling
              </h4>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#475569" }}>
                Advanced phishing attacks targeting senior executives to gain access to
                sensitive corporate data or authorize fraud.
              </p>
            </div>

            {/* Clone Phishing */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "26px 22px",
                textAlign: "center",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 14px 32px rgba(14,165,233,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 18px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  borderRadius: "12px",
                  background: "#e0f2fe",
                  color: "#0369a1",
                }}
              >
                🔗
              </div>
              <h4 style={{ fontSize: "1.1rem", marginBottom: "10px", color: "#0f172a" }}>
                Clone Phishing
              </h4>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#475569" }}>
                Legitimate-looking emails copied and resent with malicious links or
                attachments, pretending to be an update.
              </p>
            </div>
          </div>
        </div>
        {/* Section --------3------------3------------------3------------*/}
        <div className="section">
          {/* Section title */}
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <span className="section-number">
              3
            </span>
            Red Flags: How to Identify Phishing Emails
          </h2>

          <p
            style={{
              marginBottom: "2rem",
              color: "#374151",
              maxWidth: "900px",
            }}
          >
            Learning to spot common warning signs is your first and most effective line
            of defense against phishing attacks.
          </p>

          {/* Sender Information */}
          <div style={{ marginBottom: "2.25rem" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              borderLeft: "4px solid #DC2626",
              paddingLeft: "0.75rem",
              marginBottom: "0.75rem"
            }}>
              <span style={{ color: "#DC2626", fontSize: "1.1rem" }}>▶</span>
              <h3 style={{ margin: 0, fontWeight: "600", color: "#1F2937" }}>
                Sender Information
              </h3>
            </div>

            <ul style={{ paddingLeft: "1.75rem", lineHeight: "1.9" }}>
              <li>
                <strong>Email address looks unusual: </strong>
                Sender domain does not exactly match the official company domain
              </li>
              <li>
                <strong>Misspelled or look-alike domains: </strong>
                Slight spelling changes used to impersonate trusted brands
              </li>
              <li>
                <strong>Generic greeting: </strong>
                Messages not addressed to you by name
              </li>
              <li>
                <strong>Unexpected sender: </strong>
                Email arrives without prior context or request
              </li>
            </ul>
          </div>

          {/* Content and Language */}
          <div style={{ marginBottom: "2.25rem" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              borderLeft: "4px solid #DC2626",
              paddingLeft: "0.75rem",
              marginBottom: "0.75rem"
            }}>
              <span style={{ color: "#DC2626", fontSize: "1.1rem" }}>▶</span>
              <h3 style={{ margin: 0, fontWeight: "600", color: "#1F2937" }}>
                Content and Language
              </h3>
            </div>

            <ul style={{ paddingLeft: "1.75rem", lineHeight: "1.9" }}>
              <li>
                <strong>Creates urgency: </strong>
                Pressures you to act immediately without thinking
              </li>
              <li>
                <strong>Uses fear or threats: </strong>
                Warns of account suspension, loss, or legal consequences
              </li>
              <li>
                <strong>Promises rewards: </strong>
                Offers prizes, refunds, or benefits unexpectedly
              </li>
              <li>
                <strong>Poor writing quality: </strong>
                Spelling mistakes, awkward phrasing, or unprofessional tone
              </li>
              <li>
                <strong>Requests sensitive information: </strong>
                Asks for passwords, OTPs, or verification codes
              </li>
            </ul>
          </div>

          {/* Links and Attachments */}
          <div style={{ marginBottom: "2.25rem" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              borderLeft: "4px solid #DC2626",
              paddingLeft: "0.75rem",
              marginBottom: "0.75rem"
            }}>
              <span style={{ color: "#DC2626", fontSize: "1.1rem" }}>▶</span>
              <h3 style={{ margin: 0, fontWeight: "600", color: "#1F2937" }}>
                Links and Attachments
              </h3>
            </div>

            <ul style={{ paddingLeft: "1.75rem", lineHeight: "1.9" }}>
              <li>
                <strong>Links don’t match the destination: </strong>
                Hovering shows a different or suspicious URL
              </li>
              <li>
                <strong>Shortened or hidden links: </strong>
                Used to disguise malicious websites
              </li>
              <li>
                <strong>Unexpected attachments: </strong>
                Especially executable or compressed files
              </li>
              <li>
                <strong>Attachment urgency: </strong>
                Encourages immediate download or opening
              </li>
            </ul>
          </div>

          {/* Reminder */}
          <div style={{
            background: "#FEF9C3",
            borderLeft: "5px solid #FACC15",
            padding: "1rem 1.25rem",
            borderRadius: "8px",
            color: "#713F12",
            maxWidth: "820px"
          }}>
            <strong>Important:</strong>
            Legitimate organizations never request passwords, OTPs, or sensitive data via email.
          </div>

        </div>
        {/*-----------Section----------4------------4-----------*/}
        {/* Section 4: Real Example – Phishing Email Breakdown */}
        {/* ===== SECTION 4: PHISHING EMAIL EXAMPLE ===== */}
        <div className="section">
          {/* Section title */}
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <span className="section-number">
              4
            </span>
            Example: Phishing Email Breakdown
          </h2>

          {/* ================= EMAIL MOCKUP ================= */}
          <div
            style={{
              maxWidth: "920px",
              background: "#eeeee8",
              border: "1px solid #bdbdbd",
              borderRadius: "14px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
              overflow: "hidden",
              marginBottom: "30px", // 🔹 GAP BEFORE RED FLAGS
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(90deg, #2563eb, #1e40af)",
                padding: "16px 20px",
                color: "#ffffff",
              }}
            >
              <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>From</div>
              <div style={{ fontSize: "1rem", fontWeight: "600" }}>
                IT Support &lt;itsupport@rnicrosoft.com&gt;
                <span
                  style={{
                    background: "#fecaca",
                    color: "#7f1d1d",
                    padding: "2px 8px",
                    borderRadius: "6px",
                    marginLeft: "10px",
                    fontSize: "0.75rem",
                  }}
                >
                  Suspicious Sender
                </span>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "24px" }}>
              <p style={{ fontSize: "1rem", color: "#111827" }}>
                <strong>Subject:</strong>{" "}
                <span style={{ color: "#dc2626", fontWeight: "700" }}>
                  ⚠️ Immediate Action Required: Account Suspension
                </span>
              </p>

              <div
                style={{
                  background: "#f8fafc",
                  borderLeft: "4px solid #dc2626",
                  padding: "16px",
                  margin: "20px 0",
                  borderRadius: "8px",
                }}
              >
                <p style={{ margin: 0, color: "#1f2937" }}>
                  Dear User,
                  <br />
                  <br />
                  We detected <strong>unusual login activity</strong> on your account.
                  Your access will be{" "}
                  <strong style={{ color: "#dc2626" }}>
                    suspended within 24 hours
                  </strong>{" "}
                  unless you verify your identity.
                </p>
              </div>

              <div style={{ textAlign: "center", margin: "30px 0" }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "linear-gradient(90deg, #dc2626, #b91c1c)",
                    color: "#ffffff",
                    padding: "14px 28px",
                    borderRadius: "10px",
                    fontWeight: "600",
                    boxShadow: "0 8px 20px rgba(220,38,38,0.4)",
                  }}
                >
                  🔐 Verify Account Now
                </div>
              </div>

              <p style={{ fontSize: "0.95rem", color: "#374151" }}>
                Failure to verify may result in permanent loss of access to your email
                and internal systems.
              </p>

              <p style={{ fontSize: "0.9rem", color: "#6b7280", marginTop: "24px" }}>
                Regards,
                <br />
                <strong>IT Security Team</strong>
              </p>
            </div>
          </div>

          {/* ================= WHY THIS IS PHISHING ================= */}
          <div
            style={{
              maxWidth: "880px",
              background: "#fee2e2",
              borderLeft: "5px solid #e11d48",
              borderRadius: "10px",
              padding: "20px 24px",
            }}
          >
            <h4 style={{ margin: "0 0 12px", color: "#be123c" }}>
              🚨 Why This is Phishing:
            </h4>

            <ul
              style={{
                listStyle: "none",
                paddingLeft: "0",
                margin: 0,
                color: "#7f1d1d",
                fontSize: "0.95rem",
                lineHeight: "1.8",
              }}
            >
              <li>❌ Sender email is not from official company domain</li>
              <li>❌ Generic greeting instead of your name</li>
              <li>❌ Creates false urgency (24-hour deadline)</li>
              <li>❌ Uses scare tactics (account suspension)</li>
              <li>❌ Asks you to click a suspicious link</li>
              <li>
                ❌ Requests password via email{" "}
                <strong>(NEVER legitimate!)</strong>
              </li>
            </ul>
          </div>
        </div>
        {/*-----------Section----------5------------5----------5-------5------------5-------------5-----------5-------5-*/}

        <div className="section">
          {/* Section title */}
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <span className="section-number">
              5
            </span>
            Social Engineering Tactics
          </h2>
          <p style={{ color: "#475569", fontSize: "1rem", marginBottom: "24px" }}>
            Phishing attacks rely on <strong>social engineering</strong> — psychological
            manipulation techniques that trick people into making security mistakes.
          </p>

          {/* ===== TACTICS GRID ===== */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
            }}
          >
            {/* Urgency */}
            <div style={{ background: "#fee2e2", border: "1px solid #fecaca", borderRadius: "14px", padding: "20px" }}>
              <div style={{ fontSize: "26px", marginBottom: "8px", color: "#dc2626" }}>⏰</div>
              <h4 style={{ margin: "0 0 6px", color: "#0f172a" }}>Urgency</h4>
              <p style={{ margin: "0 0 10px", color: "#475569", fontSize: "0.95rem" }}>
                Creates time pressure so you act quickly without thinking.
              </p>
              <div style={{ background: "#ffffff", border: "1px dashed #fca5a5", padding: "10px", borderRadius: "8px", fontStyle: "italic", color: "#7f1d1d" }}>
                “Your account will be deleted in 2 hours!”
              </div>
            </div>

            {/* Authority */}
            <div style={{ background: "#ede9fe", border: "1px solid #ddd6fe", borderRadius: "14px", padding: "20px" }}>
              <div style={{ fontSize: "26px", marginBottom: "8px", color: "#7c3aed" }}>👔</div>
              <h4 style={{ margin: "0 0 6px", color: "#0f172a" }}>Authority</h4>
              <p style={{ margin: "0 0 10px", color: "#475569", fontSize: "0.95rem" }}>
                Impersonates someone in power to force compliance.
              </p>
              <div style={{ background: "#ffffff", border: "1px dashed #c4b5fd", padding: "10px", borderRadius: "8px", fontStyle: "italic", color: "#4c1d95" }}>
                “This is your CEO. I need you to do this immediately.”
              </div>
            </div>

            {/* Fear */}
            <div style={{ background: "#fee2e2", border: "1px solid #fecaca", borderRadius: "14px", padding: "20px" }}>
              <div style={{ fontSize: "26px", marginBottom: "8px", color: "#b91c1c" }}>⚠️</div>
              <h4 style={{ margin: "0 0 6px", color: "#0f172a" }}>Fear</h4>
              <p style={{ margin: "0 0 10px", color: "#475569", fontSize: "0.95rem" }}>
                Threatens negative consequences to scare victims.
              </p>
              <div style={{ background: "#ffffff", border: "1px dashed #fca5a5", padding: "10px", borderRadius: "8px", fontStyle: "italic", color: "#7f1d1d" }}>
                “Suspicious login detected. Act now!”
              </div>
            </div>

            {/* Curiosity */}
            <div style={{ background: "#e0f2fe", border: "1px solid #bae6fd", borderRadius: "14px", padding: "20px" }}>
              <div style={{ fontSize: "26px", marginBottom: "8px", color: "#0284c7" }}>🔍</div>
              <h4 style={{ margin: "0 0 6px", color: "#0f172a" }}>Curiosity</h4>
              <p style={{ margin: "0 0 10px", color: "#475569", fontSize: "0.95rem" }}>
                Exploits natural curiosity to make you click.
              </p>
              <div style={{ background: "#ffffff", border: "1px dashed #7dd3fc", padding: "10px", borderRadius: "8px", fontStyle: "italic", color: "#075985" }}>
                “See who viewed your profile”
              </div>
            </div>

            {/* Greed */}
            <div style={{ background: "#fef9c3", border: "1px solid #fde68a", borderRadius: "14px", padding: "20px" }}>
              <div style={{ fontSize: "26px", marginBottom: "8px", color: "#a16207" }}>💰</div>
              <h4 style={{ margin: "0 0 6px", color: "#0f172a" }}>Greed</h4>
              <p style={{ margin: "0 0 10px", color: "#475569", fontSize: "0.95rem" }}>
                Promises rewards or prizes to lure victims.
              </p>
              <div style={{ background: "#ffffff", border: "1px dashed #facc15", padding: "10px", borderRadius: "8px", fontStyle: "italic", color: "#713f12" }}>
                “You've won $10,000! Claim now!”
              </div>
            </div>

            {/* Trust */}
            <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: "14px", padding: "20px" }}>
              <div style={{ fontSize: "26px", marginBottom: "8px", color: "#15803d" }}>🤝</div>
              <h4 style={{ margin: "0 0 6px", color: "#0f172a" }}>Trust</h4>
              <p style={{ margin: "0 0 10px", color: "#475569", fontSize: "0.95rem" }}>
                Pretends to be a known person or trusted brand.
              </p>
              <div style={{ background: "#ffffff", border: "1px dashed #4ade80", padding: "10px", borderRadius: "8px", fontStyle: "italic", color: "#14532d" }}>
                Email appears to be from your bank
              </div>
            </div>

            {/* Helpfulness */}
            <div style={{ background: "#f3e8ff", border: "1px solid #d8b4fe", borderRadius: "14px", padding: "20px" }}>
              <div style={{ fontSize: "26px", marginBottom: "8px", color: "#7e22ce" }}>🛠️</div>
              <h4 style={{ margin: "0 0 6px", color: "#0f172a" }}>Helpfulness</h4>
              <p style={{ margin: "0 0 10px", color: "#475569", fontSize: "0.95rem" }}>
                Offers help to gain trust and unauthorized access.
              </p>
              <div style={{ background: "#ffffff", border: "1px dashed #c084fc", padding: "10px", borderRadius: "8px", fontStyle: "italic", color: "#581c87" }}>
                “IT here to help fix your computer”
              </div>
            </div>
          </div>

          {/* ===== KEY INSIGHT ===== */}
          <div
            style={{
              marginTop: "28px",
              background: "#f8fafc",
              borderLeft: "5px solid #0ea5e9",
              padding: "18px 22px",
              borderRadius: "10px",
            }}
          >
            <p style={{ margin: 0, color: "#0f172a", fontSize: "1rem" }}>
              <strong>🧠 Key Insight:</strong> Attackers exploit emotion and pressure.
              Always pause, verify the request, and think before taking action.
            </p>
          </div>
        </div>

        {/*-----------Section----------6------------6----------6-------6------------6-------------6-----------6-------6---*/}

        {/* ===== SECTION 6: BEST PRACTICES – PROTECTING YOURSELF FROM PHISHING ===== */}
        <div className="section">
          {/* Section title */}
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <span className="section-number">
              6
            </span>
            Best Practices: Protecting Yourself from Phishing
          </h2>

          {/* ===== EMAIL SECURITY CHECKLIST ===== */}
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              padding: "22px 24px",
              marginBottom: "30px",
            }}
          >
            <h4 style={{ marginBottom: "14px", color: "#0f172a" }}>
              ✅ Email Security Checklist
            </h4>

            <ul
              style={{
                listStyle: "none",
                paddingLeft: 0,
                margin: 0,
                color: "#334155",
                fontSize: "0.95rem",
                lineHeight: "1.9",
              }}
            >
              <li>🔍 <strong>Verify the sender:</strong> Check the full email address, not just the display name</li>
              <li>🖱️ <strong>Hover before clicking:</strong> Preview links without clicking</li>
              <li>🌐 <strong>Go direct:</strong> Type the website URL instead of clicking email links</li>
              <li>🔒 <strong>Check for HTTPS:</strong> Look for the padlock icon in the browser</li>
              <li>📎 <strong>Be skeptical of attachments:</strong> Avoid unexpected files, even from known senders</li>
              <li>📞 <strong>Verify requests:</strong> Call using an official number to confirm unusual requests</li>
              <li>🔐 <strong>Use MFA:</strong> Enable Multi-Factor Authentication on all accounts</li>
              <li>🛠️ <strong>Keep software updated:</strong> Regularly update OS, browser, and security tools</li>
            </ul>
          </div>

          {/* ===== HOW TO VERIFY A SUSPICIOUS EMAIL ===== */}
          <h3 style={{ color: "#0f172a", marginBottom: "18px" }}>
            🔍 How to Verify a Suspicious Email
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
            }}
          >
            {/* Step 1 */}
            <div
              style={{
                background: "#ecfeff",
                border: "1px solid #67e8f9",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <h4 style={{ marginBottom: "8px", color: "#075985" }}>
                ✓ Step 1: Examine the Sender
              </h4>
              <p style={{ margin: 0, color: "#334155", fontSize: "0.95rem" }}>
                Carefully inspect the complete email address and domain. Ensure it
                matches the organization’s official domain.
              </p>
            </div>

            {/* Step 2 */}
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #86efac",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <h4 style={{ marginBottom: "8px", color: "#166534" }}>
                ✓ Step 2: Analyze the Content
              </h4>
              <p style={{ margin: 0, color: "#334155", fontSize: "0.95rem" }}>
                Look for warning signs such as urgency, threats, poor grammar, or
                requests that feel unusual.
              </p>
            </div>

            {/* Step 3 */}
            <div
              style={{
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <h4 style={{ marginBottom: "8px", color: "#9a3412" }}>
                ✓ Step 3: Inspect Links
              </h4>
              <p style={{ margin: 0, color: "#334155", fontSize: "0.95rem" }}>
                Hover over links (do not click) to see the actual destination URL before
                taking any action.
              </p>
            </div>

            {/* Step 4 */}
            <div
              style={{
                background: "#fdf4ff",
                border: "1px solid #e9d5ff",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <h4 style={{ marginBottom: "8px", color: "#6b21a8" }}>
                ✓ Step 4: Verify Independently
              </h4>
              <p style={{ margin: 0, color: "#334155", fontSize: "0.95rem" }}>
                Contact the organization directly using official contact information —
                never details provided in the suspicious email.
              </p>
            </div>
          </div>
        </div>

        {/*---------------7----------------7--------------------7----------------------7----------------------------------7-------------7*/}
        {/* ===== SECTION 7: WHAT TO DO IF YOU SUSPECT PHISHING ===== */}
        <div className="section">
          {/* Section title */}
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <span className="section-number">
              7
            </span>
            What to Do If You Suspect Phishing            </h2>

          {/* ===== IMMEDIATE ACTIONS (DANGER) ===== */}
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderLeft: "6px solid #dc2626",
              borderRadius: "14px",
              padding: "22px 24px",
              marginBottom: "24px",
            }}
          >
            <h4 style={{ marginBottom: "14px", color: "#b91c1c", fontSize: "1.1rem" }}>
              🚨 Immediate Actions — DO NOT:
            </h4>

            <ul
              style={{
                listStyle: "none",
                paddingLeft: 0,
                margin: 0,
                color: "#7f1d1d",
                fontSize: "0.95rem",
                lineHeight: "1.9",
              }}
            >
              <li>❌ <strong>Do NOT click any links</strong> or open attachments</li>
              <li>❌ <strong>Do NOT reply</strong> to the email</li>
              <li>❌ <strong>Do NOT provide any information</strong></li>
              <li>❌ <strong>Do NOT forward the email</strong> (except to IT/Security)</li>
            </ul>
          </div>

          {/* ===== WHAT YOU SHOULD DO (SUCCESS) ===== */}
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #86efac",
              borderLeft: "6px solid #16a34a",
              borderRadius: "14px",
              padding: "22px 24px",
              marginBottom: "28px",
            }}
          >
            <h4 style={{ marginBottom: "14px", color: "#166534", fontSize: "1.1rem" }}>
              ✅ What You SHOULD Do:
            </h4>

            <ol
              style={{
                marginLeft: "18px",
                marginBottom: 0,
                color: "#14532d",
                fontSize: "0.95rem",
                lineHeight: "1.9",
              }}
            >
              <li><strong>Report it immediately</strong> to your IT/Security team</li>
              <li><strong>Delete the email</strong> from inbox and trash</li>
              <li><strong>Mark as spam/phishing</strong> if your email system supports it</li>
              <li><strong>Warn colleagues</strong> if it appears to be a widespread attack</li>
              <li><strong>Document details</strong> (sender, subject, time received)</li>
            </ol>
          </div>

          {/* ===== IF YOU ALREADY CLICKED ===== */}
          <h3 style={{ color: "#7c2d12", marginBottom: "14px" }}>
            🆘 If You Already Clicked or Provided Information
          </h3>

          <div
            style={{
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              borderLeft: "6px solid #f97316",
              borderRadius: "14px",
              padding: "22px 24px",
              marginBottom: "26px",
            }}
          >
            <p style={{ marginBottom: "12px", color: "#7c2d12", fontWeight: "600" }}>
              Act quickly — time is critical:
            </p>

            <ol
              style={{
                marginLeft: "18px",
                marginBottom: 0,
                color: "#7c2d12",
                fontSize: "0.95rem",
                lineHeight: "1.9",
              }}
            >
              <li><strong>Report immediately to IT/Security</strong> (do not delay)</li>
              <li><strong>Change your password</strong> on all affected accounts</li>
              <li><strong>Disconnect from the network</strong> if malware was downloaded</li>
              <li><strong>Monitor accounts</strong> for unusual activity</li>
              <li><strong>Run antivirus scan</strong> if an attachment was opened</li>
              <li><strong>Alert your bank</strong> if financial information was shared</li>
            </ol>
          </div>

          {/* ===== REMINDER ===== */}
          <div
            style={{
              background: "#f8fafc",
              borderLeft: "5px solid #0ea5e9",
              borderRadius: "12px",
              padding: "18px 22px",
            }}
          >
            <p style={{ margin: 0, color: "#0f172a", fontSize: "1rem" }}>
              <strong>💡 Remember:</strong> It’s better to report a false alarm than to
              ignore a real threat. Your IT team would rather investigate 100 harmless
              emails than miss one real attack. <strong>When in doubt — report it!</strong>
            </p>
          </div>
        </div>
        {/*---------------8----------------8--------------------8----------------------8----------------------------------8-------------8*/}
        {/* ===== SECTION 8: REAL-WORLD PHISHING EXAMPLES ===== */}
        <div className="section">
          {/* Section title */}
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <span className="section-number">
              8
            </span>
            Real-World Phishing Examples
          </h2>

          {/* ================= EXAMPLE 1 ================= */}
          <h3 style={{ color: "#00266d", marginBottom: "10px" }}>
            Example 1: Fake Password Reset
          </h3>

          <div
            style={{
              background: "#f8fafc",
              borderRadius: "14px",
              padding: "20px 22px",
              boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
              marginBottom: "30px",
            }}
          >
            {/* Email Meta */}
            <div
              style={{
                background: "#ffffff",
                borderLeft: "4px solid #da4672",
                borderRadius: "8px",
                padding: "12px 14px",
                marginBottom: "14px",
                fontSize: "0.95rem",
              }}
            >
              <p style={{ margin: "0 0 6px", color: "#da4672" }}>
                <strong>From:</strong> noreply@account-security-microsoft.com 🚩
              </p>
              <p style={{ margin: 0 }}>
                <strong>Subject:</strong> Password Reset Required
              </p>
            </div>

            {/* Email Body */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "8px",
                padding: "14px",
                fontSize: "0.95rem",
                color: "#334155",
                lineHeight: "1.6",
                marginBottom: "16px",
              }}
            >
              <p>
                Your Microsoft account password will expire in <strong>24 hours</strong>.
                Click below to reset your password and maintain access to your account.
              </p>
              <p style={{ fontStyle: "italic", color: "#64748b" }}>
                [Reset Password Button]
              </p>
            </div>

            {/* Red Flags */}
            <div
              style={{
                background: "#fff1f2",
                borderLeft: "4px solid #da4672",
                borderRadius: "8px",
                padding: "12px 14px",
                color: "#7f1d1d",
                fontSize: "0.9rem",
              }}
            >
              <strong>🚩 Red Flags:</strong> Suspicious domain, false urgency, Microsoft
              does not force password resets via email links.
            </div>
          </div>

          {/* ================= EXAMPLE 2 ================= */}
          <h3 style={{ color: "#00266d", marginBottom: "10px" }}>
            Example 2: Fake Package Delivery
          </h3>

          <div
            style={{
              background: "#f8fafc",
              borderRadius: "14px",
              padding: "20px 22px",
              boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                borderLeft: "4px solid #da4672",
                borderRadius: "8px",
                padding: "12px 14px",
                marginBottom: "14px",
                fontSize: "0.95rem",
              }}
            >
              <p style={{ margin: "0 0 6px", color: "#da4672" }}>
                <strong>From:</strong> delivery@fedex-tracking.net 🚩
              </p>
              <p style={{ margin: 0 }}>
                <strong>Subject:</strong> Package Delivery Failed
              </p>
            </div>

            <div
              style={{
                background: "#ffffff",
                borderRadius: "8px",
                padding: "14px",
                fontSize: "0.95rem",
                color: "#334155",
                lineHeight: "1.6",
                marginBottom: "16px",
              }}
            >
              <p>
                We attempted to deliver your package but no one was available. Download
                the attached shipping label to schedule redelivery.
              </p>
              <p style={{ color: "#b91c1c", fontWeight: "600" }}>
                📎 Attachment: shipping_label.exe 🚩
              </p>
            </div>

            <div
              style={{
                background: "#fff1f2",
                borderLeft: "4px solid #da4672",
                borderRadius: "8px",
                padding: "12px 14px",
                color: "#7f1d1d",
                fontSize: "0.9rem",
              }}
            >
              <strong>🚩 Red Flags:</strong> Unexpected delivery, suspicious domain,
              executable attachment (.exe), you didn’t order anything.
            </div>
          </div>

          {/* ================= EXAMPLE 3 ================= */}
          <h3 style={{ color: "#00266d", marginBottom: "10px" }}>
            Example 3: CEO Fraud (Whaling)
          </h3>

          <div
            style={{
              background: "#f8fafc",
              borderRadius: "14px",
              padding: "20px 22px",
              boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                borderLeft: "4px solid #da4672",
                borderRadius: "8px",
                padding: "12px 14px",
                marginBottom: "14px",
                fontSize: "0.95rem",
              }}
            >
              <p style={{ margin: "0 0 6px", color: "#da4672" }}>
                <strong>From:</strong> John Smith &lt;jsmith.ceo@gmail.com&gt; 🚩
              </p>
              <p style={{ margin: 0 }}>
                <strong>Subject:</strong> Urgent: Wire Transfer Needed
              </p>
            </div>

            <div
              style={{
                background: "#ffffff",
                borderRadius: "8px",
                padding: "14px",
                fontSize: "0.95rem",
                color: "#334155",
                lineHeight: "1.6",
                marginBottom: "16px",
              }}
            >
              <p>
                I’m in a meeting and need you to process an{" "}
                <strong>urgent wire transfer</strong> to finalize a confidential
                acquisition. Please confirm discreetly.
              </p>
            </div>

            <div
              style={{
                background: "#fff1f2",
                borderLeft: "4px solid #da4672",
                borderRadius: "8px",
                padding: "12px 14px",
                color: "#7f1d1d",
                fontSize: "0.9rem",
              }}
            >
              <strong>🚩 Red Flags:</strong> CEO using personal email, urgency,
              confidentiality request, unusual payment method, no verification.
            </div>
          </div>
        </div>

        {/* ===== SECTION 9: MOBILE AND SMS PHISHING (SMISHING) ===== */}
        <div className="section">
          {/* Section title */}
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <span
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "#2563EB",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontFamily: "Space Mono, monospace",
              }}
            >
              9
            </span>
            Mobile and SMS Phishing (Smishing)
          </h2>

          <p style={{ color: "#475569", fontSize: "1rem", marginBottom: "24px" }}>
            Phishing isn’t limited to email. Attackers increasingly use{" "}
            <strong>text messages (smishing)</strong> to trick users into clicking
            malicious links or sharing sensitive information.
          </p>

          {/* ===== SMISHING EXAMPLES (SQUARE BOXES) ===== */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "18px",
              marginBottom: "28px",
            }}
          >
            {/* Fake Bank Alert */}
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                padding: "18px",
                boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
              }}
            >
              <h4 style={{ marginBottom: "8px", color: "#991b1b" }}>
                🏦 Fake Bank Alerts
              </h4>
              <p style={{ margin: 0, color: "#7f1d1d", fontSize: "0.95rem" }}>
                “Your account has been locked. Click here to verify:
                <strong> [malicious link]</strong>”
              </p>
            </div>

            {/* Delivery Scam */}
            <div
              style={{
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                padding: "18px",
                boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
              }}
            >
              <h4 style={{ marginBottom: "8px", color: "#9a3412" }}>
                📦 Delivery Scams
              </h4>
              <p style={{ margin: 0, color: "#7c2d12", fontSize: "0.95rem" }}>
                “Your package is waiting. Confirm delivery address:
                <strong> [malicious link]</strong>”
              </p>
            </div>

            {/* Prize Notification */}
            <div
              style={{
                background: "#fefce8",
                border: "1px solid #fde68a",
                padding: "18px",
                boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
              }}
            >
              <h4 style={{ marginBottom: "8px", color: "#854d0e" }}>
                🎁 Prize Notifications
              </h4>
              <p style={{ margin: 0, color: "#713f12", fontSize: "0.95rem" }}>
                “Congratulations! You’ve won a $500 gift card. Claim here:
                <strong> [malicious link]</strong>”
              </p>
            </div>

            {/* Payment Request */}
            <div
              style={{
                background: "#eef2ff",
                border: "1px solid #c7d2fe",
                padding: "18px",
                boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
              }}
            >
              <h4 style={{ marginBottom: "8px", color: "#3730a3" }}>
                💳 Payment Requests
              </h4>
              <p style={{ margin: 0, color: "#312e81", fontSize: "0.95rem" }}>
                “Payment failed. Update your billing information:
                <strong> [malicious link]</strong>”
              </p>
            </div>
          </div>

          {/* ===== PROTECTION TIPS ===== */}
          <div
            style={{
              background: "#f8fafc",
              borderLeft: "6px solid #0ea5e9",
              padding: "20px 22px",
              boxShadow: "0 6px 14px rgba(0,0,0,0.05)",
            }}
          >
            <p style={{ marginBottom: "12px", color: "#0f172a", fontWeight: "600" }}>
              🛡️ SMS Phishing Protection Tips
            </p>

            <ul
              style={{
                margin: 0,
                paddingLeft: "18px",
                color: "#334155",
                fontSize: "0.95rem",
                lineHeight: "1.8",
              }}
            >
              <li>Do not click links in unexpected text messages</li>
              <li>Verify by calling the organization using official contact details</li>
              <li>Banks and government agencies rarely send links via SMS</li>
              <li>Be cautious of shortened or unfamiliar URLs</li>
              <li>Delete suspicious messages immediately</li>
            </ul>
          </div>
        </div>
        {/* ===== SECTION 10: KEY TAKEAWAYS ===== */}
        <div className="section">
          {/* Section title */}
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <span className="section-number">
              10
            </span>
            Key Takeaways
          </h2>

          {/* ===== KEY POINTS ===== */}
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e5e7eb",
              padding: "22px 24px",
              boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
              marginBottom: "26px",
            }}
          >
            <h4 style={{ marginBottom: "14px", color: "#0f172a" }}>
              📌 Remember These Critical Points
            </h4>

            <ul
              style={{
                margin: 0,
                paddingLeft: "18px",
                color: "#334155",
                fontSize: "0.95rem",
                lineHeight: "1.9",
              }}
            >
              <li>Phishing is the <strong>#1 cyber attack method</strong> — everyone is a target</li>
              <li>Always <strong>verify before you click, download, or share</strong> information</li>
              <li>Trust your instincts — <strong>if something feels wrong, it probably is</strong></li>
              <li>When in doubt, <strong>contact IT/Security</strong> — false alarms are okay</li>
              <li><strong>Report suspected phishing immediately</strong> — early reporting prevents damage</li>
              <li>Never share <strong>passwords, OTPs, or sensitive data</strong> via email or text</li>
              <li>Slow down — attackers rely on <strong>urgency</strong> to bypass judgment</li>
              <li>Stay educated — <strong>phishing tactics constantly evolve</strong></li>
            </ul>
          </div>

          {/* ===== MOTIVATIONAL CLOSING ===== */}
          <div
            style={{
              background: "#f0fdf4",
              borderLeft: "6px solid #16a34a",
              padding: "22px 24px",
              boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
            }}
          >
            <h4 style={{ marginBottom: "10px", color: "#166534", fontSize: "1.125rem" }}>
              🎯 Your Role Is Critical!
            </h4>

            <p style={{ margin: 0, color: "#14532d", fontSize: "0.95rem", lineHeight: "1.7" }}>
              You are the <strong>human firewall</strong>. Technical security controls can
              only do so much — your awareness and vigilance are essential to protecting
              our organization from phishing attacks. Every suspicious email you report
              helps protect everyone.
            </p>
          </div>
        </div>

        {/*-------------------------------------------------------------------------------------------------------------------------------------------*/}
        {/* BOTTOM NAVIGATION */}

        <div className="navigation">
          <button
            className="nav-button prev"
            onClick={() => navigate("/Module1")}
          >
            <span className="icon">←</span>
            <span>Cyber Security Essentials</span>
          </button>

          <button
            className="nav-button next"
            onClick={() => navigate("/Quiz")}
          >
            <span>Continue to Quiz</span>
            <span className="icon">→</span>
          </button>
        </div>


      </div >
      {/* SCROLL TO TOP */}
      {
        showScrollTop && (
          <div
            className="scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ↑
          </div>
        )
      }

    </>
  );
}

console.log("Module2 Success")
export default Module2;
