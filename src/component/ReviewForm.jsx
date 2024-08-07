import React, { useState } from "react";
import { useSelector } from "react-redux";
import supabase from "../supabaseClient";
import { getAnonymousUserId } from "./Utils";
import StarRating from "./StarRatingInput";
import "./ReviewForm.css";

const ReviewForm = ({ shoeId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state.user.id);
  const displayName = useSelector((state) => state.user.displayName);
  const isLoggedIn = Boolean(userId);
  const reviewUserId = isLoggedIn ? userId : getAnonymousUserId();
  const reviewDisplayName = isLoggedIn ? displayName : "Anonymous";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("리뷰를 작성해주세요.");
      return;
    }
    if (rating === 0) {
      alert("평점을 선택해주세요.");
      return;
    }

    const newReview = {
      shoe_id: shoeId,
      comment,
      rating,
      user_id: reviewDisplayName,
    };

    const { data, error } = await supabase.from("reviews").insert([newReview]);

    if (error) {
      console.error("Error adding review:", error);
      setError("리뷰를 추가하는 중 오류가 발생했습니다.");
    } else {
      setComment("");
      setRating(0);
      setError(null);
      onReviewAdded();
    }
  };

  return (
    <div className="review-form-container">
      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="리뷰를 작성해주세요"
        />
        <StarRating rating={rating} onRatingChange={setRating} />
        <button type="submit">완료</button>
      </form>
    </div>
  );
};

export default ReviewForm;
