// Footer.jsx
import React, { useState } from "react";
import Modal from "./Modal";
import "./Modal.css";
import "./Footer.css";
import { shoes } from "./data";

const Footer = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  const toggleAboutModal = () => setShowAbout(!showAbout);
  const toggleNoticeModal = () => setShowNotice(!showNotice);

  const shoeNames = shoes.map((shoe) => shoe.name);

  return (
    <div className="footer-container">
      <div className="footer-inner-container">
        <div onClick={toggleAboutModal} style={{ cursor: "pointer" }}>
          About
        </div>
        <div onClick={toggleNoticeModal} style={{ cursor: "pointer" }}>
          Notice
        </div>
      </div>
      <div>문의사항, 수정사항 🙏 footchu.contact@gmail.com</div>
      <a
        onClick={() => window.open("https://naver.me/xEAuswq8", "_blank")}
        style={{ cursor: "pointer" }}
      >
        피드백 남기기
      </a>

      {/* About Modal */}
      <Modal show={showAbout}>
        <div>
          <h2>About</h2>
          <p>ABOUT</p>
          <button onClick={toggleAboutModal}>Close</button>
        </div>
      </Modal>

      {/* Notice Modal */}
      <Modal show={showNotice}>
        <div>
          <h2>Notice</h2>
          <p>현재 확인할 수 있는 축구화 리스트</p>
          {shoeNames.map((name, index) => (
            <p key={index}>{name}</p>
          ))}
          <button onClick={toggleNoticeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default Footer;
