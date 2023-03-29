import { Link } from "react-router-dom";
import classes from "./AdminControl.module.css";

function AdminControl() {
  return (
    <p>
      <Link className={classes.link} to="/admin/addProduct">
        Add Product
      </Link>
      <Link className={classes.link} to="/admin/editProduct">
        Edit Product
      </Link>
      <Link className={classes.link} to="/admin/deleteUser">
        Delete a user
      </Link>
      {/* <Link className={classes.link} to="/admin/addproduct">
        Delete a user
      </Link> */}
    </p>
  );
}

export default AdminControl;
