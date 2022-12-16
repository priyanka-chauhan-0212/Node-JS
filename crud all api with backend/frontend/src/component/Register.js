import React,{useState} from 'react'
import '../css/register.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

export default function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [tech, setTech] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [num, setNum] = useState(false);
    const [message, setMessage] = useState("");

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            let data = {
                firstname: firstname,
                lastname: lastname,
                tech: tech,
                email: email,
                password: password,
                mobileNumber: num,
}
            let res = await axios.post("http://localhost:5000/demo/create", data)
            console.log("res===",res.data);
          
            if (res.status === 200) {
                getAllFunction();
                setFirstname("");
                setLastname("");
                setTech("");
                setEmail("");
                setPassword("");
                setNum("");
                setMessage("User created successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log("error====",err);
        }
    };      

    const getAllFunction = () => {
        axios.get('http://localhost:3000/demo/getAll').then((res) => {
            if (res.data.success === 1) {
               alert('ok')

            }
        });
    };
       
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <ToastContainer />
        <h2>Register Form</h2>
            <div className="form-outline mb-4">
                <input type="text" id="form2Example17" className="form-control form-control-lg textbar"
                 placeholder='FirstName' onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                        required
                        />

            </div>
            <div className="form-outline mb-4">
                    <input type="text" id="form2Example17" className="form-control form-control-lg textbar" 
                        placeholder='LastName' onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                        required/>

            </div>
            <div className="form-outline mb-4">
                    <input type="text" id="form2Example17" className="form-control form-control-lg textbar" 
                        placeholder='Tech' onChange={(e) => setTech(e.target.value)}
                        value={tech}
                        required/>

            </div>
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
            <div className="form-outline mb-4">
                <input type="number" id="form2Example17" className="form-control form-control-lg textbar"
                        placeholder='Mobile-number' onChange={(e) => setNum(e.target.value)}
                        value={num}
                        required/>

            </div>
            <div className="pt-1 mb-4">
                    <button type='submit' className="btn btn-dark btn-lg btn-block btn-login" >Login</button>
                    <span className="line">
                        {/*put router link here*/}
                        <Link to="/">go to main page</Link>
                    </span>

            </div>
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
        </>
    )
}
