import classes from "./HorizontalCard.module.css";

function HorizontalCard(props) {
  return (
    <div>
      <div
        className={`card mb-3 ${classes.card}`}
        style={{ "max-width": "540px" }}
      >
        <div class="row g-0">
          <div className={`col-md-4 ${classes.mycard}`}>
            <img
              src={props.prod.imageURL}
              className={`img-fluid rounded-start ${classes.img}`}
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{props.prod.productname}</h5>
              <p class="card-text">{props.prod.description}</p>
              <p class="card-text">
                <small class="text-muted">${props.prod.price}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalCard;
