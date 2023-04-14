import classes from "./Card.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/index";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Card(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const roles = useSelector((state) => state.auth.role);
  const onAddProduct = (e) => {
    e.stopPropagation();
    const key = props.id;
    dispatch(cartActions.addToCart({ [key]: 1 }));
  };
  const productClickHandler = () => {
    document.documentElement.scrollTop = 0;
    const page = "/product/" + props.id;
    navigate(page);
    // window.location.reload(true);
  };
  let arr = [];
  for (var i = 1; i <= Math.round(props.rating); i++) {
    arr.push(<ion-icon className={classes.star} name="star"></ion-icon>);
  }

  const [q, setq] = useState(0);
  const quantity = useSelector((state) => state.cart.cart.cartList);
  useEffect(() => {
    // console.log("quantity", quantity, props.id);
    for (let x = 0; x < quantity.length; x++) {
      console.log("inloop", quantity[x], props.id);
      if (Object.keys(quantity[x])[0] == props.id) {
        // console.log(x, "found", quantity[x][Object.keys(quantity[x])[0]]);
        setq(quantity[x][Object.keys(quantity[x])[0]]);
        return;
      }
    }
    setq(0);
    // setq(quantity[1][props.prod._id]);
  }, [quantity, props.id]);
  const onAdd = (e) => {
    e.stopPropagation();
    const key = props.id;
    dispatch(cartActions.addToCart({ [key]: 1 }));
  };
  const onRemove = (e) => {
    e.stopPropagation();
    const key = props.id;
    dispatch(cartActions.removefromcart({ [key]: 1 }));
  };
  const onedit = (e) => {
    e.stopPropagation();
    const url = "/admin/editProduct?prodId=" + props.id;
    navigate(url);
  };
  return (
    <div className={`col-md-4 col-lg-3`} style={{ "margin-bottom": "40px" }}>
      <div onClick={productClickHandler} className={`card ${classes.cards}`}>
        <div className={classes.mycard}>
          <img
            className={`card-img-top ${classes.img}`}
            src={props.imageURL}
            alt="productimage"
          />
          {roles === "admin" && (
            <button className={classes.edit} onClick={onedit}>
              <ion-icon name="pencil-outline"></ion-icon>
            </button>
          )}
        </div>
        <div class="card-body">
          <h5 className={`card-title ${classes.elip}`}>{props.title}</h5>
          <div className={classes.star}>
            <div>{arr}</div>
            <div className={classes.nor}>({props.numOfRev})</div>
          </div>

          {/* for (var i = 0; i < props.rating; i++) {
      arr.push(<ion-icon name="star"></ion-icon>);
    } */}
        </div>
        <div class="card-footer">
          <small class="text-muted">&#8377; {props.price}</small>
          {q === 0 ? (
            <button onClick={onAddProduct} className={classes.addcart}>
              <small>Add to Cart</small>
            </button>
          ) : (
            <span className={classes.quant}>
              <button className={classes.inc} onClick={onAdd}>
                +
              </button>
              <span className={classes.quantity}>{q}</span>
              <button className={classes.inc} onClick={onRemove}>
                -
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
