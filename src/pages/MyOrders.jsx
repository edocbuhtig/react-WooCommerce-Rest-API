import { useEffect, useState } from "react"
import { getOrdersByUserId, getSingleOrderData, deleteOrderById } from "../Api"
import swal from "sweetalert"

const MyOrders = ({ loggedInUserData, setPageLoading }) => {

    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [orderItems, setOrderItems] = useState([])
    const [singleOrderData, setSingleOrderData] = useState({})

    const fetchAllOrders = async() => {

      setPageLoading(true)
      try{

        const userdata = JSON.parse(loggedInUserData)

        const response = await getOrdersByUserId(userdata.id)
        console.log(response)
        setOrderItems(response)

        localStorage.setItem("orderItems", JSON.stringify(response))
      } catch(error){

        console.log(error)
      } finally{

        setPageLoading(false)
      }
    }

    useEffect( () => {

      const orderItems = JSON.parse(localStorage.getItem("orderItems"))

      if(orderItems){
        setOrderItems(orderItems)
      } else {
        fetchAllOrders()
      }
    }, [])

    const handleRefreshOrders = () => {
      
      fetchAllOrders()
    }

    // Handle View Button Click
    const getSingleOrderInformation = async(orderID) => {

      setPageLoading(true)
      try{

        const response = await getSingleOrderData(orderID)

        console.log(response)
        setSingleOrderData(response)
        setShowDetailsModal(true)
      } catch(error){
        console.log(error)
      } finally {
        setPageLoading(false)
      }
    }

    // Handle Order Delete Button
    const deleteSingleOrderData = (orderID) => {

      setPageLoading(true)
      try{

        swal({
          title: "Are you sure?",
          text: "Are you sure want to delete this order?",
          icon: "warning",
          dangerMode: true,
          buttons: true
        })
        .then(async(willDelete) => {
          setPageLoading(true)
          if (willDelete) {
            const response = await deleteOrderById(orderID)
            console.log(response)
            fetchAllOrders()
            setPageLoading(false)
            swal("Deleted!", "Successfully, order has been deleted", "success");
          } else{
            setPageLoading(false)
          }
        });
      } catch(error){
        console.log(error)
      } finally{
        setPageLoading(false)
      }
    }
    
    return <>
      <div className="container">
        <h1>My Orders</h1>
        <button className="btn btn-primary mb-3 float-end" onClick={ handleRefreshOrders }>
          Refresh Orders
        </button>
        <div id="orders-container">

          {
             orderItems.length > 0 ? (
              <>
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date (M/D/Y)</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Items</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="orders-list">
                    {

                        orderItems.map( (singleOrder) => ( 

                          <tr key={ singleOrder.id }>
                            <td>{ singleOrder.id }</td>
                            <td>{ new Date(singleOrder.date_created).toLocaleDateString() }</td>
                            <td>{ singleOrder.status.charAt(0).toUpperCase() + singleOrder.status.slice(1) }</td>
                            <td>{ singleOrder.currency_symbol } { singleOrder.total }</td>
                            <td>
                              <ul>
                                {
                                  singleOrder.line_items.map( (item) => ( <li key={ item.id }>{item.name} ({item.quantity})</li> ) )
                                }
                              </ul>
                            </td>
                            <td>
                              <button className="btn btn-info me-2" onClick={ () => getSingleOrderInformation(singleOrder.id) }>View</button>
                              { singleOrder.status == "completed" ? (<button className="btn btn-danger" onClick={ () => deleteSingleOrderData(singleOrder.id) }>Delete</button>) : "" }
                            </td>
                          </tr>
                          
                        ) )

                    }
                    
                    
                  </tbody>
                </table>
              </>
             ) : (<p>No orders found.</p>)  
          }

        </div>
      
        {
           showDetailsModal && (<div id="order-details-modal" className="modal show d-block" style={ { display: "none" } } tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Order Details</h5>
                  <button type="button" className="btn-close" onClick={ () => setShowDetailsModal(false) }></button>
                </div>
                <div className="modal-body">
                  <p><strong>Order ID:</strong> { singleOrderData.id }</p>
                  <p><strong>Date:</strong> { new Date(singleOrderData.date_created).toLocaleDateString() }</p>
                  <p><strong>Status:</strong> { singleOrderData.status }</p>
                  <p><strong>Total:</strong> { singleOrderData.currency_symbol }{ singleOrderData.total }</p>
                  <p><strong>Items:</strong></p>
                  <ul>
                    {
                      singleOrderData.line_items.map( (item) => ( <li key={ item.id }>{item.name} ({item.quantity})</li> ) )
                    }
                  </ul>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={ () => setShowDetailsModal(false) }>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>)
        }
        
      </div>
    </>
}

export default MyOrders