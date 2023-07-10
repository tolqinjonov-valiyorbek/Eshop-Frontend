import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";
const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getWishlistFromDb();
  }, []);
  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  };
  const wishlistState = useSelector((state) => state.auth.wishlist);
  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {!wishlistState  && <div className="text-center fs-3">No Data</div>}
          {wishlistState?.map((item, index) => {
            return (
              <div className="col-3" key={index}>
                <div className="wishlist-card w-100 position-relative">
                  <img
                    onClick={(e) => {
                      removeFromWishlist(item?._id);
                    }}
                    src="images/cross.svg"
                    alt=""
                    className="position-absolute cross"
                  />
                  <div className="wishlist-card-image bg-white">
                    <img
                      src={
                        item?.images[0].url
                          ? item?.images[0].url
                          : "images/watch.jpg"
                      }
                      className="img-fluid  d-block mx-auto"
                      alt=""
                      width={160}
                    />
                    <div className="bg-white px-3 py-3">
                      <h5 className="title">{item?.title}</h5>
                      <h6 className="price">$ {item?.price}</h6>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* <div className="col-3">
            <div className="wishlist-card w-100 position-relative">
              <img
                src="images/cross.svg"
                alt=""
                className="position-absolute cross"
              />
              <div className="wishlist-card-image">
                <img
                  src="images/watch-1.jpg"
                  className="img-fluid w-100"
                  alt=""
                />
                <div className="bg-white px-3 py-3">
                  <h5 className="title">
                    Xonor T1 7.0 1 Gb RAM 8 Gb ROM 7 Inch With Wi-Fi+3G Tablet
                  </h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
