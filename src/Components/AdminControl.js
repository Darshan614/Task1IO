import { Link } from "react-router-dom";
import classes from "./AdminControl.module.css";

function AdminControl() {
  return (
    <p>
      <Link className={classes.link} to="/admin/addproduct">
        Add Product
      </Link>
    </p>
  );
}

export default AdminControl;
