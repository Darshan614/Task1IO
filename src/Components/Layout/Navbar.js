import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/index";
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
      <nav
        class="navbar navbar-expand-lg navbar-dark sticky-top"
        style={{
          // background:
          //   "linear-gradient(104.28deg, rgba(255, 255, 255, 0.1) 13.04%,rgba(255, 255, 255, 0.4) 69.71%)",
          // boxShadow: "0px 4px 24px -1px rgba(0, 0, 0, 0.2)",
          // marginBottom: "30px",
          // backdropFilter: "blur(20px)",
          backgroundColor: "black",
          marginBottom: "30px",
        }}
      >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <span
              className={classes.navlink}
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : classes.inactive
                }
              >
                <ion-icon
                  style={{
                    "font-size": "25px",
                    "font-weight": "bold",
                  }}
                  name="logo-xing"
                ></ion-icon>
              </NavLink>
            </span>
            {roles === "admin" && (
              <span
                className={classes.navlink}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
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
            <span
              className={classes.navlink}
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <NavLink
                to="/products?category=all"
                className={({ isActive }) =>
                  isActive ? classes.active : classes.inactive
                }
              >
                Products
              </NavLink>
            </span>
          </ul>
          <ul class="navbar-nav mt-2 mt-lg-0">
            <span
              className={classes.navlink}
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? classes.active : classes.inactive
                }
              >
                <ion-icon
                  style={{
                    "font-size": "25px",
                    "margin-right": "20px",
                    "font-weight": "bold",
                  }}
                  name="cart-outline"
                ></ion-icon>
              </NavLink>
            </span>
            {!loggedIn && (
              <span
                className={classes.navlink}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
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
          </ul>
          {loggedIn && (
            <div class="dropdown">
              <button
                type="button"
                class="btn btn-secondary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <ion-icon name="person"></ion-icon>
              </button>
              <div
                className={`dropdown-menu ${classes.drop}`}
                aria-labelledby="dropdownMenu2"
              >
                {/* <button
                  class="dropdown-item"
                  type="button"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                > */}
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? classes.act : classes.inact
                  }
                >
                  My Profile
                </NavLink>
                {/* </button> */}
                {/* <button
                  className={`dropdown-item ${classes.inactivedrop}`}
                  type="button"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                > */}
                <NavLink
                  to="/myorder"
                  className={({ isActive }) =>
                    isActive ? classes.act : classes.inact
                  }
                >
                  My Orders
                </NavLink>
                {/* </button> */}
                <button
                  class="dropdown-item"
                  type="button"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  {loggedIn && (
                    <button
                      class="dropdown-item text-start"
                      onClick={logouthandler}
                    >
                      Logout
                    </button>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
