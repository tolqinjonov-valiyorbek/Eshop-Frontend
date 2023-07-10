import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import wish from "../images/wish.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch } from "react-redux/es/exports";
import { addToWishlist } from "../features/products/productSlice";
const ProductCard = (props) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const { grid, data } = props;
  let location = useLocation();
  const dispatch = useDispatch();
  const addToWish = (id) => {
    dispatch(addToWishlist(id)); 
  };

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={` ${
              location.pathname === "/product" ? `gr-${grid}` : "col-3 lg='3' mb-4' md='6' sm='6' "
            }`}
          >
            <div
              className="product-card position-relative"
            >
              <div className="wishlist-icon position-absolute">
                <button className="border-0 bg-transparent" to=":id">
                  <img
                    src={wish}
                    alt=""
                    onClick={(e) => {
                      addToWish(item?._id);
                    }}
                  />
                </button>
              </div>
              <div className="product-image">
                <img
                  src={item?.images[0].url}
                  className="img-fluid d-block mx-auto"
                  alt="product img"
                  width={160}
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{item?.brand}</h6>
                <h5 className="product-title">
                  {item?.title}
                </h5>
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  isHalf={true}
                  value={item?.totalRating + ''}
                  //edit={false}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p className="price">$ {item?.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15 ">
                 
                  <Link to={`/product/` + item?._id}>
                    <img src={view} alt="" />
                  </Link>
                  <Link to={`/cart/ ` + item?._id}>
                   <img src={addcart} alt="" />
                 </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
