import React from "react";
import Categories from "../Components/Home/Categories";
import Title from "../Components/Home/Title";
import ImageCategories from "../Components/Home/ImageCategories";
import Carousel from "../Components/UI/Carousel";

function Home() {
  return (
    <>
      <Title />
      <Categories />
      <Carousel />
      <ImageCategories />
    </>
  );
}

export default Home;
