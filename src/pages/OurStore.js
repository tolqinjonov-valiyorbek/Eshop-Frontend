import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getAllProducts } from "../features/products/productSlice";

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const productState = useSelector((state) => state?.product?.product);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);





  // Filter States
  const [category, setCategory] = useState(null);
  const [ setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort ] = useState(null);
  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newtags = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand);
      category.push(element.category);
      newtags.push(element.tags);
    }

    setBrands(newBrands);
    setCategories(category);
    setTags(newtags);
  }, [productState]);

  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  });
  
  const getProducts = () => {
    dispatch(getAllProducts({sort, tags, brands, category, minPrice,maxPrice}));
  };

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container className="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop by Categories</h3>
              <div>
                <ul className="ps-0">

                    {
                      categories &&  [...new Set(categories)].map((item, index) => {
                        return <li 
                        key={index} 
                        onClick={() => setCategory(item)}>{item}</li>
                      })
                    }
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control "
                      id="floatingInput"
                      placeholder="from"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="/">From</label>
                  </div>
                  <div>
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control "
                        id="floatingInput"
                        placeholder="to"
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <label htmlFor="/">to</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                     {
                      tags &&  [...new Set(tags)].map((item, index) => {
                        return ( <span onClick={() =>setTags(item)} key={index} className="badge bg-light text-capitalize text-secondary rounded-3 py-2 px-3">
                        {item}
                      </span>)
                      })
                    }
              </div>
            </div>

            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Brands</h3>
              <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                     {
                      brands &&  [...new Set(brands)].map((item, index) => {
                        return ( <span onClick={() =>setBrand(item)} key={index} className="badge bg-light text-capitalize text-secondary rounded-3 py-2 px-3">
                        {item}
                      </span>)
                      })
                    }
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block">Sort By:</p>
                  <select
                    name=""
                    defaultValue={"DEFAULT"}
                    className="form-control form-select"
                    id=""
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="manual">Featured</option>
                  </select>
                </div>

                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0" style={{ width: "100px" }}>
                    21 Products
                  </p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="products-list pb-5">
              <div className="d-flex flex-wrap  justify-content-start gap-5">
                <ProductCard
                  data={productState ? productState : []}
                  grid={grid}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
