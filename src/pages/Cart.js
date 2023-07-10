import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux/es/exports";

import {
  getUserCart,
  updateCartProduct,
} from "../features/user/userSlice";
import { addOrRemoveCart } from "../features/cart/cart.slice";

const Cart = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(null);
  const userCartState = useSelector((state) => state.cart?.data);
  const productState = useSelector((state) => state.product.singleproduct);
  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    updateACartProd();
  });

  const updateACartProd = (id) => {
    dispatch(updateCartProduct({ cartItemId: id, quantity }));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index].quantity) * userCartState[index].price;
      setTotalAmount(sum);
    }
  }, [userCartState]);
  const imageUrl = productState?.images[0].url || "";
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />

      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {userCartState &&
              userCartState?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data oy-3 d-flex justify-content-between align-items-center "
                  >
                    <div className="cart-col-1 d-flex align-items-center">
                      <div className="w-25">
                        <img className="img-fluid" src={imageUrl} alt="" />
                      </div>
                      <div className="w-75 px-3">
                        <p className="title"> {item?.title}</p>
                        <p>
                          color:
                          <ul className="colors ps-0">
                            <li
                              style={{ backgroundColor: item?.color }}
                            >

                            </li>
                          </ul>
                        </p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">{item?.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          type="number"
                          style={{ width: "60px" }}
                          min={1}
                          max={10}
                          className="form-control"
                          name=""
                          id=""
                          value={item?.quantity}
                          onChange={(e) => {
                            setQuantity(item?._id, e.target.value);
                            console.log(quantity)
                          }}
                          
                        />
                       
                      </div>
                      <div>
                        <AiFillDelete
                          type="submit"
                          onClick={() => {
                            dispatch(addOrRemoveCart(item));
                          }}
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        {item?.price * item?.quantity} 
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shipping
              </Link>
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: ${totalAmount}  </h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
