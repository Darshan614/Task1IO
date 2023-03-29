import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Cart.module.css";
import HorizontalCard from "../Components/UI/HorizontalCard";
import Button from "../Components/UI/Button";
import { cartActions } from "../store/index";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteCart = () => {
    dispatch(cartActions.removeCart());
  };
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const cart = useSelector((state) => state.cart.cart);
  // const cart = localStorage.getItem("cart").split(" ");
  const [productList, setproductList] = useState([]);
  // const [cartdata, setcartdata] = useState([]);
  // useEffect(() => {
  // let cartdata = [];
  // cart.cartList.forEach((c) => {
  //   cartdata.push({ id: Object.keys(c)[0] });
  // });
  // }, []);

  useEffect(() => {
    let cartdata = [];
    cart.cartList.forEach((c) => {
      cartdata.push({ id: Object.keys(c)[0] });
    });

    fetch("http://localhost:8080/cartData", {
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
        setproductList(data.productData);
      });
  }, [cart]);
  const onBuyHandler = (event) => {
    event.preventDefault();
    if (!loggedIn) {
      navigate("/auth");
      return;
    }
    console.log("in buy");
    fetch("http://localhost:8080/create-checkout-session", {
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
  return (
    <div style={{ width: "540px", margin: "auto" }}>
      {productList.map((c) => {
        return <HorizontalCard prod={c} />;
      })}

      <Button title="Buy Now" onClick={onBuyHandler} />
      <Button title="Delete Cart" onClick={deleteCart} />
    </div>
  );
}

export default Cart;
