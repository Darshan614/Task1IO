import classes from "./AddForm.module.css";
import Title from "./UI/Title";
import TextField from "./UI/TextField";
import { useEffect, useState } from "react";
import Button from "./UI/Button";
import validatefield from "../validator/validator";
import { useNavigate } from "react-router-dom";
import Error from "./UI/Error";
import { useLocation, useSearchParams } from "react-router-dom";
import Loading from "./Loading";

function EditForm() {
  const [loading, setloading] = useState(true);
  const [filter, setfilter] = useSearchParams();
  const [productname, setproductname] = useState();
  const [productnamevalid, setproductnamevalid] = useState("valid");
  const productnameChangeHandler = (event) => {
    setproductname(event.target.value);
    setproductnamevalid(
      validatefield(
        {
          required: true,
          maxlength: 10,
          minlength: 2,
        },
        event.target.value
      )
    );
  };
  const [category, setcategory] = useState("Category");

  const [price, setprice] = useState(0);
  const [pricevalid, setpricevalid] = useState("valid");
  const priceChangeHandler = (event) => {
    setprice(event.target.value);
    setpricevalid(
      validatefield(
        {
          required: true,
          isnum: true,
          minValue: 0,
        },
        event.target.value
      )
    );
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    fetch("https://ecommerceio.onrender.com/productInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: Object.fromEntries([...filter])["prodId"],
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("dataaaaaaaaaa", data);
        // console.log()
        setproductname(data.productData.productname);
        setcategory(data.productData.category);
        setImageUrls(data.productData.imageURLs);
        setprice(data.productData.price);
        setavailable(data.productData.available_quantity);
        setdescription(data.productData.description);
        setloading(false);
      });
  }, []);
  const navigate = useNavigate();

  const [available, setavailable] = useState();
  const [availablevalid, setavailablevalid] = useState("valid");
  const availableChangeHandler = (event) => {
    setavailable(event.target.value);
    setavailablevalid(
      validatefield(
        {
          required: true,
          isnum: true,
          minValue: 0,
        },
        event.target.value
      )
    );
  };
  const [description, setdescription] = useState();
  const [descriptionvalid, setdescriptionvalid] = useState("valid");
  const descriptionChangeHandler = (event) => {
    setdescription(event.target.value);
    setdescriptionvalid(
      validatefield(
        {
          minLength: 5,
          required: true,
          maxLength: 50,
        },
        event.target.value
      )
    );
  };
  const [error, setError] = useState();
  const onEditForm = () => {
    console.log("in add form");
    console.log(
      productnamevalid,
      descriptionvalid,
      imageUrlsValid,
      availablevalid,
      pricevalid
    );
    setError(imageUrlsValid);
    const imageValid = imageUrlsValid.filter((e) => e !== "valid");
    console.log(113, imageValid.length > 0);
    if (
      productnamevalid !== "valid" ||
      descriptionvalid !== "valid" ||
      imageValid.length > 0 ||
      availablevalid !== "valid" ||
      pricevalid !== "valid"
    ) {
      setError("Invalid values");
      return;
    }
    const token = localStorage.getItem("token");
    const url2 = "http://localhost:8080/editproduct";
    const url1 = "https://ecommerceio.onrender.com/editproduct";
    fetch(url1, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productname: productname,
        imageURLs: imageUrls,
        price: price,
        availablequantity: available,
        description: description,
        category: category,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message === "Product edited") {
          document.documentElement.scrollTop = 0;
          navigate("/products?category=all");
        } else {
          // setError(data.message);
          alert("failed");
        }
      })
      .catch((err) => {
        setError("Request Failed");
      });
  };

  const [imageUrls, setImageUrls] = useState([""]);
  const [imageUrlsValid, setImageUrlsValid] = useState([]);
  const addImageUrl = () => {
    setImageUrls([...imageUrls, ""]);
    setImageUrlsValid([...imageUrlsValid, null]); // add null for newly added field
  };
  const imageurlChangeHandler = (e, index) => {
    const newImageUrls = [...imageUrls];
    const newImageUrlsValid = [...imageUrlsValid];
    newImageUrls[index] = e.target.value;
    newImageUrlsValid[index] = validatefield(
      {
        required: true,
        url: true,
      },
      e.target.value
    );
    setImageUrls(newImageUrls);
    setImageUrlsValid(newImageUrlsValid);
  };

  const removeImageUrl = (index) => {
    console.log(imageUrls);
    const newImageUrls = [...imageUrls];
    const newImageUrlsValid = [...imageUrlsValid];
    newImageUrls.splice(index, 1);
    newImageUrlsValid.splice(index, 1);
    console.log("niu", newImageUrls, "niuv", newImageUrlsValid);
    setImageUrls(newImageUrls);
    setImageUrlsValid(newImageUrlsValid);
  };

  return (
    <>
      {loading && <Loading />}
      <section className={classes.box}>
        {error && <Error title={error} />}
        <Title title="Edit Product" />
        <TextField
          label="Product Name"
          req={true}
          icon="mail-outline"
          onChange={productnameChangeHandler}
          valid={productnamevalid}
          value={productname}
        />

        {imageUrls.map((imageUrl, index) => (
          <div key={index}>
            <TextField
              label={`Image URL #${index + 1}`}
              req={true}
              icon="image-outline"
              value={imageUrls[index]}
              onChange={(e) => imageurlChangeHandler(e, index)}
              valid={imageUrlsValid[index]}
            />
            <div className={classes.rem}>
              <button
                className={classes.remove}
                type="button"
                onClick={() => removeImageUrl(index)}
              >
                {index + 1 > 1 && (
                  <ion-icon name="remove-circle-outline"></ion-icon>
                )}
              </button>
            </div>
          </div>
        ))}
        <div className={classes.addbutton}>
          <button className={classes.add} type="button" onClick={addImageUrl}>
            Add more images
          </button>
        </div>
        <TextField
          label="Price"
          req={true}
          icon="pricetag-outline"
          onChange={priceChangeHandler}
          valid={pricevalid}
          value={price}
        />
        <div className={`btn-group dropright ${classes.cat}`}>
          <button
            type="button"
            class="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {category}
          </button>
          <div class="dropdown-menu">
            <div
              className={`dropdown-item ${classes.category}`}
              onClick={() => setcategory("Laptop")}
            >
              Laptop
            </div>
            <div
              className={`dropdown-item ${classes.category}`}
              onClick={() => setcategory("Mobile")}
            >
              Mobile
            </div>
            <div
              className={`dropdown-item ${classes.category}`}
              onClick={() => setcategory("TV")}
            >
              TV
            </div>
            <div
              className={`dropdown-item ${classes.category}`}
              onClick={() => setcategory("Fridge")}
            >
              Fridge
            </div>
            <div
              class="dropdown-item"
              onClick={() => setcategory("Headphones")}
            >
              Headphones
            </div>
          </div>
        </div>
        {/* <TextField
          label="Available Quantity"
          req={true}
          icon="add-circle-outline"
          onChange={availableChangeHandler}
          valid={availablevalid}
          value={available}
        /> */}
        <TextField
          label="Product Description"
          req={true}
          icon="information-circle-outline"
          onChange={descriptionChangeHandler}
          valid={descriptionvalid}
          value={description}
        />
        <Button title="Edit Product" onClick={onEditForm} />
      </section>
    </>
  );
}

export default EditForm;
