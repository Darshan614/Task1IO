import classes from "./CategoryButton.module.css";

function CategoryButton(props) {
  return (
    <div onClick={props.onClick} className={`col-md-2 col-6 col-sm-4 col-sm-3 ${classes.category}`}>
      <div className={classes.icon}>
        <ion-icon name={props.iconname}></ion-icon>
      </div>
      {props.category}
    </div>
  );
}

export default CategoryButton;
