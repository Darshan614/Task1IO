import classes from "./Title.module.css";

function Title(props) {
  return <div className={classes.title}>{props.title}</div>;
}

export default Title;
