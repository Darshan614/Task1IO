import classes from "./Authenticate.module.css";
import { useState } from "react";
import Button from "../UI/Button";
import Login from "./Login";
import Signup from "./Signup";
import Loading from "../UI/Loading";

function Authenticate() {
  const [formLogin, setformLogin] = useState(true);
  const [loading, setloading] = useState(false);

  const formToggleHandler = () => {
    setformLogin(!formLogin);
  };

  return (
    <>
      {loading && <Loading />}
      <div className={classes.parent}>
        <section className={classes.box}>
          {formLogin ? (
            <Login setloading={setloading} />
          ) : (
            <Signup setloading={setloading} toggle={formToggleHandler} />
          )}
          {formLogin ? (
            <Button
              onClick={formToggleHandler}
              title="Don't have account? Register"
            />
          ) : (
            <Button
              onClick={formToggleHandler}
              title="Already a user? Log in"
            />
          )}
        </section>
      </div>
    </>
  );
}

export default Authenticate;
