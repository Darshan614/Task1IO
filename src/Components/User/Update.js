import Title from "../Form/Title";
import TextField from "../Form/TextField";
import Error from "../UI/Error";
import validatefield from "../../validator/validator";
import Button from "../UI/Button";
import { useState } from "react";
import classes from "./Update.module.css";
import Modal from "../UI/Modal";
import { useNavigate } from "react-router-dom";

function Update(props) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [username, setusername] = useState(props.userprofile.username);
  const [usernameValid, setusernameValid] = useState("");
  const onUserNameChangeHandler = (event) => {
    setusername(event.target.value);
    setusernameValid(
      validatefield(
        { minLength: 5, maxLength: 15, required: true },
        event.target.value
      )
    );
  };
  const [addressValid, setaddressValid] = useState("");
  const [address, setaddress] = useState(props.userprofile.address);
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
    props.setloading(true);
    const token = localStorage.getItem("token");
    const url2 = "http://localhost:8080/updateProfile";
    const url1 = "https://ecommerceio.onrender.com/updateProfile";
    fetch(url1, {
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
        // console.log("57", data.result);
        if (data.message === "User profile updated") {
          setshowModal(true);
          props.setloading(false);
          props.setshowform(false);
          props.setuserprofile(data.result);
        } else {
          props.setloading(false);
          setError("Update Failed");
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
          value={username}
        />
        <TextField
          label="Address"
          onChange={onAddressChangeHandler}
          req={true}
          valid={addressValid}
          icon="lock-closed-outline"
          value={address}
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
