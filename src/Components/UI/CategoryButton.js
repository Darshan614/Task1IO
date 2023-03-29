import classes from "./CategoryButton.module.css";

function CategoryButton(props) {
  return (
    <div className={`col-md-2 ${classes.category}`}>
      <div className={classes.icon}>
        <ion-icon name={props.iconname}></ion-icon>
      </div>
      {props.category}
    </div>
  );
}

export default CategoryButton;
