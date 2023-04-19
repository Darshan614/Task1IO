import classes from "./HorizontalCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/index";
import { useEffect, useState } from "react";

function HorizontalCard(props) {
  const dispatch = useDispatch();
  // const quantity = useSelector((state) => {
  //   for (let a = 0; a < state.cart.cart.cartList.length; a++) {
  //     if (state.cart.cart.cartList[a][props.prod._id]) {
  //       return state.cart.cart.cartList[props.prod._id];
  //     }
  //   }
  // });

  // for (let a = 0; a < quantity.length; a++) {
  //   if (quantity[a][props.prod._id]) {
  //     quantity = quantity[a][props.prod._id];
  //   }
  // }
  const quantity = useSelector((state) => state.cart.cart.cartList);
  const [q, setq] = useState(0);

  useEffect(() => {
    console.log("quantity", quantity, props.prod._id);
    for (let x = 0; x < quantity.length; x++) {
      console.log("inloop", quantity[x]);
      if (Object.keys(quantity[x])[0] === props.prod._id) {
        // console.log(x, "found", quantity[x][Object.keys(quantity[x])[0]]);
        setq(quantity[x][Object.keys(quantity[x])[0]]);
      }
    }
    // setq(quantity[1][props.prod._id]);
  }, [quantity]);
  // useEffect(() => {
  //   const contribution = props.prod.price * q;
  //   props.setTotal(props.total + contribution);
  // }, [q]);

  const onAdd = () => {
    const key = props.prod._id;
    dispatch(cartActions.addToCart({ [key]: 1 }));
  };
  const onRemove = () => {
    const key = props.prod._id;
    dispatch(cartActions.removefromcart({ [key]: 1 }));
  };
  return (
    <div class="container">
      <div
        className={`card mb-3 ${classes.card}`}
        style={{ "max-width": "540px" }}
      >
        <div class="row g-0">
          <div className={`col-md-4 col-12 ${classes.mycard}`}>
            <img
              src={props.prod.imageURLs[0]}
              className={`img-fluid rounded-start ${classes.img}`}
              alt="..."
            />
          </div>
          <div class="col-md-8 col-12">
            <div class="card-body">
              <h5 class="card-title">{props.prod.productname}</h5>
              <p class="card-text">{props.prod.description}</p>
              <p class="card-text">
                <small class="text-muted">&#8377; {props.prod.price}</small>
              </p>
              <button className={classes.inc} onClick={onAdd}>
                +
              </button>
              <span className={classes.quantity}>{q}</span>
              <button className={classes.inc} onClick={onRemove}>
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalCard;
