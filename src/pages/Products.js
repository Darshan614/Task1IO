import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import Card from "../Components/UI/Card";
import SmallButton from "../Components/UI/SmallButton";

function Posts() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [productList, setproductList] = useState([]);
  const [page, setpage] = useState(1);
  const [count, setCount] = useState();
  const onNext = () => {
    setpage((page) => page + 1);
    document.documentElement.scrollTop = 0;
  };
  const onPrev = () => {
    setpage((page) => page - 1);
    document.documentElement.scrollTop = 0;
  };
  useEffect(() => {
    fetch("http://localhost:8080/productCount")
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const URL = "http://localhost:8080/products/" + page;
    console.log(URL);
    fetch(URL, {
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
          if (data.products.length === 0) setpage((page) => page - 1);
        } else {
          navigate("/auth");
        }
      });
  }, [navigate, page]);
  return (
    <>
      {loading && <Loading />}
      <div style={{ textAlign: "center", padding: "10px" }}>
        Found {count} amazing products
      </div>
      <div className="container px-4" style={{ color: "black" }}>
        <div className="row gy-5 gx-5">
          {productList.map((prod) => {
            return (
              <Card
                title={prod.productname}
                price={prod.price}
                description={prod.description}
                imageURL={prod.imageURLs[0]}
                id={prod._id}
              />
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {page > 1 && <SmallButton onclick={onPrev} title="Prev" />}
        {count > page * 12 && <SmallButton onclick={onNext} title="Next" />}
      </div>
    </>
  );
}

export default Posts;
