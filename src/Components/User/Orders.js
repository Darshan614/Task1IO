import Order from "../UI/Order";
import { useEffect, useState } from "react";
import Loading from "../UI/Loading";

function Orders() {
  const [orderData, setorderData] = useState([]);
  const [date, setdate] = useState();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://ecommerceio.onrender.com/userOrders", {
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
        setloading(false);
        setorderData(data.orders);
      });
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && orderData.length === 0 && (
        <p style={{ color: "black", textAlign: "center" }}>No orders yet</p>
      )}
      {orderData.map((order) => {
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
        return (
          <>
            {!loading && (
              <Order
                amount={order.total}
                d={d}
                t={t}
                products={order.products}
              />
            )}
          </>
        );
      })}
    </>
  );
}

export default Orders;
