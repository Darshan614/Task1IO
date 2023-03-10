import React from "react";
import { useEffect, useState } from "react";

function Admin() {
  const [showData, setshowData] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/employeeData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message === "Sorry Permission denied") {
          setshowData(true);
        }
      });
  }, []);
  return <h1>{showData ? "Employee Data" : "Permission denied"}</h1>;
}

export default Admin;
