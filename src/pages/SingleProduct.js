import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import Container from "../components/Container";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useCallback, useEffect, useState } from "react";
import {
  addRating,
  getAllProducts,
  getSingleProduct,
} from "../features/products/productSlice";
import { getUserCart } from "../features/user/userSlice";
import { toast } from "react-toastify";
import Color from "./Color";
import { addOrRemoveCart } from "../features/cart/cart.slice";

const SingleProduct = () => {
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [color,setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAd, setAlreadyAd] = useState(false);
 // const navigate = useNavigate();
  const productState = useSelector((state) => state.product.singleproduct);
  const productsState = useSelector((state) => state.product.product);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const imageUrl = productState?.images[0].url || "";

  useEffect(() => {
    dispatch(getSingleProduct(getProductId));
    dispatch(getUserCart());
    dispatch(getAllProducts());
  }, [  ]);

  const checkProductInCart = useCallback(() => {
    for (let i = 0; i < cartState?.length; i++) {
      if (getProductId === cartState[i]?.productId?._id) {
        setAlreadyAd(true);
      }
    }
  }, [cartState, getProductId]);

  useEffect(() => {
    checkProductInCart();
  }, [checkProductInCart]);

  // const uploadCart = () => {
  //   if (color === null) {
  //     //
  //     toast.error("Please color choose");
  //     return false;
  //   } else {
  //     dispatch(
  //       addOrRemoveCart({
  //         productId: productState?._id,
  //         quantity,
  //         color,
  //         price: productState?.price,
  //       })
  //     );
  //     console.log("card should be added");
  //   }
  //   navigate('/cart')
  // };

  // const copyToClipBoard = (text) => {
  //   console.log("text", text);
  //   var textField = document.createElement("textarea");
  //   textField.innerHTML = text;
  //   document.body.appendChild(textField);
  //   textField.select();
  //   document.execCommand("copy");
  //   textField.remove();
  // }
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const [popularProduct, setPopularProduct] = useState([]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState?.length; index++) {
      const element = productsState[index];
      if (element.tags === "popular") {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productsState]);

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const addRatingToProduct = () => {
    if (star === null) {
      toast.success("Please add star rating");
      return false;
    } else if (comment === null) {
      toast.success("Plaesa Write Review About the Product.");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getSingleProduct(getProductId));
      }, 100);
    }
    return false;
  };
  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title={productState?.title} />

      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <img src={imageUrl} alt="" className="img-fluid" />
            </div>
            <div className="other-product-image d-flex flex-wrapper gap-10">
              {productState?.images.map((index, item) => {
                return (
                  <div key={index}>
                    <img src={imageUrl} alt="" className="img-fluid " />
                  </div>
                );
              })}

              <div>
                <img src={imageUrl} alt="" className="img-fluid" />
              </div>
              <div>
                <img src={imageUrl} alt="" className="img-fluid" />
              </div>
              <div>
                <img src={imageUrl} alt="" className="img-fluid" />
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="review-btn">${productState?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    isHalf={true}
                    value={"3"}
                    //edit={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">2 Reviews</p>
                </div>

                <a href="#review">Write a Review</a>
              </div>
              <div className="border-bottom py-3">
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Type</h3>
                  <p className="product-data">abs</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Brand </h3>
                  <p className="product-data  ">{productState?.brand}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading"> Categories</h3>
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading"> Tags</h3>
                  <p className="product-data">{productState?.tags}</p>
                </div>

                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">SKU</h3>
                  <p className="product-data">abs</p>
                </div>
                {alreadyAd === false && (
                  <>
                    <div className="d-flex flex-row gap-10 my-2">
                      <h3 className="product-heading">Color: </h3>
                      <Color
                        setColor={setColor}
                        colorData={productState?.color}
                      />
                    </div>
                  </>
                )}

                <div className="d-flex flex-row gap-10 my-2">
                  {alreadyAd === false && (
                    <>
                      <h3 className="product-heading">Quantity</h3>
                      <div className="">
                        <input
                          type="number"
                          name=""
                          id=""
                          min={1}
                          max={10}
                          className="form-control"
                          style={{ width: "70px" }}
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <div
                    className={
                      alreadyAd
                        ? "ms-0"
                        : "ms-5" +
                          `mt-3 d-flex justify-content-center gap-15 align-items-center ms-5`
                    }
                  >
                    <button
                      className="button border-0"
                      // data-bs-toggle='modal'
                      // data-bs-target='staticBackdrop'
                      type="button"
                      onClick={() => {
                        dispatch(addOrRemoveCart(productState, quantity));
                      }}
                    >
                      {alreadyAd ? "Go To Cart" : " Add To Cart"}
                    </button>
                    <Link
                      to="/checkout"
                      className="button signup border-0 text-white"
                    >
                      Buy It Now
                    </Link>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="!#">
                      <AiOutlineHeart /> Add to Compare
                    </a>
                  </div>
                  {/* <div>
                    <a 
                    href="javascript:void()"
                    onClick={() => copyToClipBoard(window.location.href)}
                    >
                      Copy Product Link
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{
                  __html: productState?.description,
                }}
                style={{ color: "#777777" }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex gap-10 align-items-center">
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      isHalf={true}
                      value={"3"}
                      //edit={false}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
              </div>

              <div className="review-form py-4">
                <h4>Write a Reviews</h4>
                <div className="d-flex flex-column gap-15">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    isHalf={true}
                    value={"3"}
                    edit={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    onClick={(e) => {
                      setStar(e);
                    }}
                  />
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    rows="4"
                    placeholder="Comments"
                    onClick={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div>
                  <div className="d-flex justify-content-end mt-3">
                    <button
                      onClick={addRatingToProduct}
                      className="button "
                      type="button"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
              <div className="reviews">
                {productState &&
                  productState.ratings?.map((index, item) => {
                    return (
                      <div className="review mb-4" key={index}>
                        <div className="d-flex gap-10 align-items-center">
                          <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            isHalf={true}
                            value={item?.star}
                            //edit={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3">{item?.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">
              Our Popular Products <BsArrowRight />
            </h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={popularProduct} />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
