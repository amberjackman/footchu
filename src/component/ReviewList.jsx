import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import supabase from "../supabaseClient";
import { getAnonymousUserId } from "./Utils";
import "./ReviewList.css";
import ReviewForm from "./ReviewForm";

const ReviewList = ({ shoeId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useSelector((state) => state.user.displayName) || "Anonymous";

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("shoe_id", shoeId);
      if (error) {
        console.error("Error fetching reviews:", error);
      } else {
        setReviews(data);
      }
    };

    fetchReviews();
  }, [shoeId]);

  const handleDeleteReview = async (reviewId) => {
    // console.log("Attempting to delete review:", reviewId);
    const { data, error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewId);

    if (error) {
      // console.error("Error deleting review:", error);
    } else {
      // console.log("Delete operation result:", data);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    }
  };

  const handleEditReview = async (reviewId, updatedReview) => {
    // console.log(
    //   "Attempting to edit review:",
    //   reviewId,
    //   "with new content:",
    //   updatedReview
    // );
    const { data, error } = await supabase
      .from("reviews")
      .update({ comment: updatedReview })
      .eq("id", reviewId);

    if (error) {
      // console.error("Error updating review:", error);
    } else {
      // console.log("Update operation result:", data);
      setReviews(
        reviews.map((review) =>
          review.id === reviewId
            ? { ...review, comment: updatedReview }
            : review
        )
      );
    }
  };

  const renderStars = (rating) => {
    const validRating = Math.max(0, Math.min(5, rating));

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= validRating ? "filled-star" : "empty-star"}
        >
          ★
        </span>
      );
    }
    return <div className="star-display">{stars}</div>;
  };
  function formattedDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}.${month}.${day}. ${hours}:${minutes}`;
  }

  return (
    <div className="review-list">
      {reviews.length === 0 ? (
        <p>리뷰가 아직 없어요!</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="review-item">
              <div className="review-content">
                <p className="review-user">
                  {review.user_id || "Anonymous"}
                  <br />
                  {formattedDate(review.created_at)}
                  <br />
                </p>
                <p className="review-comment">
                  {review.comment}
                  <br />
                  {renderStars(review.rating)}
                </p>
                {/* 여기 수정하기 */}
                {/* {(review.user_id === userId || displayName) && (
                  <div className="review-actions">
                    <a
                      href="#"
                      onClick={() =>
                        handleEditReview(
                          review.id,
                          prompt("Edit:", review.comment)
                        )
                      }
                    >
                      Edit
                    </a>
                    <a href="#" onClick={() => handleDeleteReview(review.id)}>
                      Delete
                    </a>
                  </div>
                )} */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
