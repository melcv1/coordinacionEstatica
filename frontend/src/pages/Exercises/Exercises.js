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

function Exercises() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const { ninoEdad } = useFetchEdad();
    const [pose, setPose] = useLocalStorage("pose", "Habituacion");

    const idnino = useFetchId();
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

    const attemptPlay = () => {
        videoEl &&
            videoEl.current &&
            videoEl.current.play().catch(error => {
                console.error("Error attempting to play", error);
            });
        videoEl.current.muted = false;
    };


    useEffect(() => {
        attemptPlay();


    }, []);
    function postResults(poseAct, paso) {
        console.log("AQUIIIIIIIIIIIIII-------" + idnino)
        var resultado = ({
            ID_PRUEBA: poseAct,
            ID_ESTUDIANTE: idnino,
            TIEMPO_RECORD: bestPerform,
            VALIDACION: paso
        })
        console.log("postResults");

        //consulta
        const requestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resultado)
        }
        console.log("niño: " + resultado);

        fetch('http://localhost:9000/api/valor', requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

    }

    return (
        <>

            <div className="yoga-container" >
                <div className="performance-container" >
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
                    < button onClick={() => stopPose(postResults)} className="secondary-btn2" > Continuar </button>
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
                    <div className='unity-excercise-container'>
                        {
                            //<UnityComponent unityContext={unityContext} classUnity='unity-excercise' />
                            <video
                                style={{ maxWidth: "100%", width: "600px", margin: "0 auto" }}
                                playsInline
                                muted
                                autoPlay
                                alt="All the devices"
                                src={U_LOADERS_EJ[pose]}
                                ref={videoEl}
                            />
                        }
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

        </>
    )

}

export default Exercises;

