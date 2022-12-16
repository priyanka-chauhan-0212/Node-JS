import React,{useState} from 'react'
import '../css/register.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';



export default function Forgetpswd() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    
  

    const onSubmit = async (e) => {
        e.preventDefault();
     
            
        let bodydata = {
            email
        }
        console.log("bodydata==", bodydata);

        axios.post("http://localhost:5000/demo/forget", bodydata).then((res) => {
            console.log("res:", res.data);



            if (res.data.success === 1) {
                console.log("messageprint", res.data.message);
                toast(res.data.message);
             
            }
            else {
                console.log("messageprint", res.data.message);
                toast(res.data.message);
            }
        })
    
    }

  return (
    <>
        <form>
            <h2>Forget Your Password</h2>
            <div className="form-outline mb-4">
                <input type="text" id="form2Example17" className="form-control form-control-lg textbar"
                      placeholder='Enter Youe E-Mail' onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    required
                />

            </div>
           

        


            <div className="pt-1 mb-4">
                  <button type='submit' className=" btn btn-dark btn-lg btn-block btn-login-save" onClick={onSubmit} >Save</button>
                  <button className="btn btn-dark btn-lg btn-block btn-login-cancel" >
                    {/*put router link here*/}
                    <Link to="/">cancel</Link>
                </button>

            </div>
            {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
        </form>
      </>
  )
}
