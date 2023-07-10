import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import {  Routes, Route} from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/Home'
import About from './pages/About'
import OurStore from "./pages/OurStore";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Color from "./pages/Color";
import Checkout from "./pages/Checkout";

import { OpenRoutes } from "./routing/OpenRoutes";
import Order from "./pages/Order";



function App() {
  return <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Layout/>}>
      <Route index element={ <Home/>} />
      <Route path='about' element={<About />} />
      <Route path='product' element={<OurStore />} />
      <Route path='product/:id' element={<SingleProduct />} />
      <Route path='cart' element={<Cart />} />
      <Route path='color' element={<Color />} />
      <Route path='my-orders' element={<Order />} />
      <Route path='checkout' element={<Checkout />} />
      <Route path='compare-product' element={<CompareProduct />} />
      <Route path='wishlist' element={<Wishlist />} />
      <Route path='login' element={<OpenRoutes><Login /></OpenRoutes>} />
      <Route path='forgot-password' element={<Forgotpassword />} />
      <Route path='signup' element={<OpenRoutes><Signup /></OpenRoutes>} />
      <Route path='reset-password' element={<Resetpassword />} />
    </Route>
   </Routes>
   </BrowserRouter>
  </>
}

export default App;
