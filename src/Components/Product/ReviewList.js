import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Review from "./Review";

function ReviewList(props) {
  return (
    <div>
      {props.reviewList.length === 0 && (
        <p style={{ color: "black", textAlign: "center" }}>
          No reviews for this product
        </p>
      )}
      {props.reviewList.map((r) => {
        return <Review reviewData={r} />;
      })}
    </div>
  );
}

export default ReviewList;
