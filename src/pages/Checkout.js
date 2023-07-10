import { Link } from "react-router-dom";
import Container from "../components/Container";
import {useDispatch, useSelector} from 'react-redux/es/exports';
import { useEffect, useState } from "react";
import {useFormik} from 'formik';
import { number, object, string } from "yup";

let shippingSchema = object({
  firstName:string(),
  lastName:string(),
  address:string().required(`adrress is Required`),
  city:string().required(`City is Required`),
  country:string().required(`Country is Required`),
  pinCode:number().required(`Email is Required`),
});
const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector(state => state.cart?.data);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country:"",
      pinCode:"",
      other:""
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      dispatch((values));
      setShippingInfo(values);
    },
  })

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + (Number(cartState[index].quantity) * cartState[index].price)
      setTotalAmount(sum)
      
    }
  },[cartState])

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">my website</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrump"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/cart" className="text-dark">
                      Cart
                    </Link>
                  </li>
                  &nbsp;/
                  <li className="breadcrump-item active" aria-current="page">
                    Information
                  </li>
                  <li className="breadcrumb-item"> &nbsp;/ Shipping </li>
                  &nbsp; 
                  
                </ol>
              </nav>
              <h4 className="title">Contact Information</h4>
              <p className="user-details">User (shaxsiywebsite@gmail.com)</p>
              <form
              onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                <select name="country" value={formik.values.country} onChange={formik.handleChange("country")}  className="form-control form-select" id=""
                //onBlur={formik.handleBlur("country")}
                >
                  <option value="" selected disabled>
                    Select country
                  </option>
                  <option value="Uzbekistan" selected disabled>
                    Uzbekistan
                  </option>
                </select>
                {/* <div className="error ms-2 my-1">
                  {
                    formik.touched.country && formik.errors.country
                  }
                </div> */}
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name='firstName'
                    onChange={formik.handleChange("firstName")} onBlur={formik.handleBlur("firstName")}
                  />
                </div>
                <div className="error ms-2 my-1">
                  {
                    formik.touched.firstName && formik.errors.firstName
                  }
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name='lastName'
                    onChange={formik.handleChange("lastName")} onBlur={formik.handleBlur("lastName")}
                />
              </div>
              <div className="error ms-2 my-1">
                {
                  formik.touched.lastName && formik.errors.lastName
                }
              </div>
              <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name='addess'
                    onChange={formik.handleChange("addess")} onBlur={formik.handleBlur("addess")}
                />
              </div>
              <div className="error ms-2 my-1">
                {
                  formik.touched.addess && formik.errors.addess
                }
              </div>
              <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Apartment"
                    className="form-control"
                    name='other'
                    onChange={formik.handleChange("other")} onBlur={formik.handleBlur("other")}
                />
              </div>
              <div className="error ms-2 my-1">
                {
                  formik.touched.other && formik.errors.other
                }
              </div>
              <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name='city'
                    onChange={formik.handleChange("city")} onBlur={formik.handleBlur("city")}
                />
              </div>
               
              <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="ZipCode"
                    className="form-control"
                    name='zipcode'
                    onChange={formik.handleChange("zipcode")} onBlur={formik.handleBlur("zipcode")}
                />
              </div>
                
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center ">
                    <Link to="/cart" className="text-dark">
                      Return to cart
                    </Link>
                    <Link to="/cart" className="button">
                      continue to Shipping
                    </Link>
                    <button className="button" type='submit'>Buy Now</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {
                cartState && cartState?.map((item, index) => {
                  return (
                    <div key={index} className="d-flex gap-10 align-items-center">
                <div className="w-75 gap-10 d-flex">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: "-20px", right: "-4px" }}
                      className="badge bg-secondary text-white rounded-circle p-3 position-absolute"
                    >
                      {item?.quantity}
                    </span>
                    <img src={item?.images[0].url} width={100} height={100}  alt="" />
                  </div>
                  <div>
                    <h5 className="title">{item?.productId?.title}</h5>
                    <p className="total-price">{item?.color?.title}</p>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5>${item?.price * item?.quantity}</h5>
                </div>
              </div>
                  )
                })
              }
              
            </div>
            <div border-bottom py-4>
              <div className="d-flex justify-content-between align-items-center">
                <p>Subtotal</p>
                <p>${totalAmount? totalAmount: "0"}</p>
              </div>
              {/* <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Shipping</p>
                <p className="mb-0">$5</p>
              </div> */}
            </div>
            {/* <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              
            </div> */}
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="total">Total</h4>
              <h5 className="total-price">${totalAmount? totalAmount: "100"}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
