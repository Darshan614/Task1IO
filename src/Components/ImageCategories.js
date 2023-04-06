import classes from "./ImageCategories.module.css";

function ImageCategories() {
  return (
    <div className="my-5">
      <div className="row">
        <div className={`col-md-6 ${classes.imgwrap}`}>
          <img src="https://images.unsplash.com/photo-1529359744902-86b2ab9edaea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
        </div>
        <div className={`col-md-6 ${classes.text}`}></div>
      </div>
      <div className="row">
        <div className={`col-md-6 ${classes.text}`}></div>
        <div className={`col-md-6 ${classes.imgwrap}`}>
          <img src="https://images.unsplash.com/photo-1529359744902-86b2ab9edaea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6"></div>
        <div className="col-md-6"></div>
      </div>
    </div>
  );
}

export default ImageCategories;
