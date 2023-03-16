import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Cart.module.css";
import HorizontalCard from "../Components/UI/HorizontalCard";
import Button from "../Components/UI/Button";

function Cart() {
  // const cart = useSelector((state) => state.cart.cartList);
  const cart = localStorage.getItem("cart").split(" ");
  const [productList, setproductList] = useState([]);
  let cartdata = [];
  cart.forEach((c) => {
    cartdata.push({ id: c });
  });
  console.log(cartdata);
  useEffect(() => {
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
        console.log(data);
        setproductList(data.productData);
      });
  }, []);

  return (
    <div style={{ width: "540px", margin: "auto" }}>
      {productList.map((c) => {
        return <HorizontalCard prod={c} />;
      })}
      <Button title="Buy Now" />
    </div>
  );
}

export default Cart;
