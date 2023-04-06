import { useEffect, useState } from "react";
import Button from "./UI/Button";
import classes from "./UserProfile.module.css";
import { authActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/UI/Modal";

function UserProfile() {
  const dispatch = useDispatch();
  const [showModal, setshowModal] = useState(false);
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
  const ondeactivate = () => {
    setshowModal(false);
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
  const confirmation = () => {
    setshowModal(true);
  };
  return (
    <div className={classes.data}>
      <div className={classes.box}>
        <div className={classes.imageicon}>
          <ion-icon name="person-circle-outline"></ion-icon>
        </div>
        <div className={`row ${classes.field}`}>
          <div className={`col-md-5 ${classes.key}`}>Email</div>
          <div className={`col-md-5 ${classes.key}`}>{userprofile.email}</div>
        </div>
        <div className={`row ${classes.field}`}>
          <div className={`col-md-5 ${classes.key}`}>Username</div>
          <div className={`col-md-5 ${classes.key}`}>
            {userprofile.username}
          </div>
        </div>
        <div className={`row ${classes.field}`}>
          <div className={`col-md-5 ${classes.key}`}>Address</div>
          <div className={`col-md-5 ${classes.key}`}>{userprofile.address}</div>
        </div>
        <Button title="Deactivate" onClick={confirmation} />
        {showModal && (
          <Modal
            title="Confirm!"
            message="Are you sure you want to deactivate account?"
            onClick={ondeactivate}
          />
        )}
      </div>
    </div>
  );
}

export default UserProfile;
