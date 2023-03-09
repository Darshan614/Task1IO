import classes from "./Error.module.css";

function Error(props) {
  return <div className={classes.error}>{props.title}</div>;
}

export default Error;
