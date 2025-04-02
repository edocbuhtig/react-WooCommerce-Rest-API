import storeImage from "../../public/store.jpg"
import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate()

  const handleProductPageRedirection = () => {
      navigate("/products")
  }
    
    return <>
      <div className="hero-banner">
          <img src={ storeImage } alt="Hero Banner" className="img-fluid" />
          <div className="hero-text text-center" style={ {
            marginTop: "30px"
          } }>
            <h1>Welcome to Demo WP Store</h1>
            <p> <hr /></p>
            <button className="btn btn-primary" onClick={ handleProductPageRedirection }>Shop Now</button>
          </div>
        </div>
      
        <div className="container mt-5">
          <h2 className="text-center mb-4"><hr /></h2>
          <div className="row">
            <div className="col-sm-12 col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">
                 </p>
                  <div className="card-footer text-muted">
                   </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">
                   </p>
                  <div className="card-footer text-muted">
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
}

export default Home