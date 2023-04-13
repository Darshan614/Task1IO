import React from "react";
import Categories from "../Components/Categories";
import Title from "../Components/Title";
import ImageCategories from "../Components/ImageCategories";
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
