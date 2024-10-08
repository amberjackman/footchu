import supabase from "./supabaseClient";

export const shoes = [
  {
    // 아디다스
    id: 2,
    name: "Adidas Predator 24",
    brand: "Adidas",
    type: "Control",
    material: "Synthetic leather",
    wide_position: "mid",
    frontwide: "narrow",
    midwide: "narrow",
    midsole: "mid",
    outsole: "hard",
    link: "/image/predator24.png",
    description:
      "TF버전과 AG버전이 다른 신발이라고 해도 좋을 만큼 차이가 심합니다. TF버전의 경우 뻣뻣하고 매우 좁으므로, 비교 후 구매를 추천합니다.",
  },
  {
    id: 8,
    name: "Adidas Copa Pure",
    brand: "Adidas",
    type: "Comport",
    material: "Synthetic leather",
    wide_position: "mid",
    frontwide: "mid",
    midwide: "mid",
    midsole: "hard",
    outsole: "hard",
    link: "/image/copapure.png",
    description: "TF화는 굉장히 무겁고 불편요소가 많아 2g/3g 버전을 추천합니다",
  },
  {
    id: 10,
    name: "Adidas Gloro",
    brand: "Adidas",
    type: "Comport",
    material: "Real leather",
    wide_position: "mid",
    frontwide: "mid",
    midwide: "narrow",
    midsole: "mid",
    outsole: "hard",
    link: "/image/gloro.png",
    cheap: true,
    description:
      "두툼한 소가죽, 라이트스트라이크 미드솔, 좋은 가성비. 귀여운 접이식 텅도 달렸습니다! 묵직한 무게에 거부감이 없다면 추천합니다",
  },
  {
    id: 11,
    name: "Adidas CrazyFast",
    brand: "Adidas",
    type: "Speed",
    material: "Synthetic leather",
    wide_position: "front",
    frontwide: "wide",
    midwide: "narrow",
    midsole: "soft",
    outsole: "mid",
    link: "/image/crazyfast.png",
    description: "얇고 가벼운 어퍼, 넓고 높은 전족부, 좁은 중족부가 특징입니다",
  },

  // 나이키
  {
    id: 1,
    name: "Nike Mercurial Vapor 15",
    brand: "Nike",
    type: "Speed",
    material: "Knit",
    wide_position: "mid",
    frontwide: "mid",
    midwide: "mid",
    midsole: "mid",
    outsole: "mid",
    link: "/image/vapor15.png",
    description:
      "니트를 베이스로한 TF화 입니다. 가벼운 어퍼, 한국의 인조잔디에 어울리는 좋은 스터드, 적당한 길이와 너비, 밸런스가 좋은 신발 입니다. ",
  },
  {
    id: 6,
    name: "Nike Phantom Gx2",
    brand: "Nike",
    type: "Control",
    material: "Knit",
    wide_position: "mid",
    frontwide: "mid",
    midwide: "wide",
    midsole: "soft",
    outsole: "soft",
    link: "/image/gx2.png",
    description:
      "꽤 널널한 착화감 입니다. 니트의 장점을 극대화한 gx1과 다르게 경량화한 인조가죽에 가깝습니다 니트의 포근함과 편안한 착화감을 원한다면 gx1 모델을 추천합니다.",
  },
  {
    id: 7,
    name: "Nike Tiempo 10",
    brand: "Nike",
    type: "Comport",
    material: "Synthetic leather",
    wide_position: "mid",
    frontwide: "narrow",
    midwide: "mid",
    midsole: "mid",
    outsole: "soft",
    link: "/image/tiempo10.png",
    description:
      "천연가죽을 포기하고 인조가죽을 택했음에도 좋은 착화감과 터치감을 가지고 있습니다, 의외로 너비가 좁아 주의가 필요합니다",
  },
  {
    id: 15,
    name: "Nike Premier 3",
    brand: "Nike",
    type: "Comport",
    material: "Real leather",
    wide_position: "mid",
    frontwide: "mid",
    midwide: "wide",
    midsole: "soft",
    outsole: "soft",
    link: "/image/premier.png",
    cheap: true,
    description:
      "가성비 좋은 천연가죽 TF화 입니다. 푹신한 루나론 미드솔과 부드러운 소가죽이 특징입니다.",
  },

  // 푸마
  {
    id: 3,
    name: "Puma Future 7 Ultimate",
    brand: "Puma",
    type: "Control",
    material: "Knit",
    wide_position: "front",
    frontwide: "wide",
    midwide: "mid",
    midsole: "mid",
    outsole: "soft",
    link: "/image/future.png",
    description:
      "기존작 대비 끈 구멍 갯수를 줄이고 파워테이프로 발등을 감싸 끈으로부터 조금 더 자유로울 수 있습니다. MG 최상위 모델과 소재차이가 거의 없습니다",
  },
  {
    id: 4,
    name: "Puma Ultra Ultimate",
    brand: "Puma",
    type: "Speed",
    material: "Synthetic leather",
    wide_position: "front",
    frontwide: "wide",
    midwide: "narrow",
    midsole: "mid",
    outsole: "hard",
    link: "/image/ultra.png",
    description:
      "내부가 비칠 정도로 얇고 가벼운 어퍼가 특징입니다. TF버전은 두꺼운 미드솔이 있어 무게가 조금 증가하고, MG버전 최상위 모델과 어퍼가 다르므로 비교 후 구매하는 것을 추천합니다.",
  },

  // ETC
  {
    id: 5,
    name: "Mizuno Morelia Neo",
    brand: "ETC",
    type: "Speed",
    material: "Real leather",
    wide_position: "mid",
    frontwide: "narrow",
    midwide: "mid",
    midsole: "hard",
    outsole: "soft",
    link: "/image/morelia.png",
    description:
      "24년 6월 새로운 모델이 발매되면서, 기존의 악명높던 ㄱㄴ스터드가 사라졌습니다. 캥거루 가죽을 사용했으며 가볍고 핏한 축구화 입니다.",
  },
  {
    id: 18,
    name: "Kelme 1.1",
    brand: "ETC",
    type: "Comport",
    material: "Real leather",
    wide_position: "mid",
    frontwide: "mid",
    midwide: "mid",
    midsole: "mid",
    outsole: "mid",
    link: "/image/kelme1.1.png",
    cheap: true,
    description:
      "캥거루 가죽을 사용했습니다. 편하고, 가볍고, 가성비가 훌륭합니다 TF모델도,MG모델도 한국의 잔디와 잘 어울리므로 양쪽 전부 추천합니다 국내 정식발매되지 않아 해외구매가 필수입니다.",
  },
  {
    id: 9,
    name: "Newbalance Furon V7+ ",
    brand: "ETC",
    type: "Speed",
    material: "Knit",
    wide_position: "mid",
    frontwide: null,
    midwide: null,
    midsole: "mid",
    outsole: "mid",
    link: "/image/furon.png",
    description:
      "뉴발란스의 러닝화 라인업에 들어가는 Fuelcel쿠션이 들어간 것이 큰 장점입니다 다만 국내 정식발매되지 않아 해외구매가 필수입니다.",
  },
  {
    id: 12,
    name: "Asics Ds-light Pro AG",
    brand: "ETC",
    type: "Comport",
    material: "Real leather",
    wide_position: "mid",
    frontwide: "wide",
    midwide: "mid",
    midsole: "N/A",
    outsole: "hard",
    link: "/image/dslight.png",
    description:
      "아식스가 동호인을 위해 제작했다는 축구화, 캥거루가죽, K인조잔디와 어울리는 스터드",
  },
  {
    id: 13,
    name: "Mizuno Monarcida Neo",
    brand: "ETC",
    type: "Comport",
    material: "Real leather",
    wide_position: "mid",
    frontwide: "mid",
    midwide: "wide",
    midsole: "hard",
    outsole: "soft",
    link: "/image/monarcida.png",
    description:
      "모렐리아보다 조금 더 와이드한 모나르시다입니다. 발볼이 넓은데 미즈노의 제품이 신고 싶으시다면 추천드립니다.",
  },
  {
    id: 14,
    name: "Mizuno Alpha",
    brand: "ETC",
    type: "Speed",
    material: "Synthetic leather",
    wide_position: "mid",
    frontwide: "narrow",
    midwide: "narrow",
    midsole: "hard",
    outsole: "soft",
    link: "/image/alpha.png",
    description:
      "가볍고 부드럽지만 반발력은 좋은 인조가죽 어퍼를 사용했습니다. 다만 일체형 니트텅으로 볼이 넓고 높다면 추천하지 않습니다",
  },
  {
    id: 16,
    name: "Athleta a005",
    brand: "ETC",
    type: "Comport",
    material: "Real leather",
    wide_position: "mid",
    frontwide: "mid",
    midwide: "wide",
    midsole: "mid",
    outsole: "soft",
    link: "/image/a005.png",
    description:
      "모든 부분이 캥거루 가죽이며, 쿠션이 뒷꿈치 집중이 아닌, 발 전체에 깔린 것이 특징입니다. 호불호가 없고 축구와 풋살 모두 준수한 성능을 보여준다는 평입니다.",
  },
  {
    id: 17,
    name: "Definiv Bs",
    brand: "ETC",
    type: "Comport",
    material: "Real leather",
    wide_position: "mid",
    frontwide: "wide",
    midwide: "wide",
    midsole: "mid",
    outsole: "hard",
    link: "/image/bs.png",
    description:
      "AG+TF라는 특이한 스터드와 발 전체에 깔린 쿠션이 특징입니다. 천연 가죽,인조 가죽, 낮은 미드솔,높은 미드솔 등 여러 바리에이션이 존재하므로 확인 후 구매를 추천드립니다 ",
  },
  {
    id: 19,
    name: "Puma Ultra 5",
    brand: "Puma",
    type: "Speed",
    material: "Synthetic leather",
    wide_position: "front",
    frontwide: "wide",
    midwide: "mid",
    midsole: "mid",
    outsole: "hard",
    link: "/image/bs.png",
    description:
      "어퍼는 단단하지만 기존의 울트라보다 핏이 편안해졌습니다. 전족부가 넓다면 경량모델 중 가장 추천합니다",
  },
  {
    id: 20,
    name: "Adidas F50",
    brand: "Adidas",
    type: "Speed",
    material: "Synthetic leather",
    wide_position: "mid",
    frontwide: "mid",
    midwide: "mid",
    midsole: "soft",
    outsole: "mid",
    link: "/image/bs.png",
    description: " ",
  },
  {
    id: 21,
    name: "Nike Mercurial Vapor 16",
    brand: "Nike",
    type: "Speed",
    material: "Synthetic leather",
    wide_position: "front",
    frontwide: "wide",
    midwide: "wide",
    midsole: "mid",
    outsole: "soft",
    link: "/image/bs.png",
    description:
      "인조 가죽으로 다시 돌아온 베이퍼 16입니다. 두툼한 가죽과 편안한 핏으로 변경되었습니다 ",
  },
];

// 질문 데이터
export const questions = [
  {
    id: 1,
    question: "선호하는 브랜드를 선택해주세요.",
    options: ["Nike", "Adidas", "Puma", "기타", "상관 없음"],
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
    options: ["경량", "컨트롤", "착화감"],
    key: "type",
  },

  {
    id: 5,
    question: "가격이 낮은 제품 위주로 찾고 있나요?",
    options: ["낮을수록 좋음", "상관 없음", "비싼게 좋음"],
    key: "cheap",
  },
];

//어드밴스드 모드
export const advancedQuestions = [
  ...questions,
  {
    id: 1,
    question: "원하는 전족부 너비는 어느정도 인가요?",
    options: ["넓음", "중간", "좁음", "상관 없음"],
    key: "frontwide",
  },
  {
    id: 2,
    question: "원하는 중족부 너비는 어느정도 인가요?",
    options: ["넓음", "중간", "좁음", "상관 없음"],
    key: "midwide",
  },

  {
    id: 3,
    question: "원하는 아웃솔의 강도는 어느정도 인가요?",
    options: ["단단", "중간", "유연", "상관 없음"],
    key: "outsole",
  },
];

export default async function uploadShoesData(data) {
  const { data: result, error } = await supabase.from("shoes").insert(shoes);

  if (error) {
    // console.error("Error uploading data:", error);
  } else {
    // console.log("Data uploaded successfully:", result);
  }
}

// uploadShoesData(shoes);

// Function to update data
async function updateShoeData(id, updatedData) {
  const { data, error } = await supabase
    .from("shoes")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    // console.error("Error updating data:", error);
  } else {
    // console.log("Data updated successfully:", data);
  }
}

async function deleteShoeData(id) {
  const { data, error } = await supabase.from("shoes").delete().eq("id", id);

  if (error) {
    // console.error("Error deleting data:", error);
  } else {
    // console.log("Data deleted successfully:", data);
  }
}
