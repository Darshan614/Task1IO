import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer>
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
              <ion-icon name="logo-facebook"></ion-icon>
              <ion-icon name="logo-instagram"></ion-icon>
              <ion-icon name="logo-twitter"></ion-icon>
              <ion-icon name="logo-slack"></ion-icon>
              <ion-icon name="logo-youtube"></ion-icon>
            </div>
          </div>
        </div>
        <div className="row p-3">
          <div className="col-md-3">
            About<div>Contact Us</div>
            <div>About Us</div>
            <div>Careers</div>
            <div>Press</div>
            <div>Corporate</div>
          </div>
          <div className="col-md-3">
            Services<div>Shipping</div>
            <div>Platform</div>
            <div>Resell</div>
            <div>Exchange</div>
            <div>Corporate</div>
          </div>
          <div className="col-md-3">
            Help<div>Payments</div>
            <div>Shipping</div>
            <div>Returns</div>
            <div>Infringement</div>
            <div>Corporate</div>
          </div>
          <div className="col-md-3">
            Mail Us<div>Nucleus International Private Limited,India</div>
          </div>
        </div>
        <div className="row p-3 justify-content-between">
          <div className="col-md-6">© 2000-2023 Nucleus.com</div>
          <div className="col-md-6">Terms and Conditions</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
