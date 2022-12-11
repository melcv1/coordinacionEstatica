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
            <a className="nav-link" >Tareas</a>
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
      <div className="social6">
           <img src={cuatro} />
      </div>
      <div className="social7">
           <img src={cinco} />
      </div>
      <div className="social8">
           <img src={seis} />
      </div>
            <div className="row">
                <div className="col-8">
                    <div className="titulo">
                    <h1 className="about-heading">Coordinación estática</h1>

                    </div>
               
            <div className="about-main">
                <p className="about-content">La estabilidad estática, hace referencia a la capacidad del sujeto de mantenerse sobre una base estable mientras lo realiza con mínimos movimientos compensatorios.
                 Este tipo de acciones tienen como objetivo poner foco sobre el control postural estático.
                Es la facultad del individuo para mantener el cuerpo en posición sin desplazarse.    
                
                </p>
                <div className="developer-info">
                    <h4>Importancia</h4>
                    <p className="about-content">La coordinación y el equilibrio son capacidades que definirán la acción,
                 hasta el punto de que una deficiencia o anomalía en el desarrollo de cualquiera de ellas,
                  limitará o incluso impedirá una ejecución eficaz. Por ello, es necesario el trabajo de estas
                   capacidades en los primeros años de la Educación Primaria, ya que la mejora funcional del dominio 
                   corporal supondrá la adquisición de múltiples conductas motrices de carácter utilitario, 
                   lúdico o expresivo, que serán fundamentales para el desarrollo integral de los niños. 
                    </p>
                   
                    <div className="row">
                        <div  className="col-4 centrado">
                        <img src={logo1} height="100px" />
                        </div>
                    <div className="col-4 ">
                
                    <h4 className="centrado">Desarrollado por</h4>
                    <p className="about-content centrado">Laura Melissa Cedeño Viteri</p>
                        </div>
                        <div className="col-4 centrado">
                        <img src={logo2}  height="100px"/>
                        </div>
                    </div>
                   
                </div>
            </div>

                </div>
                <div className="col-3 derecha">
                <img src={nina} />

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
