import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import {
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAllProducts } from "../features/products/productSlice";

const Header = () => {
  const cartState = useSelector((state) => state?.cart?.data);
  const [total, setTotal] = useState(null);
  const authState = useSelector((state) => state.auth);
  const productState = useSelector((state) => state?.product.product);
  const [paginate] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productOpt, setProductOpt] = useState([]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum =
        sum +
        Number(cartState[index].quantity) * Number(cartState[index].price);
      setTotal(sum);
    }
  }, [cartState.length]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Buyurtmangizni 1 kunda yetkazib beramiz
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:{" "}
                <a className="text-white" href="tel:+998 90 545 7275">
                  + 998 90 777 7777
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3 ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to="/" className="text-white">
                  ShopO
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0].prod}`);
                    dispatch(getAllProducts(selected[0].prod));
                  }}
                  options={productOpt}
                  minLength={2}
                  paginate={paginate}
                  labelKey={"name"}
                  placeholder="Search for Products..."
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div
                className="header-upper-links
                      d-flex align-items-center
                      justify-content-between"
              >
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <AiOutlineHeart style={{ width: "35px", height: "35px" }} />
                    <p className="mb-0">
                      Favourite <br />
                      Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : ""}
                    className="d-flex align-items-center p-5 gap-10 text-white"
                  >
                    <AiOutlineUser style={{ width: "35px", height: "35px" }} />
                    {authState?.user === null ? (
                      <p className="mb-0">
                        Login in <br />
                      </p>
                    ) : (
                      <p className="mb-0 text-center fs-5">
                        {authState?.user?.firstname}
                      </p>
                    )}
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-14 text-white"
                  >
                    <AiOutlineShoppingCart
                      style={{ width: "35px", height: "35px" }}
                    />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {cartState?.length ? cartState?.length : 0}
                      </span>
                      <p className="mb-0">${total ? total : 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-bottom py-3 navbar navbar-expand-md navbar-light">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom ml-4 d-flex align-items-center  gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item text-white " to="#">
                          Action
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="dropdown-item text-white nav-link"
                          type="button"
                        >
                          LogOut
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink className="text-white" to="/product/64aaf0a67508399be03ddda1">
                     Phones
                    </NavLink>
                    <NavLink className="text-white" to="/product">
                      Our Store
                    </NavLink>
                    <NavLink className="text-white" to="/my-orders">
                      My Orders
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
