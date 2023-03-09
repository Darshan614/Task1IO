import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <h1>NavBar</h1>
      <Outlet />
    </>
  );
}

export default RootLayout;
