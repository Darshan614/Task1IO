import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Review from "./UI/Review";

function ReviewList(props) {
  return (
    <div>
      {props.reviewList.map((r) => {
        return <Review reviewData={r} />;
      })}
    </div>
  );
}

export default ReviewList;
