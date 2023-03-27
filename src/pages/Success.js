import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Success() {
  const cart = useSelector((state) => state.cart.cart);
  const token = localStorage.getItem("token");
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cart]);
  return (
    <p>
      We appreciate your business! If you have any questions, please email
      <a href="mailto:orders@example.com">orders@example.com</a>.
    </p>
  );
}

export default Success;
