import classes from "./AddForm.module.css";
import Title from "./UI/Title";
import TextField from "./UI/TextField";
import { useState } from "react";
import Button from "./UI/Button";

function AddForm() {
  const [productname, setproductname] = useState();
  const productnameChangeHandler = (event) => {
    setproductname(event.target.value);
  };
  const [imageurl, setimageurl] = useState();
  const imageurlChangeHandler = (event) => {
    setimageurl(event.target.value);
  };
  const [price, setprice] = useState();
  const priceChangeHandler = (event) => {
    setprice(event.target.value);
  };
  const [available, setavailable] = useState();
  const availableChangeHandler = (event) => {
    setavailable(event.target.value);
  };
  const [description, setdescription] = useState();
  const descriptionChangeHandler = (event) => {
    setdescription(event.target.value);
  };
  const onAddForm = () => {
    console.log(productname, price, imageurl, description, available);
  };
  return (
    <>
      <section className={classes.box}>
        <Title title="Add Product" />
        <TextField
          label="Product Name"
          req={true}
          icon="mail-outline"
          onChange={productnameChangeHandler}
        />
        <TextField
          label="Image URL"
          req={true}
          icon="image-outline"
          onChange={imageurlChangeHandler}
        />
        <TextField
          label="Price"
          req={true}
          icon="pricetag-outline"
          onChange={priceChangeHandler}
        />
        <TextField
          label="Available Quantity"
          req={true}
          icon="add-circle-outline"
          onChange={availableChangeHandler}
        />
        <TextField
          label="Product Description"
          req={true}
          icon="information-circle-outline"
          onChange={descriptionChangeHandler}
        />
        <Button title="Add Product" onClick={onAddForm} />
      </section>
    </>
  );
}

export default AddForm;
