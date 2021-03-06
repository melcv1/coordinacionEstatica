import React, {Fragment, useState, useEffect} from 'react';
import { Link } from "react-router-dom";

import "./Login.css";
import inicio from "../../utils/images/inicio.png";

import uno from "../../utils/images/1.png";
import dos from "../../utils/images/2.png";
import tres from "../../utils/images/3.png";
import cuatro from "../../utils/images/4.png";
import cinco from "../../utils/images/5.png";
import seis from "../../utils/images/6.png";


import { useNavigate } from "react-router-dom";
import siete from "../../utils/images/7.png";
import ocho from "../../utils/images/8.png";
import nueve from "../../utils/images/a5.png";

import Form from "../../components/Formulario/Form";

export default function Login() {

  const [nino2, setNino2] = useState([]);
  const navigate = useNavigate();
  
  let{usuario, contrasena} = nino2;

  const handleChange = e => {
    setNino2({
        ...nino2,
        [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {       

        if(usuario =='admin' && contrasena=='admin'){
          navigate("/inicio");
        }
        else{
          alert("Ingrese datos correctos");
        }
}



  return (
    
    
    <div className="home-container">
      <div className="container-login">
        <div className="row home-top">
          <div className="col-lg-12 fondo">
          <form onSubmit={handleSubmit}>
            
            <h1 className="description">Iniciar Sesión</h1>
            <h2 className="description2">Usuario</h2>
            <input type="text" value={usuario} name="usuario" onChange={handleChange} className="form-control nombre"></input>
            <h2 className="description2">Contraseña</h2>
            <input type="password" value={contrasena} name="contrasena" onChange={handleChange} className="form-control nombre"></input>
            <button type="submit" className="btn start-btn margens">Comencemos</button>
          </form>
          </div>
         
        </div>       
      </div>
      <div className="social ">
           <img src={siete} />
      </div>

      <div className="social2 ">
           <img src={ocho} />
      </div>
      <div className="social3 rotate">
           <img src={uno} />
      </div>
      <div className="social4 rotate" >
           <img src={dos} />
      </div>
      <div className="social5 rotate">
           <img src={tres} />
      </div>
      <div className="social6 rotate">
           <img src={cuatro} />
      </div>
      <div className="social7 rotate">
           <img src={cinco} />
      </div>
      <div className="social8 rotate">
           <img src={seis} />
      </div>

      <div className="derecha2">
                <img src={nueve} />

                </div>
    </div>
  );
}
