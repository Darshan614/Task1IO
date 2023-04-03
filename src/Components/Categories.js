import classes from "./Categories.module.css";
import CategoryButton from "./UI/CategoryButton";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();
  const smartphones = () => {
    navigate("/products?category=Mobile");
  };
  const tv = () => {
    navigate("/products?category=TV");
  };
  const camera = () => {
    navigate("/products?category=Camera");
  };
  const watches = () => {
    navigate("/products?category=watches");
  };
  const headphone = () => {
    navigate("/products?category=Sound");
  };
  const laptop = () => {
    navigate("/products?category=Laptop");
  };
  return (
    <>
      <div className={`container  ${classes.categories}`}>
        <div className="row justify-content-between">
          <CategoryButton
            iconname="phone-portrait-outline"
            category="SmartPhone"
            onClick={smartphones}
          />
          <CategoryButton
            iconname="desktop-outline"
            category="TV"
            onClick={tv}
          />
          <CategoryButton
            iconname="camera-outline"
            category="Camera"
            onClick={camera}
          />
          <CategoryButton
            iconname="watch-outline"
            category="Watches"
            onClick={watches}
          />
          <CategoryButton
            iconname="headset-outline"
            category="Headphones"
            onClick={headphone}
          />
          <CategoryButton
            iconname="laptop-outline"
            category="Laptops"
            onClick={laptop}
          />
        </div>
      </div>
    </>
  );
}

export default Categories;
