import React from 'react'

import './About.css'
import logo1 from "../../utils/images/logo.png";

import logo2 from "../../utils/images/logos.png";

import siete from "../../utils/images/7.png";
import ocho from "../../utils/images/8.png";
import nina from "../../utils/images/niña.png";

import uno from "../../utils/images/1.png";
import dos from "../../utils/images/2.png";
import tres from "../../utils/images/3.png";
import cuatro from "../../utils/images/4.png";
import cinco from "../../utils/images/5.png";
import seis from "../../utils/images/6.png";

import { Link } from "react-router-dom";

export default function About() {
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
            
             <div className="social3">
           <img src={uno} />
      </div>
      
      <div className="social5">
           <img src={tres} />
      </div>
     
      <div className="social7">
           <img src={cinco} />
      </div>
      <div className="social8">
           <img src={seis} />
      </div>
            <div className="row">
                <div className="col-12">
                    <div className="titulo">
                    

                    </div>
               
            <div className="about-main">
                
                <div className="developer-info">
                    
                <br></br>
                <h4 className="centrado">Desarrollado por</h4>
                    <p className="about-content centrado">Laura Melissa Cedeño Viteri</p>
                   
<br></br>
                    <h4 className="centrado">Tutor</h4>
                    <p className="about-content centrado">Ing. Sonia Cárdenas Delgado, Ph.D</p>
                    <br></br>
                    <div className="row">
                        <div  className="col-4 centrado">
                        <img src={logo1} height="100px" />
                        </div>
                     
                    <div className="col-4 ">
                    <h4 className="centrado">Universidad de las Fuerzas Armadas</h4>
                    <p className="about-content centrado">Departamento de Ciencias de la Computación</p>
                        </div>
                        <div className="col-4 centrado">
                        <img src={logo2}  height="100px"/>
                        </div>
                    </div>
                   
                </div>
            </div>

                </div>
               

            </div>

            <div className="social">
           <img src={siete} />
      </div>

      <div className="social2">
           <img src={ocho} />
      </div>
           
        </div>
    )
}
