import classes from "./Card.module.css";

function Card(props) {
  return (
    <div className="col-md-4 col-lg-3" style={{ "margin-bottom": "40px" }}>
      <div className={`card`}>
        <div className={classes.mycard}>
          <img
            className={`card-img-top ${classes.img}`}
            src={props.imageURL}
            alt="productimage"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">{props.title}</h5>
          <p class="card-text">{props.description}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">
            $ {props.price}
            <button className={classes.addcart}>Add to Cart</button>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Card;
