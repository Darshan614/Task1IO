import classes from "./Card.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/index";

function Card(props) {
  const dispatch = useDispatch();
  const onAddProduct = () => {
    // dispatch(cartActions.addToCart([props.id, 1]));
    let cart = localStorage.getItem("cart");
    if (!cart == "") cart += " ";
    cart += props.id;
    localStorage.setItem("cart", cart);
    console.log(localStorage.getItem("cart").split(" "));
  };
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
            <button onClick={onAddProduct} className={classes.addcart}>
              Add to Cart
            </button>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Card;
