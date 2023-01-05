
import React, { useRef, useState, useEffect } from 'react'

import './Resultados.css'

import siete from "../../utils/images/aaa.jpg";
import ocho from "../../utils/images/8.png";

import a1 from "../../utils/images/b1.png";
import Estudiantes from "./Estudiantes";
import { Link } from "react-router-dom";
import Header from '../../components/Header/Header';



export default function Resultados() {
    
    const [listUpdated, setListUpdated]=useState(false)
    
    return (
        <div className="about-container">  
        <Header></Header>
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
