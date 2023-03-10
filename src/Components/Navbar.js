import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className={classes.navbar}>
        <div>
          <span className={classes.navlink}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              InfoObjects
            </NavLink>
          </span>
          <span className={classes.navlink}>
            <NavLink
              to="/Admin"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Admin
            </NavLink>
          </span>
          <span className={classes.navlink}>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Products
            </NavLink>
          </span>
        </div>
        <div>
          <span className={classes.navlink}>
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Login
            </NavLink>
          </span>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
