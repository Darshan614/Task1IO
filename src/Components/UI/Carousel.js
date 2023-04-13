import classes from "./Carousel.module.css";

function Carousel() {
  return (
    <div
      id="carouselExampleFade"
      class="carousel slide carousel-fade"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active" style={{ backgroundColor: "black" }}>
          <img
            className={`d-block ${classes.image}`}
            src="/pngimg.com - watches_PNG9899.png"
            alt="First slide"
          />
          <div className={`carousel-caption d-md-block ${classes.text}`}>
            <h5>Brand new Smartwatches</h5>
            <p>Get the latest editions of premium watches</p>
          </div>
        </div>
        <div class="carousel-item" style={{ backgroundColor: "black" }}>
          <img
            className={`d-block ${classes.image}`}
            src="/pngkit_mobile-transparent-png_3669988.png"
            alt="First slide"
          />
          <div className={`carousel-caption d-md-block ${classes.text}`}>
            <h5>Just released 5G Smartphones</h5>
            <p>Buy latest Smartphones from quality brands</p>
          </div>
        </div>
        <div class="carousel-item" style={{ backgroundColor: "black" }}>
          <img
            className={`d-block ${classes.image}`}
            src="/pngegg.png"
            alt="First slide"
          />
          <div className={`carousel-caption d-md-block ${classes.text}`}>
            <h5>This festival </h5>
            <p>Hype the buzzz with high quality speakers</p>
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleFade"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleFade"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  );
}

export default Carousel;
