import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Create Context
const MyStoreContext = createContext()

export const MyStoreProvider = ({children}) => {

    const [loader, setLoader] = useState(false)
    const [cart, setCart] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loggedInUserData, setLoggedInUserData] = useState({})

    const setPageLoading = (status) => {
        setLoader(status)
    }

    // Return Product Regular Price / Sale Price Value
    const renderProductPrice = (product) => {

        if(product.sale_price){
  
          return <>
            <span className="text-muted text-decoration-line-through"> ${product.regular_price}  </span>
            <span className="text-danger"> ${product.sale_price} </span>
          </>
        }
  
        return <>
            ${product.regular_price || product.price }
        </>
    }

    useEffect( () => {

        const token = localStorage.getItem("auth_token")

        if(token){
        setUserLoggedInStatus(true)
        }

        const cartItems = JSON.parse(localStorage.getItem("cart")) || []
        setCart(cartItems)

        const userData = localStorage.getItem("user_data")
        setLoggedInUserData(userData)

    }, [])

    // Add to Cart Function
    const addProductsToCart = (product) => {

        const cart = JSON.parse(localStorage.getItem("cart")) || []

        const productExists = cart.find( item => item.id === product.id )

        if(productExists){

        productExists.quantity += 1
        } else {

        product.quantity = 1
        cart.push(product)
        }

        setCart([...cart])
        localStorage.setItem("cart", JSON.stringify(cart))

        toast.success("Product added to Cart!")
        console.log(product)
    }

    // Remove Item from Cart
    const removeItemsFromCart = (product) => {
        
        if(window.confirm("Are you sure want to remove?")){

        const updatedCart = cart.filter(item => item.id !== product.id)

        setCart(updatedCart)

        localStorage.setItem("cart", JSON.stringify(updatedCart))

        toast.success("Product removed from Cart!")
        }
    } 

    // Set User Auth after Login
    const setUserLoggedInStatus = (status) => {
        setIsAuthenticated(status)
    }

    // User Logout
    const setUserLogout = () => {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
        setUserLoggedInStatus(false)
    }

    // Remove Cart Items
    const clearCartItem = () => {
        localStorage.removeItem("cart")
        setCart([])
    }

    return (
        <MyStoreContext.Provider value={ { 
            setPageLoading, 
            loader, 
            renderProductPrice, 
            setUserLogout, 
            isAuthenticated, 
            cart,
            addProductsToCart,
            removeItemsFromCart,
            loggedInUserData,
            clearCartItem,
            setLoggedInUserData,
            setUserLoggedInStatus
        } }>
            {children}
        </MyStoreContext.Provider>
    )
}

// Custom Hook
export const myStoreHook = () => useContext(MyStoreContext)