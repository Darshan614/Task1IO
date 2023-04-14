import classes from "./AddForm.module.css";
import Title from "./UI/Title";
import TextField from "./UI/TextField";
import { useState } from "react";
import Button from "./UI/Button";
import validatefield from "../validator/validator";
import { useNavigate } from "react-router-dom";
import Error from "./UI/Error";
import Loading from "./Loading";
import Modal from "../Components/UI/Modal";

function Delete() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [showModal, setshowModal] = useState(false);
  const [email, setemail] = useState();
  const [emailvalid, setemailvalid] = useState();
  const emailChangeHandler = (event) => {
    setemail(event.target.value);
    setemailvalid(
      validatefield(
        {
          required: true,
          email: true,
        },
        event.target.value
      )
    );
  };
  const [username, setusername] = useState();
  const [usernamevalid, setusernamevalid] = useState();
  const usernameChangeHandler = (event) => {
    setusername(event.target.value);
    setusernamevalid(
      validatefield(
        {
          required: true,
        },
        event.target.value
      )
    );
  };
  const [error, setError] = useState();
  const onDelete = () => {
    if (emailvalid !== "valid" || usernamevalid !== "valid") {
      setError("Invalid values");
      return;
    }
    const token = localStorage.getItem("token");
    setloading(true);
    fetch("https://ecommerceio.onrender.com/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        username: username,
        email: email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message == "User deleted") {
          setloading(false);
          setshowModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Request Failed");
      });
  };
  const onClose = () => {
    setshowModal(false);
    navigate("/admin");
  };
  return (
    <>
      {loading && <Loading />}
      <section className={classes.box}>
        {error && <Error title={error} />}
        <Title title="Delete User" />
        <TextField
          label="Email"
          req={true}
          icon="mail-outline"
          onChange={emailChangeHandler}
          valid={emailvalid}
        />
        <TextField
          label="Username"
          req={true}
          icon="mail-outline"
          onChange={usernameChangeHandler}
          valid={usernamevalid}
        />
        <Button title="Delete User" onClick={onDelete} />
      </section>
      {showModal && (
        <Modal title="Success!" message="User deleted" onClick={onClose} />
      )}
    </>
  );
}

export default Delete;
