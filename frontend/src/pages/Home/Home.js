import React, {Fragment, useState, useEffect} from 'react';
import { Link } from "react-router-dom";

import "./Home.css";
import inicio from "../../utils/images/inicio.png";

import uno from "../../utils/images/1.png";
import siete from "../../utils/images/aaa.jpg";
import ocho from "../../utils/images/8.png";
import Form from "../../components/Formulario/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson} from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
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
          <div className="col ">
          
          </div>
          <div className="col-lg-12 fondo">
          <Link to="/registro1">
          
                    <a className="texto-link">Agregar Nuevo Participante  <span className="icono-der"><FontAwesomeIcon icon={faPerson} />  </span></a>
                </Link>    
                      
          </div>

          <div className="col-lg-12 fondo3">
          <Link to="/busqueda">
          
                    <a className="texto-link">Buscar Participante  <span className="icono-der"><FontAwesomeIcon icon={faMagnifyingGlass} />  </span></a>
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
