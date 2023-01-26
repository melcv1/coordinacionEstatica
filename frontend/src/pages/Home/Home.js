import React, {Fragment, useState, useEffect, useContext} from 'react';
import { Link, Navigate } from "react-router-dom";

import "./Home.css";
import "../../App.css";
import inicio from "../../utils/images/inicio.png";

import uno from "../../utils/images/1.png";
import siete from "../../utils/images/aaa.jpg";
import ocho from "../../utils/images/8.png";
import Form from "../../components/Formulario/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson} from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header/Header';
import { AuthContext } from '../../context/AuthContext';
export default function Home() {
  const { status } = useContext(AuthContext);  

  if (status === 'notAuthenticated') {
    return <Navigate to="/" />;
  }else{
    console.log(status);
  }


  return (
    
    <div className="home-container">
      <Header></Header>
      <div className="container">
        <div className="row home-top">
          <div className="col ">
          
          </div>
          <div className="col-lg-12 fondo">
          <Link to="/registro1">
          
                    <a className="texto-link"><span className="icono-der"><FontAwesomeIcon icon={faPerson} />  </span>Agregar Nuevo Participante  </a>
                </Link>    
                      
          </div>

          <div className="col-lg-12 fondo3">
          <Link to="/busqueda">
          
                    <a className="texto-link"><span className="icono-der"><FontAwesomeIcon icon={faMagnifyingGlass} />  </span>Buscar Participante  </a>
                </Link>    
                      
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
      <div className="social3 ">
           <img src={uno} />
      </div>
     
     
    </div>
  );
}
