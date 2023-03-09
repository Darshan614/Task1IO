import classes from "./Button.module.css";

function Button(props) {
  return (
    <button className={classes.button} onClick={props.onClick}>
      {props.title}
    </button>
  );
}

export default Button;
