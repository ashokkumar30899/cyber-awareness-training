import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Modules.css";

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
    <div className="module-container">
      <header className="module-header">
        <h1>🎣 Phishing Awareness Training</h1>
        <p className="subtitle">Module 2: Recognizing and Preventing Phishing Attacks</p>
        <span className="module-badge">Critical Security Training</span>
      </header>

      <div className="module-content">
        {/* SECTION 1 */}
        <section className="module-section">
          <h2><span className="section-num">1</span> What is Phishing?</h2>
          <p className="module-text">
            Phishing is a form of cyber attack in which attackers pretend to be trusted
            organizations or individuals in order to trick people into revealing
            sensitive or confidential information.
          </p>

          <div className="infobox">
            <p style={{ margin: 0 }}>
              <strong>Important:</strong> Phishing is responsible for a majority of
              successful cyber attacks globally and remains one of the most common entry
              points for security incidents.
            </p>
          </div>

          <h3 style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>Common targets of phishing attacks</h3>
          <ul className="module-list">
            <li>Account login credentials such as usernames and passwords</li>
            <li>Financial details including credit card or bank information</li>
            <li>One-Time Passwords (OTPs) and multi-factor authentication codes</li>
            <li>Personal identity information</li>
            <li>Internal or confidential company data</li>
          </ul>

          <h3 style={{ color: "var(--text-primary)", marginBottom: "1rem", marginTop: "2rem" }}>Why phishing is effective</h3>
          <ul className="module-list">
            <li>Relies on human behavior rather than technical vulnerabilities</li>
            <li>Uses urgency, fear, or trust to influence quick decisions</li>
            <li>Often appears legitimate and familiar to the recipient</li>
            <li>Continuously adapts to bypass security awareness and controls</li>
          </ul>
        </section>

        {/* SECTION 2 */}
        <section className="module-section">
          <h2><span className="section-num">2</span> Types of Phishing Attacks</h2>
          <div className="threat-grid">
            <div className="threat-card red">
              <span className="threat-icon">📧</span>
              <h4 className="threat-title">Email Phishing</h4>
              <p className="module-text" style={{ fontSize: "0.95rem" }}>
                Fraudulent emails pretending to be from trusted sources, asking you to
                click links or download malicious attachments.
              </p>
            </div>
            <div className="threat-card orange">
              <span className="threat-icon">💬</span>
              <h4 className="threat-title">Smishing (SMS)</h4>
              <p className="module-text" style={{ fontSize: "0.95rem" }}>
                Malicious text messages impersonating banks or couriers to steal personal information.
              </p>
            </div>
            <div className="threat-card blue">
              <span className="threat-icon">📞</span>
              <h4 className="threat-title">Vishing (Voice)</h4>
              <p className="module-text" style={{ fontSize: "0.95rem" }}>
                Phone calls pretending to be IT support or banks to trick victims into sharing data.
              </p>
            </div>
            <div className="threat-card purple">
              <span className="threat-icon">🎯</span>
              <h4 className="threat-title">Spear Phishing</h4>
              <p className="module-text" style={{ fontSize: "0.95rem" }}>
                Highly targeted attacks using personalized information to appear legitimate.
              </p>
            </div>
            <div className="threat-card" style={{ borderColor: "var(--text-primary)" }}>
              <span className="threat-icon">👔</span>
              <h4 className="threat-title">Whaling</h4>
              <p className="module-text" style={{ fontSize: "0.95rem" }}>
                Advanced phishing targeting senior executives to gain sensitive corporate data.
              </p>
            </div>
            <div className="threat-card blue">
              <span className="threat-icon">🔗</span>
              <h4 className="threat-title">Clone Phishing</h4>
              <p className="module-text" style={{ fontSize: "0.95rem" }}>
                Legitimate emails copied and resent with malicious links or attachments.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="module-section">
          <h2><span className="section-num">3</span> Red Flags: How to Identify Phishing Emails</h2>
          <p className="module-text">
            Learning to spot common warning signs is your first and most effective line
            of defense against phishing attacks.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>🚩 Sender & Content</h3>
              <ul className="module-list" style={{ fontSize: '0.95rem' }}>
                <li><strong>Unusual Address:</strong> Domain doesn't accurately match official ones</li>
                <li><strong>Generic Greeting:</strong> "Dear User" instead of your name</li>
                <li><strong>Urgency/Fear:</strong> Pressures you to act to avoid "suspension"</li>
                <li><strong>Poor Quality:</strong> Spelling errors and awkward phrasing</li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>🚩 Links & Files</h3>
              <ul className="module-list" style={{ fontSize: '0.95rem' }}>
                <li><strong>Mismatched URLs:</strong> Hovering shows a different destination</li>
                <li><strong>Hidden Links:</strong> Shortened URLs used to disguise sites</li>
                <li><strong>Unsafe Files:</strong> Executable or compressed attachments (.exe, .zip)</li>
              </ul>
            </div>
          </div>

          <div className="warning-box">
            <p style={{ margin: 0 }}>
              <strong>Important:</strong> Legitimate organizations never request passwords, OTPs, or sensitive data via email.
            </p>
          </div>
        </section>

        {/* SECTION 4 */}
        <section className="module-section">
          <h2><span className="section-num">4</span> Real-World Phishing Examples</h2>
          
          <h3 style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>Example 1: Phishing Email Breakdown</h3>
          <div className="email-mockup">
            <div className="email-header">
              <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>From</div>
              <div style={{ fontSize: "1rem", fontWeight: "600" }}>
                IT Support &lt;itsupport@rnicrosoft.com&gt;
                <span className="email-badge">Suspicious Sender</span>
              </div>
            </div>
            <div className="email-body">
              <p style={{ color: 'var(--text-primary)' }}><strong>Subject:</strong> <span style={{ color: "#dc2626", fontWeight: "700" }}>⚠️ Immediate Action Required: Account Suspension</span></p>
              <div className="email-content-box">
                <p style={{ color: 'var(--text-primary)' }}>
                  Dear User,<br/><br/>
                  We detected <strong>unusual login activity</strong> on your account.
                  Your access will be <strong style={{ color: "#dc2626" }}>suspended within 24 hours</strong> unless you verify your identity.
                </p>
              </div>
              <div style={{ textAlign: "center", margin: "30px 0" }}>
                <span className="email-btn">🔐 Verify Account Now</span>
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Regards, <br/><strong>IT Security Team</strong></p>
            </div>
          </div>

          <h3 style={{ color: "var(--text-primary)", marginBottom: "1rem", marginTop: "3rem" }}>Example 2: Fake Package Delivery</h3>
          <div className="example-box">
            <div className="example-header-line">
              <p style={{ margin: "0 0 6px", color: "#da4672" }}><strong>From:</strong> delivery@fedex-tracking.net 🚩</p>
              <p style={{ margin: 0, color: "var(--text-primary)" }}><strong>Subject:</strong> Package Delivery Failed</p>
            </div>
            <div className="example-body-line">
              <p className="module-text" style={{ fontSize: "0.95rem", marginBottom: "12px" }}>
                We attempted to deliver your package but no one was available. Download
                the attached shipping label to schedule redelivery.
              </p>
              <p style={{ color: "#b91c1c", fontWeight: "600" }}>📎 Attachment: shipping_label.exe 🚩</p>
            </div>
            <div className="example-footer-line">
              <strong>🚩 Red Flags:</strong> Unexpected delivery, suspicious domain, executable attachment (.exe), you didn’t order anything.
            </div>
          </div>

          <h3 style={{ color: "var(--text-primary)", marginBottom: "1rem", marginTop: "3rem" }}>Example 3: CEO Fraud (Whaling)</h3>
          <div className="example-box">
            <div className="example-header-line">
              <p style={{ margin: "0 0 6px", color: "#da4672" }}><strong>From:</strong> John Smith &lt;jsmith.ceo@gmail.com&gt; 🚩</p>
              <p style={{ margin: 0, color: "var(--text-primary)" }}><strong>Subject:</strong> Urgent: Wire Transfer Needed</p>
            </div>
            <div className="example-body-line">
              <p className="module-text" style={{ fontSize: "0.95rem" }}>
                I’m in a meeting and need you to process an <strong>urgent wire transfer</strong> to finalize a confidential acquisition. Please confirm discreetly.
              </p>
            </div>
            <div className="example-footer-line">
              <strong>🚩 Red Flags:</strong> CEO using personal email, urgency, confidentiality request, unusual payment method, no verification.
            </div>
          </div>
        </section>

        {/* SECTION 5 */}
        <section className="module-section">
          <h2><span className="section-num">5</span> Mobile and SMS Phishing (Smishing)</h2>
          <p className="module-text">
            Phishing isn’t limited to email. Attackers increasingly use <strong>text messages (smishing)</strong> to trick users into clicking malicious links or sharing sensitive information.
          </p>
          <div className="threat-grid">
            <div className="threat-card red">
              <span className="threat-icon">🏦</span>
              <h4 className="threat-title">Fake Bank Alerts</h4>
              <p className="module-text" style={{ fontSize: "0.95rem" }}>“Your account has been locked. Click here to verify: [malicious link]”</p>
            </div>
            <div className="threat-card orange">
              <span className="threat-icon">📦</span>
              <h4 className="threat-title">Delivery Scams</h4>
              <p className="module-text" style={{ fontSize: "0.95rem" }}>“Your package is waiting. Confirm delivery address: [malicious link]”</p>
            </div>
            <div className="threat-card yellow">
              <span className="threat-icon">🎁</span>
              <h4 className="threat-title">Prize Notifications</h4>
              <p className="module-text" style={{ fontSize: "0.95rem" }}>“Congratulations! You’ve won a $500 gift card. Claim here: [malicious link]”</p>
            </div>
            <div className="threat-card blue">
              <span className="threat-icon">💳</span>
              <h4 className="threat-title">Payment Requests</h4>
              <p className="module-text" style={{ fontSize: "0.95rem" }}>“Payment failed. Update your billing information: [malicious link]”</p>
            </div>
          </div>
          <div className="infobox" style={{ borderLeftColor: "#0ea5e9" }}>
            <p className="module-text" style={{ marginBottom: "12px", color: "var(--text-primary)", fontWeight: "600" }}>🛡️ SMS Phishing Protection Tips</p>
            <ul className="module-list" style={{ margin: 0 }}>
              <li>Do not click links in unexpected text messages</li>
              <li>Verify by calling the organization using official contact details</li>
              <li>Banks and government agencies rarely send links via SMS</li>
              <li>Delete suspicious messages immediately</li>
            </ul>
          </div>
        </section>

        {/* SECTION 6 */}
        <section className="module-section">
          <h2><span className="section-num">6</span> Social Engineering Tactics</h2>
          <div className="threat-grid">
            <div className="threat-card red">
              <span className="threat-icon">⏰</span>
              <h4 className="threat-title">Urgency</h4>
              <p className="module-text" style={{ fontSize: '0.9rem' }}>"Your account will be deleted in 2 hours!"</p>
            </div>
            <div className="threat-card purple">
              <span className="threat-icon">👔</span>
              <h4 className="threat-title">Authority</h4>
              <p className="module-text" style={{ fontSize: '0.9rem' }}>"This is the CEO. I need this done now."</p>
            </div>
            <div className="threat-card green">
              <span className="threat-icon">🤝</span>
              <h4 className="threat-title">Trust</h4>
              <p className="module-text" style={{ fontSize: '0.9rem' }}>Impersonating your bank or a known service.</p>
            </div>
            <div className="threat-card yellow">
              <span className="threat-icon">💰</span>
              <h4 className="threat-title">Greed</h4>
              <p className="module-text" style={{ fontSize: '0.9rem' }}>"You've won $10,000! Claim now!"</p>
            </div>
          </div>
        </section>

        {/* SECTION 7 */}
        <section className="module-section">
          <h2><span className="section-num">7</span> What to Do If You Suspect Phishing</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="danger-box" style={{ margin: 0 }}>
              <h4 style={{ color: 'inherit', marginBottom: '1rem' }}>🚨 DO NOT:</h4>
              <ul className="module-list" style={{ color: 'inherit' }}>
                <li>Do NOT click any links</li>
                <li>Do NOT open attachments</li>
                <li>Do NOT reply or provide info</li>
              </ul>
            </div>
            <div className="infobox" style={{ margin: 0, borderLeftColor: '#16a34a' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>✅ DO:</h4>
              <ul className="module-list">
                <li>Report it to IT/Security immediately</li>
                <li>Delete the email or message</li>
                <li>Mark as spam in your system</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8 */}
        <section className="module-section">
          <h2><span className="section-num">8</span> Key Takeaways</h2>
          <div className="key-points">
            <h4>Your Checklist:</h4>
            <ul className="module-list">
              <li>Phishing is the #1 cyber attack method — stay alert!</li>
              <li>Always verify before you click, download, or share.</li>
              <li>Trust your instincts — if it feels wrong, report it.</li>
              <li>Never share passwords or MFA codes via email or text.</li>
              <li><strong>You are the human firewall.</strong></li>
            </ul>
          </div>
        </section>
      </div>

      <footer className="navigation">
        <button className="nav-button prev" onClick={() => navigate("/module1")}>
          <span className="icon">←</span>
          <span>Cyber Security Essentials</span>
        </button>
        <button className="nav-button next" onClick={() => navigate("/quiz")}>
          <span>Continue to Quiz</span>
          <span className="icon">→</span>
        </button>
      </footer>

      {showScrollTop && (
        <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ↑
        </button>
      )}
    </div>
  );
}

export default Module2;
