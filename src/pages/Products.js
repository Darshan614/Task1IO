import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../Components/Loading";
import Card from "../Components/UI/Card";
import { useDispatch, useSelector } from "react-redux";

function Products() {
  const [filter, setfilter] = useSearchParams();
  const params = [];
  for (let entry of filter.entries()) {
    params.push(entry);
  }
  console.log(params, Object.fromEntries([...filter]));
  const navigate = useNavigate();
  const [last, setlast] = useState();
  const [loading, setloading] = useState(true);
  const [productList, setproductList] = useState([]);
  const [page, setpage] = useState(1);
  const [count, setCount] = useState();
  const [category, setcategory] = useState(
    Object.fromEntries([...filter])["category"]
  );
  const location = useLocation();
  console.log(params, Object.fromEntries([...filter])["category"]);
  const onNext = () => {
    setpage((page) => page + 1);
    document.documentElement.scrollTop = 0;
  };
  const onPrev = () => {
    setpage((page) => page - 1);
    document.documentElement.scrollTop = 0;
  };
  const onFirst = () => {
    setpage(1);
    document.documentElement.scrollTop = 0;
  };
  const onLast = () => {
    setpage(last);
    document.documentElement.scrollTop = 0;
  };
  useEffect(() => {
    setcategory(Object.fromEntries([...filter])["category"]);
  }, [location]);

  useEffect(() => {
    const url = "https://ecommerceio.onrender.com/productCount/" + category;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setlast(Math.ceil(data.count / 12));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);

  useEffect(() => {
    setloading(true);
    // const url = "https://ecommerceio.onrender.com/productCount/" + category;
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCount(data.count);
    //     setlast(Math.ceil(data.count / 12));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const URL = `https://ecommerceio.onrender.com/products?page=${page}&category=${category}`;
    console.log(URL);
    fetch(URL)
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
          navigate("/");
        }
      });
  }, [category, page]);

  // useEffect(() => {}, [navigate, page, category, filter]);
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          <div style={{ textAlign: "center", padding: "10px" }}>
            <p style={{ color: "black" }}>
              Showing {(page - 1) * 12 + 1} to{" "}
              {(page - 1) * 12 + productList.length} of {count} amazing products
            </p>
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
                    rating={prod.rating}
                    numOfRev={prod.numberOfReviews}
                  />
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* {page > 1 && <SmallButton onclick={onPrev} title="Prev" />} */}
            {/* {count > page * 12 && <SmallButton onclick={onNext} title="Next" />} */}
            {count > 12 && (
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  {page !== 1 && page - 1 > 0 && (
                    <li class="page-item" onClick={onPrev}>
                      <span class="page-link" href="#">
                        Prev
                      </span>
                    </li>
                  )}
                  {page !== 1 && (
                    <li class="page-item" onClick={onFirst}>
                      <span class="page-link" href="#">
                        1
                      </span>
                    </li>
                  )}
                  {page !== 2 && page !== 1 && page - 1 !== 2 && (
                    <li class="page-item">
                      <span class="page-link" href="#">
                        ...
                      </span>
                    </li>
                  )}
                  {page - 1 !== 1 && page - 1 > 0 && (
                    <li class="page-item" onClick={onPrev}>
                      <span class="page-link" href="#">
                        {page - 1}
                      </span>
                    </li>
                  )}
                  (
                  <li class="page-item">
                    <span
                      class="page-link"
                      href="#"
                      style={{ color: "black", border: "2px solid orange" }}
                    >
                      {page}
                    </span>
                  </li>
                  )
                  {page + 1 < last && (
                    <li class="page-item" onClick={onNext}>
                      <span class="page-link" href="#">
                        {page + 1}
                      </span>
                    </li>
                  )}
                  {page !== last - 1 &&
                    page !== last &&
                    page + 1 !== last - 1 && (
                      <li class="page-item">
                        <span class="page-link" href="#">
                          ...
                        </span>
                      </li>
                    )}
                  {page !== last && (
                    <li class="page-item" onClick={onLast}>
                      <span class="page-link" href="#">
                        {last}
                      </span>
                    </li>
                  )}
                  {page + 1 <= last && (
                    <li class="page-item" onClick={onNext}>
                      <span class="page-link" href="#">
                        Next
                      </span>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Products;
