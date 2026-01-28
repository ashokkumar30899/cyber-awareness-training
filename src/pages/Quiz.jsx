import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    navigate("/result", { state: { score: isCorrect ? score + 1 : score } });
  };

  return (
    <div className="container">
      <h2>Assessment</h2>

      <p>
        What is the biggest red flag in a phishing email?
      </p>

      <button onClick={() => handleAnswer(false)}>Unknown sender</button>
      <button onClick={() => handleAnswer(false)}>Grammar mistakes</button>
      <button onClick={() => handleAnswer(true)}>Urgent action request</button>
      <button onClick={() => handleAnswer(false)}>Company logo</button>
    </div>
  );
}
console.log("vanekka Module 2 pani chesindi")
export default Quiz;
