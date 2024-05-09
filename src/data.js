// src/data.js

// 축구화 데이터
export const shoes = [
  {
    id: 1,
    name: "Nike Mercurial 15 TF",
    brand: "Nike",
    type: "Speed",
    material: "Knit",
    description:
      "나이키 머큐리얼은 나이키의 스피드 사일로이자, 니트와 합성가죽이 결합된 축구화 입니다. 가벼운 어퍼, 한국의 인조잔디에 어울리는 좋은 스터드, 딱히 결점이랄게 없는 밸런스가 좋은 신발 입니다. ",
    link: "",
  },
  {
    id: 2,
    name: "Adidas Predator 24",
    brand: "Adidas",
    type: "Control",
    material: "Synthetic leather",
    description:
      "아디다스의 컨트롤&파워 사일로 프레데터 입니다. TF 버전과 AG버전이 다른 신발이라고 해도 좋을 만큼 차이가 심합니다. TF버전의 경우 뻣뻣하고 무거우므로, 비교 후 구매를 추천합니다. ",
    link: "",
  },
  {
    id: 3,
    name: "Puma Future 7 Ultimate Cage",
    brand: "Puma",
    type: "Control",
    material: "Knit",
    description:
      "푸마의 컨트롤 사일로 FUTURE입니다. 기존작 대비 끈 구멍 갯수를 줄이고 파워테이프로 발등을 감싸 끈으로부터 조금 더 자유로울 수 있습니다. MG버전과 TF버전 최상위 모델의 어퍼가 다르므로 비교 후 필요에 따라 구매하는 것을 추천합니다.",
    link: "",
  },
  {
    id: 4,
    name: "Puma Ultra Ultimate Cage",
    brand: "Puma",
    type: "Speed",
    material: "Synthetic leather",
    description:
      "푸마의 스피드 사일로 ULTRA입니다. 발 안쪽이 비칠 정도로 얇은 어퍼가 특징입니다. TF버전은 미드솔 무게로 무게가 조금 증가하고, MG버전과 TF버전 최상위 모델의 어퍼가 다르므로 비교 후 구매하는 것을 추천합니다.",
    link: "",
  },
  {
    id: 5,
    name: "Mizuno Morelia Neo",
    brand: "Mizuno",
    type: "Speed",
    material: "Real leather",
    description:
      "고수는 미즈노를 신는다 ㄱㄴ스터드는 내구도에 문제가 많아 AS모델을 추천합니다",
    link: "",
    stud: "TF",
  },
  {
    id: 6,
    name: "Nike Phantom Gx2",
    brand: "Nike",
    type: "Control",
    material: "Knit",
    description:
      "편안한 착화감과 반발력 좋은 어퍼의 조화, gx2. 니트의 장점을 극대화한 gx1과 다르게 경량화한 인조가죽에 가깝습니다 니트의 포근함과 편안한 착화감을 원한다면 gx1 모델을 추천합니다.",
    link: "",
    stud: "TF",
  },
  {
    id: 7,
    name: "Nike Tiempo 10",
    brand: "Nike",
    type: "Comport",
    material: "Synthetic leather",
    description: "",
    link: "",
  },
  {
    id: 8,
    name: "Adidas Copa Pure",
    brand: "Adidas",
    type: "Comport",
    material: "Synthetic leather",
    description: "",
    link: "",
  },
  {
    id: 8,
    name: "Kelme 2.0",
    brand: "ETC",
    type: "Comport",
    material: "Real leather,",
    description:
      "켈미 2.0은 캥거루 가죽으로 만들어짐 MG모델이 평이 더 좋은 편입니다",
    link: "",
  },
  {
    id: 9,
    name: "Newbalance Furon V7+ ",
    brand: "ETC",
    type: "Speed",
    material: "Knit",
    description:
      "뉴발란스의 런닝화에도 들어가는 Fuelcel쿠션이 들어간 것이 큰 장점",
    link: "",
  },
  {
    id: 10,
    name: "Adidas Gloro",
    brand: "Adidas",
    type: "Comport",
    material: "Real leather,",
    description: "두툼한 소가죽, 편한 착화감, 라이트스트라이크 미드솔",
    link: "",
  },
];

// 질문 데이터
export const questions = [
  {
    id: 1,
    question: "선호하는 브랜드를 선택해주세요.",
    options: ["Nike", "Adidas", "Puma", "기타", "상관없음"],
    key: "brand",
  },
  {
    id: 2,
    question: "선호하는 소재를 선택해주세요.",
    options: ["니트", "인조 가죽", "천연 가죽"],
    key: "material",
  },
  {
    id: 3,
    question: "선호하는 축구화의 컨셉을 선택해주세요.",
    options: ["경량", "터치,컨트롤", "착화감"],
    key: "type",
  },
];

export const advancedQuestions = [
  ...questions,
  {
    id: 1,
    question: "발의 최대 너비가 어떻게 되시나요?",
    options: ["97mm 이하", "100 +- 3", "103mm 이상"],
    key: "wide",
  },
  {
    id: 2,
    question: "원하는 쿠셔닝의 정도는 어느정도 인가요?",
    options: ["단단", "중간", "푹신"],
    key: "midsole",
  },
  {
    id: 3,
    question: "원하는 아웃솔의 강도는 어느정도 인가요?",
    options: ["단단", "중간", "유연"],
    key: "outsole",
  },
];
