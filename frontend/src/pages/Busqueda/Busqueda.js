
import React, {Fragment, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import ListaEstudiantes from '../../components/ListaEstudiantes/ListaEstudiantes';

import siete from "../../utils/images/aaa.jpg";
import ocho from "../../utils/images/8.png";
import Header from '../../components/Header/Header';
export const Busqueda = () => {
    return (
    
        <div className="home-container">
           <Header></Header>
          <div className="container">
            <div className="row home-top">
              <div className="col ">
              
              </div>
              <div className="col-lg-12 fondo-reg mb-5">
                <h2 className="description2">Búsqueda de Participante</h2>                     
                
    
               
                
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
        
          
         
          
          
        </div>
      );
}
