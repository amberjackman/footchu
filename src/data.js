// src/data.js

// 축구화 데이터
export const shoes = [
  {
    id: 1,
    name: "Nike Mercurial 15",
    brand: "Nike",
    type: "Speed",
    material: "Knit",
    description:
      "나이키 머큐리얼은 나이키의 스피드 사일로이자, 니트와 합성가죽이 결합된 축구화 입니다. 고원바보",
    link: "",
  },
  {
    id: 2,
    name: "Adidas Predator 24",
    brand: "Adidas",
    type: "Control",
    material: "Synthetic leather",
    description: "프레데터의 귀환, ",
    link: "",
  },
  {
    id: 3,
    name: "Puma Future 7 Ultimate Cage",
    brand: "Puma",
    type: "Control",
    material: "Knit",
    description: "",
    link: "",
  },
  {
    id: 4,
    name: "Puma Ultra Ultimate Cage",
    brand: "Puma",
    type: "Speed",
    material: "Synthetic leather",
    description: "",
    link: "",
  },
  {
    id: 5,
    name: "Mizuno Morelia Neo",
    brand: "Mizuno",
    type: "Speed",
    material: "Real leather",
    description: "",
    link: "",
  },
  {
    id: 6,
    name: "Nike Phantom gx2",
    brand: "Nike",
    type: "Control",
    material: "Synthetic leather",
    description: "",
    link: "",
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
    name: "Kelme 2.0 ",
    brand: "ETC",
    type: "Comport",
    material: "Real leather,",
    description: "켈미 2.0은 캥거루 가죽으로 만들어짐",
    link: "",
  },
];

// 질문 데이터
export const questions = [
  {
    id: 1,
    question: "선호하는 축구화의 컨셉을 선택해주세요.",
    options: ["Speed", "Control", "Comport"],
    key: "type",
  },
  {
    id: 2,
    question: "선호하는 소재를 선택해주세요.",
    options: ["Knit", "Synthetic leather", "Real leather"],
    key: "material",
  },
  {
    id: 3,
    question: "선호하는 브랜드를 선택해주세요.",
    options: ["Nike", "Adidas", "Puma", "No Matter"],
    key: "brand",
  },
];
