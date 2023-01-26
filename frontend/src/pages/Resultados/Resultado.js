import React, { useRef, useState, useEffect, useContext } from 'react';
import { count } from '../../utils/music';
import './Resultados.css';
import c from "../../utils/images/rojo.png";

import veve2 from "../../utils/images/veve.png";
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';


const Resultado = ({ estudiante }) => {
    const pruebas = estudiante.pruebas;
    const [student, setStudent] = useState();

    const calculo = async () => {
        var p = [];
        console.log(pruebas);
        p[0] = 0;
        p[1] = Number(pruebas.pose3);
        p[2] = Number(pruebas.pose4);
        p[3] = Number(pruebas.pose5);

        var edadMotora;

        var c = 1 / 7;
        var w1 = 1;
        var w2 = 2;
        var w3 = 4;

        if (p[1] == 1 && p[2] == 0 && p[3] == 0) {
            edadMotora = 3;
        } else if (p[1] == 1 && p[2] == 1 && p[3] == 0) {
            edadMotora = 4;
        } else {
            edadMotora = (c * w1 * p[1] + c * w2 * p[2] + c * w3 * p[3]) * 5;
        }

        var cocienteMotor = 100 * (edadMotora / estudiante.edad);

        var resultado = ({
            EDAD_MOTORA: edadMotora,
            COCIENTE_MOTOR: cocienteMotor
        })

        const requestInit = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resultado)
        }
        await fetch('http://localhost:9000/api/actualizar/' + estudiante.id, requestInit)
            .then(res => res.text())

        const requestInit2 = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        await fetch('http://localhost:9000/api/participante/' + estudiante.id, requestInit2)
            .then(res => res.json())
            .then(res => setStudent(res[0]))



    }
    useEffect(() => {
        calculo();
    }, [])


    if (!student) {

        return (<>loading</>)
    }

    return (

        <div className="flex-column">
            <div className="flex-row div_edades">
                <div className="flex-column ">
                    <p className="par par2">POSIBLE EDAD MOTORA</p>
                    <div className="li_age">
                        <span className="par3">{student.EDAD_MOTORA} </span>
                        <span className="li_age_lbl">años</span>
                    </div>
                </div>
                <div className="flex-column">
                    <p className="par par2"> EDAD CRONOLÓGICA</p>
                    <div className="li_age">
                        <span className="par3">{student.EDAD_ACTUAL} </span>
                        <span className="li_age_lbl">años</span>
                    </div>
                </div>
            </div>
            <div className="flex-column text-center">
                <p className="par par2">COCIENTE MOTOR</p>
                <p className="par3">{student.COCIENTE_MOTOR} % </p>
            </div>
            <div className="flex-column div_infocategorias text-center align-self-center">

                <p className="li_habi">Se recomienda evaluación y análisis del profesional de pedagogía y psicología educativa</p>

            </div>
            <Link to={`/start/${estudiante.id}`}>
                <button className="btn_success">Evaluar</button>
            </Link>
        </div>
    );





};

export default Resultado;
