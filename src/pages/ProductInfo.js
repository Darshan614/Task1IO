import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function ProductInfo() {
  const params = useParams();
  const [product, setproduct] = useState();
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
        console.log(res.status);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("errrrrrrrrrrr", err);
      });
  }, [params.productId]);
  return <>Product Information{params.productId}</>;
}

export default ProductInfo;
