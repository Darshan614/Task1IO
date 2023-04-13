import classes from "./ProductData.module.css";
import ThumbImage from "./ThumbImage";
import { useEffect, useState } from "react";
import { cartActions } from "../../store/index";
import { useDispatch } from "react-redux";
import Modal from "./Modal";

function ProductData(props) {
  console.log("in products", props.thumbimages);
  const [image, setimage] = useState();
  const [showModal, setshowModal] = useState(false);
  const [thumbimages, setthumbimages] = useState([]);
  const [stars, setstars] = useState([]);
  const onImageChangeHandler = (image) => {
    console.log("on change", image);
    setimage(image);
  };
  const onClose = () => {
    setshowModal(false);
  };
  const dispatch = useDispatch();
  const addtoCart = () => {
    const key = props.id;
    setshowModal(true);
    dispatch(cartActions.addToCart({ [key]: 1 }));
  };
  useEffect(() => {
    setimage(props.pimageURL);
    setthumbimages(props.thumbimages);
    let arr = [];
    for (var i = 1; i <= Math.round(props.rating); i++) {
      arr.push(<ion-icon name="star"></ion-icon>);
    }
    setstars(arr);
  }, [props.pimageURL, props.thumbimages, props.rating]);
  return (
    <>
      <div className="container">
        <div className={`row d-flex flex-md-row ${classes.product}`}>
          <div className={`col-md-8 col-12 ${classes.img}`}>
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
          <div className={`col-md-4 col-12 ${classes.info}`}>
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
                <h3>&#8377; {props.pprice}.00</h3>
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
      {showModal && (
        <Modal
          title="Success!"
          message="Item added to cart"
          onClick={onClose}
        />
      )}
    </>
  );
}

export default ProductData;
