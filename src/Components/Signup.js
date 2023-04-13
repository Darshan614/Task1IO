import Title from "./UI/Title";
import TextField from "./UI/TextField";
import Button from "./UI/Button";
import { useState } from "react";
import Error from "./UI/Error";
import validatefield from "../validator/validator";

function Signup(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [username, setusername] = useState("");
  const [passwordValid, setpasswordValid] = useState("");
  const [confirmpasswordValid, setconfirmpasswordValid] = useState("");
  const [emailValid, setemailValid] = useState("");
  const [error, setError] = useState("");
  const [usernameValid, setusernameValid] = useState("");
  const [addressValid, setaddressValid] = useState("");

  const onUserNameChangeHandler = (event) => {
    setusername(event.target.value);
    setusernameValid(
      validatefield(
        { minLength: 3, maxLength: 10, required: true },
        event.target.value
      )
    );
  };
  const onAddressChangeHandler = (event) => {
    setaddress(event.target.value);
    setaddressValid(
      validatefield(
        { minLength: 6, maxLength: 30, required: true },
        event.target.value
      )
    );
  };
  const onEmailChangeHandler = (event) => {
    setemail(event.target.value);
    setemailValid(
      validatefield(
        {
          required: true,
          maxLength: 50,
          email: true,
        },
        event.target.value
      )
    );
  };
  const onPasswordChangeHandler = (event) => {
    setpassword(event.target.value);
    setpasswordValid(
      validatefield(
        {
          required: true,
          password: true,
        },
        event.target.value
      )
    );
  };
  const onConfirmPasswordChangeHandler = (event) => {
    setconfirmpassword(event.target.value);
    setconfirmpasswordValid(
      validatefield({ required: true, matchWith: password }, event.target.value)
    );
  };
  const formValidate = () => {
    setusernameValid(
      validatefield({ minLength: 3, maxLength: 10, required: true }, username)
    );
    setemailValid(
      validatefield(
        {
          required: true,
          maxLength: 50,
          email: true,
        },
        email
      )
    );
    setpasswordValid(
      validatefield(
        {
          required: true,
          password: true,
        },
        password
      )
    );
    setconfirmpasswordValid(
      validatefield({ required: true, matchWith: password }, confirmpassword)
    );
    if (
      emailValid !== "valid" ||
      passwordValid !== "valid" ||
      usernameValid !== "valid" ||
      confirmpasswordValid !== "valid"
    ) {
      return false;
    }
    return true;
  };
  const onSubmitSignup = () => {
    if (!formValidate()) {
      setError("Invalid value(s)");
      return;
    }
    console.log(email, password, username, confirmpassword);
    fetch("https://ecommerceio.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
        address: address,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message === "User signed up") {
          props.toggle();
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
      <Title title="Sign up" />
      {error && <Error title={error} />}
      <TextField
        label="Username"
        onChange={onUserNameChangeHandler}
        req={true}
        valid={usernameValid}
        icon="person-outline"
      />
      <TextField
        label="Email"
        onChange={onEmailChangeHandler}
        req={true}
        valid={emailValid}
        icon="mail-outline"
      />
      <TextField
        label="Password"
        onChange={onPasswordChangeHandler}
        req={true}
        valid={passwordValid}
        icon="lock-closed-outline"
        type="password"
      />
      <TextField
        label="Confirm Password"
        onChange={onConfirmPasswordChangeHandler}
        req={true}
        valid={confirmpasswordValid}
        icon="lock-closed-outline"
        type="password"
      />
      <TextField
        label="Address"
        onChange={onAddressChangeHandler}
        req={true}
        valid={addressValid}
        icon="lock-closed-outline"
      />
      <Button onClick={onSubmitSignup} title="Sign up" />
    </>
  );
}

export default Signup;
