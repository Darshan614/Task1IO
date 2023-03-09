import React from "react";
import { useEffect } from "react";

function Posts() {
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
      });
  }, []);
  return <h1>Products</h1>;
}

export default Posts;
