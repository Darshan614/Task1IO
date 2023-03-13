import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import Auth from "./pages/Auth";
import React from "react";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import AddProduct from "./pages/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth", element: <Auth /> },
      { path: "/products", element: <Products /> },
      { path: "/admin", element: <Admin /> },
      { path: "/admin/addproduct", element: <AddProduct /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
