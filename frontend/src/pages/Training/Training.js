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

import nueve from "../../utils/images/8.png";
import diez from "../../utils/images/aaa.jpg";

import doce from "../../utils/images/12.png";
import trece from "../../utils/images/13.png";
import Timer from '../../components/Timer/Timer';
import { useFetchPruebas } from '../../hooks/useFetchPruebas';
import Header from '../../components/Header/Header';
function Training() {

    const navigate = useNavigate();
    const params = useParams();
    const idEstudiante = params.id;
    const { pruebas, isLoading } = useFetchPruebas(idEstudiante);
    
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
        return fetch('http://localhost:9000/api/actualizardatos/' + idEstudiante + "/" + poseAct, requestInit)
            .then(res => res.text())

    }

    async function goToExcercise() {
        //  await unityContext.unload();
        await update();
        navigate(`/ej/${idEstudiante}`)
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
                <Header></Header>
                
                < DropDown
                    poseList={Object.keys(UNITY_LOADERS)}
                    currentPose={pose}
                    setCurrentPose={handleChange}
                    pruebas={pruebas}
                    isLoading={isLoading}
                >
                </DropDown>


                <Timer testTime={testTime}  startTestTimer={startTestTimer} />
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
                        Ingresar
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