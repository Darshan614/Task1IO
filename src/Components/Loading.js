import classes from "./Loading.module.css";

function Loading() {
  return (
    <>
      <div className={classes.loader}>
        <div className={classes.spinner}></div>
      </div>
    </>
  );
}

export default Loading;
