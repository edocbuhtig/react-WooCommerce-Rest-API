import { useState } from "react"
import { registerStoreUser, loginUser, getLoggedInUserData } from "../Api"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

const Auth = ({ setPageLoading, isAuthenticated, setLoggedInUserData }) => {

    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
      login_username: "",
      login_password: ""
    })

    const [signUpData, setSignUpData] = useState({
      signup_name: "",
      signup_email: "",
      signup_username: "",
      signup_password: ""
    })

    // On Change Event for Login Form
    const handleOnChangeLoginFormData = (event) => {

       const {name, value} = event.target 

       setLoginData( (prevFormData) => ( {
         ...prevFormData,
         [name]: value
       } ) )
    }

    // Login Form Submit
    const handleLoginFormSubmit = async(event) => {

      setPageLoading(true)

      event.preventDefault()

      try{

        const response = await loginUser({
          username: loginData.login_username,
          password: loginData.login_password
        })

        console.log(response)

        setLoginData({
          login_username: "",
          login_password: ""
        })

        localStorage.setItem("auth_token", response.token)
        
        isAuthenticated(true)

        // Get User Data
        const loggedInUserData = {}
        const userData = await getLoggedInUserData(response.token)
        console.log(userData)

        loggedInUserData.id = userData.id
        loggedInUserData.name = userData.name
        loggedInUserData.email = response.user_email
        loggedInUserData.username = response.user_nicename

        localStorage.setItem("user_data", JSON.stringify(loggedInUserData))

        toast.success("User logged in Successfully")

        setLoggedInUserData(JSON.stringify(loggedInUserData))

        navigate("/products")

      } catch(error){

        console.log(error)
        toast.error("Invalid login details")
      } finally {
        setPageLoading(false)
      }
    }

    // Sign Up Form On Change Event
    const handleOnChangeSignUpFormData = (event) => {

       const { name, value } = event.target 

       setSignUpData( (prevFormData) => ( {
        ...prevFormData,
        [name]: value
       } ) )
    }

    // Handle Sign Up Form Submit
    const handleSignUpFormSubmit = async(event) => {
       
      event.preventDefault()

      setPageLoading(true)

      try{
        
        await registerStoreUser({
          name: signUpData.signup_name,
          username: signUpData.signup_username,
          email: signUpData.signup_email,
          password: signUpData.signup_password
        })

        setSignUpData({
          signup_name: "",
          signup_email: "",
          signup_username: "",
          signup_password: ""
        })

        setPageLoading(false)
        toast.success("User registered successfully!")
        
      } catch(error){

        console.log(error) 
      }
    }
    
    return <>
      <div className="container">
        <div className="toast-container"></div>
        <h1 className="my-4 text-center">Login / Signup</h1>
        <div className="row">
          <div className="col-md-6">
            <h2>Login</h2>
            <form onSubmit={ handleLoginFormSubmit }>
              <div className="mb-3">
                <label htmlFor="loginUsername" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  name="login_username"
                  value={ loginData.login_username }
                  onChange={ handleOnChangeLoginFormData }
                />
              </div>
      
              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">Password</label>
                <input
                  type="password"
                  name="login_password"
                  value={ loginData.login_password }
                  onChange={ handleOnChangeLoginFormData }
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
      
              <button type="submit" className="btn btn-primary mt-3">Login</button>
            </form>
          </div>
      
          <div className="col-md-6">
            <h2>Signup</h2>
            <form onSubmit={ handleSignUpFormSubmit }>
              <div className="mb-3">
                <label htmlFor="signupName" className="form-label">Name</label>
                <input
                  type="text"
                  name="signup_name"
                  value={ signUpData.signup_name }
                  onChange={ handleOnChangeSignUpFormData }
                  className="form-control"
                  placeholder="Enter name"
                />
              </div>
      
              <div className="mb-3">
                <label htmlFor="signupEmail" className="form-label">Email</label>
                <input
                  type="email"
                  name="signup_email"
                  value={ signUpData.signup_email }
                  onChange={ handleOnChangeSignUpFormData }
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
      
              <div className="mb-3">
                <label htmlFor="signupUsername" className="form-label">Username</label>
                <input
                  type="text"
                  name="signup_username"
                  value={ signUpData.signup_username }
                  onChange={ handleOnChangeSignUpFormData }
                  className="form-control"
                  placeholder="Enter username"
                />
              </div>
      
              <div className="mb-3">
                <label htmlFor="signupPassword" className="form-label">Password</label>
                <input
                  type="password"
                  name="signup_password"
                  value={ signUpData.signup_password }
                  onChange={ handleOnChangeSignUpFormData }
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
      
              <button type="submit" className="btn btn-success mt-3">Signup</button>
            </form>
          </div>
        </div>
      </div>
    </>
}

export default Auth