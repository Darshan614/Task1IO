import Title from "./UI/Title";
import Error from "./UI/Error";
import TextField from "./UI/TextField";
import Button from "./UI/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validatefield from "../validator/validator";
import { authActions } from "../store/index";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [emailValid, setemailValid] = useState("");
  const [password, setpassword] = useState("");
  const [passwordValid, setpasswordValid] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
  const formValidate = () => {
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
    if (emailValid !== "valid" || passwordValid !== "valid") {
      return false;
    }
    return true;
  };
  const onSubmitLogin = () => {
    if (!formValidate()) {
      setError("Invalid fields");
      return;
    }
    console.log(email, password);
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message === "Login successful") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          console.log(localStorage.getItem("token"));
          dispatch(authActions.login(data.role));
          navigate("/");
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.log("errrrrrrrrrrr", err);
        setError("Request Failed");
      });
  };
  return (
    <>
      <Title title="Log in" />
      {error && <Error title={error} />}
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
      <Button onClick={onSubmitLogin} title="Log in" />
    </>
  );
}

export default Login;
