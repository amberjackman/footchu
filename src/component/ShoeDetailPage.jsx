import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';
import './ShoeDetailPage.css';

const ShoeDetailPage = () => {
  const { id } = useParams();
  const [shoe, setShoe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getYouTubeEmbedUrl = (youtubeLink) => {
    if (!youtubeLink) return null;
    const videoIdMatch = youtubeLink.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };

  useEffect(() => {
    // const fetchShoe = async () => {
    //   setLoading(true);
    //   setError(null);
    //   const { data, error } = await supabase
    //     .from('shoes')
    //     .select('*, shopping_links, youtube_review_link') // 새로운 컬럼 포함
    //     .eq('id', id)
    //     .single();

    //   if (error) {
    //     setError(error.message);
    //     console.error('Error fetching shoe details:', error);
    //     setShoe(null);
    //   } else if (data) {
    //     setShoe(data);
    //   } else {
    //     setError('Shoe not found.');
    //     setShoe(null);
    //   }
    //   setLoading(false);
    // };

    // fetchShoe();
    const temporaryShoeData = {
      id: id,
      name: "샘플 축구화 (ID: " + id + ")",
      link: "/public/image/predator24.png", // 실제 이미지 링크로 대체
      type: "Control",
      material: "Synthetic leather",
      frontwide: "mid",
      midwide: "mid",
      midsole: "mid",
      outsole: "mid",
      cheap: false,
      description: "이것은 축구화의 상세 설명입니다. 페이지 레이아웃 확인을 위한 임시 데이터입니다.",
      shopping_links: [
        { name: "네이버 쇼핑", url: "https://search.shopping.naver.com/" },
        { name: "쿠팡", url: "https://www.coupang.com/" },
      ],
      youtube_review_link: "https://www.youtube.com/watch?v=yebNIHKAC4A",
    };

    setTimeout(() => {
      setShoe(temporaryShoeData);
      setLoading(false);
    }, 500); // 0.5초 딜레이 후 데이터 설정

  }, [id]);

  if (loading) {
    return <div className="shoe-detail-container">로딩 중...</div>;
  }

  if (error) {
    return <div className="shoe-detail-container error-message">에러: {error}</div>;
  }

  if (!shoe) {
    return <div className="shoe-detail-container">축구화 정보를 찾을 수 없습니다.</div>;
  }

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

  const excludedKeys = ["id", "link", "name", "brand", "wide_position", "shopping_links", "youtube_review_link"];

  return (
    <div className="shoe-detail-container">
      <h1>{shoe.name}</h1>
      <img src={shoe.link} alt={shoe.name} className="shoe-detail-image" />
      <div className="shoe-info">
        <ul>
          {Object.entries(shoe)
            .filter(([key]) => !excludedKeys.includes(key))
            .map(([key, value]) => (
              <li key={key}>
                <strong>{keyToKorean[key] || key}:</strong>{" "}
                {key === "description" ? value : valueToKorean[value] || value}
              </li>
            ))}
        </ul>
      </div>
      <div className="youtube-section">
        {shoe.youtube_review_link && (
          <iframe
            width="560"
            height="315"
            src={getYouTubeEmbedUrl(shoe.youtube_review_link || "https://www.youtube.com/watch?v=yebNIHKAC4A")}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          ></iframe>
        )}
      </div>
      <div className="shopping-links-section">
        <h2>구매처</h2>
        {shoe.shopping_links && shoe.shopping_links.length > 0 ? (
          <ul>
            {shoe.shopping_links.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name || link.url}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>등록된 구매처 링크가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ShoeDetailPage;
