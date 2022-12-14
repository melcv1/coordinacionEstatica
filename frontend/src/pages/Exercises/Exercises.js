import React, { useRef, useState, useEffect } from 'react';
import DropDown from '../../components/DropDown/DropDown';
import { UNITY_LOADERS_EXERCISES, U_LOADERS_EJ } from '../../data/unityData';
import Webcam from 'react-webcam';
import './exercises.css'

//hooks
import { useLocalStorage } from "../../localStorage/useLocalStorage";
import { useUnityContext } from "react-unity-webgl";
import UnityComponent from '../../components/Unity/UnityComponent';

import nueve from "../../utils/images/9.png";
import diez from "../../utils/images/10.png";
import doce from "../../utils/images/12.png";
import trece from "../../utils/images/13.png";
import { useFetchEdad } from '../../hooks/useFetchEdad';
import { useFetchId } from '../../hooks/useFetchId';
import { useDetector } from '../../hooks/useDetector';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import Timer from '../../components/Timer/Timer';

function Exercises() {
    const navigate = useNavigate();
    const params = useParams();
    const idEstudiante = params.id;

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const newTab = useRef(null);
    const { ninoEdad } = useFetchEdad();
    const [pose, setPose] = useLocalStorage("pose", "Habituacion");
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
        interval = setInterval(() => {
            setTestTime((time) => time + 10);
        }, 10);
    }


    function postResults(poseAct, paso) {
        clearInterval(interval);
        var resultado = ({
            ID_PRUEBA: poseAct,
            ID_ESTUDIANTE: estId,
            TIEMPO_EJ: bestPerform,
            VALIDACION: paso,
            TIEMPO_FIN: testTime,
        })
            const requestInit = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resultado)
            }
             fetch('http://localhost:9000/api/actualizardatos/' + estId +"/"+poseAct, requestInit)
                .then(res => res.text())

    }
    useEffect(() => {
        newTab.current.click()
    }, []);

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
                                <h4> Tiempo Record: {bestPerform}
                                </h4>
                            </div>
                        </div>
                    </div>
                    < button onClick={() => stopPose(postResults)} className="secondary-btn2 sig-2" > Siguiente </button>
                    < button onClick={() => navigate(`/start/${idEstudiante}`)} className="secondary-btn2 cancel" > Cancelar </button>
                </div>

                <div className='exercise-container'>
                    <div className='webcam-container' >
                        <  Webcam width='600px'
                            height='400px'
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
                            width='600px'
                            height='400px'
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
                <div className="social4 " >
                    <img src={doce} />
                </div>
                <div className="social7 " >
                    <img src={trece} /> </div>
                <div className="social3 " >
                    < img src={trece} /> </div> <div className="social5 " >
                    < img src={doce} /> </div>
                <div className="social2" >
                    <img src={nueve} />
                </div>
                <div className="social" >
                    <img src={diez} />
                </div>

            </div>
            <Link to="/ejtuturial" target="_blank" rel="noopener noreferrer" ref={newTab} style={{position:'absolute',visibility:'hidden'}}>
                <span>start</span>
            </Link>

        </>
    )

}

export default Exercises;

