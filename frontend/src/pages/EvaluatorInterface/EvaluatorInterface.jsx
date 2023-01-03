import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
//components
import DropDown from '../../components/DropDown/DropDown';

// constants
import { UNITY_LOADERS, LOADERS } from '../../data/unityData';

//hooks
import { useLocalStorage } from "../../localStorage/useLocalStorage";

import './training.css';

import nueve from "../../utils/images/8.png";
import diez from "../../utils/images/aaa.jpg";

import doce from "../../utils/images/12.png";
import trece from "../../utils/images/13.png";
import Timer from '../../components/Timer/Timer';
import { useFetchPruebas } from '../../hooks/useFetchPruebas';

export const EvaluatorInterface = () =>{

    const navigate = useNavigate();
    const params = useParams();
    const idEstudiante = params.id;
    const { pruebas, isLoading } = useFetchPruebas(idEstudiante);
    
    const newTab = useRef(null);

    const [pose, setPose] = useLocalStorage("pose", "Habituacion");

    const [play, setPlay] = useLocalStorage("play", "tHabituacion");

    const [testTime, setTestTime] = useState(0);
    let interval = null;

    function handleChange(pose) {
        setPose(pose);
        // await unityContext.unload();
        //window.location.reload(false);
    }

    function update() {
        clearInterval(interval);
        var poseAct = 0;
        if (pose === "Entrenamiento1") {
            poseAct = 3;
        } else if (pose === "Entrenamiento2") {
            poseAct = 4;
        } else if (pose === "Evaluacion") {
            poseAct = 5;
        }
        else if (pose === "Habituacion") {
            poseAct = 2;
        } else {
            poseAct = 0;
        }

        var resultado = ({
            TIEMPO_INI: testTime,
            ID_PRUEBA: poseAct
        })

        const requestInit = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resultado)
        }
        return fetch('http://localhost:9000/api/actualizardatos/' + idEstudiante + "/" + poseAct, requestInit)
            .then(res => res.text())

    }

    async function goToExcercise() {
        //  await unityContext.unload();
        setPlay(pose+'E');
        await update();
        
        navigate(`/ej/${idEstudiante}`)
    }

    function goTo(path) {
        // await unityContext.unload();
        navigate(path)
    }



    function startTestTimer() {
        setPlay(pose+'T');
        interval = setInterval(() => {
            setTestTime((time) => time + 10);
        }, 10);
        
    }


    return (
        <>
            <div className="yoga-container" >
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse jsflx" id="navbarTogglerDemo01">

                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li class="nav-item active btn-nav-item">
                                <button onClick={() => goTo('/inicio')} class="nav-link">Inicio</button>

                            </li>
                            <li class="nav-item btn-nav-item">
                                <button onClick={() => goTo('/home')} class="nav-link">Registro</button>
                            </li>
                            <li class="nav-item btn-nav-item">
                                <button onClick={() => goTo('/resultados')} class="nav-link">Resultados</button>
                            </li>
                            <li class="nav-item btn-nav-item">
                                <button onClick={() => goTo('/about')} class="nav-link">Créditos</button>
                            </li>

                        </ul>

                    </div>
                </nav>
                
                < DropDown
                    poseList={Object.keys(UNITY_LOADERS)}
                    currentPose={pose}
                    setCurrentPose={handleChange}
                    pruebas={pruebas}
                    isLoading={isLoading}
                >
                </DropDown>



                <Timer testTime={testTime}  startTestTimer={startTestTimer} />
                <Link to="/play" target="_blank" rel="noopener noreferrer" ref={newTab} >
                    <span>start</span>
                </Link>
                { /*
                
                */
                }
                {/*
                    <UnityPlayer
                    source={U_LOADERS_TRAINING[pose]}
                    CallbackFn={startTestTimer}
                />
                */
                }
                
                <div className="social7 " >
                    <img src={trece} />
                </div>
                <div className="social3 " >
                    < img src={trece} />
                </div>
            
                <div className="social2" >
                    <img src={nueve} />
                </div>
                <div className="social" >
                    <img src={diez} />
                </div>
                <div className="btn-centered">

                < button onClick={() => navigate(`/busqueda`)} className="btny2 cancel" > Cancelar </button>

              
                    < button onClick={goToExcercise}
                        className="btny2" >
                        Evaluar
                    </button>

                    
                    
                </div>

                
            </div>
        </>
    )
}
