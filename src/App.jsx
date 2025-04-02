import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/style.css'
import './assets/loader.css'
import NavBar from "./layouts/NavBar"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import MyOrders from "./pages/MyOrders"
import MyAccount from "./pages/MyAccount"
import Auth from "./pages/Auth"
import SingleProduct from './pages/SingleProduct'
import Footer from './layouts/Footer.jsx'
import Loader from './layouts/Loader.jsx'
import './Api.js'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { myStoreHook } from './MyStoreContext.jsx'

function App() {

  const { 
    setPageLoading, 
    loader, 
    setUserLogout,
    isAuthenticated, 
    cart,
    addProductsToCart,
    removeItemsFromCart,
    loggedInUserData,
    clearCartItem,
    setLoggedInUserData,
    setUserLoggedInStatus
  } = myStoreHook()

  return (
    <>
        <Router>
            <NavBar setUserLogout={ setUserLogout } isAuthenticated={ isAuthenticated } cartItem={ cart } />

            <div className='container'>

              <ToastContainer />
              { loader && <Loader /> }

              <Routes>
                  <Route path='/' element={ <Home /> } />
                  <Route path='/products' element={ <Products onAddToCart={ addProductsToCart } setPageLoading={ setPageLoading } /> } />
                  <Route path='/cart' element={ <Cart isAuthenticated= { isAuthenticated } onRemoveProduct={ removeItemsFromCart } cart={ cart } /> } />
                  <Route path='/checkout' element={ <Checkout loggedInUserData={ loggedInUserData } clearCartItem={ clearCartItem } /> } />
                  <Route path='/my-orders' element={ <MyOrders setPageLoading={ setPageLoading } loggedInUserData={ loggedInUserData } /> } />
                  <Route path='/my-account' element={ <MyAccount loggedInUserData={ loggedInUserData } /> } />
                  <Route path='/login' element={ <Auth setLoggedInUserData={ setLoggedInUserData } isAuthenticated={ setUserLoggedInStatus } setPageLoading={ setPageLoading } /> } />
                  <Route path='/product/:id' element={ <SingleProduct onAddToCart={ addProductsToCart } setPageLoading={ setPageLoading } /> } />
              </Routes>
            </div>

            <Footer />
        </Router>


    </>
  )
}

export default App
