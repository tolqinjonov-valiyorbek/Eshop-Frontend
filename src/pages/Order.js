import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { getOrders } from "../features/user/userSlice";
const Order = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.auth.getorderedProduct);
  // useEffect(() => {
  //   dispatch(getOrders());
  // },[]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders
        await dispatch(getOrders());
      } catch (error) {
        // Handle error
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <>
      <BreadCrumb title="My Orders" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Order Id</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount After Discount</h5>
              </div>
              <div className="col-3">
                <h5>Status</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            {orderState &&
              orderState?.map((item, index) => {
                return (
                  <div className="row bg-warning pt-3 my-3" key={index}>
                    <div className="col-3">
                      <p>Order Id{item?._id}</p>
                    </div>
                    <div className="col-3">
                      <p>Total Amount{item?.totalPrice}</p>
                    </div>
                    <div className="col-3">
                      <p>
                        Total Amount After Discount{" "}
                        {item?.totalPriceAfterDiscount}{" "}
                      </p>
                    </div>
                    <div className="col-3">
                      <p>Status{item?.orderStatus}</p>
                    </div>
                    <div className="col-12">
                      <div className="row bg-secondary p-3">
                        <div className="col-3">
                          <h6 className="text-white">Product Name</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Quantity</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Price</h6>
                        </div>
                      </div>
                      {item?.orderitems?.map((i, index) => {
                        return (
                          <div className="col-12" key={index}>
                            <div className="row bg-secondary p-3">
                              <div className="col-3">
                                <p className="text-white">Product Name{i?.product?.title}</p>
                              </div>
                              <div className="col-3">
                                <p className="text-white">Quantity {i?.quantity} </p>
                              </div>
                              <div className="col-3">
                                <p className="text-white">Price{i?.price}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Order;
