import classes from "./AddForm.module.css";
import Title from "../Form/Title";
import TextField from "../Form/TextField";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import validatefield from "../../validator/validator";
import { useNavigate } from "react-router-dom";
import Error from "../UI/Error";
import Loading from "../UI/Loading";
import Modal from "../UI/Modal";

function AddForm() {
  const [showModal, setshowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [productname, setproductname] = useState("");
  const [productnamevalid, setproductnamevalid] = useState();
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
  // const [categoryvalid, setcategoryvalid] = useState();
  // const categoryChangeHandler = (event) => {
  //   setcategory(event.target.value);
  //   setcategoryvalid(
  //     validatefield(
  //       {
  //         required: true,
  //         maxlength: 10,
  //         minlength: 2,
  //       },
  //       event.target.value
  //     )
  //   );
  // };
  const onClose = () => {
    setshowModal(false);
    navigate("/products?category=all");
  };
  const [price, setprice] = useState("");
  const [pricevalid, setpricevalid] = useState();
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
  const [available, setavailable] = useState("");
  const [availablevalid, setavailablevalid] = useState();
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
  const [description, setdescription] = useState("");
  const [descriptionvalid, setdescriptionvalid] = useState();
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

  const onAddForm = () => {
    setproductnamevalid(
      validatefield(
        {
          required: true,
          maxLength: 25,
          minLength: 2,
        },
        productname
      )
    );
    setdescriptionvalid(
      validatefield(
        {
          minLength: 5,
          required: true,
          maxLength: 50,
        },
        description
      )
    );
    setpricevalid(
      validatefield(
        {
          required: true,
          isnum: true,
          minValue: 0,
        },
        price
      )
    );
    setavailablevalid(
      validatefield(
        {
          required: true,
          isnum: true,
          minValue: 0,
        },
        available
      )
    );
    imageUrlsValid.length === 0 && setImageUrlsValid(["Required"]);
    // imageUrlsValid.length === 0 && console.log(imageUrlsValid);
    // console.log("in add form");
    // console.log(
    //   productnamevalid,
    //   descriptionvalid,
    //   imageUrlsValid,
    //   availablevalid,
    //   pricevalid
    // );
    // setError(imageUrlsValid);

    const imageValid = imageUrlsValid.filter((e) => e !== "valid");
    console.log(113, imageUrlsValid, imageValid.length > 0);
    const categoryvalid =
      category !== "Category" && category !== "" ? true : false;
    setcategoryValid(categoryvalid);
    console.log("productnamevalid", productnamevalid);
    if (
      productnamevalid !== "valid" ||
      descriptionvalid !== "valid" ||
      imageUrls.length === 0 ||
      imageValid.length > 0 ||
      !imageUrlsValid.length > 0 ||
      availablevalid !== "valid" ||
      pricevalid !== "valid" ||
      !categoryvalid
    ) {
      setError("Invalid values");
      return;
    }
    const token = localStorage.getItem("token");
    setloading(true);
    const url2 = "http://localhost:8080/addproduct";
    const url1 = "https://ecommerceio.onrender.com/addproduct";
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
        if (data.message === "Product added") {
          setloading(false);
          setshowModal(true);
          // navigate("/products?category=all");
        } else {
          setloading(false);
          setError(data.message);
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
  const [categoryValid, setcategoryValid] = useState(null);
  useEffect(() => {
    category !== "Category" && setcategoryValid(true);
  }, [category]);
  return (
    <>
      {loading && <Loading />}
      <section className={classes.box}>
        {error && <Error title={error} />}
        <Title title="Add Product" />
        <TextField
          label="Product Name"
          req={true}
          icon="mail-outline"
          onChange={productnameChangeHandler}
          valid={productnamevalid}
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
          {/* <button
            onClick={addImageUrl}
            className={`classes.add ${
              imageUrls[0] === "" ? "btn-danger" : "btn-success"
            }`}
          >
            Add more images
          </button> */}
        </div>
        <TextField
          label="Price"
          req={true}
          icon="pricetag-outline"
          onChange={priceChangeHandler}
          valid={pricevalid}
        />
        <div className={`btn-group dropright ${classes.cat}`}>
          <button
            type="button"
            class={`btn ${
              categoryValid !== null &&
              (categoryValid ? "btn-success" : "btn-danger")
            } btn-secondary
             dropdown-toggle`}
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
              onClick={() => setcategory("Computer Accessories")}
            >
              Computer Accessories
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
        <TextField
          label="Available Quantity"
          req={true}
          icon="add-circle-outline"
          onChange={availableChangeHandler}
          valid={availablevalid}
        />
        <TextField
          label="Product Description"
          req={true}
          icon="information-circle-outline"
          onChange={descriptionChangeHandler}
          valid={descriptionvalid}
        />
        <Button title="Add Product" onClick={onAddForm} />
      </section>
      {showModal && (
        <Modal title="Success!" message="Product Added" onClick={onClose} />
      )}
    </>
  );
}

export default AddForm;
