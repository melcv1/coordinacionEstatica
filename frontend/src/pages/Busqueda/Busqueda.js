
import React, {Fragment, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import ListaEstudiantes from '../../components/ListaEstudiantes/ListaEstudiantes';
import uno from "../../utils/images/1.png";
import tres from "../../utils/images/3.png";
import cinco from "../../utils/images/5.png";
import seis from "../../utils/images/6.png";


import siete from "../../utils/images/7.png";
import ocho from "../../utils/images/8.png";
export const Busqueda = () => {
    return (
    
        <div className="home-container">
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
          <div className="container">
            <div className="row home-top">
              <div className="col ">
              
              </div>
              <div className="col-lg-12 fondo-reg mb-5">
                <h2 className="description2">Busqueda de Participante</h2>                     
                
    
               
                
              </div>
              <ListaEstudiantes/>
             
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
         
          <div className="social5 ">
               <img src={tres} />
          </div>
         
          <div className="social7 ">
               <img src={cinco} />
          </div>
          <div className="social8 ">
               <img src={seis} />
          </div>
        </div>
      );
}
