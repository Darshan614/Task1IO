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
    fetch("http://localhost:8080/deleteUser", {
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
          navigate("/admin");
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
    </>
  );
}

export default Delete;
