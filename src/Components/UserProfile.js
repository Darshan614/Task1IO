import { useEffect, useState } from "react";
import Button from "./UI/Button";
import classes from "./UserProfile.module.css";
import { authActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userprofile, setuserprofile] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setuserprofile(data.user);
      });
  }, []);
  const oninactivate = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/inactivateUser", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        dispatch(authActions.logout());
        navigate("/");
      });
  };
  return (
    <div className={classes.data}>
      <div className={classes.box}>
        My Profile<div>Email:{userprofile.email}</div>
        <div>Username:{userprofile.username}</div>
        <div>Address:{userprofile.address}</div>
        <Button title="Edit User" />
        <Button title="Deactivate" onClick={oninactivate} />
      </div>
    </div>
  );
}

export default UserProfile;
