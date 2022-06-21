import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import React, { useRef, useState, useEffect } from 'react'
import backend from '@tensorflow/tfjs-backend-webgl'
import Webcam from 'react-webcam'
import { count } from '../../utils/music';

import Instructions from '../../components/Instrctions/Instructions';

import './Yoga.css'

import DropDown from '../../components/DropDown/DropDown';
import { poseImages } from '../../utils/pose_images';
import { POINTS, keypointConnections } from '../../utils/data';
import { drawPoint, drawSegment } from '../../utils/helper'

import nueve from "../../utils/images/9.png";
import diez from "../../utils/images/10.png";
import once from "../../utils/images/11.png";

import doce from "../../utils/images/12.png";
import trece from "../../utils/images/13.png";
import { log } from '@tensorflow/tfjs';

let skeletonColor = 'rgb(255,255,255)'
let poseList = [
    'pose1', 'pose2', 'pose3', 'pose4'
]


let interval

// flag variable is used to help capture the time when AI just detect 
// the pose as correct(probability more than threshold)
let flag = false
var id_nino='';

function Yoga() {
  /*  const [ninoEdad, setNinoEdad] = useState(true);
  useEffect(() => {
    fetch("http://localhost:9000/api/edad")
      .then((response) => response.json())
      .then((ninoEdad) =>setNinoEdad(ninoEdad));
     }, []);*/


    // console.log("todo bien22"+ ninoEdad);
    const webcamRef = useRef(null)
    const canvasRef = useRef(null)


    const [startingTime, setStartingTime] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [poseTime, setPoseTime] = useState(0)
   
    const [ninoId, setNinoId] = useState(0);
   /* const [valores, setValores] = useState([])
    useEffect(() => {
        fetch("http://localhost:9000/api/id")
          .then((response) => response.json())
          .then((response) =>setValores(response));
         }, []); 

        console.log("-------------aa--:"+valores);*/
        
    var variable='';
    /*if(ninoEdad==6){
        variable='Pose_6';
        
        console.log("entro en pose 6");
    }else if(ninoEdad==5){
        variable='Pose_5';
        
        console.log("entro en pose 5");
    }else if(ninoEdad==4){
        variable='Pose_4';
        console.log("entro en pose 4");
    }else{
        variable='Pose_3';
        console.log("no entro en ninguno");
    } */
    
    const [currentPose, setCurrentPose] = useState("pose1")
    const [bestPerform, setBestPerform] = useState(0)
   
    const [isStartPose, setIsStartPose] = useState(false)


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
        pose1: 0,
        pose2: 1, 
        pose3: 2,
        pose4: 3

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
        const poseClassifier = await tf.loadLayersModel('https://primicias.s3.amazonaws.com/comercial/Micrositios/de-cambio/model.json')
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
                    console.log("current:"+currentPose+" classno "+classNo);
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

        console.log("esta es la pose"+currentPose);
        var poseAct=0;
        if(currentPose==="Pose_3"){
           var poseAct=1;
        }else if(currentPose==="Pose_4"){
            var poseAct=2;
        }else if(currentPose==="Pose_5"){
            var poseAct=3;
        }else if(currentPose==="Pose_6"){
            var poseAct=4;
        }else{
            var poseAct=1;
        }

       

    /* var resultado=({
        ID_PRUEBA: 0,
        ID_ESTUDIANTE:0,
        TIEMPO_RECORD: bestPerform,
        INTENTOS: 0
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

            */
        setIsStartPose(false)
        clearInterval(interval)
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
                    </canvas> <div className="social9" >
                        <img src={once} />
                    </div>
                    <div className="social4" >
                        <img src={doce} />
                    </div>
                    <div className="social7" >
                        <img src={trece} /> </div>
                    <div className="social3" >
                        < img src={trece} /> </div> <div className="social5" >
                        < img src={doce} /> </div> <div >
                        < img src={poseImages[currentPose]}
                            className="pose-img" />   </div>

                </div> < button onClick={stopPose} className="secondary-btn2" >        Parar </button>
                <div className="social2" >
                    <img src={nueve} /> </div>
                <div className="social" >
                    <img src={diez} /> </div> </div>
        )
    }

    return (
        <div className="yoga-container" >
            < DropDown poseList={poseList}
                currentPose={currentPose}
                setCurrentPose={setCurrentPose}
            /> < Instructions currentPose={currentPose}
            /> <  button onClick={startYoga}
                className="btny2 boton-abajo" >
                ¡Listo! </button>
        </div>
    )
}

export default Yoga