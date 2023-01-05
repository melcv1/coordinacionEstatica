import React from 'react'

import './About.css'
import logo1 from "../../utils/images/logo.png";

import logo2 from "../../utils/images/logos.png";

import siete from "../../utils/images/aaa.jpg";
import ocho from "../../utils/images/8.png";
import nina from "../../utils/images/niña.png";

import uno from "../../utils/images/1.png";
import dos from "../../utils/images/2.png";
import tres from "../../utils/images/3.png";
import cuatro from "../../utils/images/4.png";
import cinco from "../../utils/images/5.png";
import seis from "../../utils/images/6.png";
import Header from '../../components/Header/Header';
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="about-container">
            <Header></Header>
            
             <div className="social3">
           <img src={uno} />
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
