import classes from "./ThumbImage.module.css";

function ThumbImage(props) {
  const changeImage = () => {
    console.log(" inchange");
    props.onImageChangeHandler(props.source);
  };
  return (
    <div className={`${classes.th}`} onClick={changeImage}>
      <img className={classes.thumb} src={props.source} />
    </div>
  );
}

export default ThumbImage;
