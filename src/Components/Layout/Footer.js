import classes from "./Footer.module.css";
import { NavLink } from "react-router-dom";

function Footer() {
  const onfooterClick = () => {
    document.documentElement.scrollTop = 0;
  };
  return (
    <footer onClick={onfooterClick}>
      <div className={classes.footer}>
        <div className="row justify-content-between">
          <div className="col-md-5 ml-2 p-3">
            <ion-icon
              style={{
                "font-size": "25px",
                "font-weight": "bold",
              }}
              name="logo-xing"
            ></ion-icon>
            nucleus
          </div>
          <div className="col-md-3 mr-5 p-3">
            <div className={`row justify-content-between ${classes.icons}`}>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? classes.active : classes.inactive
                }
              >
                <ion-icon name="logo-facebook"></ion-icon>
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? classes.active : classes.inactive
                }
              >
                <ion-icon name="logo-instagram"></ion-icon>
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? classes.active : classes.inactive
                }
              >
                <ion-icon name="logo-twitter"></ion-icon>
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? classes.active : classes.inactive
                }
              >
                <ion-icon name="logo-slack"></ion-icon>
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? classes.active : classes.inactive
                }
              >
                <ion-icon name="logo-youtube"></ion-icon>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="row p-3">
          <div className="col-md-3 col-6 d-flex flex-column">
            <div className={classes.title}>About</div>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Career
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Press
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Corporate
            </NavLink>
          </div>
          <div className="col-md-3 col-6 d-flex flex-column">
            <div className={classes.title}>Services</div>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Shipping
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Platform
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Resell
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Exchange
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Corporate
            </NavLink>
          </div>
          <div className="col-md-3 col-6 d-flex flex-column">
            <div className={classes.title}>Help</div>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Payments
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Shipping
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Returns
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              Infringement
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : classes.inactive
              }
            >
              InHouse
            </NavLink>
          </div>
          <div className="col-md-3 col-6">
            <div className={classes.title}>Mail Us</div>
            <div>Nucleus International Private Limited,India</div>
          </div>
        </div>
        <div className="row p-3 justify-content-between">
          <div className="col-md-6">Terms and Conditions</div>
          <div className="col-md-6">© 2000-2023 Nucleus.com</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
