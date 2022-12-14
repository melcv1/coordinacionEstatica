import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
//components
import DropDown from '../../components/DropDown/DropDown';

// constants
import { UNITY_LOADERS, U_LOADERS_TRAINING } from '../../data/unityData';

//hooks
import { useLocalStorage } from "../../localStorage/useLocalStorage";

import './training.css';

import nueve from "../../utils/images/9.png";
import diez from "../../utils/images/10.png";

import doce from "../../utils/images/12.png";
import trece from "../../utils/images/13.png";
import Timer from '../../components/Timer/Timer';
import { useFetchPruebas } from '../../hooks/useFetchPruebas';

function Training() {

    const navigate = useNavigate();
    const params = useParams();
    const idEstudiante = params.id;
    const { pruebas } = useFetchPruebas(idEstudiante);

    const newTab = useRef(null);
    const [currentPose, setCurrentPose] = useState(Object.keys(UNITY_LOADERS)[0])
    const [pose, setPose] = useLocalStorage("pose", "Habituacion");
    const [testTime, setTestTime] = useState(0);
    const [estId, setEstId] = useLocalStorage("estId", "0");
    let interval = null;

    /*
    const unityContext = useUnityContext({
        loaderUrl: UNITY_LOADERS[pose].loaderUrl,
        dataUrl: UNITY_LOADERS[pose].dataUrl,
        frameworkUrl: UNITY_LOADERS[pose].frameworkUrl,
        codeUrl: UNITY_LOADERS[pose].codeUrl,
        webGLContextAttributes: {
            //alpha: true,
            //antialias: true,
            // depth: true,
            //failIfMajorPerformanceCaveat: true,
            powerPreference: "high-performance",
            //premultipliedAlpha: true,
            //preserveDrawingBuffer: true,
            //stencil: true,
            desynchronized: true,
            //xrCompatible: true,
        },
    });*/

    function handleChange(pose) {
        setPose(pose);
        // await unityContext.unload();
        window.location.reload(false);
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
        return fetch('http://localhost:9000/api/actualizardatos/' + estId + "/" + poseAct, requestInit)
            .then(res => res.text())

    }

    async function goToExcercise() {
        //  await unityContext.unload();
        await update();
        navigate('/ej')
    }

    function goTo(path) {
        // await unityContext.unload();
        navigate(path)
    }



    function startTestTimer() {
        interval = setInterval(() => {
            setTestTime((time) => time + 10);
        }, 10);
    }

    useEffect(() => {
        newTab.current.click()
    }, []);


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
                >
                </DropDown>


                <Timer testTime={testTime} startTestTimer={startTestTimer} />
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
                <div className="social4 rotate" >
                    <img src={doce} />
                </div>
                <div className="social7 " >
                    <img src={trece} />
                </div>
                <div className="social3 " >
                    < img src={trece} />
                </div>
                <div className="social5 " >
                    < img src={doce} />
                </div>
                <div className="social2" >
                    <img src={nueve} />
                </div>
                <div className="social" >
                    <img src={diez} />
                </div>
                <div className="btn-centered">
                    < button onClick={goToExcercise}
                        className="btny2" >
                        Iniciar
                    </button>
                </div>

                <Link to="/tratutorial" target="_blank" rel="noopener noreferrer" ref={newTab} style={{ position: 'absolute', visibility: 'hidden' }}>
                    <span>start</span>
                </Link>
            </div>
        </>
    )
}

export { Training };