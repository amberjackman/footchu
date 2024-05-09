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
      if (
        (answerValue === "기타" && shoeValue === "ETC") ||
        answerValue === "상관없음" ||
        shoeValue === answerValue
      ) {
        score += 1;
      }
    } else if (question.key === "material") {
      if (
        (answerValue === "니트" && shoeValue.includes("Knit")) ||
        (answerValue === "인조 가죽" &&
          shoeValue.includes("Synthetic leather")) ||
        (answerValue === "천연 가죽" && shoeValue.includes("Real leather"))
      ) {
        score += 2;
      }
    } else if (question.key === "type") {
      if (
        (answerValue === "경량" && shoeValue === "Speed") ||
        (answerValue === "터치,컨트롤" && shoeValue === "Control") ||
        (answerValue === "착화감" && shoeValue === "Comport")
      ) {
        score += 3;
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

function App() {
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

  const handleOptionClick = (key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowModal(true); // "찾는 중..." 모달 표시

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
    setIsQuizStarted(false); // 랜딩 페이지로 돌아가기
  };

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    // Ensure the questions are set based on the current mode
    setCurrentQuestions(isAdvancedMode ? advancedQuestions : questions);
    setCurrentQuestion(0);
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
      // 애니메이션 완료 후 필요한 상태 업데이트
      setToggle(false);
    },
  });

  if (!isQuizStarted) {
    return (
      <div className="App landing">
        <h1>FOOTCHU</h1>
        <ul>
          <li>
            <strong>TF모델을 기본으로 상정합니다</strong> <br />
            해당 모델이 한국의 인조잔디에서도 사용 가능 한 스터드가 존재하는
            경우 또는
            <br />
            기존 스터드 모델과 큰 차이가 있을 경우 결과창의 설명란에서 확인하실
            수 있습니다
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
        <h2>찾는 중...</h2>
      </Modal>
      <h1>FOOTCHU</h1>
      {recommendations.length > 0 ? (
        <div className="recommendations">
          <h2>RESULT</h2>
          {recommendations.map((shoe, index) => (
            <div key={index} className="recommendation">
              <h3>
                {index + 1}위: {shoe.name}
              </h3>
              <p>{shoe.description}</p>
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
