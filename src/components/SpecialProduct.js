import React from "react";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const SpecialProduct = (props) => {
  const { title, brand, price, totalrating, sold, quantity, _id, imageUrl } = props;

  const [curentTime, setCurentTime] = useState();

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurentTime(time)
  }

  setInterval(updateTime, 1000)
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img src={imageUrl} className="img-fluid px-3" width={318}  height={200} alt="" />
          </div>
          <div className="special-product-content">
            <h5 className="brand">{brand}</h5>
            <h6 className="title">
             {title} 
            </h6>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              isHalf={true}
              value= {totalrating} 
              //edit={false}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="red-p">${price}</span>&nbsp;
            </p>
            <div className="discount-till d-flex align-items-center gap-10">
             
              
              <div className="d-flex gap-10 align-items-center text-danger">
                {curentTime}
              </div>
            </div>
            <div className="prod-count my-3">
                <p>Product:  <b>{quantity}</b></p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{width: quantity / quantity + sold * 100 + '%'}} 
                  aria-valuenow={quantity / quantity + sold * 100}
                  aria-valuemin={sold} 
                  aria-valuemax={sold + quantity} 
                ></div>
              </div>
            </div>

            <Link className="button" to={`/product/ _id` }>View</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
