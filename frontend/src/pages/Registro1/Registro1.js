import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import uno from "../../utils/images/1.png";
import siete from "../../utils/images/aaa.jpg";
import ocho from "../../utils/images/8.png";
import Form from "../../components/Formulario/Form";
import Header from '../../components/Header/Header';
import { AuthContext } from '../../context/AuthContext';
export const Registro1 = () => {

  const {
    user,
  } = useContext(AuthContext);

  const [nino, setNino] = useState({
    nombre: '',
    edad_actual: 0,
    evaluador: user,
  })


  return (

    <div className="home-container">
      <Header></Header>
      <div className="container">
        <div className="row home-top">
          <div className="col ">

          </div>
          <div className="col-lg-12 fondo-reg">
            <h2 className="description2">Registro del Participante</h2>

            <Form nino={nino} setNino={setNino} />



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
