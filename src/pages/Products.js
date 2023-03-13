import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";

function Posts() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
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
          setloading(false);
          setshowProducts(true);
        } else {
          navigate("/auth");
        }
      });
  }, []);
  return (
    <>
      <h1>{showProducts && "Products"}</h1>
      {loading && <Loading />}
    </>
  );
}

export default Posts;
