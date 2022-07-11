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
        <Link to="/resultados">
                <button className="btn2 start-btn btn-res">Resultados</button>
                </Link>          
              <Link to="/about">
                <button className="btn2 start-btn">Información</button>
              </Link>    
              
                   

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
