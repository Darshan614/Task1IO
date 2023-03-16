import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { authActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const roles = useSelector((state) => state.auth.role);
  const logouthandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(authActions.logout());
    navigate("/");
  };

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
          {roles === "admin" && (
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
          )}
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
          {loggedIn && (
            <span className={classes.navlink} style={{ "font-size": "25px" }}>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? classes.active : classes.inactive
                }
              >
                <ion-icon name="cart-outline"></ion-icon>
              </NavLink>
            </span>
          )}
          {!loggedIn && (
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
          )}
          {loggedIn && (
            <span className={classes.navlink}>
              <button className={classes.logout} onClick={logouthandler}>
                Logout
              </button>
            </span>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
