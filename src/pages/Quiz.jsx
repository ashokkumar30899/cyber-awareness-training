import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Modules.css";

const QUESTIONS = [
  {
    q: "A person carrying heavy boxes asks you to hold the door open for them at the employee-only entrance, but you don't recognize them. What is the most secure action?",
    options: [
      "Be helpful and hold the door open; you can always ask for their name later.",
      "Politely ask them to use their own badge to swipe in, or direct them to the main reception.",
      "Let them in but follow them to their destination to make sure they are supposed to be there.",
      "Simply walk away and let the door close on them without saying anything."
    ],
    answer: "Politely ask them to use their own badge to swipe in, or direct them to the main reception.",
  },
  {
    q: "Which of the following describes the most secure approach to managing your professional and personal passwords?",
    options: [
      "Using the same strong, complex password for all accounts to ensure you don't forget it.",
      "Writing passwords down in a physical notebook kept in a locked drawer at home.",
      "Using a unique, complex passphrase for every account and storing them in a secure, encrypted password manager.",
      "Changing your passwords every 30 days, even if they are simple ones like 'Password123!'."
    ],
    answer: "Using a unique, complex passphrase for every account and storing them in a secure, encrypted password manager.",
  },
  {
    q: "In the context of cybersecurity, what is the core characteristic that defines nearly all 'Social Engineering' attacks?",
    options: [
      "The use of complex coding and zero-day vulnerabilities to bypass system firewalls.",
      "The psychological manipulation of individuals to trick them into making security mistakes or giving away sensitive info.",
      "Automated scripts that guess common default passwords on internet-facing servers.",
      "The physical theft of hardware devices like laptops or encrypted USB drives."
    ],
    answer: "The psychological manipulation of individuals to trick them into making security mistakes or giving away sensitive info.",
  },
  {
    q: "You receive an email from 'IT Support' (support@rnicrosoft.com) claiming your account will be suspended in 2 hours unless you 'Update Now'. What is the most critical red flag?",
    options: [
      "The email uses a blue color scheme which is different from the standard corporate brand.",
      "The sender's domain 'rnicrosoft.com' is a look-alike typo intended to impersonate the real brand.",
      "The email was sent at a time (3:00 AM) when the IT support team is usually offline.",
      "The subject line is written in all capital letters."
    ],
    answer: "The sender's domain 'rnicrosoft.com' is a look-alike typo intended to impersonate the real brand.",
  },
  {
    q: "You get a text message (Smishing) stating: 'FedEx: Your package delivery failed. Confirm your address here: bit.ly/shipping-update-2024'. You aren't expecting a package. What should you do?",
    options: [
      "Click the link to see which package it might be; it could be a gift.",
      "Reply with 'STOP' to opt-out of further messages from that sender.",
      "Ignore and delete the message immediately without clicking any links.",
      "Forward the text to your friends to warn them about the delivery failure."
    ],
    answer: "Ignore and delete the message immediately without clicking any links.",
  },
  {
    q: "Someone calls your desk (Vishing) claiming to be from 'Wissda IT' and says they detected a virus on your machine. They ask for your password to 'clean it remotely'. How should you respond?",
    options: [
      "Provide the password immediately so they can fix the issue before it spreads.",
      "Ask them for their employee ID first before giving them your credentials.",
      "Hang up and report the call to the official IT helpdesk number listed on the company portal.",
      "Tell them you'll fix it yourself and then download a free antivirus of your choice."
    ],
    answer: "Hang up and report the call to the official IT helpdesk number listed on the company portal.",
  },
  {
    q: "Why is a 'Spear Phishing' attack considered significantly more dangerous than a standard bulk phishing email campaign?",
    options: [
      "It is sent to millions of people at once, increasing the statistical chance of a click.",
      "It uses personalized information about your role or interests to gain trust and lower your guard.",
      "It only targets personal email accounts and never reaches corporate networks.",
      "It doesn't require the victim to click any links or download any files to be successful."
    ],
    answer: "It uses personalized information about your role or interests to gain trust and lower your guard.",
  },
  {
    q: "Whaling is a specialized form of phishing. Which of the following best describes its primary target and objective?",
    options: [
      "It targets entry-level employees to gain access to basic company files.",
      "It targets high-level executives (CEOs/CFOs) to steal highly sensitive data or authorize large fraudulent wire transfers.",
      "It targets the company's website server to take it offline (DDoS).",
      "It targets former employees to regain access to their deactivated accounts."
    ],
    answer: "It targets high-level executives (CEOs/CFOs) to steal highly sensitive data or authorize large fraudulent wire transfers.",
  },
  {
    q: "What is 'Ransomware', and what is the primary method attackers use to extort their victims?",
    options: [
      "A virus that slows down your computer until you buy a specific performance software.",
      "Malware that encrypts your files and demands a payment (usually in cryptocurrency) for the decryption key.",
      "Software that records your keystrokes to steal your bank login information.",
      "A program that displays constant pop-up ads on your browser until you pay a fee to stop them."
    ],
    answer: "Malware that encrypts your files and demands a payment (usually in cryptocurrency) for the decryption key.",
  },
  {
    q: "Why is Multi-Factor Authentication (MFA) considered a 'must-have' security control even if you have a very strong passport?",
    options: [
      "It makes the login process faster because you don't always have to type your password.",
      "It provides a critical extra layer of security that prevents access even if an attacker manages to steal your password.",
      "It automatically changes your password every time you log in to keep it fresh.",
      "It allows you to share your password with trusted colleagues securely."
    ],
    answer: "It provides a critical extra layer of security that prevents access even if an attacker manages to steal your password.",
  },
  {
    q: "You are working remotely at a crowded public coffee shop. Which of the following is the SAFEST way to access internal company systems?",
    options: [
      "Connect to the coffee shop's free public Wi-Fi directly as it's convenient and fast.",
      "Use your own personal mobile hotspot with a strong password to avoid public networks.",
      "Connect through the company-provided Secure VPN (Virtual Private Network) over any available internet connection.",
      "Only work on documents that are stored locally and avoid connecting to the internet entirely."
    ],
    answer: "Connect through the company-provided Secure VPN (Virtual Private Network) over any available internet connection.",
  },
  {
    q: "You need to step away from your desk for 5 minutes in an open office environment to grab a coffee. What is the most important security step to take?",
    options: [
      "Ask the person sitting next to you to watch your computer while you're gone.",
      "Lower the screen brightness so no one can see what's on your monitor from a distance.",
      "Lock your workstation immediately (Windows Key + L) before leaving your seat.",
      "Leave a 'Be Right Back' note on your keyboard to deter anyone from touching your PC."
    ],
    answer: "Lock your workstation immediately (Windows Key + L) before leaving your seat.",
  },
  {
    q: "You accidentally clicked a link in what you now realize was a suspicious 'Phishing' email. What is the critical first step you should take?",
    options: [
      "Shutdown your computer and hope that it stops any potential malware from running.",
      "Immediately notify the IT or Security team so they can investigate and contain any potential threat.",
      "Change your password on that specific site and then continue with your normal work tasks.",
      "Run a quick virus scan yourself and if it comes back clean, assume everything is fine."
    ],
    answer: "Immediately notify the IT or Security team so they can investigate and contain any potential threat.",
  },
  {
    q: "Cyber attackers frequently use the tactic of 'Urgency' (e.g., 'Account expires in 1 hour') in their messages. What is their primary goal for doing this?",
    options: [
      "To ensure that you get the latest security updates as quickly as possible.",
      "To pressure you into acting impulsively without taking the time to think or verify the request.",
      "To demonstrate that their IT support systems are highly efficient and responsive.",
      "To comply with international data protection laws that require fast action."
    ],
    answer: "To pressure you into acting impulsively without taking the time to think or verify the request.",
  },
  {
    q: "You receive an urgent and 'discreet' email from the CEO asking you to wire funds for a confidential acquisition. What is the most secure way to verify this request?",
    options: [
      "Reply directly to the email asking for confirmation to ensure it was actually the CEO.",
      "Follow the instructions immediately since the CEO is an authority figure and it's 'confidential'.",
      "Verify the request using a secondary, official communication channel (like a direct phone call or a Teams message) before acting.",
      "Ask your immediate supervisor if they know anything about the CEO's 'discreet' acquisition project."
    ],
    answer: "Verify the request using a secondary, official communication channel (like a direct phone call or a Teams message) before acting.",
  },
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function Assessment() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    // Shuffle questions and their options
    const prepared = shuffle(QUESTIONS).map((q) => ({
      ...q,
      options: shuffle(q.options),
    }));
    setQuestions(prepared);
  }, []);

  const handleChange = (qIndex, value) => {
    setResponses({ ...responses, [qIndex]: value });
  };

  const allAnswered = questions.length === Object.keys(responses).length;

  const handleSubmit = () => {
    if (!allAnswered) return;

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
    <div className="module-container">
      <header className="module-header">
        <h1>📝 Cybersecurity Assessment</h1>
        <p className="subtitle">Mandatory Knowledge Check — 15 Situational Questions</p>
        <span className="module-badge">Final Certification Quiz</span>
      </header>

      <div className="module-content">
        {questions.map((q, i) => (
          <div key={i} className="threat-card" style={{ textAlign: 'left', marginBottom: '2.5rem', padding: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <span className="section-num">{i + 1}</span>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>{q.q}</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`radio-label ${responses[i] === opt ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={`q-${i}`}
                    className="radio-input"
                    checked={responses[i] === opt}
                    onChange={() => handleChange(i, opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="assessment-footer">
        <div style={{ flex: 1 }}>
          {!allAnswered && (
            <div className="quiz-warning">
              <span>⚠️</span>
              <span>Please answer all 15 questions to unlock the Submit button</span>
            </div>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="nav-button next"
          disabled={!allAnswered}
          style={{ 
            opacity: allAnswered ? 1 : 0.4, 
            cursor: allAnswered ? 'pointer' : 'not-allowed',
            minWidth: '240px'
          }}
        >
          <span>Submit Assessment</span>
          <span className="icon">→</span>
        </button>
      </footer>
    </div>
  );
}
