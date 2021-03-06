import React, {Fragment, useState, useEffect} from 'react';
import { Link } from "react-router-dom";

import "./Home.css";
import inicio from "../../utils/images/inicio.png";

import uno from "../../utils/images/1.png";
import dos from "../../utils/images/2.png";
import tres from "../../utils/images/3.png";
import cuatro from "../../utils/images/4.png";
import cinco from "../../utils/images/5.png";
import seis from "../../utils/images/6.png";


import siete from "../../utils/images/7.png";
import ocho from "../../utils/images/8.png";

import Form from "../../components/Formulario/Form";

export default function Home() {

  const [nino, setNino] = useState({
    nombre: '',
    edad_actual: 0
  })


  return (
    
    <div className="home-container">
       <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse jsflx" id="navbarTogglerDemo01">
          
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
            <Link to="/inicio">
                <a class="nav-link">Inicio</a>
            </Link>
            </li>
            <li class="nav-item">
            <Link to="/home">
            <a class="nav-link" >Tareas</a>
            </Link>
              
            </li>
            <li class="nav-item">
            <Link to="/resultados">
                <a class="nav-link">Resultados</a>
            </Link>  
             
            </li>
            <li class="nav-item">
            <Link to="/about">
            <a class="nav-link" >Créditos</a>
              </Link>    
              
             
            </li>
            
          </ul>
     
        </div>
      </nav>
      <div className="container">
        <div className="row home-top">
          <div className="col-lg-6 ">
            <img src={inicio} className="nuevos1"/>
          </div>
          <div className="col-lg-6 fondo">
            <h2 className="description2">Coordinación estática</h2>
            <h1 className="description">¡Bienvenido!</h1>
            
            <Form nino={nino} setNino={setNino}/>

           
            
          </div>
         
        </div>
        <div className="row">               
                
             
                   

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
    </div>
  );
}
