import { useEffect, useState } from "react";
import Button from "./UI/Button";
import { useParams } from "react-router-dom";
import ReviewList from "./ReviewList";
import Loading from "./Loading";

function Reviews(props) {
  // const [showReviews, setshowReviews] = useState(false);
  const [loading, setloading] = useState(false);
  const params = useParams();
  // const [reviewList, setReviewList] = useState([]);
  const showToggler = async () => {
    setloading(true);
    await props.fetchReviews();
    setloading(false);
  };

  return (
    <div className="container">
      <Button title="Show reviews" onClick={showToggler} />
      {loading && (
        <p style={{ color: "black", textAlign: "center" }}>...Loading</p>
      )}
      {props.showReviews && <ReviewList reviewList={props.reviewList} />}
    </div>
  );
}

export default Reviews;
