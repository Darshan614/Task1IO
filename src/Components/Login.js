import Title from "./UI/Title";
import Error from "./UI/Error";
import TextField from "./UI/TextField";
import Button from "./UI/Button";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import validatefield from "../validator/validator";
import { authActions } from "../store/index";
import { useDispatch } from "react-redux";
import Modal from "../Components/UI/Modal";

function Login() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [emailValid, setemailValid] = useState("");
  const [password, setpassword] = useState("");
  const [passwordValid, setpasswordValid] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showforget, setshowforget] = useState(false);
  const [formTitle, setFormTitle] = useState("Login");
  const [alternateOption, setalternateOption] = useState("Forget Password");
  const [showModal, setshowModal] = useState(false);

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

  const onFormToggle = () => {
    if (formTitle === "Login") {
      setFormTitle("Enter email");
      setalternateOption("Login");
      setshowforget(true);
    } else {
      setFormTitle("Login");
      setalternateOption("Forget password");
      setshowforget(false);
    }
  };

  const onSubmitEmail = () => {
    fetch("https://ecommerceio.onrender.com/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setshowModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClose = () => {
    setshowModal(false);
    setFormTitle("Login");
    setalternateOption("Forget password");
    setshowforget(false);
  };

  const onSubmitLogin = () => {
    if (!formValidate()) {
      setError("Invalid fields");
      return;
    }
    console.log(email, password);
    fetch("https://ecommerceio.onrender.com/login", {
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
          dispatch(authActions.login(data.role));
          const redirectTo = searchParams.get("redirectTo");
          navigate(redirectTo == null ? "/" : redirectTo);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        setError("Request Failed");
      });
  };
  return (
    <>
      <Title title={formTitle} />
      {error && <Error title={error} />}
      <TextField
        label="Email"
        onChange={onEmailChangeHandler}
        req={true}
        valid={emailValid}
        icon="mail-outline"
        value={email}
      />
      {!showforget && (
        <TextField
          label="Password"
          onChange={onPasswordChangeHandler}
          req={true}
          valid={passwordValid}
          icon="lock-closed-outline"
          type="password"
          value={password}
        />
      )}
      {!showforget && <Button onClick={onSubmitLogin} title="Login" />}
      {showforget && <Button onClick={onSubmitEmail} title="Submit Email" />}
      <Button onClick={onFormToggle} title={alternateOption} />

      {showModal && (
        <Modal
          title="Email Sent!"
          message="Check your email to reset password"
          onClick={onClose}
        />
      )}
    </>
  );
}

export default Login;
