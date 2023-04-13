import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import React from "react";
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
import Update from "./Components/Update";
import Contact from "./pages/Contact";

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
  console.log("in app running");
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://ecommerceio.onrender.com/checklogin", {
      method: "GET",
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
          dispatch(authActions.logout());
        } else if (data.message === "Invalid token") {
          dispatch(authActions.logout());
        } else if (data.message === "User is logged in") {
          dispatch(authActions.login(data.role));
        }
      });
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
