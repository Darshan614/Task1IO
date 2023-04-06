import { useEffect, useState } from "react";
import Button from "./UI/Button";
import { useParams } from "react-router-dom";
import ReviewList from "./ReviewList";

function Reviews(props) {
  const [showReviews, setshowReviews] = useState(false);
  const params = useParams();
  const [reviewList, setReviewList] = useState([]);
  const showToggler = () => {
    const url = "http://localhost:8080/getReviews/" + params.productId;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("review data", data);
        setReviewList(data.reviewsList);
      });
    setshowReviews(!showReviews);
  };

  return (
    <div className="container">
      <Button title="Show reviews" onClick={showToggler} />
      {showReviews && <ReviewList reviewList={reviewList} />}
    </div>
  );
}

export default Reviews;
