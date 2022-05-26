import React from "react";
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
  return (
    <div className="home-container">
      <div className="container">
        <div className="row home-top">
          <div className="col-lg-6 ">
            <img src={inicio} />
          </div>
          <div className="col-lg-6 fondo">
            <h2 className="description2">Coordinación estática</h2>
            <h1 className="description">¡Bienvenido!</h1>
            <Form/>
           
            
          </div>
        </div>
        <div className="row">                        
              <Link to="/about">
                <button className="btn2 start-btn">Información</button>
              </Link>         

        </div>
       
      </div>
      <div className="social">
           <img src={siete} />
      </div>

      <div className="social2">
           <img src={ocho} />
      </div>
      <div className="social3">
           <img src={uno} />
      </div>
      <div className="social4">
           <img src={dos} />
      </div>
      <div className="social5">
           <img src={tres} />
      </div>
      <div className="social6">
           <img src={cuatro} />
      </div>
      <div className="social7">
           <img src={cinco} />
      </div>
      <div className="social8">
           <img src={seis} />
      </div>
    </div>
  );
}
