import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Posts() {
  const navigate = useNavigate();
  const [showProducts, setshowProducts] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/products", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message === "Product list") {
          setshowProducts(true);
        } else {
          navigate("/auth");
        }
      });
  }, []);
  return <h1>{showProducts && "Products"}</h1>;
}

export default Posts;
