import React, { useState } from "react";
import Modal from "./Modal";
import "./Footer.css";
import { shoes } from "./data";
import { Carousel } from "react-bootstrap";
import "./custom.scss";

const Footer = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  const toggleAboutModal = () => setShowAbout(!showAbout);
  const toggleNoticeModal = () => setShowNotice(!showNotice);

  const shoeNames = shoes.map((shoe) => shoe.name);
  // const sortedshoeNames = [...shoeNames].sort();

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
        style={{ cursor: "pointer", color: "blue" }}
      >
        피드백 남기기
      </a>

      <Modal show={showAbout}>
        <div>
          <h2>About</h2>
          <p>
            {" "}
            발이 편한 축구화를 찾는 분들을 위해 제작되었습니다.
            <br />
            사용 후 가능하시다면 피드백 부탁드립니다.
          </p>
          <p></p>
          <button onClick={toggleAboutModal}>Close</button>
        </div>
      </Modal>

      {/* Notice Modal */}
      <Modal show={showNotice}>
        <div className="noticeContainer">
          <h2>Notice</h2>
          <Carousel
            wrap={true}
            pause="hover"
            keyboard={true}
            controls={false}
            indicators={true}
            touch={true}
          >
            <Carousel.Item>
              <h5>24 / 08 / 07</h5>
              <p>회원가입이 생겼습니다.</p>
              <p>이제 List의 목록에서 리뷰를 작성할 수 있습니다</p>
              <p>List에서 카테고리별로 검색할 수 있습니다</p>
              <p>ultra5, vapor16, f50 추가되었습니다</p>
              <p>설명 빠른 시일 내에 업로드 하겠습니다</p>
            </Carousel.Item>
            <Carousel.Item>
              <h5>24/7/18</h5>
              <p>1. 전체적인 가시성을 업데이트 하였습니다</p>
              <p>
                2. 상단 LIST를 통해 확인할 수 있는 축구화 목록을 생성하였습니다
              </p>
              <p>3. 리뷰 기능 준비 중에 있습니다</p>
            </Carousel.Item>
          </Carousel>

          <button onClick={toggleNoticeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default Footer;
