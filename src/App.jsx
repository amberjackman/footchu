// src/App.jsx
import { useState } from "react";
import { shoes, questions } from "./data";
import { useSpring, animated } from "react-spring";
import "./App.css";

// 유사도 계산 함수
const calculateScore = (shoe, answers) => {
  let score = 0;
  if (shoe.type === answers.type) score += 1;
  if (shoe.ground === answers.ground) score += 1;
  if (shoe.priceRange === answers.priceRange) score += 1;
  return score;
};

// 가장 근접한 축구화 찾기
const findClosestMatch = (answers) => {
  let bestMatch = null;
  let highestScore = 0;

  shoes.forEach((shoe) => {
    const score = calculateScore(shoe, answers);
    if (score > highestScore) {
      highestScore = score;
      bestMatch = shoe;
    }
  });

  return bestMatch;
};

function App() {
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleOptionClick = (key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 모든 질문에 답변을 마치면 가장 근접한 축구화 찾기
      const matchedShoe = findClosestMatch(answers);
      setRecommendation(matchedShoe || "No matching shoes found");
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setRecommendation(null);
    setCurrentQuestion(0);
  };

  const cardAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    to: { opacity: 1, transform: "translate3d(0%,0,0)" },
  });

  return (
    <div className="App">
      <h1>FUTCHU</h1>
      {recommendation ? (
        <div className="recommendation">
          {typeof recommendation === "string" ? (
            <p>{recommendation}</p>
          ) : (
            <div>
              <h2>{recommendation.name}</h2>
              <p>{recommendation.description}</p>
            </div>
          )}
          <button onClick={handleRestart}>다시 시작하기</button>
        </div>
      ) : (
        <animated.div style={cardAnimation} className="question-card">
          <h2>{questions[currentQuestion].question}</h2>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className="option-card"
                onClick={() =>
                  handleOptionClick(questions[currentQuestion].key, option)
                }
              >
                {option}
              </div>
            ))}
          </div>
        </animated.div>
      )}
    </div>
  );
}

export default App;
