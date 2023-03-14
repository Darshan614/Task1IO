import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import Auth from "./pages/Auth";
import React from "react";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import AddProduct from "./pages/AddProduct";
import { checkAuthLoader, checkRoleLoader } from "./util/auth";
import { useEffect } from "react";
import { authActions } from "./store/index";
import { useDispatch } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth", element: <Auth /> },
      { path: "/products", element: <Products />, loader: checkAuthLoader },
      { path: "/admin", element: <Admin />, loader: checkRoleLoader },
      {
        path: "/admin/addproduct",
        element: <AddProduct />,
        loader: checkRoleLoader,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/checklogin", {
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
