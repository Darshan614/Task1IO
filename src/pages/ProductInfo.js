import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductData from "../Components/UI/ProductData";
import SimilarProducts from "../Components/SimilarProducts";
import Reviews from "../Components/Reviews";
import AddReview from "../Components/AddReview";
import Loading from "../Components/Loading";

function ProductInfo() {
  const errorHandler = () => {
    setError(null);
  };
  console.log("pro info");
  const params = useParams();
  // console.log(typeof params.productId);
  const [showReviews, setshowReviews] = useState(false);
  // const [loading, setloading] = useState(false);
  // const params = useParams();
  const [reviewList, setReviewList] = useState([]);

  const [pname, setpname] = useState();
  const [pprice, setpprice] = useState();
  const [pdesc, setpdesc] = useState();
  const [pimageURL, setpimageURL] = useState();
  const [thumbimages, setthumbimages] = useState([]);
  const [rating, setrating] = useState(1);
  const [id, setid] = useState();
  const [error, setError] = useState();
  const [similar, setsimilar] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setloading(true);
    fetch("https://ecommerceio.onrender.com/productInfo", {
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
        // setReviewList([]);
        setshowReviews(false);
        setpname(data.productData.productname);
        setpprice(data.productData.price);
        setpdesc(data.productData.description);
        setpimageURL(data.productData.imageURLs[0]);
        setthumbimages(data.productData.imageURLs);
        setrating(data.productData.rating);
        setid(data.productData._id);

        //data for similar products
        fetch("https://ecommerceio.onrender.com/similarProducts", {
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
            setloading(false);
          });
      })
      .catch((err) => {
        // console.log("errrrrrrrrrrr", err);
      });
  }, [params.productId]);
  const fetchReviews = async () => {
    const url =
      "https://ecommerceio.onrender.com/getReviews/" + params.productId;
    if (!showReviews) {
      await fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log("review data", data);
          setshowReviews(!showReviews);
          setloading(false);
          setReviewList(data.reviewsList);
        });
    } else {
      setshowReviews(!showReviews);
    }
  };

  return (
    <>
      {/* {pname} {pprice} {pdesc} */}
      {loading && <Loading />}
      {!loading && (
        <>
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
          <Reviews
            reviewList={reviewList}
            showReviews={showReviews}
            fetchReviews={fetchReviews}
          />
          <AddReview />
        </>
      )}
    </>
  );
}

export default ProductInfo;
