import React, { Fragment, useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import "./Inicio.css";

import uno from "../../utils/images/1.png";
import siete from "../../utils/images/aaa.jpg";
import ocho from "../../utils/images/8.png";
import nin1 from "../../utils/images/cambio.png";
import Header from '../../components/Header/Header';
export default function Home() {

  const [nino, setNino] = useState({
    nombre: '',
    edad_actual: 0
  })


  return (

    <div className="home-container">
     <Header></Header>
      <div className="container">
        <div className="row home-top">
          <div className="col-lg-12 nuevos22" >

            <div className="cnt-in">
              <h1 className="prim-cn">
                Bienvenido a
              </h1>
              <h2 className="prim-cn2">
              "Static-Child"
              </h2>

              <img src={nin1} />
              <div>
              <Link to="/home">
              <button className="sig-inicio"> Siguiente</button>

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
