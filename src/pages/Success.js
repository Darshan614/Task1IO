import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/index";

function Success() {
  const cart = useSelector((state) => state.cart.cart);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://localhost:8080/placeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        cart: cart.cartList,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        dispatch(cartActions.removeCart());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <p>
      We appreciate your business! If you have any questions, please email
      <a href="mailto:orders@example.com">orders@example.com</a>.
    </p>
  );
}

export default Success;
