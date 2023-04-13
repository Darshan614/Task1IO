import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Cart.module.css";
import HorizontalCard from "../Components/UI/HorizontalCard";
import Button from "../Components/UI/Button";
import { cartActions } from "../store/index";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../Components/UI/Modal";
import Loading from "../Components/Loading";

function Cart() {
  const [showModal, setshowModal] = useState(false);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteCart = () => {
    setshowModal(false);
    dispatch(cartActions.removeCart());
  };
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const cart = useSelector((state) => state.cart.cart);
  const [productList, setproductList] = useState([]);

  useEffect(() => {
    let cartdata = [];
    cart.cartList.forEach((c) => {
      cartdata.push({ id: Object.keys(c)[0] });
    });

    fetch("https://ecommerceio.onrender.com/cartData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: cartdata,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data in cart", data);
        setloading(false);
        setproductList(data.productData);
      });
  }, [cart]);
  const prevLocation = useLocation();
  const onBuyHandler = (event) => {
    event.preventDefault();
    if (!loggedIn) {
      console.log(prevLocation);
      navigate(`/auth?redirectTo=${prevLocation.pathname}`);
      return;
    }
    console.log("in buy");
    fetch("https://ecommerceio.onrender.com/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: cart,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        window.location.href = data.url;
      });
  };
  const confirmation = () => {
    setshowModal(true);
  };
  return (
    <>
      {loading && <Loading />}
      {!loading && productList.length === 0 && (
        <p className={classes.empty}>
          Cart is empty
          <p className={classes.icon}>
            <ion-icon name="sad-outline"></ion-icon>
          </p>
        </p>
      )}
      {!loading && (
        <div className="container">
          {productList.map((c) => {
            return <HorizontalCard prod={c} />;
          })}

          {productList.length !== 0 && (
            <Button title="Buy Now" onClick={onBuyHandler} />
          )}
          {productList.length !== 0 && (
            <Button title="Delete Cart" onClick={confirmation} />
          )}
          {showModal && (
            <Modal
              title="Confirm!"
              message="Delete Cart?"
              onClick={deleteCart}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Cart;
