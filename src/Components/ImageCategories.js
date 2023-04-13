import classes from "./ImageCategories.module.css";

function ImageCategories() {
  return (
    <div className="my-5">
      <div className="row d-flex flex-md-row flex-column-reverse">
        <div className={`col-md-6 ${classes.imgwrap}`}>
          <img src="https://plus.unsplash.com/premium_photo-1661573310430-8c32d4079e5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"></img>
        </div>
        <div className={`col-md-6 ${classes.text}`}>
          Enjoy the quality of brand new smartphones
        </div>
      </div>
      <div className="row d-flex flex-md-row flex-sm-column">
        <div className={`col-md-6 ${classes.text}`}>
          Enjoy high resolution camera smartphones
        </div>
        <div className={`col-md-6 ${classes.imgwrap}`}>
          <img src="https://images.unsplash.com/photo-1528123778681-01e39b42808e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
        </div>
      </div>
    </div>
  );
}

export default ImageCategories;
