import classes from "./AddForm.module.css";
import Title from "./UI/Title";
import TextField from "./UI/TextField";
import { useState } from "react";
import Button from "./UI/Button";
import validatefield from "../validator/validator";
import { useNavigate } from "react-router-dom";
import Error from "./UI/Error";

function AddForm() {
  const navigate = useNavigate();
  const [productname, setproductname] = useState();
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
  const [price, setprice] = useState(0);
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
  const [available, setavailable] = useState();
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
  const [description, setdescription] = useState();
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
          navigate("/products?category=all");
        } else {
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

  return (
    <>
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
    </>
  );
}

export default AddForm;
