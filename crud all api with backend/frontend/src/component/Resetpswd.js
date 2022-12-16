import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/register.css';
import axios from 'axios';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useJwt } from "react-jwt";

export default function Resetpswd() {
    const [email, setEmail] = useState('');
    const [old_password, setOld_password] = useState('');
    const [new_password, setNew_password] = useState('');
    const [cnfm_password, setCnfm_password] = useState('');
    const navigate = useNavigate();


    let { token } = useParams();
    const { decodedToken, isExpired } = useJwt(token);

    console.log("token", decodedToken);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("decodedToken:", decodedToken);

        if (decodedToken) {
        let bodydata = {
            email: decodedToken.email,
            new_password: new_password,
            cnfm_password: cnfm_password,
            old_password: old_password
        }
    
        // console.log("bodydata==", bodydata);

        axios.post("http://localhost:5000/demo/reset", bodydata).then((res) => {
            console.log("res:", res.data);



            if (res.data.success === 1) {
                console.log("messageprint", res.data.message);
                toast(res.data.message);
                navigate('/');
            }
            else {
                console.log("messageprint", res.data.message);
                toast(res.data.message);
            }
        })
    }
    }


    return (
        <>
            {/* <form onSubmit={handleSubmit}> */}
            <form>
                <h2>Reset Your Password</h2>
                <div className="form-outline mb-4">
                    <input type="text" id="form2Example17" className="form-control form-control-lg textbar"
                        placeholder='Your E-mail id' onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                </div>
                <div className="form-outline mb-4">
                    <input type="text" id="form2Example17" className="form-control form-control-lg textbar"
                        placeholder='old-password' onChange={(e) => setOld_password(e.target.value)}
                        value={old_password}
                        required
                    />

                </div>
                <div className="form-outline mb-4">
                    <input type="text" id="form2Example17" className="form-control form-control-lg textbar"
                        placeholder='new-password' onChange={(e) => setNew_password(e.target.value)}
                        value={new_password}
                        required />

                </div>
                <div className="form-outline mb-4">
                    <input type="text" id="form2Example17" className="form-control form-control-lg textbar"
                        placeholder='conform-password' onChange={(e) => setCnfm_password(e.target.value)}
                        value={cnfm_password}
                        required />

                </div>


                <div className="pt-1 mb-4">
                    <button type='submit' className="btn btn-dark btn-lg btn-block btn-login-save" onClick={onSubmit} >Save</button>
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
