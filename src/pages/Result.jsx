import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score ?? 0;

  return (
    <div className="container">
      <h2>Training Completed</h2>

      <p>Your Score: {score} / 1</p>
      <p>Status: {score >= 1 ? "PASSED" : "FAILED"}</p>

      <button onClick={() => navigate("/")}>
        Exit Training
      </button>
    </div>
  );
}

export default Result;
