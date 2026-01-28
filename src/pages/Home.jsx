import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Cyber Security Awareness Training</h1>

      <p>
        This mandatory training helps you identify phishing attacks,
        protect company data, and follow safe security practices.
      </p>

      <ul>
        <li>📘 Short learning modules</li>
        <li>📝 Mandatory assessment</li>
        <li>✅ Completion tracking</li>
      </ul>

      <button onClick={() => navigate("/module1")}>
        Start Training
      </button>
    </div>
  );
}
console.log("home pani chesindi");

export default Home;
