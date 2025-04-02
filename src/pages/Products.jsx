import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllProducts } from '../Api.js'
import { myStoreHook } from "../MyStoreContext.jsx"

const Products = ({ setPageLoading, onAddToCart }) => {

    const { renderProductPrice } = myStoreHook()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    useEffect( () => {

       const fetchProducts = async () => {
        
        setPageLoading(true)
        
        const data = await getAllProducts();

        setProducts(data)

        console.log(data)

        setPageLoading(false)
       }

       fetchProducts()
    }, [])

    const handleSingleProductDetailsRedirection = (productId) => {

        navigate(`/product/${productId}`)
    }

    return <>
      
      <h1 className="my-4">Products</h1>
        <div className="row">

          {
            products.map( (singleProduct, index) => (
              <div key={ index } className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card product-card">
                  <img className="card-img-top" src={ singleProduct?.images[0]?.src } alt={ singleProduct.name } />
                  <div className="card-body">
                    ...
                    <h5 className="card-title" style={ {
                      cursor: "pointer"
                    } } onClick={ () => handleSingleProductDetailsRedirection(singleProduct.id) }>
                      { singleProduct.name }
                    XYZ</h5>
                    <p className="card-text">{ renderProductPrice(singleProduct) }</p>
                    <p className="card-text" dangerouslySetInnerHTML={ {
                      __html: singleProduct?.description
                    } }></p>
                    <p className="card-text">Category: { singleProduct?.categories.map( (category) => category.name ).join(",") }</p>
                    <button className="btn btn-primary" onClick={ () => onAddToCart(singleProduct) }>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
          
        </div>

    </>
}

export default Products