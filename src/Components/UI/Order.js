import { useEffect } from "react";
import classes from "./Order.module.css";

function Order(props) {
  return (
    <>
      <div className="container justify-content-center w-100">
        <div className={classes.box}>
          <div className="d-flex justify-content-end">
            <span className={classes.del}>Delivered</span>
          </div>
          <div>
            {props.products.map((p) => (
              <li
                className={`d-flex justify-content-between ${classes.listitem}`}
              >
                <span>{p.name}</span>
                <span>{p.price}</span>
                <span>x {p.quantity}</span>
              </li>
            ))}
          </div>
          <hr className={classes.dashed}></hr>
          <div className="d-flex justify-content-between">
            <span className={classes.time}>{props.d}</span>{" "}
            <span className={classes.time}>{props.t}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className={classes.bill}>Bill Amount</span>
            <span className={classes.bill}>{props.amount}</span>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Order;
