import classes from "./Authenticate.module.css";
import { useState } from "react";
import Button from "./UI/Button";
import Login from "./Login";
import Signup from "./Signup";

function Authenticate() {
  const [formLogin, setformLogin] = useState(true);
  const formToggleHandler = () => {
    setformLogin(!formLogin);
  };

  return (
    <section className={classes.box}>
      {formLogin ? <Login /> : <Signup toggle={formToggleHandler} />}
      {formLogin ? (
        <Button
          onClick={formToggleHandler}
          title="Don't have account? Register"
        />
      ) : (
        <Button onClick={formToggleHandler} title="Already a user? Log in" />
      )}
    </section>
  );
}

export default Authenticate;
