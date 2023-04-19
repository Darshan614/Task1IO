import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import React, { useState } from "react";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import Cancel from "./pages/Cancel";
import ProductInfo from "./pages/ProductInfo";
import Modify from "./pages/Modify";
import Success from "./pages/Success";
import { checkRoleLoader } from "./util/auth";
import { useEffect } from "react";
import { authActions } from "./store/index";
import { useDispatch } from "react-redux";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/Contact";
import Loading from "./Components/UI/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth", element: <Auth /> },
      { path: "/products", element: <Products /> },
      { path: "/admin", element: <Admin />, loader: checkRoleLoader },
      { path: "/cart", element: <Cart /> },
      { path: "/success", element: <Success /> },
      { path: "/cancel", element: <Cancel /> },
      { path: "/myorder", element: <MyOrders /> },
      { path: "/profile", element: <Profile /> },
      {
        path: "/admin/:modify",
        element: <Modify />,
        loader: checkRoleLoader,
      },
      {
        path: "/product/:productId",
        element: <ProductInfo />,
      },
      {
        path: "/reset/:token",
        element: <ResetPassword />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

function App() {
  const [loading, setloading] = useState(false);
  console.log("in app running");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("use effect running");
    setloading(true);
    const token = localStorage.getItem("token");
    const url1 = "https://ecommerceio.onrender.com/checklogin";
    const url2 = "http://localhost:8080/checklogin";
    fetch(url1, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message === "Some problem in authentication") {
          setloading(false);
          dispatch(authActions.logout());
        } else if (data.message === "Invalid token") {
          setloading(false);
          dispatch(authActions.logout());
        } else if (data.message === "User is logged in") {
          console.log("setting the user role", data.role);
          setloading(false);
          dispatch(authActions.login(data.role));
        }
      });
  }, [dispatch]);
  return <>{loading ? <Loading /> : <RouterProvider router={router} />}</>;
}

export default App;
