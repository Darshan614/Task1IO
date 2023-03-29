import classes from "./Categories.module.css";
import CategoryButton from "./UI/CategoryButton";

function Categories() {
  return (
    <>
      <div className={`container  ${classes.categories}`}>
        <div className="row justify-content-between">
          <CategoryButton
            iconname="phone-portrait-outline"
            category="SmartPhone"
          />
          <CategoryButton iconname="desktop-outline" category="TV" />
          <CategoryButton iconname="camera-outline" category="Camera" />
          <CategoryButton iconname="watch-outline" category="Watches" />
          <CategoryButton iconname="headset-outline" category="Headphones" />
          <CategoryButton iconname="laptop-outline" category="Laptops" />
        </div>
      </div>
    </>
  );
}

export default Categories;
