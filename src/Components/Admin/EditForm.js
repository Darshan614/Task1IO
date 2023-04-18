import classes from "./AddForm.module.css";
import Title from "../Form/Title";
import TextField from "../Form/TextField";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import validatefield from "../../validator/validator";
import { useNavigate } from "react-router-dom";
import Error from "../UI/Error";
import { useLocation, useSearchParams } from "react-router-dom";
import Loading from "../UI/Loading";
import Modal from "../UI/Modal";

function EditForm() {
  const [loading, setloading] = useState(true);
  const [filter, setfilter] = useSearchParams();
  const [productname, setproductname] = useState();
  const [productnamevalid, setproductnamevalid] = useState("valid");
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([""]);
  const [showModal, setshowModal] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [imageUrlsValid, setImageUrlsValid] = useState([]);
  const [deletedModal, showDeletedModal] = useState(false);
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
        const arr = Array(data.productData.imageURLs.length).fill("valid");
        setImageUrlsValid(arr);
        console.log("imageUrlsvalid", imageUrlsValid);
        setloading(false);
      });
  }, []);

  const onEditForm = () => {
    setloading(true);
    console.log("in edit form");
    console.log(
      productnamevalid,
      descriptionvalid,
      imageUrlsValid,
      availablevalid,
      pricevalid
    );
    console.log(productname, description, imageUrls, available, price);
    // setError(imageUrlsValid);
    const imageValid = imageUrlsValid.filter((e) => e !== "valid");
    // console.log(113, imageValid.length > 0);
    if (
      productnamevalid !== "valid" ||
      descriptionvalid !== "valid" ||
      imageValid.length > 0 ||
      availablevalid !== "valid" ||
      pricevalid !== "valid"
    ) {
      setloading(false);
      setError("Invalid values");
      return;
    }
    const token = localStorage.getItem("token");
    const url2 = "http://localhost:8080/editproduct";
    const url1 = "https://ecommerceio.onrender.com/editproduct";
    console.log(productname, imageUrls, price, available);
    fetch(url1, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: Object.fromEntries([...filter])["prodId"],
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
          setloading(false);
          setshowModal(true);
          // navigate();
        } else {
          setError(data.message);
          setloading(false);
          // alert("failed");
        }
      })
      .catch((err) => {
        setError("Request Failed");
      });
  };
  const onDelete = () => {
    setshowDeleteModal(false);
    setloading(true);
    const token = localStorage.getItem("token");
    const url2 = "http://localhost:8080/deleteProduct";
    const url1 = "https://ecommerceio.onrender.com/deleteProduct";
    fetch(url1, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: Object.fromEntries([...filter])["prodId"],
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message === "Product deleted") {
          document.documentElement.scrollTop = 0;
          setloading(false);
          showDeletedModal(true);
          // navigate("/products?category=all");
          // setshowDeleteModal(true);
          // navigate();
        } else {
          setError(data.message);
          setloading(false);
          // alert("failed");
        }
      })
      .catch((err) => {
        setError("Request Failed");
      });
  };
  const onClose = () => {
    setshowModal(false);
    navigate("/products?category=all");
  };
  const onShowDelete = () => {
    setshowDeleteModal(true);
  };
  const onDeleted = () => {
    setshowDeleteModal(false);
    navigate("/products?category=all");
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
            class={`btn ${
              category !== "Category" ? "btn-success" : "btn-secondary"
            } dropdown-toggle`}
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
              className={`dropdown-item ${classes.category}`}
              onClick={() => setcategory("Computer Accessories")}
            >
              Computer Accessories
            </div>
            <div
              className={`dropdown-item ${classes.category}`}
              onClick={() => setcategory("watches")}
            >
              Watches
            </div>
            <div
              className={`dropdown-item ${classes.category}`}
              onClick={() => setcategory("Camera")}
            >
              Camera
            </div>
            <div
              className={`dropdown-item ${classes.category}`}
              onClick={() => setcategory("Sound")}
            >
              Sound
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
        <Button title="Delete Product" onClick={onShowDelete} />
      </section>
      {showModal && (
        <Modal title="Success!" message="Product Edited" onClick={onClose} />
      )}
      {showDeleteModal && (
        <Modal
          title="Warning!"
          message="Are you sure you want to delete product?"
          onClick={onDelete}
        />
      )}
      {deletedModal && (
        <Modal
          title="Success!"
          message="Product deleted successfully"
          onClick={onDeleted}
        />
      )}
    </>
  );
}

export default EditForm;
