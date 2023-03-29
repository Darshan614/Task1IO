import classes from "./Card.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/index";
import { useNavigate, useParams } from "react-router-dom";

function Card(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const onAddProduct = (e) => {
    e.stopPropagation();
    const key = props.id;
    dispatch(cartActions.addToCart({ [key]: 1 }));
    // let cart = localStorage.getItem("cart");
    // if (!cart == "") cart += " ";
    // cart += props.id;
    // localStorage.setItem("cart", cart);
    // console.log(localStorage.getItem("cart").split(" "));
  };
  const productClickHandler = () => {
    const page = "/products/" + props.id;
    navigate(page);
  };
  let arr = [];
  for (var i = 0; i < props.rating; i++) {
    arr.push(<ion-icon className={classes.star} name="star"></ion-icon>);
  }
  return (
    <div className={`col-md-4 col-lg-3`} style={{ "margin-bottom": "40px" }}>
      <div onClick={productClickHandler} className={`card ${classes.cards}`}>
        <div className={classes.mycard}>
          <img
            className={`card-img-top ${classes.img}`}
            src={props.imageURL}
            alt="productimage"
          />
        </div>
        <div class="card-body">
          <h5 className={`card-title ${classes.elip}`}>{props.title}</h5>
          <div className={classes.star}>{arr}</div>
          {/* for (var i = 0; i < props.rating; i++) {
      arr.push(<ion-icon name="star"></ion-icon>);
    } */}
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
