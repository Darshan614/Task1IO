import { Link } from "react-router-dom";
import classes from "./AdminControl.module.css";

function AdminControl() {
  return (
    <div className="container">
      <div className={classes.controls}>
        <Link className={classes.link} to="/admin/addProduct">
          Add Product
        </Link>
        <Link className={classes.link} to="/admin/editProduct">
          Edit Product
        </Link>
        <Link className={classes.link} to="/admin/deleteUser">
          Delete a user
        </Link>
      </div>
    </div>
  );
}

export default AdminControl;
