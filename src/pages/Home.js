import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import { useDispatch } from "react-redux/es/exports";

import {
  addToWishlist,
  getAllProducts,
} from "../features/products/productSlice";
import ReactStars from "react-rating-stars-component";
import view from "../images/view.svg";
import wish from "../images/wish.svg";
const ratingChanged = (newRating) => {
  console.log(newRating);
};
const Home = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };
  useEffect(() => {
    getallProducts();
  });
  const getallProducts = () => {
    dispatch(getAllProducts());
  };

  const [productState, setProductState] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/product");
        const data = await response.json();
        setProductState(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductData();
  }, []);
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row flex-column-reverse flex-md-row text-center text-md-start">
          <div className="col-6 col-md-6 gap-10">
            <div className="main-banner-content   position-relative ">
              <img
                className="img-fluid rounded-3"
                src="images/ipad2.jpg"
                alt="main-banner"
              />
              <div
                className="main-banner-content position-absolute"
                style={{ color: "white", marginRight: "10px" }}
              >
                <h5>IPAD S13+ PRO</h5>
                <p style={{ color: "white" }}>
                  From $999.00 or <br /> $41.62/month
                </p>
                <Link className="button">Buy Now</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative ">
                <img
                  className="img-fluid rounded-3"
                  src="images/catbanner-01.jpg"
                  alt="main-banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Best Sake.</h4>
                  <h5>Laptop</h5>
                  <p>
                    From $500.00 or <br /> $25.62/month{" "}
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  className="img-fluid rounded-3"
                  src="images/catbanner-02.jpg"
                  alt="main-banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL.</h4>
                  <h5>Smart Watch</h5>
                  <p>
                    From $100.00 or <br /> $25/month
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  className="img-fluid rounded-3"
                  src="images/catbanner-03.jpg"
                  alt="main-banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>IPAD S13+ PRO</h5>
                  <p>
                    From $999.00 or <br /> $41.62/month
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  className="img-fluid rounded-3"
                  src="images/catbanner-04.jpg"
                  alt="main-banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>Headphones</h5>
                  <p>
                    From $999.00 or <br /> $41.62/month{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-10" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

     

  
      <Container class1="popular-wrapper py-5  home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">
            Popular Product
            </h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              const imageUrl = item?.images?.[0]?.url || "";
              return (
                <div key={index} className={"col-3 py-3 col-md-auto"}>
                  <div className="product-card position-relative">
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
                        src={imageUrl}
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
                        value={item?.totalRating}
                        //edit={false}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                      <p
                        className={`description "d-block" : "d-none"
                      `}
                      ></p>
                      <p className="price">${item?.price}</p>
                    </div>
                    <div className="action-bar position-absolute">
                      <div className="d-flex flex-column gap-15 ">
                        <button className="border-0 bg-transparent">
                          <img
                            onClick={() => navigate("/product/" + item?._id)}
                            src={view}
                            alt=""
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
       
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">
              Special Product 
            </h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "special") {
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    brand={item?.brand}
                    title={item?.title}
                    totalrating={item?.totalrating.toString()}
                    price={item?.price}
                    sold={item?.sold}
                    quantity={item?.quantity}
                    imageUrl={item?.images[0].url}
                  />
                );
              }
            })}
        </div>
        
      </Container>

      <Container class1="marque-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>

                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>

                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>

                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>

                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>

                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
