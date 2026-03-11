import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Modules.css";

function Module1() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="module-container">
      <header className="module-header">
        <h1>🔐 Cybersecurity Awareness Training</h1>
        <p className="subtitle">Module 1: Introduction to Cybersecurity</p>
        <span className="module-badge">Essential Training</span>
      </header>

      <div className="module-content">
        {/* ===== SECTION 1 ===== */}
        <section className="module-section">
          <h2><span className="section-num">1</span> What Is Cybersecurity?</h2>
          <p className="module-text">
            Cybersecurity refers to the practice of protecting systems, networks,
            applications, and digital data from unauthorized access, misuse,
            disruption, or destruction. In modern organizations, most business
            activities depend on technology, making cybersecurity essential for
            smooth and secure operations.
          </p>
          <p className="module-text">
            Cyber threats, commonly known as <strong>cyber attacks</strong>, are
            designed to steal sensitive information, disrupt services, gain
            unauthorized access, or cause financial and reputational damage.
          </p>
          <p className="module-text">
            At the core of cybersecurity is the <strong>CIA Triad</strong>:
          </p>
          <ul className="module-list">
            <li><strong>Confidentiality</strong> – Ensuring sensitive information is accessed only by authorized users.</li>
            <li><strong>Integrity</strong> – Ensuring data remains accurate and is not altered without authorization.</li>
            <li><strong>Availability</strong> – Ensuring systems and data are accessible when required for business operations.</li>
          </ul>
          <p className="module-text">
            Cybersecurity goes beyond protecting against hackers. It also includes
            preventing accidental data exposure, misuse of access, weak passwords,
            and human errors.
          </p>
          <div className="highlight-box">
            <p className="module-text" style={{ marginBottom: 0 }}>
              <strong>Key point:</strong> Cybersecurity is not just an IT function.
              Every employee who uses company systems plays a role in keeping them
              secure.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="module-section">
          <h2><span className="section-num">2</span> Why Cybersecurity Matters to Every Employee</h2>
          <p className="module-text">
            Modern organizations rely heavily on digital systems such as email,
            cloud applications, and collaboration tools. Because employees interact
            with these systems daily, cyber attacks increasingly target people, not
            just technology.
          </p>
          <p className="module-text">
            Attackers often focus on human behavior by exploiting trust, urgency,
            or lack of awareness rather than attempting to bypass technical security
            controls.
          </p>
          <p className="module-text"><strong>Key reasons cybersecurity matters to employees:</strong></p>
          <ul className="module-list">
            <li>Employees are often the first point of contact for external emails and links</li>
            <li>Simple human mistakes are a common cause of security incidents</li>
          </ul>
          <p className="module-text">Even a single mistake can result in:</p>
          <ul className="module-list">
            <li>Data breaches</li>
            <li>Financial loss</li>
            <li>Regulatory or compliance issues</li>
            <li>Loss of customer trust</li>
          </ul>
          <div className="warning-box">
            <p style={{ margin: 0 }}>
              Most cyber incidents begin with simple actions such as clicking a
              malicious link, opening an unsafe attachment, or unknowingly sharing
              credentials.
            </p>
          </div>
          <p className="module-text">
            Employee awareness helps reduce risk and allows security teams to respond
            quickly before incidents escalate.
          </p>
        </section>

        {/* Section 3 */}
        <section className="module-section">
          <h2><span className="section-num">3</span> Common Types of Cyber Threats</h2>
          <p className="module-text">
            Cyber threats are methods used by attackers to compromise systems, steal
            sensitive information, or disrupt business operations. Below are the most
            common cyber threats that employees should be aware of.
          </p>
          
          <div className="threat-grid">
            <div className="threat-card">
              <span className="threat-icon">🎣</span>
              <h4 className="threat-title">Phishing Attacks</h4>
              <p className="module-text" style={{ fontSize: "0.95rem" }}>
                Attempts to trick users into revealing sensitive information such as
                passwords, OTPs, or financial details.
              </p>
            </div>
            <div className="threat-card">
              <span className="threat-icon">🦠</span>
              <h4 className="threat-title">Malware</h4>
              <p className="module-text" style={{ fontSize: "0.95rem" }}>
                Malicious software designed to damage systems or gain unauthorized access
                to devices and data.
              </p>
            </div>
            <div className="threat-card">
              <span className="threat-icon">🔒</span>
              <h4 className="threat-title">Ransomware</h4>
              <p className="module-text" style={{ fontSize: "0.95rem" }}>
                Encrypts files and demands payment to restore access to systems or data.
              </p>
            </div>
            <div className="threat-card">
              <span className="threat-icon">🔑</span>
              <h4 className="threat-title">Credential Theft</h4>
              <p className="module-text" style={{ fontSize: "0.95rem" }}>
                Attackers steal usernames and passwords to access systems illegally.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>3.1 Phishing Attacks</h3>
            <p className="module-text">
              Phishing is a social engineering attack where attackers impersonate
              trusted sources to deceive users into sharing confidential information
              or performing unsafe actions.
            </p>
            <ul className="module-list">
              <li>Often delivered through emails, messages, or fake websites</li>
              <li>Uses urgency, fear, or trust to pressure users</li>
              <li>Common entry point for malware and ransomware attacks</li>
            </ul>
            <div className="danger-box">
              ⚠️ Phishing is the most common cyber attack and a leading cause of data breaches worldwide.
            </div>

            <h3 style={{ color: 'var(--text-primary)', margin: '2rem 0 1rem' }}>3.2 Malware</h3>
            <p className="module-text">
              Malware refers to any software intentionally designed to harm systems,
              spy on users, or gain unauthorized access to data.
            </p>
            <ul className="module-list">
              <li>Includes viruses, trojans, spyware, and ransomware</li>
              <li>Can slow systems, steal data, or open backdoors for attackers</li>
              <li>Often hidden inside attachments, downloads, or infected websites</li>
            </ul>

            <h3 style={{ color: 'var(--text-primary)', margin: '2rem 0 1rem' }}>3.3 Ransomware</h3>
            <p className="module-text">
              Ransomware is a severe type of malware that encrypts files and prevents
              access until a ransom is paid.
            </p>
            <ul className="module-list">
              <li>Can stop business operations completely</li>
              <li>May result in permanent data loss</li>
              <li><strong>Paying the ransom does not guarantee recovery</strong></li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section className="module-section">
          <h2><span className="section-num">4</span> How Cyber Attacks Usually Start</h2>
          <div className="highlight-box">
            <p className="module-text" style={{ marginBottom: 0 }}>
              <strong>
                Most cyber attacks do not begin with hacking servers or breaking
                firewalls. They begin with user interaction.
              </strong>
            </p>
          </div>
          <p className="module-text">
            Attackers often look for simple ways to gain initial access by exploiting
            everyday actions performed by users during normal work activities.
          </p>
          <p className="module-text"><strong>Common entry points include:</strong></p>
          <ul className="module-list">
            <li>Clicking suspicious or unexpected links in emails or messages</li>
            <li>Opening unknown or unverified email attachments</li>
            <li>Reusing weak passwords across multiple systems</li>
            <li>Ignoring browser or security warning messages</li>
            <li>Installing unapproved or unauthorized software</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="module-section">
          <h2><span className="section-num">5</span> Shared Responsibility Model</h2>
          <p className="module-text">
            Cybersecurity is a shared responsibility. Both the organization and its
            employees play important roles in protecting systems, data, and business
            operations.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>Organization:</h3>
              <ul className="module-list">
                <li>Provides secure and reliable IT systems</li>
                <li>Implements technical security controls</li>
                <li>Establishes security policies</li>
                <li>Detects and responds to incidents</li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>Employees:</h3>
              <ul className="module-list">
                <li>Follow company security policies</li>
                <li>Remain alert to suspicious activities</li>
                <li>Protect passwords and credentials</li>
                <li>Report security incidents promptly</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 9 Summary */}
        <section className="module-section">
          <h2><span className="section-num">6</span> Key Takeaways</h2>
          <div className="key-points">
            <h4>Remember These Points:</h4>
            <ul className="module-list">
              <li>Cybersecurity affects everyone in the organization</li>
              <li>Most cyber attacks target people, not just systems</li>
              <li>Security awareness significantly reduces risk</li>
              <li>Early reporting helps prevent major damage</li>
              <li>Cybersecurity is a shared responsibility</li>
            </ul>
          </div>
        </section>
      </div>

      <footer className="navigation">
        <button className="nav-button prev" onClick={() => navigate("/")}>
          <span className="icon">←</span>
          <span>Home Page</span>
        </button>
        <button className="nav-button next" onClick={() => navigate("/module2")}>
          <span>Phishing Awareness Training</span>
          <span className="icon">→</span>
        </button>
      </footer>
    </div>
  );
}

export default Module1;
