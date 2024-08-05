import React, { useState, useEffect } from "react";
import Modal from "./Modal.jsx";
import ReviewList from "./component/ReviewList";
import ReviewForm from "./component/ReviewForm";
import supabase from "./supabaseClient.jsx";
import "./List.css";

const List = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [shoes, setShoes] = useState([]);

  const sortedShoes = [...shoes].sort((a, b) => a.name.localeCompare(b.name));

  const fetchShoesData = async () => {
    const { data, error } = await supabase.from("shoes").select("*");
    if (error) {
      // console.error("Error fetching data:", error);
    } else {
      setShoes(data);
    }
  };

  useEffect(() => {
    fetchShoesData();
  }, []);

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
    setShowReviews(true);
    setSelectedShoe((prevShoe) => ({ ...prevShoe }));
  };

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
              {showReviews ? "리뷰 숨기기" : "리뷰 보기"}
            </button>
            {showReviews && (
              <div className="reviews-section">
                <ReviewList shoeId={selectedShoe.id} />
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
