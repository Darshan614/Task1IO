import Order from "./UI/Order";
import { useEffect, useState } from "react";

function Orders() {
  const [orderData, setorderData] = useState([]);
  const [date, setdate] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/userOrders", {
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
        setorderData(data.orders);
      });
  }, []);

  return orderData.map((order) => {
    const dateString = order.created_at;
    const date = new Date(dateString);
    const year = date.getFullYear(); // 2023
    const month = date.getMonth() + 1; // JavaScript months are zero-indexed, so add 1
    const day = date.getDate(); // 24
    const hours = date.getHours(); // 12
    const minutes = date.getMinutes(); // 55
    const seconds = date.getSeconds(); // 43
    const milliseconds = date.getMilliseconds(); // 418
    const d = day + "/" + month + "/" + year;
    const t = hours + ":" + minutes + ":" + seconds;
    return <Order amount={order.total} d={d} t={t} products={order.products} />;
  });
}

export default Orders;
