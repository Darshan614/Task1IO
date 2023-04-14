import UserProfile from "../Components/UserProfile";
import { useEffect, useState } from "react";
import Button from "../Components/UI/Button";
import { authActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/UI/Modal";
import Update from "../Components/Update";
import Loading from "../Components/Loading";

function Profile() {
  const dispatch = useDispatch();
  const [showModal, setshowModal] = useState(false);
  const navigate = useNavigate();
  const [userprofile, setuserprofile] = useState({});
  const [showform, setshowform] = useState(false);
  const [loading, setloading] = useState(true);

  const ondeactivate = () => {
    setshowModal(false);
    const token = localStorage.getItem("token");
    fetch("https://ecommerceio.onrender.com/inactivateUser", {
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
  useEffect(() => {
    setloading(true);
    const token = localStorage.getItem("token");
    fetch("https://ecommerceio.onrender.com/profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setuserprofile(data.user);
        setloading(false);
      });
  }, [showform]);
  return (
    <>
      {loading && <Loading />}
      <div style={{ width: "70%", margin: "auto" }}>
        {!showform && <UserProfile userprofile={userprofile} />}
        {showform && <Update userprofile={userprofile} />}
        <Button
          title={showform ? "Show profile" : "Update"}
          onClick={() => setshowform(!showform)}
        />
        <Button title="Deactivate" onClick={confirmation} />
        {showModal && (
          <Modal
            title="Confirm!"
            message="Are you sure you want to deactivate account?"
            onClick={ondeactivate}
          />
        )}
      </div>
    </>
  );
}

export default Profile;
