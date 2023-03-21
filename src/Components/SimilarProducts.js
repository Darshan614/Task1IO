import Card from "./UI/Card";
import classes from "./SimilarProducts.module.css";

function SimilarProducts(props) {
  return (
    <div className="container px-4" style={{ color: "black" }}>
      <div className={classes.title}>Similar Products</div>
      <div className="row gy-5 gx-5">
        {console.log(props)}
        {props.products.map((prod) => {
          return (
            <Card
              title={prod.productname}
              price={prod.price}
              description={prod.description}
              imageURL={prod.imageURLs[0]}
              id={prod._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SimilarProducts;
