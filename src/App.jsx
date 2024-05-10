import { useState, useEffect } from "react";
import { shoes, questions, advancedQuestions } from "./data";
import { useSpring, animated } from "react-spring";
import Modal from "./Modal.jsx";
import "./App.css";

// 유사도 계산 함수
const calculateScore = (shoe, answers, currentQuestions) => {
  let score = 0;
  currentQuestions.forEach((question) => {
    const answerValue = answers[question.key];
    const shoeValue = shoe[question.key];

    if (question.key === "brand") {
      if (answerValue === "상관없음") {
        score += 0;
      } else if (answerValue === "기타") {
        if (shoeValue === "ETC") {
          score += 1;
        }
      } else {
        if (shoeValue === answerValue) {
          score += 1;
        }
      }
    } else if (question.key === "material") {
      if (
        (answerValue === "니트" && shoeValue.includes("Knit")) ||
        (answerValue === "인조 가죽" &&
          shoeValue.includes("Synthetic leather")) ||
        (answerValue === "천연 가죽" && shoeValue.includes("Real leather"))
      ) {
        score += 1;
      }
    } else if (question.key === "type") {
      if (
        (answerValue === "경량" && shoeValue === "Speed") ||
        (answerValue === "터치,컨트롤" && shoeValue === "Control") ||
        (answerValue === "착화감" && shoeValue === "Comport")
      ) {
        score += 1;
      }
    } else if (question.key === "midsole") {
      if (answerValue === "상관없음" || shoeValue === null) {
        score += 0;
      } else if (
        (answerValue === "단단" && shoeValue === "hard") ||
        (answerValue === "푹신" && shoeValue === "soft") ||
        (answerValue === "중간" && shoeValue === "mid")
      ) {
        score += 1;
      }
    }
  });
  return score;
};

// 상위 3개의 가장 근접한 축구화 찾기
const findTopMatches = (answers, currentQuestions, topN = 3) => {
  let scoredShoes = shoes.map((shoe) => ({
    shoe,
    score: calculateScore(shoe, answers, currentQuestions),
  }));

  // 점수에 따라 내림차순 정렬
  scoredShoes.sort((a, b) => b.score - a.score);

  // 상위 N개 결과 반환
  return scoredShoes.slice(0, topN).map((entry) => entry.shoe);
};

function App({ shoe }) {
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState(questions);
  const [selectedOption, setSelectedOption] = useState(null);
  const [animation, setAnimation] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const excludedKeys = ["id"];

  const handleOptionClick = (key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowModal(true);

      setTimeout(() => {
        const topMatches = findTopMatches(answers, currentQuestions);
        setShowModal(false);

        setRecommendations(topMatches);
      }, 1000);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setRecommendations([]);
    setCurrentQuestion(0);
    setIsQuizStarted(false);
  };

  const handleStartQuiz = () => {
    setIsQuizStarted(true);

    setCurrentQuestions(isAdvancedMode ? advancedQuestions : questions);
    setCurrentQuestion(0);
  };

  const handleLogoClick = () => {
    handleRestart(); // 이 함수를 호출하여 퀴즈를 초기화합니다.
  };

  useEffect(
    () => {
      setCurrentQuestions(isAdvancedMode ? advancedQuestions : questions);
    },
    [isAdvancedMode],
    console.log(isAdvancedMode ? "Advanced mode" : "normal mode")
  );

  const slideIn = useSpring({
    to: { opacity: 1, transform: "translateX(0%)" },
    from: { opacity: 0, transform: "translateX(-50%)" },
    reset: true,
    reverse: toggle,
    onRest: () => {
      setToggle(false);
    },
  });

  if (!isQuizStarted) {
    return (
      <div className="App landing">
        <h1 onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          FOOTCHU
        </h1>
        <ul>
          <li>
            <strong>TF모델을 기본으로 상정합니다</strong> <br />
            <br />
            TF모델과 스터드모델의 큰 차이가 있을 경우
            <br /> 결과창의 설명란에서 확인하실 수 있습니다
          </li>
          <li>
            <del>
              본인의 실측 발 길이,너비를 아시는 경우 ADVANCED 모드를 추천합니다
            </del>
          </li>
        </ul>
        <div className="toggle-container">
          <label className="toggle-label">
            <del>ADVANCED MODE</del> - COMING SOON
            <input
              type="checkbox"
              disabled={true}
              cursor="disable"
              checked={isAdvancedMode}
              onChange={() => setIsAdvancedMode(!isAdvancedMode)}
              className="toggle-checkbox"
            />
            <span className="toggle-switch"> </span>
          </label>
        </div>

        <button
          onClick={handleStartQuiz}
          className={`start-button ${isAdvancedMode ? "advanced-mode" : ""}`}
        >
          추천받기 {isAdvancedMode ? "🔥" : ""}
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <Modal show={showModal}>
        <h2>결과 값 계산 중..</h2>
      </Modal>
      <h1 onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        FOOTCHU
      </h1>
      {recommendations.length > 0 ? (
        <div className="recommendations">
          <h2>RESULT</h2>
          {recommendations.map((shoe, index) => (
            <div key={index} className="recommendation">
              <h3>{index + 1}위</h3>
              <div>
                <h2>{shoe.name}</h2>
                <ul>
                  {Object.entries(shoe)
                    .filter(([key]) => !excludedKeys.includes(key))
                    .map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong>{" "}
                        {key === "link" ? (
                          <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
          <button onClick={handleRestart}>다시 시작하기</button>
        </div>
      ) : (
        <animated.div style={slideIn} className="question-card">
          <h2>{currentQuestions[currentQuestion].question}</h2>
          <div className="options">
            {currentQuestions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className="option-card"
                onClick={() =>
                  handleOptionClick(
                    currentQuestions[currentQuestion].key,
                    option
                  )
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
