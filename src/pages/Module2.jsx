import { useNavigate } from "react-router-dom";

function Module2() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Module 2: Phishing Awareness</h2>

      <p>
        Phishing is a social engineering attack where attackers trick
        users into revealing sensitive information.
      </p>

      <h4>Common phishing signs</h4>
      <ul>
        <li>Urgent or threatening messages</li>
        <li>Suspicious links or attachments</li>
        <li>Unknown or spoofed senders</li>
        <li>Spelling and grammar mistakes</li>
      </ul>

      <h4>What should you do?</h4>
      <ul>
        <li>Do not click suspicious links</li>
        <li>Do not download attachments</li>
        <li>Report to IT / Security team immediately</li>
      </ul>

      <div className="nav-buttons">
        <button onClick={() => navigate("/module1")}>Back</button>
        <button onClick={() => navigate("/quiz")}>Proceed to Quiz</button>
      </div>
    </div>
  );
}

console.log("Module 2 pani chesindi")
export default Module2;
