import Title from "./UI/Title";
import TextField from "./UI/TextField";
import Error from "./UI/Error";
import validatefield from "../validator/validator";
import Button from "./UI/Button";
import { useState } from "react";
import classes from "./Update.module.css";
import Modal from "../Components/UI/Modal";
import { useNavigate } from "react-router-dom";

function Update(props) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [username, setusername] = useState("");
  const [usernameValid, setusernameValid] = useState("");
  const onUserNameChangeHandler = (event) => {
    setusername(event.target.value);
    setusernameValid(
      validatefield(
        { minLength: 3, maxLength: 10, required: true },
        event.target.value
      )
    );
  };
  const [addressValid, setaddressValid] = useState("");
  const [address, setaddress] = useState("");
  const onAddressChangeHandler = (event) => {
    setaddress(event.target.value);
    setaddressValid(
      validatefield(
        { minLength: 6, maxLength: 30, required: true },
        event.target.value
      )
    );
  };
  const onUpdate = () => {
    const token = localStorage.getItem("token");
    fetch("https://ecommerceio.onrender.com/updateProfile", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
        username: username,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message == "User profile updated") {
          setshowModal(true);
        }
      });
  };
  const onClose = () => {
    setshowModal(false);
    navigate("/profile");
  };
  const title = "Update user ";
  return (
    <>
      <section className={classes.box}>
        <Title title={title} />

        {error && <Error title={error} />}
        <TextField
          label="Username"
          onChange={onUserNameChangeHandler}
          req={true}
          valid={usernameValid}
          icon="person-outline"
        />
        <TextField
          label="Address"
          onChange={onAddressChangeHandler}
          req={true}
          valid={addressValid}
          icon="lock-closed-outline"
        />
        <Button title="Update" onClick={onUpdate} />
      </section>
      {showModal && (
        <Modal title="Success!" message="Profile Updated" onClick={onClose} />
      )}
    </>
  );
}

export default Update;
