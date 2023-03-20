import classes from "./ProductData.module.css";
import ThumbImage from "./ThumbImage";
import { useEffect, useState } from "react";
import { cartActions } from "../../store/index";
import { useDispatch } from "react-redux";

function ProductData(props) {
  console.log("in products", props.thumbimages);
  const [image, setimage] = useState();
  const [thumbimages, setthumbimages] = useState([]);
  const [stars, setstars] = useState([]);
  const onImageChangeHandler = (image) => {
    console.log("on change", image);
    setimage(image);
  };
  const dispatch = useDispatch();
  const addtoCart = () => {
    dispatch(cartActions.addToCart([props.id, 1]));
  };
  useEffect(() => {
    setimage(props.pimageURL);
    setthumbimages(props.thumbimages);
    let arr = [];
    for (var i = 0; i < props.rating; i++) {
      arr.push(<ion-icon name="star"></ion-icon>);
    }
    setstars(arr);
  }, [props.pimageURL, props.thumbimages, props.rating]);
  return (
    <div className="container">
      <div className={`row ${classes.product}`}>
        <div className={`col-md-8 ${classes.img}`}>
          <img className={classes.image} src={image} />
          <div className={`${classes.thumbnail}`}>
            {thumbimages.map((img) => {
              return (
                <ThumbImage
                  onImageChangeHandler={onImageChangeHandler}
                  source={img}
                />
              );
            })}
          </div>
        </div>
        <div className={`col-md-4 ${classes.info}`}>
          <div className={classes.data}>
            <div className={classes.title}>
              <h2>{props.pname}</h2>
            </div>
            <div className={classes.desc}>
              <h4>
                {/* Sleek design, high-quality display, and powered by M1 chip */}
                {props.pdesc}
              </h4>
            </div>
            <div className={classes.stars}>{stars}</div>
            <div className={classes.price}>
              <h3>$ {props.pprice}.00</h3>
            </div>
            <div></div>
          </div>
          <div onClick={addtoCart} className={classes.button}>
            <button className={classes.btn}>
              <span className={classes.iconspa}>
                <ion-icon name="cart-outline"></ion-icon>
              </span>
              <span className={classes.spa}>Add To Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductData;
