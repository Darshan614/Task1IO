import React from "react";

function Home() {
  return (
    <>
      Home
      <form
        action="http://localhost:8080/create-checkout-session"
        method="POST"
      >
        <input type="hidden" value="xyz" />
        <button type="submit">Checkout</button>
      </form>
    </>
  );
}

export default Home;
