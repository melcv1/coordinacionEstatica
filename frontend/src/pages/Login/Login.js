import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, Navigate } from "react-router-dom";

import "./Login.css";
import inicio from "../../utils/images/inicio.png";

import uno from "../../utils/images/1.png";
import dos from "../../utils/images/2.png";
import tres from "../../utils/images/3.png";
import cuatro from "../../utils/images/4.png";
import cinco from "../../utils/images/5.png";
import seis from "../../utils/images/6.png";


import { useNavigate } from "react-router-dom";
import siete from "../../utils/images/aaa.jpg";
import ocho from "../../utils/images/8.png";
import nueve from "../../utils/images/a5.png";

import Form from "../../components/Formulario/Form";
import { AuthContext } from '../../context/AuthContext';

export default function Login() {

  const {
    status,
    signUp,
    signIn,
    logOut,
    removeError
  } = useContext(AuthContext);




  const [nino2, setNino2] = useState([]);
  const navigate = useNavigate();

  let { usuario, contrasena } = nino2;

  const handleChange = e => {
    setNino2({
      ...nino2,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    console.log(nino2);
    signIn(usuario, contrasena)
    //navigate("/inicio");

  }
  
  useEffect(() => {
    logOut();
  }, [])
  

  if (status === 'authenticated') {
    return <Navigate to="/inicio" />;
  }
 

  return (


    <div className="home-container">
      <div className="container-login">
        <div className="row login">
          <div className="col-lg-12 fondo">

            <h1 className="description">Iniciar Sesión</h1>
            <h2 className="description2">Usuario</h2>
            <input type="text" value={usuario} name="usuario" onChange={handleChange} className="form-control nombre"></input>
            <h2 className="description2">Contraseña</h2>
            <input type="password" value={contrasena} name="contrasena" onChange={handleChange} className="form-control nombre"></input>
            <button onClick={handleSubmit} className="btn start-btn margens">Ingresar</button>

          </div>

        </div>
      </div>
      <div className="social ">
        <img src={siete} />
      </div>

      <div className="social2 ">
        <img src={ocho} />
      </div>
      <div className="social3 ">
        <img src={uno} />
      </div>


      <div className="social8 ">
        <img src={seis} />
      </div>


    </div>
  );
}
