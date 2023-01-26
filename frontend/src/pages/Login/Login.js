import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, Navigate } from "react-router-dom";

import "./Login.css";
import "../../App.css";
import login_avatar from "../../utils/images/placeholder_individual.png"
import uno from "../../utils/images/1.png";
import seis from "../../utils/images/6.png";


import { useNavigate } from "react-router-dom";
import siete from "../../utils/images/aaa.jpg";
import ocho from "../../utils/images/8.png";

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
        <div className="row login justify-content-center">
          <div className="col-lg-12 fondo loginBox">
            <div className='loginIcon'>
              <img src={login_avatar} />
            </div>

            <h1 className="theme_h1">Iniciar Sesión</h1>
            <h2 className="theme_h2">Usuario *</h2>
            <input type="text" value={usuario} name="usuario" onChange={handleChange} className="form-control form_input"></input>
            <h2 className="theme_h2">Contraseña *</h2>
            <input type="password" value={contrasena} name="contrasena" onChange={handleChange} className="form-control form_input"></input>
            <button onClick={handleSubmit} className="btn_primary mt-4">Ingresar</button>

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
