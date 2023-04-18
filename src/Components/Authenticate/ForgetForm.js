import classes from "./ForgetForm.module.css";
import { useState } from "react";
import Button from "../UI/Button";
import Title from "../Form/Title";
import Error from "../UI/Error";
import TextField from "../Form/TextField";
import validatefield from "../../validator/validator";
import { useParams } from "react-router-dom";
import Modal from "../UI/Modal";
import { useNavigate } from "react-router-dom";

function ForgetForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [showModal, setshowModal] = useState(false);
  const [password, setpassword] = useState("");
  const [passwordValid, setpasswordValid] = useState("");
  const [error, setError] = useState("");
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
  const onSubmitPassword = () => {
    const url = "https://ecommerceio.onrender.com/setPassword/" + params.token;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    })
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message === "Password reset successful") {
          setshowModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };
  const onClose = () => {
    setshowModal(false);
    navigate("/auth");
  };
  return (
    <>
      <div className={classes.parent}>
        <section className={classes.box}>
          <Title title="Enter new password" />
          {error && <Error title={error} />}
          <TextField
            label="Password"
            onChange={onPasswordChangeHandler}
            req={true}
            valid={passwordValid}
            icon="lock-closed-outline"
            type="password"
          />

          <Button onClick={onSubmitPassword} title="Submit Password" />
        </section>
      </div>
      {showModal && (
        <Modal
          title="Success!"
          message="Password reset successful"
          onClick={onClose}
        />
      )}
    </>
  );
}

export default ForgetForm;
