
import React, { useRef, useState, useEffect } from 'react'

import './Resultados.css'

import siete from "../../utils/images/aaa.jpg";
import ocho from "../../utils/images/8.png";

import a1 from "../../utils/images/b1.png";
import Estudiantes from "./Estudiantes";
import { Link } from "react-router-dom";




export default function Resultados() {
    
    const [listUpdated, setListUpdated]=useState(false)
    
    return (
        <div className="about-container">  
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse jsflx" id="navbarTogglerDemo01">
          
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
            <Link to="/inicio">
                <a className="nav-link">Inicio</a>
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/home">
            <a className="nav-link" >Registro</a>
            </Link>
              
            </li>
            <li className="nav-item">
            <Link to="/resultados">
                <a className="nav-link">Resultados</a>
            </Link>  
             
            </li>
            <li className="nav-item">
            <Link to="/about">
            <a className="nav-link" >Créditos</a>
              </Link>    
              
             
            </li>
            
          </ul>
     
        </div>
      </nav>
            <div className="row">

           
                
            <div className="col-2 izquierda">
                

                </div>
                <div className="col-8 colo">
                    <div className="titulo">
                    <h1 className="about-heading">Resultados</h1>

                    </div>
               
            <div className="about-main">
                    <Estudiantes setListUpdated={setListUpdated}/> 
            </div>

                </div>
                <div className="col-2 derecha">
             

                </div>
              

            </div>

            <div className="resultadostop">
           <img src={siete} />
      </div>

      <div className="social2">
           <img src={ocho} />
      </div>
           
        </div>
    )
}
