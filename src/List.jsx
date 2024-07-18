import React, { useState } from "react";
import { shoes } from "./data";
import Modal from "./Modal.jsx";
import "./List.css";

const List = () => {
  const sortedShoes = [...shoes].sort((a, b) => a.name.localeCompare(b.name));
  const [showModal, setShowModal] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState(null);

  const handleModal = (shoe) => {
    setSelectedShoe(shoe);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedShoe(null);
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
    true: "✔",
  };

  const excludedKeys = ["id", "link", "name", "brand", "wide_position"];

  return (
    <div className="list-container">
      <div className="grid">
        {sortedShoes.map((shoe) => (
          <div
            className="grid-item"
            key={shoe.name}
            onClick={() => handleModal(shoe)}
          >
            <p className="shoe-name">{shoe.name}</p>
            <img src={shoe.link} alt={shoe.name} className="shoe-image" />
          </div>
        ))}
      </div>
      <Modal show={showModal}>
        {selectedShoe && (
          <div>
            <h2>{selectedShoe.name}</h2>
            <ul>
              {Object.entries(selectedShoe)
                .filter(([key]) => !excludedKeys.includes(key))
                .map(([key, value]) => (
                  <li key={key}>
                    <strong>{keyToKorean[key] || key}:</strong>{" "}
                    {key === "description"
                      ? value
                      : valueToKorean[value] || value}
                  </li>
                ))}
            </ul>
            <button onClick={closeModal}>닫기</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default List;
