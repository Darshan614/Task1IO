import classes from "./TextField.module.css";

function TextField(props) {
  // console.log(4, props.value, props.type, props.label);
  return (
    <div className={classes.fieldbox}>
      <div className={classes.field}>
        <input
          onChange={props.onChange}
          className={classes.textfield}
          value={props.value}
          type={props.type ? props.type : "text"}
          required
        ></input>
        <label
          className={`${classes.label} ${
            props.valid === "valid" && classes.valid
          } ${props.valid && props.valid !== "valid" && classes.invalid} `}
        >
          {props.label}
          <ion-icon name={props.icon}></ion-icon>
        </label>
      </div>
      {props.valid && props.valid !== "valid" && (
        <div className={classes.error}>{props.valid}</div>
      )}
    </div>
  );
}

export default TextField;
