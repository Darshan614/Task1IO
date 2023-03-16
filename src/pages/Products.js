import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import Card from "../Components/UI/Card";

function Posts() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [productList, setproductList] = useState([]);
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
          console.log(data.products);
          setproductList(data.products);
          setloading(false);
        } else {
          navigate("/auth");
        }
      });
  }, [navigate]);
  return (
    <>
      <div className="container px-4" style={{ color: "black" }}>
        <div className="row gy-5 gx-5">
          {productList.map((prod) => {
            return (
              <Card
                title={prod.productname}
                price={prod.price}
                description={prod.description}
                imageURL={prod.imageURL}
                id={prod._id}
              />
            );
          })}
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
}

export default Posts;
