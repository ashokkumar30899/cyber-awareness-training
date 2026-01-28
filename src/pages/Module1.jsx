import { useNavigate } from "react-router-dom";

function Module1() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Module 1: Cybersecurity Basics</h2>

      <p>
        Cybersecurity is the practice of protecting systems, networks,
        and data from digital attacks.
      </p>

      <h4>Why cybersecurity matters</h4>
      <ul>
        <li>Employees are common attack targets</li>
        <li>Phishing is the most used attack method</li>
        <li>One mistake can cause data breaches</li>
      </ul>

      <h4>Shared responsibility</h4>
      <p>
        Security is everyone’s responsibility. Simple actions like
        reporting suspicious emails can prevent major incidents.
      </p>

      <div className="nav-buttons">
        <button onClick={() => navigate("/")}>Back</button>
        <button onClick={() => navigate("/module2")}>Next</button>
      </div>
    </div>
  );
}

export default Module1;
