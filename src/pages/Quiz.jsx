import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PASS_PERCENTAGE = 80;

/* ===== QUESTIONS ===== */
const QUESTIONS = [
  {
    q: "What is the primary goal of cybersecurity?",
    options: [
      "Improve system performance",
      "Protect systems, networks, and data",
      "Monitor employee activity",
      "Increase business revenue",
    ],
    answer: "Protect systems, networks, and data",
  },
  {
    q: "Why are employees considered the first line of defense?",
    options: [
      "They manage infrastructure",
      "Attackers exploit human error",
      "They write security policies",
      "They deploy security tools",
    ],
    answer: "Attackers exploit human error",
  },
  {
    q: "What is phishing?",
    options: [
      "A firewall technology",
      "A malware scanning tool",
      "A social engineering attack",
      "A network protocol",
    ],
    answer: "A social engineering attack",
  },
  {
    q: "Which action commonly starts a cyber attack?",
    options: [
      "Installing security updates",
      "Clicking suspicious links",
      "Using multi-factor authentication",
      "Locking the workstation",
    ],
    answer: "Clicking suspicious links",
  },
  {
    q: "Which information is commonly targeted by phishing?",
    options: [
      "Public announcements",
      "Passwords and one-time codes",
      "Company documentation",
      "System configuration files",
    ],
    answer: "Passwords and one-time codes",
  },
  {
    q: "What should you do if you suspect a phishing email?",
    options: [
      "Ignore the message",
      "Reply to the sender",
      "Report to IT or Security",
      "Forward to colleagues",
    ],
    answer: "Report to IT or Security",
  },
  {
    q: "What does ransomware do?",
    options: [
      "Deletes email messages",
      "Encrypts files and demands payment",
      "Improves file encryption",
      "Creates system backups",
    ],
    answer: "Encrypts files and demands payment",
  },
  {
    q: "Which file type is most dangerous from unknown senders?",
    options: [".pdf document", ".jpg image", ".exe executable file", ".txt text file"],
    answer: ".exe executable file",
  },
  {
    q: "What is credential theft?",
    options: [
      "Stealing company devices",
      "Stealing usernames and passwords",
      "Deleting user accounts",
      "Blocking system access",
    ],
    answer: "Stealing usernames and passwords",
  },
  {
    q: "What tactic do attackers use to rush victims?",
    options: [
      "Curiosity triggers",
      "Urgency and pressure",
      "Extended training",
      "Patience techniques",
    ],
    answer: "Urgency and pressure",
  },
  {
    q: "Which is a safe cybersecurity practice?",
    options: [
      "Reusing passwords everywhere",
      "Clicking unknown links",
      "Verifying unexpected requests",
      "Sharing OTPs over email",
    ],
    answer: "Verifying unexpected requests",
  },
  {
    q: "Which is an employee responsibility?",
    options: [
      "Configuring firewalls",
      "Performing threat hunting",
      "Reporting suspicious activity",
      "Applying server patches",
    ],
    answer: "Reporting suspicious activity",
  },
  {
    q: "What does MFA primarily protect against?",
    options: [
      "System crashes",
      "Password compromise",
      "Network congestion",
      "Spam messages",
    ],
    answer: "Password compromise",
  },
  {
    q: "Which of the following is a red flag in a phishing email?",
    options: [
      "Personalized greeting with name",
      "Urgent action demanded immediately",
      "Official company email domain",
      "Clear and professional language",
    ],
    answer: "Urgent action demanded immediately",
  },
  {
    q: "What should you do if you already clicked a phishing link?",
    options: [
      "Ignore and continue work",
      "Report immediately to IT",
      "Wait and observe",
      "Restart the system",
    ],
    answer: "Report immediately to IT",
  },
];

console.log("quiz success")

// Shuffle helper
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function Assessment() {
  const navigate = useNavigate(); // ✅ CORRECT PLACE

  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const shuffled = shuffle(QUESTIONS).map((q) => ({
      ...q,
      options: shuffle(q.options),
    }));
    setQuestions(shuffled);
  }, []);

  const handleChange = (qIndex, value) => {
    setResponses({ ...responses, [qIndex]: value });
  };

  const allAnswered = questions.length === Object.keys(responses).length;

  const handleSubmit = () => {
    let correct = 0;

    questions.forEach((q, i) => {
      if (responses[i] === q.answer) correct++;
    });

    const totalQuestions = questions.length;
    const percentage = Math.round((correct / totalQuestions) * 100);

    navigate("/result", {
      state: {
        correctAnswers: correct,
        wrongAnswers: totalQuestions - correct,
        totalQuestions,
        percentage,
      },
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>📝 Cybersecurity Assessment</h1>
          <p>Mandatory Knowledge Check</p>
        </div>

        <div style={styles.content}>
          {questions.map((q, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.questionHeader}>
                <span style={styles.qBadge}>{i + 1}</span>
                <h3 style={styles.question}>{q.q}</h3>
              </div>

              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  style={{
                    ...styles.option,
                    background: responses[i] === opt ? "#e0f2fe" : "#ffffff",
                  }}
                >
                  <input
                    type="radio"
                    name={`question-${i}`}
                    checked={responses[i] === opt}
                    onChange={() => handleChange(i, opt)}
                    style={{ marginRight: "12px" }}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}

          <button
            style={{
              ...styles.submit,
              opacity: allAnswered ? 1 : 0.5,
              cursor: allAnswered ? "pointer" : "not-allowed",
            }}
            disabled={!allAnswered}
            onClick={handleSubmit}
          >
            Submit Assessment
          </button>

          {!allAnswered && (
            <p style={styles.warning}>⚠️ All questions are mandatory.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===== STYLES (UNCHANGED) ===== */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    padding: "2rem",
    fontFamily: "Work Sans, sans-serif",
  },
  container: {
    maxWidth: "900px",
    margin: "auto",
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
  },
  header: {
    padding: "2.5rem",
    background: "linear-gradient(135deg,#0A2540,#1E3A5F)",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    padding: "2.5rem",
  },
  card: {
    background: "#ffffff",
    padding: "1.6rem",
    borderRadius: "16px",
    marginBottom: "2rem",
    borderLeft: "6px solid #3b82f6",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  },
  questionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "1rem",
  },
  qBadge: {
    background: "#0A2540",
    color: "#fff",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },
  question: {
    fontSize: "1.05rem",
    color: "#0f172a",
  },
  option: {
    display: "flex",
    alignItems: "center",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "2px solid #e5e7eb",
    marginTop: "12px",
    cursor: "pointer",
  },
  submit: {
    width: "100%",
    padding: "1rem",
    fontSize: "1.05rem",
    fontWeight: 700,
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg,#00C853,#059669)",
    color: "#fff",
    marginTop: "1.5rem",
  },
  warning: {
    marginTop: "1rem",
    color: "#DC2626",
    textAlign: "center",
    fontWeight: 600,
  },
};
