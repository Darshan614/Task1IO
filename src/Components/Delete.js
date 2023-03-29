import classes from "./AddForm.module.css";
import Title from "./UI/Title";
import TextField from "./UI/TextField";
import { useState } from "react";
import Button from "./UI/Button";
import validatefield from "../validator/validator";
import { useNavigate } from "react-router-dom";
import Error from "./UI/Error";

function Delete() {
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
  const [imageurl, setimageurl] = useState();
  const [imageurlvalid, setimageurlvalid] = useState();
  const imageurlChangeHandler = (event) => {
    setimageurl(event.target.value);
    setimageurlvalid(
      validatefield(
        {
          required: true,
          url: true,
        },
        event.target.value
      )
    );
  };
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
          maxLength: 20,
        },
        event.target.value
      )
    );
  };
  const [error, setError] = useState();
  const onAddForm = () => {
    if (
      productnamevalid !== "valid" ||
      descriptionvalid !== "valid" ||
      imageurlvalid !== "valid" ||
      availablevalid !== "valid" ||
      pricevalid !== "valid"
    ) {
      setError("Invalid values");
      return;
    }
    const token = localStorage.getItem("token");
    console.log(productname, price, imageurl, description, available);
    fetch("http://localhost:8080/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productname: productname,
        imageURL: imageurl,
        price: price,
        availablequantity: available,
        description: description,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message === "Product added") {
          navigate("/products");
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Request Failed");
      });
  };
  return (
    <>
      <section className={classes.box}>
        {error && <Error title={error} />}
        <Title title="Delete User" />
        <TextField
          label="User Name"
          req={true}
          icon="mail-outline"
          onChange={productnameChangeHandler}
          valid={productnamevalid}
        />
        <TextField
          label="Email"
          req={true}
          icon="mail-outline"
          onChange={productnameChangeHandler}
          valid={productnamevalid}
        />
        <Button title="Delete User" onClick={onAddForm} />
      </section>
    </>
  );
}

export default Delete;
