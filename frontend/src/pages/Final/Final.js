import React, { Fragment, useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import "./Final.css";
import uno from "../../utils/images/1.png";
import siete from "../../utils/images/aaa.jpg";
import ocho from "../../utils/images/8.png";
import nin1 from "../../utils/images/cambio.png";
import Header from '../../components/Header/Header';
export default function Final() {

  return (

    <div className="home-container">
     <Header></Header>
      <div className="container">
        <div className="row home-top">
          <div className="col-lg-12 nuevos22" >

            <div className="cnt-in">
              
              <h2 className="prim-cn2">
              Evaluación Finalizada
              </h2>

              <img src={nin1} />

              <h1>¿Deseas realizar una nueva evaluación?</h1>
              <div>

              <Link to="/inicio">
              <button className="sig-inicio no-1"> No</button>

                    </Link>
              
              <Link to="/home">
              <button className="sig-inicio si-1"> Si</button>

                    </Link>

             
              </div>

           

           </div>
           
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
     
     
    </div>
  );
}
