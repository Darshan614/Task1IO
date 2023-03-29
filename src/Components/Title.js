import classes from "./Title.module.css";

function Title() {
  return (
    <div className={classes.parent}>
      <div className={classes.title}>
        <div className={classes.child}></div>
      </div>
      {/* <img src="../../public/Group\ 1\ \(1\).svg" /> */}
      <div>Hello</div>
    </div>
  );
}

export default Title;
