
import './App.css';
import Home from './component/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './component/Login';
import Register from './component/Register';
import Resetpswd from './component/Resetpswd';
import Forgetpswd from './component/Forgetpswd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
         

          <Route path="/form" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/resetpassword/:token" element={<Resetpswd />} />
          <Route path="/forgetpassword" element={<Forgetpswd />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
