import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



function Module1() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ===== STYLES (UNCHANGED – YOUR CSS) ===== */}
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

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Work Sans', sans-serif;
          line-height: 1.7;
          color: var(--text-dark);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 2rem 1rem;
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
          background: var(--bg-card);
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          animation: slideIn 0.6s ease-out;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .header {
          background: linear-gradient(135deg, var(--primary) 0%, #1E3A5F 100%);
          color: white;
          padding: 3rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .header-content {
          position: relative;
          z-index: 1;
        }

        .header h1 {
          font-family: 'Space Mono', monospace;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
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

        .header .subtitle {
          font-size: 1.25rem;
          opacity: 0.95;
          font-weight: 300;
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

        .content {
          padding: 3rem 2.5rem;
        }

        .section {
          margin-bottom: 3rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .section-number {
          display: inline-block;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--secondary), #00A8CC);
          color: var(--primary);
          border-radius: 50%;
          text-align: center;
          line-height: 40px;
          font-weight: 700;
          font-family: 'Space Mono', monospace;
          margin-right: 1rem;
        }

        h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
        }

        p {
          margin-bottom: 1.25rem;
          font-size: 1.0625rem;
        }

        ul {
          list-style: none;
          margin-bottom: 1.5rem;
        }

        ul li {
          padding-left: 2rem;
          margin-bottom: 0.75rem;
          position: relative;
        }

        ul li::before {
          content: '▸';
          position: absolute;
          left: 0.5rem;
          color: var(--secondary);
          font-weight: bold;
        }

        .highlight-box {
          background: linear-gradient(135deg, #E0F2FE 0%, #DBEAFE 100%);
          border-left: 5px solid var(--secondary);
          padding: 1.5rem;
          margin: 1.5rem 0;
          border-radius: 8px;
        }
      `}</style>

      {/* ===== PAGE CONTENT ===== */}
      <div className="container">
        <div className="header">
          <div className="header-content">
            <h1>🔐 Cybersecurity Awareness Training</h1>
            <p className="subtitle">Module 1: Introduction to Cybersecurity</p>
            <span className="module-badge">Essential Training</span>
          </div>
        </div>

        <div className="content">

          {/* ===== SECTION 1 ===== */}

          <div className="section">
            <h2>
              <span className="section-number">1</span>
              What Is Cybersecurity?
            </h2>

            <p>
              Cybersecurity refers to the practice of protecting systems, networks,
              applications, and digital data from unauthorized access, misuse,
              disruption, or destruction. In modern organizations, most business
              activities depend on technology, making cybersecurity essential for
              smooth and secure operations.
            </p>

            <p>
              Cyber threats, commonly known as <strong>cyber attacks</strong>, are
              designed to steal sensitive information, disrupt services, gain
              unauthorized access, or cause financial and reputational damage.
            </p>

            <p>
              At the core of cybersecurity is the <strong>CIA Triad</strong>:
            </p>

            <ul>
              <li>
                <strong>Confidentiality</strong> – Ensuring sensitive information is
                accessed only by authorized users.
              </li>
              <li>
                <strong>Integrity</strong> – Ensuring data remains accurate and is not
                altered without authorization.
              </li>
              <li>
                <strong>Availability</strong> – Ensuring systems and data are accessible
                when required for business operations.
              </li>
            </ul>

            <p>
              Cybersecurity goes beyond protecting against hackers. It also includes
              preventing accidental data exposure, misuse of access, weak passwords,
              and human errors.
            </p>

            <div className="highlight-box">
              <p>
                <strong>Key point:</strong> Cybersecurity is not just an IT function.
                Every employee who uses company systems plays a role in keeping them
                secure.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="section">
            <h2>
              <span className="section-number">2</span>
              Why Cybersecurity Matters to Every Employee
            </h2>

            <p>
              Modern organizations rely heavily on digital systems such as email,
              cloud applications, and collaboration tools. Because employees interact
              with these systems daily, cyber attacks increasingly target people, not
              just technology.
            </p>

            <p>
              Attackers often focus on human behavior by exploiting trust, urgency,
              or lack of awareness rather than attempting to bypass technical security
              controls.
            </p>

            <p>
              <strong>Key reasons cybersecurity matters to employees:</strong>
            </p>

            <ul>
              <li>Employees are often the first point of contact for external emails and links</li>
              <li>Simple human mistakes are a common cause of security incidents</li>
            </ul>

            <p>
              Even a single mistake can result in:
            </p>

            <ul className="sub-list">
              <li>Data breaches</li>
              <li>Financial loss</li>
              <li>Regulatory or compliance issues</li>
              <li>Loss of customer trust</li>
            </ul>

            <div className="warning-box">
              <p>
                Most cyber incidents begin with simple actions such as clicking a
                malicious link, opening an unsafe attachment, or unknowingly sharing
                credentials.
              </p>
            </div>

            <p>
              Employee awareness helps reduce risk and allows security teams to respond
              quickly before incidents escalate.
            </p>
          </div>


          {/* Section 3 */}
          <div className="section">
            <h2>
              <span className="section-number">3</span>
              Common Types of Cyber Threats
            </h2>

            <p>
              Cyber threats are methods used by attackers to compromise systems, steal
              sensitive information, or disrupt business operations. Below are the most
              common cyber threats that employees should be aware of.
            </p>
            {/* ===== BOX-STYLED THREAT TYPES (LIGHT THEME, INLINE) ===== */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "24px",
                marginTop: "30px",
              }}
            >
              {/* Phishing */}
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
                    "0 14px 32px rgba(56,189,248,0.25)";
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
                    color: "#0284c7",
                  }}
                >
                  🎣
                </div>
                <h4 style={{ fontSize: "1.1rem", marginBottom: "10px", color: "#0f172a" }}>
                  Phishing Attacks
                </h4>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#475569" }}>
                  Attempts to trick users into revealing sensitive information such as
                  passwords, OTPs, or financial details.
                </p>
              </div>

              {/* Malware */}
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
                    "0 14px 32px rgba(34,197,94,0.25)";
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
                    background: "#dcfce7",
                    color: "#15803d",
                  }}
                >
                  🦠
                </div>
                <h4 style={{ fontSize: "1.1rem", marginBottom: "10px", color: "#0f172a" }}>
                  Malware
                </h4>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#475569" }}>
                  Malicious software designed to damage systems or gain unauthorized access
                  to devices and data.
                </p>
              </div>

              {/* Ransomware */}
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
                    "0 14px 32px rgba(249,115,22,0.25)";
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
                    background: "#ffedd5",
                    color: "#c2410c",
                  }}
                >
                  🔒
                </div>
                <h4 style={{ fontSize: "1.1rem", marginBottom: "10px", color: "#0f172a" }}>
                  Ransomware
                </h4>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#475569" }}>
                  Encrypts files and demands payment to restore access to systems or data.
                </p>
              </div>

              {/* Credential Theft */}
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
                  🔑
                </div>
                <h4 style={{ fontSize: "1.1rem", marginBottom: "10px", color: "#0f172a" }}>
                  Credential Theft
                </h4>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#475569" }}>
                  Attackers steal usernames and passwords to access systems illegally.
                </p>
              </div>
            </div>


            {/* ===== DETAILED EXPLANATIONS ===== */}

            <h3>3.1 Phishing Attacks</h3>
            <p>
              Phishing is a social engineering attack where attackers impersonate
              trusted sources to deceive users into sharing confidential information
              or performing unsafe actions.
            </p>

            <ul>
              <li>Often delivered through emails, messages, or fake websites</li>
              <li>Uses urgency, fear, or trust to pressure users</li>
              <li>Common entry point for malware and ransomware attacks</li>
            </ul>

            <div className="danger-box">
              ⚠️ Phishing is the most common cyber attack and a leading cause of data
              breaches worldwide.
            </div>

            <h3>3.2 Malware</h3>
            <p>
              Malware refers to any software intentionally designed to harm systems,
              spy on users, or gain unauthorized access to data.
            </p>

            <ul>
              <li>Includes viruses, trojans, spyware, and ransomware</li>
              <li>Can slow systems, steal data, or open backdoors for attackers</li>
              <li>Often hidden inside attachments, downloads, or infected websites</li>
            </ul>

            <h3>3.3 Ransomware</h3>
            <p>
              Ransomware is a severe type of malware that encrypts files and prevents
              access until a ransom is paid.
            </p>

            <ul>
              <li>Can stop business operations completely</li>
              <li>May result in permanent data loss</li>
              <li><strong>Paying the ransom does not guarantee recovery</strong></li>
            </ul>

            <h3>3.4 Credential Theft</h3>
            <p>
              Credential theft occurs when attackers obtain usernames and passwords
              and use them to access systems as legitimate users.
            </p>

            <ul>
              <li>Often caused by phishing or fake login pages</li>
              <li>Enabled by weak or reused passwords</li>
              <li>Can lead to unauthorized access across multiple systems</li>
            </ul>
          </div>
        </div>



        {/* Section 4 */}
        <div className="section">
          <h2>
            <span className="section-number">4</span>
            How Cyber Attacks Usually Start
          </h2>

          <div className="highlight-box">
            <p>
              <strong>
                Most cyber attacks do not begin with hacking servers or breaking
                firewalls. They begin with user interaction.
              </strong>
            </p>
          </div>

          <p>
            Attackers often look for simple ways to gain initial access by exploiting
            everyday actions performed by users during normal work activities.
          </p>

          <p><strong>Common entry points include:</strong></p>
          <ul>
            <li>Clicking suspicious or unexpected links in emails or messages</li>
            <li>Opening unknown or unverified email attachments</li>
            <li>Reusing weak passwords across multiple systems</li>
            <li>Ignoring browser or security warning messages</li>
            <li>Installing unapproved or unauthorized software</li>
          </ul>

          <p>
            Rather than using advanced technical methods, attackers commonly rely on
            psychological manipulation to influence user behavior.
          </p>

          <p><strong>Attackers often rely on:</strong></p>
          <ul>
            <li>Urgency – creating pressure to act quickly</li>
            <li>Fear – warning of account suspension or consequences</li>
            <li>Curiosity – offering unexpected rewards or information</li>
            <li>Trust – impersonating colleagues, managers, or known organizations</li>
          </ul>

          <p>
            Being aware of these tactics helps employees pause, verify, and respond
            safely instead of reacting impulsively.
          </p>
        </div>


        {/* Section 5 */}
        <div className="section">
          <h2>
            <span className="section-number">5</span>
            Shared Responsibility Model
          </h2>

          <p>
            Cybersecurity is a shared responsibility. Both the organization and its
            employees play important roles in protecting systems, data, and business
            operations.
          </p>

          <h3>Organization:</h3>
          <ul>
            <li>Provides secure and reliable IT systems</li>
            <li>Implements technical security controls and monitoring tools</li>
            <li>Establishes security policies and procedures</li>
            <li>Detects, investigates, and responds to security incidents</li>
          </ul>

          <h3>Employees:</h3>
          <ul>
            <li>Follow company security policies and guidelines</li>
            <li>Remain alert to suspicious emails, links, and activities</li>
            <li>Protect usernames, passwords, and authentication codes</li>
            <li>Report security incidents or concerns promptly</li>
          </ul>

          <div className="warning-box">
            <p>
              <strong>
                Even the strongest security systems can be compromised if users are
                not cautious or security practices are ignored.
              </strong>
            </p>
          </div>
        </div>

        {/* Section 6 */}
        <div className="section">
          <h2>
            <span className="section-number">6</span>
            Your Role as an Employee
          </h2>

          <p>
            Every employee plays a direct role in maintaining a secure work
            environment. Small actions taken consistently can significantly reduce
            cybersecurity risks.
          </p>

          <p><strong>Employees are expected to:</strong></p>
          <ul>
            <li>Be cautious when opening emails, links, and attachments</li>
            <li>Protect passwords and multi-factor authentication (MFA) codes</li>
            <li>Lock systems and devices when not in use</li>
            <li>Follow company security policies and procedures</li>
            <li>Report suspicious activity or potential incidents immediately</li>
          </ul>

          <div className="highlight-box">
            <p>
              <strong>
                You do not need to be a cybersecurity expert. Awareness, caution, and
                responsible behavior are enough to make a strong impact.
              </strong>
            </p>
          </div>
        </div>


        {/* Section 7 */}
        <div className="section">
          <h2>
            <span className="section-number">7</span>
            Real-World Impact of Security Incidents
          </h2>

          <p>
            Security incidents can have serious and long-lasting effects on an
            organization, its employees, and its customers.
          </p>

          <p><strong>Common impacts include:</strong></p>
          <ul>
            <li>Business downtime and disruption of daily operations</li>
            <li>Legal, regulatory, and compliance consequences</li>
            <li>Loss or exposure of sensitive and intellectual property</li>
            <li>Damage to brand reputation and public trust</li>
            <li>Loss of customer confidence and business opportunities</li>
          </ul>

          <div className="warning-box">
            <p>
              <em>
                Many major security breaches occurred due to simple human mistakes,
                not sophisticated or complex hacking techniques.
              </em>
            </p>
          </div>
        </div>

        {/* Section 8 */}
        <div className="section">
          <h2>
            <span className="section-number">8</span>
            Security Awareness Is an Ongoing Process
          </h2>

          <p>
            Cyber threats evolve continuously as attackers develop new techniques
            and methods. Because of this, security awareness is not a one-time
            activity but an ongoing responsibility.
          </p>

          <p><strong>This training is designed to:</strong></p>
          <ul>
            <li>Build strong foundational cybersecurity knowledge</li>
            <li>Help employees recognize common and emerging threats</li>
            <li>Encourage safe and responsible digital behavior</li>
            <li>Create and maintain a security-first workplace culture</li>
          </ul>

          <p>
            Regular awareness and training help ensure that employees remain alert,
            informed, and prepared to respond to potential security risks.
          </p>
        </div>


        {/* Section 9 */}
        <div className="section">
          <h2>
            <span className="section-number">9</span>
            Key Takeaways
          </h2>

          <div className="key-points">
            <h4>Remember These Points:</h4>
            <ul>
              <li>Cybersecurity affects everyone in the organization</li>
              <li>Most cyber attacks target people, not just systems</li>
              <li>Security awareness significantly reduces risk</li>
              <li>Early reporting helps prevent major damage</li>
              <li>Cybersecurity is a shared responsibility</li>
            </ul>
          </div>
        </div>

        {/* Section 10 */}
        <div className="section">
          <h2>
            <span className="section-number">10</span>
            What’s Next?
          </h2>

          <p>In the next module, you will learn:</p>

          <ul>
            <li>What phishing is and why it is dangerous</li>
            <li>How to identify phishing emails and messages</li>
            <li>Common social engineering techniques used by attackers</li>
            <li>What actions to take if you suspect phishing</li>
          </ul>
        </div>
        <div className="navigation">
          <button
            className="nav-button prev"
            onClick={() => navigate("/")}
          >
            <span className="icon">←</span>
            <span>Home Page</span>
          </button>

          <button
            className="nav-button next"
            onClick={() => navigate("/module2")}
          >
            <span>Phishing Awareness Training</span>
            <span className="icon">→</span>
          </button>
        </div>



      </div>
    </>
  );
}

console.log("Module1 Success")

export default Module1;
