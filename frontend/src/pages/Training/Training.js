import React, { useState, useEffect, usePrevious, useRef } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//components
import DropDown from '../../components/DropDown/DropDown';
import UnityComponent from "../../components/Unity/UnityComponent";

// constants
import { UNITY_LOADERS, U_LOADERS_TRAINING } from '../../data/unityData';

//hooks
import { useLocalStorage } from "../../localStorage/useLocalStorage";
import { useUnityContext } from "react-unity-webgl";

import './training.css';

import nueve from "../../utils/images/9.png";
import diez from "../../utils/images/10.png";

import doce from "../../utils/images/12.png";
import trece from "../../utils/images/13.png";
import video from '../../utils/images/Pose1.mp4';
import { UnityPlayer } from '../../components/Unity/UnityPlayer';
import Timer from '../../components/Timer/Timer';

function Training() {
    const navigate = useNavigate();
    const [currentPose, setCurrentPose] = useState(Object.keys(UNITY_LOADERS)[0])
    const [pose, setPose] = useLocalStorage("pose", "Habituacion");
    const [testTime, setTestTime] = useState(0);


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

    function goToExcercise() {
        //  await unityContext.unload();
        navigate('/ej')
    }

    function goTo(path) {
        // await unityContext.unload();
        navigate(path)
    }

    let interval = null;
    
    function startTestTimer() {
        interval = setInterval(() => {
            setTestTime((time) => time + 10);
        }, 10);
    }
useEffect(() => {
    
}, [])


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
                                <button onClick={() => goTo('/home')} class="nav-link">Tareas</button>
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
                {/*
                < DropDown
                    poseList={Object.keys(UNITY_LOADERS)}
                    currentPose={pose}
                    setCurrentPose={handleChange}
                >
                </DropDown>
                
                */}
                <Timer testTime={testTime} startTestTimer={startTestTimer} />
                <div className='poseTitle_container'>
                    <div className='poseTitle' >{pose}</div>
                </div>
                <UnityPlayer
                    source={U_LOADERS_TRAINING[pose]}
                    CallbackFn={startTestTimer}
                />
                <div className="social4 rotate" >
                    <img src={doce} />
                </div>
                <div className="social7 rotate" >
                    <img src={trece} />
                </div>
                <div className="social3 rotate" >
                    < img src={trece} />
                </div>
                <div className="social5 rotate" >
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
            </div>
        </>
    )
}

export { Training };