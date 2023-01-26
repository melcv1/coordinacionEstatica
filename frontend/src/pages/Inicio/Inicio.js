import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, Navigate } from "react-router-dom";

import "./Inicio.css";
import "../../App.css";
import uno from "../../utils/images/1.png";
import siete from "../../utils/images/aaa.jpg";
import ocho from "../../utils/images/8.png";
import nin1 from "../../utils/images/cambio.png";
import Header from '../../components/Header/Header';
import { AuthContext } from '../../context/AuthContext';
export default function Home() {

  const { status } = useContext(AuthContext);  

  if (status === 'notAuthenticated') {
    console.log(status);
    return <Navigate to="/" />;
  }else{
    console.log(status);
  }

  return (

    <div className="home-container">
     <Header></Header>
      <div className="container">
        <div className="row home-top">
          <div className="col-lg-12 nuevos22" >

            <div className="cnt-in">
              <h1 className="prim-cn">
                Bienvenido a "ECEN"
              </h1>
             

              <img src={nin1} />
              <div>
              <Link to="/home">
              <button className="btn_primary mb-4"> Siguiente</button>

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
