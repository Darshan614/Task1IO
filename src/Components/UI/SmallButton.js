import classes from "./SmallButton.module.css";

function SmallButton(props) {
  return (
    <button onClick={props.onclick} className={classes.btn}>
      {props.title}
    </button>
  );
}

export default SmallButton;
