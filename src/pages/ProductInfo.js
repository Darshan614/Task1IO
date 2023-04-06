import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductData from "../Components/UI/ProductData";
import SimilarProducts from "../Components/SimilarProducts";
import Reviews from "../Components/Reviews";
import AddReview from "../Components/AddReview";

function ProductInfo() {
  const errorHandler = () => {
    setError(null);
  };
  console.log("pro info");
  const params = useParams();
  // console.log(typeof params.productId);

  const [pname, setpname] = useState();
  const [pprice, setpprice] = useState();
  const [pdesc, setpdesc] = useState();
  const [pimageURL, setpimageURL] = useState();
  const [thumbimages, setthumbimages] = useState([]);
  const [rating, setrating] = useState(1);
  const [id, setid] = useState();
  const [error, setError] = useState();
  const [similar, setsimilar] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/productInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: params.productId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setpname(data.productData.productname);
        setpprice(data.productData.price);
        setpdesc(data.productData.description);
        setpimageURL(data.productData.imageURLs[0]);
        setthumbimages(data.productData.imageURLs);
        setrating(data.productData.rating);
        setid(data.productData._id);

        //data for similar products
        fetch("http://localhost:8080/similarProducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: data.productData.category,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setsimilar(data.data);
          });
      })
      .catch((err) => {
        // console.log("errrrrrrrrrrr", err);
      });
  }, [params.productId]);
  return (
    <>
      {/* {pname} {pprice} {pdesc} */}
      <ProductData
        pname={pname}
        pprice={pprice}
        pdesc={pdesc}
        pimageURL={pimageURL}
        thumbimages={thumbimages}
        rating={rating}
        id={id}
      />
      <SimilarProducts products={similar} />
      <Reviews />
      <AddReview />
    </>
  );
}

export default ProductInfo;
