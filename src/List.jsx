import React, { useState, useEffect } from "react";
import Modal from "./Modal.jsx";
import ReviewList from "./component/ReviewList";
import ReviewForm from "./component/ReviewForm.jsx";
import supabase from "./supabaseClient.jsx";
import "./List.css";

const List = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [shoes, setShoes] = useState([]);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [material, setMaterial] = useState("All");
  const [reviewCounts, setReviewCounts] = useState({});

  const fetchReviewCount = async (shoeId) => {
    const { count, error } = await supabase
      .from("reviews")
      .select("id", { count: "exact" })
      .eq("shoe_id", shoeId);

    if (error) {
      console.error("Error fetching review count:", error);
      return 0;
    }
    return count;
  };

  const fetchShoesData = async () => {
    const { data, error } = await supabase.from("shoes").select("*");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setShoes(data);

      // 리뷰 개수를 가져와서 reviewCounts에 저장
      const counts = {};
      for (const shoe of data) {
        counts[shoe.id] = await fetchReviewCount(shoe.id);
      }
      setReviewCounts(counts);
    }
  };

  useEffect(() => {
    fetchShoesData();
  }, []);

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleBrandChange = (brand) => {
    setBrand(brand);
  };

  const handleMaterialChange = (material) => {
    setMaterial(material);
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const handleModal = (shoe) => {
    setSelectedShoe(shoe);
    setShowModal(true);
    setShowReviews(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedShoe(null);
  };

  const handleReviewAdded = () => {
    alert("리뷰가 성공적으로 추가되었습니다!");

    setShowReviews(!showReviews);

    setTimeout(() => {
      setShowReviews(!showReviews);
    }, 100);
  };

  const filteredShoes = shoes.filter((shoe) => {
    const categoryMatch =
      category === "All" || shoe.type.toLowerCase() === category.toLowerCase();
    const brandMatch =
      brand === "All" || shoe.brand.toLowerCase() === brand.toLowerCase();
    const materialMatch =
      material === "All" ||
      shoe.material.toLowerCase() === material.toLowerCase();
    return categoryMatch && brandMatch && materialMatch;
  });

  const sortedShoes = [...filteredShoes].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

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
    true: "O",
    false: "X",
  };

  const excludedKeys = ["id", "link", "name", "brand", "wide_position"];

  return (
    <div className="list-container">
      <div className="category-container">
        <div className="button-group">
          <label>카테고리: </label>
          {["All", "Speed", "Control", "Comport"].map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => handleCategoryChange(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="button-group">
          <label>브랜드: </label>
          {["All", "Adidas", "Nike", "Mizuno", "Puma", "ETC"].map((item) => (
            <button
              key={item}
              className={brand === item ? "active" : ""}
              onClick={() => handleBrandChange(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="button-group">
          <label>소재: </label>
          {["All", "Real leather", "Synthetic leather", "Knit"].map((item) => (
            <button
              key={item}
              className={material === item ? "active" : ""}
              onClick={() => handleMaterialChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="grid">
        {sortedShoes.map((shoe) => (
          <div
            className="grid-item"
            key={shoe.id}
            onClick={() => handleModal(shoe)}
          >
            <p className="shoe-name">{shoe.name}</p>
            <img src={shoe.link} alt={shoe.name} className="shoe-image" />
          </div>
        ))}
      </div>
      <Modal show={showModal}>
        {selectedShoe ? (
          <div className="modal-content">
            <h2 className="shoe-title">{selectedShoe.name}</h2>
            <ul className="shoe-details">
              {Object.entries(selectedShoe)
                .filter(([key]) => !excludedKeys.includes(key))
                .map(([key, value]) => (
                  <li key={key} className="shoe-detail">
                    <strong>{keyToKorean[key] || key}:</strong>{" "}
                    {key === "description"
                      ? value
                      : valueToKorean[value] || value}
                  </li>
                ))}
            </ul>
            <button className="toggle-reviews-btn" onClick={toggleReviews}>
              {showReviews
                ? "리뷰 숨기기"
                : `리뷰 보기 (${reviewCounts[selectedShoe.id] || 0})`}
            </button>
            {showReviews && (
              <div className="reviews-section">
                <ReviewList
                  shoeId={selectedShoe.id}
                  onReviewAdded={handleReviewAdded}
                />
                <ReviewForm
                  shoeId={selectedShoe.id}
                  onReviewAdded={handleReviewAdded}
                />
              </div>
            )}
            <button className="close-modal-btn" onClick={closeModal}>
              닫기
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default List;
