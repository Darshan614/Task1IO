import { useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./AddReview.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

function AddReview() {
  const params = useParams();
  const [showModal, setshowModal] = useState(false);
  const [rating, setrating] = useState(0);
  const [feedback, setfeedback] = useState();
  const changeRating = (val) => {
    console.log(val);
    setrating(val);
  };
  const changefeedback = (event) => {
    console.log(event.target.value);
    setfeedback(event.target.value);
  };
  const onSubmitReview = () => {
    console.log(rating, feedback);
    const token = localStorage.getItem("token");
    fetch("https://ecommerceio.onrender.com/addReview", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: rating,
        feedback: feedback,
        productId: params.productId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message === "Review added successfully") {
          setshowModal(true);
        }
      });
  };
  const onOkay = () => {
    setshowModal(false);
    setshowform(false);
  };
  const [showform, setshowform] = useState(false);
  const showformToggler = () => {
    setshowform(!showform);
  };
  return (
    <div className={classes.box}>
      <div className="container">
        <Button title="Add a review" onClick={showformToggler} />
        {showform && (
          <div className={classes.form}>
            <div className={classes.inputs}>
              <div className={classes.rating}>
                Select rating
                <div className={classes.stars}>
                  <div
                    className={`${
                      rating >= 1 ? classes.staractive : classes.starinactive
                    }`}
                  >
                    <input type="radio" value="1" name="rating" />
                    <ion-icon
                      className={classes.star}
                      name="star"
                      onClick={() => changeRating(1)}
                    ></ion-icon>
                  </div>
                  <div
                    className={`${
                      rating >= 2 ? classes.staractive : classes.starinactive
                    }`}
                  >
                    <input type="radio" value="2" name="rating" />
                    <ion-icon
                      className={classes.star}
                      name="star"
                      onClick={() => changeRating(2)}
                    ></ion-icon>
                  </div>
                  <div
                    className={`${
                      rating >= 3 ? classes.staractive : classes.starinactive
                    }`}
                  >
                    <input type="radio" value="3" name="rating" />
                    <ion-icon
                      className={classes.star}
                      name="star"
                      onClick={() => changeRating(3)}
                    ></ion-icon>
                  </div>
                  <div
                    className={`${
                      rating >= 4 ? classes.staractive : classes.starinactive
                    }`}
                  >
                    <input type="radio" value="4" name="rating" />
                    <ion-icon
                      className={classes.star}
                      name="star"
                      onClick={() => changeRating(4)}
                    ></ion-icon>
                  </div>
                  <div
                    className={`${
                      rating >= 5 ? classes.staractive : classes.starinactive
                    }`}
                  >
                    <input type="radio" value="5" name="rating" />
                    <ion-icon
                      className={classes.star}
                      name="star"
                      onClick={() => changeRating(5)}
                    ></ion-icon>
                  </div>
                </div>
              </div>
              <div>
                <div>Add a feedback</div>
                <textarea
                  onChange={changefeedback}
                  className={classes.textarea}
                />
              </div>
            </div>
            <div className="container">
              <Button title="Submit" onClick={onSubmitReview} />
            </div>
            {showModal && (
              <Modal
                title="Success!"
                message="Review added successfully"
                onClick={onOkay}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddReview;
