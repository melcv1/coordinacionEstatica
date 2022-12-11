import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import React, { useRef, useState, useEffect, Fragment } from 'react';
import Webcam from 'react-webcam';
import { count } from '../../utils/music';
import { Link } from "react-router-dom";
import Instructions from '../../components/Instrctions/Instructions';

import './Yoga.css'

import DropDown from '../../components/DropDown/DropDown';
import { POINTS, keypointConnections } from '../../utils/data';
import { drawPoint, drawSegment } from '../../utils/helper'

import nueve from "../../utils/images/9.png";
import diez from "../../utils/images/10.png";

import doce from "../../utils/images/12.png";
import trece from "../../utils/images/13.png";

import UnityComponent from "../../components/Unity/UnityComponent";

let skeletonColor = 'rgb(255,255,255)'
let poseList = [
   'Habituación', 'Entrenamiento1', 'Entrenamiento2', 'Evaluación'
]
let flag = false
var id_nino = 0;
var edad_nino=0;

let interval

// flag variable is used to help capture the time when AI just detect 
// the pose as correct(probability more than threshold)


function Yoga() {
    const webcamRef = useRef(null)
    const canvasRef = useRef(null)


    const [startingTime, setStartingTime] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [poseTime, setPoseTime] = useState(0)

    var variable = '';
    const [currentPose, setCurrentPose] = useState("Habituación")
    const [bestPerform, setBestPerform] = useState(0)

    const [isStartPose, setIsStartPose] = useState(false)
    const [isComponentUnloaded, setIsComponentUnloaded] = useState(true);
    const [ninoEdad, setNinoEdad] = useState(0);
    const [valores, setValores] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:9000/api/edad")
            .then((response) => response.json())
            .then((ninoEdad) => setNinoEdad(ninoEdad));
    }, []);
    edad_nino= ninoEdad;
  
    useEffect(() => {
        fetch("http://localhost:9000/api/id")
            .then((response) => response.json())
            .then((response) => {
                id_nino= response[0].id_est;
                console.log("Todo ok!");
                setValores(response);

            });
    }, []);




    useEffect(() => {
        const timeDiff = (currentTime - startingTime) / 1000
        if (flag) {
            setPoseTime(timeDiff)
        }
        if ((currentTime - startingTime) / 1000 > bestPerform) {
            setBestPerform(timeDiff)
        }
    }, [currentTime])


    useEffect(() => {
        setCurrentTime(0)
        setPoseTime(0)
        setBestPerform(0)
    }, [currentPose])

    const CLASS_NO = {
        Entrenamiento1: 0,
        Entrenamiento2: 1,
        Evaluación: 2

    }

    function get_center_point(landmarks, left_bodypart, right_bodypart) {
        let left = tf.gather(landmarks, left_bodypart, 1)
        let right = tf.gather(landmarks, right_bodypart, 1)
        const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5))
        return center

    }

    function get_pose_size(landmarks, torso_size_multiplier = 2.5) {
        let hips_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
        let shoulders_center = get_center_point(landmarks, POINTS.LEFT_SHOULDER, POINTS.RIGHT_SHOULDER)
        let torso_size = tf.norm(tf.sub(shoulders_center, hips_center))
        let pose_center_new = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
        pose_center_new = tf.expandDims(pose_center_new, 1)

        pose_center_new = tf.broadcastTo(pose_center_new, [1, 17, 2])
        // return: shape(17,2)
        let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0)
        let max_dist = tf.max(tf.norm(d, 'euclidean', 0))

        // normalize scale
        let pose_size = tf.maximum(tf.mul(torso_size, torso_size_multiplier), max_dist)
        return pose_size
    }

    function normalize_pose_landmarks(landmarks) {
        let pose_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
        pose_center = tf.expandDims(pose_center, 1)
        pose_center = tf.broadcastTo(pose_center, [1, 17, 2])
        landmarks = tf.sub(landmarks, pose_center)

        let pose_size = get_pose_size(landmarks)
        landmarks = tf.div(landmarks, pose_size)
        return landmarks
    }

    function landmarks_to_embedding(landmarks) {
        // normalize landmarks 2D
        landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0))
        let embedding = tf.reshape(landmarks, [1, 34])
        return embedding
    }

    const runMovenet = async () => {
        const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER };
        const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
        const poseClassifier = await tf.loadLayersModel('https://primicias.s3.amazonaws.com/comercial/Micrositios/model.json')
        const countAudio = new Audio(count)
        countAudio.loop = true
        interval = setInterval(() => {
            detectPose(detector, poseClassifier, countAudio)
        }, 100)
        poseClassifier.summary();
        console.log(poseClassifier.summary());
    }

    const detectPose = async (detector, poseClassifier, countAudio) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            let notDetected = 0
            const video = webcamRef.current.video
            const pose = await detector.estimatePoses(video)
            const ctx = canvasRef.current.getContext('2d')
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            try {
                const keypoints = pose[0].keypoints
                let input = keypoints.map((keypoint) => {
                    if (keypoint.score > 0.4) {
                        if (!(keypoint.name === 'left_eye' || keypoint.name === 'right_eye')) {
                            drawPoint(ctx, keypoint.x, keypoint.y, 8, 'rgb(255,255,255)')
                            let connections = keypointConnections[keypoint.name]
                            try {
                                connections.forEach((connection) => {
                                    let conName = connection.toUpperCase()
                                    drawSegment(ctx, [keypoint.x, keypoint.y], [keypoints[POINTS[conName]].x,
                                    keypoints[POINTS[conName]].y
                                    ], skeletonColor)
                                })
                            } catch (err) {

                            }

                        }
                    } else {
                        notDetected += 1
                    }
                    return [keypoint.x, keypoint.y]
                })
                if (notDetected > 4) {
                    skeletonColor = 'rgb(255,255,255)'
                    return
                }
                const processedInput = landmarks_to_embedding(input)
                const classification = poseClassifier.predict(processedInput)

                classification.array().then((data) => {
                    const classNo = CLASS_NO[currentPose]
                    console.log(data[0][classNo])
                    console.log("current:" + currentPose + " classno " + classNo);
                    if (data[0][classNo] > 0.97) {
                        if (!flag) {
                            
                            countAudio.play()
                            setStartingTime(new Date(Date()).getTime())
                            flag = true
                        }
                        setCurrentTime(new Date(Date()).getTime())
                        skeletonColor = 'rgb(0,255,0)'
                    } else {
                        flag = false
                        skeletonColor = 'rgb(255,255,255)'
                        countAudio.pause()
                        countAudio.currentTime = 0
                    }
                })
            } catch (err) {
                console.log(err)
            }


        }
    }

    function startYoga() {
        setIsStartPose(true)
        runMovenet()
    }



    function stopPose() {

        console.log("esta es la pose" + currentPose);
        var poseAct = 0;
        if (currentPose === "Entrenamiento1") {
            var poseAct = 3;
        } else if (currentPose === "Entrenamiento2") {
            var poseAct = 4;
        } else if (currentPose === "Evaluación") {
            var poseAct = 5;
        }
        else {
            var poseAct = 3;
        }
        var paso=0;

        if(bestPerform >= 10){
            paso=1;
        }
        var resultado=({
            ID_PRUEBA: poseAct,
            ID_ESTUDIANTE: id_nino,
            TIEMPO_RECORD: bestPerform,
            VALIDACION: paso
              })
                console.log("si vino a stop pose");
            
                //consulta
                const requestInit = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(resultado)
                }
                console.log("niño: "+resultado);
                fetch('http://localhost:9000/api/valor', requestInit)
                .then(res => res.text())
                .then(res => console.log(res))     
    
                
        setIsStartPose(false)
        clearInterval(interval)
    }

    function handleSelectOnChange(){

    }

    if (isStartPose) {
        return (
            <div className="yoga-container" >
                <div className="performance-container" >
                    <div className="pose-performance" >
                        < h4 >
                            Tiempo: {poseTime}
                        </h4>
                    </div>
                    <div className="pose-performance2" >
                        <h4> Tiempo Record: {bestPerform}
                        </h4> </div> </div>
                <div>

                    <  Webcam width='640px'
                        height='480px'
                        id="webcam"
                        ref={webcamRef}
                        style={
                            {
                                position: 'absolute',
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
                                left: 120,
                                top: 180,
                                zIndex: 1
                            }
                        } >
                    </canvas>
                    <div className="social4 rotate" >
                        <img src={doce} />
                    </div>
                    <div className="social7 rotate" >
                        <img src={trece} /> </div>
                    <div className="social3 rotate" >
                        < img src={trece} /> </div> <div className="social5 rotate" >
                        < img src={doce} /> </div>

                    <div >
                        {isComponentUnloaded === true ? 
                            <UnityComponent setIsComponentUnloaded={setIsComponentUnloaded} loaderUrl="/Pose1/Pose1/Build.loader.js" dataUrl="/Pose1/Pose1/Build.data" frameworkUrl="/Pose1/Pose1/Build.framework.js" codeUrl="/Pose1/Pose1/Build.wasm" />    

                                (currentPose == 'Habituación' &&    
                                    <UnityComponent setIsComponentUnloaded={setIsComponentUnloaded} loaderUrl="/Pose1/Pose1/Build.loader.js" dataUrl="/Pose1/Pose1/Build.data" frameworkUrl="/Pose1/Pose1/Build.framework.js" codeUrl="/Pose1/Pose1/Build.wasm" />    
                                )
                                (currentPose == 'Entrenamiento1' &&
                                    <UnityComponent setIsComponentUnloaded={setIsComponentUnloaded} loaderUrl="/Pose2ej/Build/Pose2ej.loader.js" dataUrl="/Pose2ej/Build/Pose2ej.data" frameworkUrl="/Pose2ej/Build/Pose2ej.framework.js" codeUrl="/Pose2ej/Build/Pose2ej.wasm" />    
                                )
                                (currentPose == 'Entrenamiento2' &&
                                    <UnityComponent setIsComponentUnloaded={setIsComponentUnloaded} loaderUrl="/Pose4ej/Build/Pose4ej.loader.js" dataUrl="/Pose4ej/Build/Pose4ej.data" frameworkUrl="/Pose4ej/Build/Pose4ej.framework.js" codeUrl="/Pose4ej/Build/Pose4ej.wasm" />    
                                )
                                (currentPose == 'Evaluación' &&
                                    <UnityComponent setIsComponentUnloaded={setIsComponentUnloaded} loaderUrl="/Pose5ej/Build/Pose5ej.loader.js" dataUrl="/Pose5ej/Build/Pose5ej.data" frameworkUrl="/Pose5ej/Build/Pose5ej.framework.js" codeUrl="/Pose5ej/Build/Pose5ej.wasm" />    
                                )                               
                            
                        :                            
                            <p>no unloaded</p>
                        }
                    </div>

                </div> < button onClick={stopPose} className="secondary-btn2" >        Continuar </button>
                <div className="social2" >
                    <img src={nueve} /> </div>
                <div className="social" >
                    <img src={diez} /> </div> </div>
        )
    }

    return (
        
        <div className="yoga-container" >
             <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse jsflx" id="navbarTogglerDemo01">
          
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
            <Link to="/inicio">
                <a class="nav-link">Inicio</a>
            </Link>
            </li>
            <li class="nav-item">
            <Link to="/home">
            <a class="nav-link" >Tareas</a>
            </Link>
              
            </li>
            <li class="nav-item">
            <Link to="/resultados">
                <a class="nav-link">Resultados</a>
            </Link>  
             
            </li>
            <li class="nav-item">
            <Link to="/about">
            <a class="nav-link" >Créditos</a>
              </Link>           
             
            </li>
            
          </ul>
     
        </div>
      </nav>            
            < DropDown poseList={poseList}
                currentPose={currentPose}
                setCurrentPose={setCurrentPose}
                onChange={handleSelectOnChange}
            />
            < Instructions currentPose={currentPose}/> 
            <  button onClick={startYoga}
                className="btny2 boton-abajo" >
                Iniciar </button>
        </div>
    )
}

export default Yoga

