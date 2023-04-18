import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/index";
import { useLocation, useNavigate } from "react-router-dom";
import CartComponent from "../Components/Cart/CartComponent";

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
    setloading(true);
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
  }, []);
  useEffect(() => {
    // setloading(true);
    let cartdata = [];
    cart.cartList.forEach((c) => {
      cartdata.push({ id: Object.keys(c)[0] });
    });
    const newlist = productList;
    console.log("newlist", newlist, cartdata);
    var filtered = newlist.filter((ele) => {
      for (let x = 0; x < cartdata.length; x++) {
        console.log(ele._id, cartdata[x].id);
        if (cartdata[x].id === ele._id) {
          return true;
        }
      }
      return false;
    });
    console.log("newlist", newlist, cartdata, filtered);
    setproductList(filtered);
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
      <CartComponent
        loading={loading}
        productList={productList}
        onBuyHandler={onBuyHandler}
        confirmation={confirmation}
        deleteCart={deleteCart}
        showModal={showModal}
      />
    </>
  );
}

export default Cart;
