import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";

function Admin() {
  const [loading, setloading] = useState(true);
  const [showData, setshowData] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/employeeData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setloading(false);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message === "Some problem in authentication") {
          setshowData(false);
          navigate("/auth");
        }
        if (data.message === "Sorry Permission denied") {
          setshowData(false);
        }
      })
      .catch((err) => {
        setloading(false);
        setshowData(false);
        console.log(err);
      });
  }, []);
  return (
    <>
      {loading && <Loading />}
      {!loading && <h1>{showData ? "Employee Data" : "Permission denied"}</h1>}
    </>
  );
}

export default Admin;
