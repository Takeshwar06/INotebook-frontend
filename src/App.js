import React from "react";
import About from "./Component/About";
import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from "./Component/Context/notes/NoteState";
import Alert from "./Component/Alert";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import { useState } from "react";

function App() {

  const[alert,setAlert]=useState({})
  const showAlert=(massage,type)=>{
    setAlert({
           msg : massage,
           type : type
    })
  }
  setTimeout(() => {
    setAlert(null);
  }, 1500);

  return (
    <NoteState showAlert={showAlert}>
      <Router>
        <Navbar />
        <Alert Alert={alert}/>  {/*need to improvement */}
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
          <Route exact path="/about" element={<About />} ></Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} ></Route>
          <Route exact path="/signup" element={<Signup showAlert={showAlert} />} ></Route>
        </Routes>
        </div>
      </Router>
    </NoteState>
  );
}
export default App;  
