import React, { useRef, useState, useEffect, useContext } from 'react';
import DropDown from '../../components/DropDown/DropDown';
import { UNITY_LOADERS_EXERCISES, U_LOADERS_EJ } from '../../data/unityData';
import Webcam from 'react-webcam';
import './exercises.css'

//hooks
import { useLocalStorage } from "../../localStorage/useLocalStorage";
import { useUnityContext } from "react-unity-webgl";
import UnityComponent from '../../components/Unity/UnityComponent';

import nueve from "../../utils/images/8.png";
import diez from "../../utils/images/aaa.jpg";
import doce from "../../utils/images/12.png";
import trece from "../../utils/images/13.png";
import { useFetchEdad } from '../../hooks/useFetchEdad';
import { useFetchId } from '../../hooks/useFetchId';
import { useDetector } from '../../hooks/useDetector';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import Timer from '../../components/Timer/Timer';
import { AuthContext } from '../../context/AuthContext';

function Exercises() {
    const { status } = useContext(AuthContext);

    
    const navigate = useNavigate();
    const params = useParams();
    const idEstudiante = params.id;

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const newTab = useRef(null);
    const { ninoEdad } = useFetchEdad();
    const [pose, setPose] = useLocalStorage("pose", "Habituacion");
    const [play, setPlay] = useLocalStorage("play", "tHabituacion");
    const [testTime, setTestTime] = useState(0);
    const [estId, setEstId] = useLocalStorage("estId", "0");
    //const idnino = useFetchId();
    /*
        const unityContext = useUnityContext({
            loaderUrl: UNITY_LOADERS_EXERCISES[pose].loaderUrl,
            dataUrl: UNITY_LOADERS_EXERCISES[pose].dataUrl,
            frameworkUrl: UNITY_LOADERS_EXERCISES[pose].frameworkUrl,
            codeUrl: UNITY_LOADERS_EXERCISES[pose].codeUrl
        });
    */
    const { poseTime, bestPerform, currentTime, startYoga, stopPose } = useDetector(
        webcamRef,
        canvasRef,
        pose,
        //unityContext.unload
    );

    const videoEl = useRef(null);

    async function handleChange(pose) {
        setPose(pose);
        //await unityContext.unload();
        window.location.reload(false);
    }
    let interval = null;
    function startTestTimer() {
        setPlay(pose + 'E');
        interval = setInterval(() => {
            setTestTime((time) => time + 10);
        }, 10);
    }


    function postResults(poseAct, paso) {
        clearInterval(interval);
        console.log("TIEMPO_EJ" + bestPerform);
        console.log("VALIDACION" + paso);
        var resultado = ({
            ID_PRUEBA: poseAct,
            ID_ESTUDIANTE: idEstudiante,
            TIEMPO_EJ: bestPerform,
            VALIDACION: paso,
            TIEMPO_FIN: testTime,
        })
        const requestInit = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resultado)
        }
        fetch('http://localhost:9000/api/actualizardatos/' + idEstudiante + "/" + poseAct, requestInit)
            .then(res => res.text())

    }
    useEffect(() => {
        //newTab.current.click()
    }, []);

    if (status === 'notAuthenticated') {
        return <Navigate to="/" />;
    } else {
        console.log(status);
    }

    return (
        <>

            <div className="yoga-container" >
                <div className="performance-container" >

                    <Timer testTime={testTime} startTestTimer={startTestTimer} />

                    <div className="time-container">
                        <div className="pose-performance" >
                            < h4 >
                                Tiempo: {poseTime}
                            </h4>
                            <div className="record-container" >
                                <h4> Tiempo Ejercicio: {bestPerform}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex">
                        < button onClick={() => navigate(`/start/${idEstudiante}`)} className="secondary-btn2 cn" > Cancelar </button>
                        < button onClick={() => stopPose(postResults, idEstudiante)} className="secondary-btn2 sg" > Siguiente </button>
                    </div>
                </div>

                <div className='exercise-container'>
                    <div className='webcam-container' >
                        <  Webcam width='640px'
                            height='480px'
                            id="webcam"
                            ref={webcamRef}
                            style={
                                {

                                    left: 120,
                                    top: 180,
                                    padding: '0px',
                                }
                            }
                        /> <canvas ref={canvasRef}
                            id="my-canvas"
                            width='640px'
                            height='480px'
                            style={
                                {
                                    position: 'absolute',
                                    left: 0,
                                    zIndex: 1
                                }
                            } >
                        </canvas>
                    </div>
                </div>

                <div className="social7 " >
                    <img src={trece} /> </div>
                <div className="social3 " >
                    < img src={trece} /> </div>
                <div className="social2" >
                    <img src={nueve} />
                </div>
                <div className="social" >
                    <img src={diez} />
                </div>

            </div>
            <Link to="/ejtuturial" target="_blank" rel="noopener noreferrer" ref={newTab} style={{ position: 'absolute', visibility: 'hidden' }}>
                <span>start</span>
            </Link>

        </>
    )

}

export default Exercises;

