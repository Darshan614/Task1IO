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
          {/* <div>
            {props.products.map((p) => (
              <li
                className={`d-flex justify-content-between ${classes.listitem}`}
              >
                <span>{p.name}</span>
                <span>{p.price}</span>
                <span>x {p.quantity}</span>
              </li>
            ))}
          </div> */}
          <div className={`row ${classes.data}`}>
            {props.products.map((p) => (
              <>
                <div className="col-md-6 col-6">{p.name}</div>
                <div className="col-md-4 col-4">&#8377; {p.price}</div>
                <div className="col-md-2 col-2 text-right">x {p.quantity}</div>
              </>
            ))}
          </div>
          <hr className={classes.dashed}></hr>
          <div className="d-flex justify-content-between">
            <span className={classes.time}>on {props.d}</span>{" "}
            <span className={classes.time}>at {props.t}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className={classes.bill}>Bill Amount</span>
            <span className={classes.bill}>&#8377; {props.amount}.00</span>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Order;
