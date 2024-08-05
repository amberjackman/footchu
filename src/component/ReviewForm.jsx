import React, { useState } from "react";
import { useSelector } from "react-redux";
import supabase from "../supabaseClient";
import { getAnonymousUserId } from "./Utils";
import StarRating from "./StarRatingInput";
import "./ReviewForm.css";

const ReviewForm = ({ shoeId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const userId = useSelector((state) => state.user.id);
  const displayName = useSelector((state) => state.user.displayName);
  const isLoggedIn = Boolean(userId);
  const reviewUserId = isLoggedIn ? userId : getAnonymousUserId();
  const reviewDisplayName = isLoggedIn ? displayName : "Anonymous";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("reviews").insert([
      {
        shoe_id: shoeId,
        comment,
        rating,
        user_id: displayName || reviewDisplayName,
      },
    ]);

    if (error) {
      // console.error("Error adding         review:", error);
    } else {
      setComment("");
      setRating(0);
      onReviewAdded(data);
      // console.log(userId);
    }
  };

  return (
    <>
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
    </>
  );
};

export default ReviewForm;
