import React,{useState} from 'react'
import '../css/login.css'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        // console.log("uhuihuig");
       
            let bodydata = { 
               email,password
            }
        console.log("bodydata==", bodydata);

          axios.post("http://localhost:5000/demo/login", bodydata).then((res) => {
            console.log("res:",res.data);

          

            if(res.data.success === 1){
             console.log("messageprint",res.data.message);
                    toast(res.data.message);                 
                   navigate('/home');
            }
            else{
                console.log("messageprint", res.data.message);
                toast(res.data.message);
            }
        }) 
       
    }
    
  return (
      <section className="vh-100" >
         
          <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col col-xl-10">
                      <div className="card" >
                          <div className="row g-0">
                              <div className="col-md-6 col-lg-5 d-none d-md-block">
                                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                      alt="login form" className="img-fluid"  />
                              </div>
                              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                  <div className="card-body p-4 p-lg-5 text-black">

                                      <form >

                                          <div className="d-flex align-items-center mb-3 pb-1">
                                              <i className="fas fa-cubes fa-2x me-3 clr" ></i>
                                            
                                          </div>
                                          <span className="h1 fw-bold mb-0 signin">Sign into your account</span>
                                          <br/>
                                          {/* <h5 className="fw-normal mb-3 pb-3" >Sign into your account</h5> */}

                                          <div className="form-outline mb-4">
                                              <input type="email" id="form2Example17" className="form-control form-control-lg textbar" 
                                                  placeholder='Email address' onChange={(e) => setEmail(e.target.value)}
                                                  value={email}
                                                  required/>
                                              
                                          </div>

                                          <div className="form-outline mb-4">
                                              <input type="password" id="form2Example27" className="form-control form-control-lg textbar" 
                                                  placeholder='Password' onChange={(e) => setPassword(e.target.value)}
                                                  value={password}
                                                  required/>
                                             
                                          </div>

                                          <div className="pt-1 mb-4">
                                              <button className="btn btn-dark btn-lg btn-block btn-login" onClick={onSubmit} type="button">
                                                 Login
                                                  </button>
                                          </div>
                                         
                                          <a className="small text-muted" href="#!"><Link to="/forgetpassword">Forgot password?</Link></a>
                                         
                                          <p className="mb-5 pb-lg-2" >Don't have an account? 
                                              <span className="line">
                                                  {/*put router link here*/}
                                                  <Link to="/form">Create account Here</Link>
                                              </span></p>
                                          
                                      </form>
                                      
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>  
      </section>
      
  )
}
