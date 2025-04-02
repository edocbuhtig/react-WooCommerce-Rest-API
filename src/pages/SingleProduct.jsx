import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleProductData } from '../Api.js'
import { myStoreHook } from "../MyStoreContext.jsx"

const SingleProduct = ({ setPageLoading, onAddToCart }) => {

    const {id} = useParams()
    const { renderProductPrice } = myStoreHook()
    const [singleProduct, setSingleProduct] =  useState({})

    useEffect( () => {

      const fetchSingleProduct = async() => {

        setPageLoading(true)

        const data = await getSingleProductData(id)
        setSingleProduct(data)
        console.log(data)

        setPageLoading(false)
      }

      fetchSingleProduct()
    }, [id])

    
    return <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <img className="card-img-top" src={ singleProduct?.images?.[0]?.src } alt="Product Name" />
            </div>
          </div>
          <div className="col-md-6">
            <h1 className="my-4">{ singleProduct.name }</h1>
            <div className="mb-4" dangerouslySetInnerHTML={ {
              __html: singleProduct.description
            } }>
              
            </div>
            <div className="mb-4">
              <h5>Price:</h5>
              {renderProductPrice(singleProduct)} 
            </div>
            <div className="mb-4">
              <h5>Category:  {singleProduct?.categories?.map( (singleCategory) => singleCategory.name ).join(", ")} </h5>
            </div>
            <button className="btn btn-primary mt-4" onClick={ () => onAddToCart(singleProduct) }>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
}

export default SingleProduct