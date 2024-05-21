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

    // console.log(`Question: ${question.key}`);
    // console.log(`Answer value: ${answerValue}`);
    // console.log(`Shoe value: ${shoeValue}`);

    if (question.key === "brand") {
      if (answerValue === "상관 없음") {
        score += 0;
      } else if (answerValue === "기타") {
        if (shoeValue === "ETC") {
          score += 16;
        }
      } else {
        if (shoeValue === answerValue) {
          score += 16;
        }
      }
    } else if (question.key === "material") {
      if (
        (answerValue === "니트" && shoeValue.includes("Knit")) ||
        (answerValue === "인조 가죽" &&
          shoeValue.includes("Synthetic leather")) ||
        (answerValue === "천연 가죽" && shoeValue.includes("Real leather"))
      ) {
        score += 20;
      }
    } else if (question.key === "type") {
      if (
        (answerValue === "경량" && shoeValue === "Speed") ||
        (answerValue === "터치,컨트롤" && shoeValue === "Control") ||
        (answerValue === "착화감" && shoeValue === "Comport")
      ) {
        score += 15;
      }
    } else if (question.key === "midsole") {
      if (answerValue === "상관 없음" || shoeValue === "N/A") {
        score += 0;
      } else if (
        (answerValue === "단단" && shoeValue === "hard") ||
        (answerValue === "푹신" && shoeValue === "soft") ||
        (answerValue === "중간" && shoeValue === "mid")
      ) {
        score += 20;
      } else if (
        (answerValue === "푹신" && shoeValue === "hard") ||
        (answerValue === "단단" && shoeValue === "soft")
      ) {
        score -= 10;
      }
    } else if (question.key === "cheap") {
      if (answerValue === "상관 없음" && shoeValue === undefined) {
        score += 0;
      } else if (answerValue === "낮을수록 좋음" && shoeValue === true) {
        score += 22;
      } else if (answerValue === "비싼게 좋음" && shoeValue === undefined) {
        score += 22;
      }
    } else if (question.key === "frontwide") {
      if (answerValue === "상관 없음" || shoeValue === null) {
        score += 0;
      } else if (
        (answerValue === "넓음" && shoeValue === "wide") ||
        (answerValue === "중간" && shoeValue === "mid") ||
        (answerValue === "좁음" && shoeValue === "narrow")
      ) {
        score += 10;
      }
    } else if (question.key === "midwide") {
      if (answerValue === "상관 없음" || shoeValue === null) {
        score += 0;
      } else if (
        (answerValue === "넓음" && shoeValue === "wide") ||
        (answerValue === "중간" && shoeValue === "mid") ||
        (answerValue === "좁음" && shoeValue === "narrow")
      ) {
        score += 10;
      }
    } else if (question.key === "outsole") {
      if (answerValue === "상관 없음" || shoeValue === null) {
        score += 0;
      } else if (
        (answerValue === "단단" && shoeValue === "hard") ||
        (answerValue === "중간" && shoeValue === "mid") ||
        (answerValue === "유연" && shoeValue === "soft")
      ) {
        score += 5.5;
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

  // 상위 3개 결과 반환
  return scoredShoes.slice(0, topN).map((entry) => ({
    shoe: entry.shoe,
    score: entry.score,
  }));
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
  const excludedKeys = ["id", "link", "name", "brand", "wide_position"];

  const handleOptionClick = (key, value) => {
    setAnswers((prev) => {
      return { ...prev, [key]: value };
    });

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowModal(true);
      setTimeout(() => {
        setAnswers((prevAnswers) => {
          const topMatches = findTopMatches(prevAnswers, currentQuestions);
          setShowModal(false);
          setRecommendations(topMatches);
          return prevAnswers;
        });
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
    handleRestart();
  };

  useEffect(
    () => {
      setCurrentQuestions(isAdvancedMode ? advancedQuestions : questions);
    },
    [isAdvancedMode]
    // console.log(isAdvancedMode ? "Advanced mode" : "normal mode")
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

  const keyToKorean = {
    type: "컨셉",
    material: "소재",
    frontwide: "전족부 너비",
    midwide: "중족부 너비",
    midsole: "미드솔 쿠셔닝",
    outsole: "아웃솔 강도",
    cheap: "가성비",
    description: "설명",
  };

  const valueToKorean = {
    Speed: "경량",
    Control: "컨트롤",
    Comport: "착화감",
    Knit: "니트",
    "Synthetic leather": "인조 가죽",
    "Real leather": "천연 가죽",
    mid: "중간",
    wide: "넓음",
    narrow: "좁음",
    hard: "단단",
    soft: "유연",
    "N/A": "해당 없음",
    true: "✔",
  };

  if (!isQuizStarted) {
    return (
      <div className="App landing">
        <div className="logoContainer">
          <img
            src="/image/footchu_landing_logo_ver2.png"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          ></img>
        </div>

        <div className="mainContainer">
          <strong>⚠️TF모델을 기본으로 상정합니다⚠️</strong>
          TF모델과 스터드모델의 큰 차이가 있을 경우 <br />
          결과창의 설명란에서 확인하실 수 있습니다
          <br />
          또는 추천 모델이 TF모델이 아닌 경우 모델명에 표기됩니다
          <br />
          <br />
          {/* <strong>
              사이즈는 발 실측 사이즈 +5~10mm를 추천합니다
            </strong> <br /> <br /> */}
          <span>
            상세한 요구사항이 있는 경우에는 ADVANCED MODE🔥 를 추천합니다
          </span>
          <div className="toggle-container">
            <label className="toggle-label">
              <strong>ADVANCED MODE</strong>
              <input
                type="checkbox"
                // disabled={true}
                // cursor="disable"
                checked={isAdvancedMode}
                onChange={() => setIsAdvancedMode(!isAdvancedMode)}
                className="toggle-checkbox"
              />
              <span className="toggle-switch"> </span>
            </label>
          </div>
        </div>

        <button
          onClick={handleStartQuiz}
          className={`start-button ${isAdvancedMode ? "advanced-mode" : ""}`}
        >
          {isAdvancedMode ? "🔥" : ""}
          추천받기
          {isAdvancedMode ? "🔥" : ""}
        </button>

        <div className="footer-container">
          {/* 수정 */}
          {/* <div className="footerinner-container">
            <div>About</div>
            <div>Notice</div>
          </div> */}
          <div>문의사항, 수정사항 🙏 footchu.contact@gmail.com</div>
          <a
            onClick={() => window.open("https://naver.me/xEAuswq8", "_blank")}
            style={{ cursor: "pointer" }}
          >
            피드백 남기기
          </a>
        </div>
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
          {recommendations.map((entry, index) => (
            <div key={index} className="recommendation">
              <h3>{index + 1}위</h3>
              <div>
                <h2>{entry.shoe.name}</h2>
                <h2>적합도 : {entry.score}</h2>
                <ul>
                  {Object.entries(entry.shoe)
                    .filter(([key]) => !excludedKeys.includes(key))
                    .map(([key, value]) => (
                      <li key={key}>
                        <strong>{keyToKorean[key] || key}:</strong>{" "}
                        {key === "link" ? (
                          <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            value
                          </a>
                        ) : key === "description" ? (
                          value
                        ) : (
                          valueToKorean[value]
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
            {currentQuestion > 0 && (
              <div className="backbuttoncontainer">
                <button
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  className="back-button"
                >
                  이전 문제
                </button>
              </div>
            )}
          </div>
        </animated.div>
      )}
    </div>
  );
}

export default App;
