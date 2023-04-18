import classes from "./CartComponent.module.css";
import Modal from "../../Components/UI/Modal";
import Loading from "../../Components/UI/Loading";
import HorizontalCard from "../../Components/UI/HorizontalCard";
import Button from "../../Components/UI/Button";

function Cart(props) {
  return (
    <>
      {props.loading && <Loading />}
      {!props.loading && props.productList.length === 0 && (
        <p className={classes.empty}>
          Cart is empty
          <p className={classes.icon}>
            <ion-icon name="sad-outline"></ion-icon>
          </p>
        </p>
      )}
      {!props.loading && (
        <div className="container">
          {props.productList.map((c) => {
            return <HorizontalCard prod={c} />;
          })}

          {props.productList.length !== 0 && (
            <Button title="Buy Now" onClick={props.onBuyHandler} />
          )}
          {props.productList.length !== 0 && (
            <Button title="Delete Cart" onClick={props.confirmation} />
          )}
          {props.showModal && (
            <Modal
              title="Confirm!"
              message="Delete Cart?"
              onClick={props.deleteCart}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Cart;
