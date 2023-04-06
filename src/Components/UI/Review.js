import classes from "./Review.module.css";

function Review(props) {
  let arr = [];
  for (var i = 0; i < props.reviewData.rating; i++) {
    arr.push(<ion-icon className={classes.star} name="star"></ion-icon>);
  }
  return (
    <div className="container">
      <div className={classes.review}>
        <div className={classes.name}>
          <div className={classes.username}>{props.reviewData.userName}</div>
          <div className={classes.date}>{props.reviewData.date}</div>
        </div>
        <div className={classes.star}>{arr}</div>
        <div>{props.reviewData.feedback}</div>
      </div>
    </div>
  );
}

export default Review;
