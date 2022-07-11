
import React, { useRef, useState, useEffect } from 'react'

import './Resultados.css'
import logo1 from "../../utils/images/logo.png";

import logo2 from "../../utils/images/logos.png";

import siete from "../../utils/images/a2.png";
import ocho from "../../utils/images/a1.png";
import nino from "../../utils/images/a4.png";

import nina from "../../utils/images/a3.png";

import a1 from "../../utils/images/b1.png";

import a2 from "../../utils/images/b2.png";
import Estudiantes from "./Estudiantes";




export default function Resultados() {
    
    const [listUpdated, setListUpdated]=useState(false)
    
    return (
        <div className="about-container">  
            <div className="row">

            <div className="b1">
                <img className=" rotate" src={a1} />

                </div>
                 <div className="b2">
                <img className="rotate" src={a2} />

                </div>
            <div className="col-3 izquierda">
                <img src={nina} />

                </div>
                <div className="col-6 colo">
                    <div className="titulo">
                    <h1 className="about-heading">Resultados</h1>

                    </div>
               
            <div className="about-main">
                    <Estudiantes setListUpdated={setListUpdated}/> 
            </div>

                </div>
                <div className="col-3 derecha">
                <img src={nino} />

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
