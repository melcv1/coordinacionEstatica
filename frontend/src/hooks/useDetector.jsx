import React, { useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { count } from '../utils/music';
import { POINTS, keypointConnections } from '../utils/data';
import { drawPoint, drawSegment } from '../utils/helper'
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../localStorage/useLocalStorage";
let flag = false;
let interval;
let skeletonColor = 'rgb(255,255,255)';
const CLASS_NO = {
    Entrenamiento1: 0,
    Entrenamiento2: 1,
    Evaluacion: 2

}


export const useDetector = (
    webcamRef,
    canvasRef,
    currentPose,
    //unload
) => {
    const navigate = useNavigate();
    const [pose, setPose] = useLocalStorage("pose", "Habituacion");
    const [poseTime, setPoseTime] = useState(0);
    const [bestPerform, setBestPerform] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [startingTime, setStartingTime] = useState(0);
    const [isStartPose, setIsStartPose] = useState(false)

    useEffect(() => {
        setCurrentTime(0)
        setPoseTime(0)
        setBestPerform(0)
        startYoga()
    }, []);


    useEffect(() => {
        const timeDiff = (currentTime - startingTime) / 1000
        if (flag) {
            setPoseTime(timeDiff)
        }
        if ((currentTime - startingTime) / 1000 > bestPerform) {
            setBestPerform(timeDiff)
        }
    }, [currentTime]);

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
            console.log('CANVAS');
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
                    console.log(CLASS_NO)
                    console.log("current:" + currentPose + " classno " + classNo);
                    if (data[0][classNo] > 0.97) {
                        if (!flag) {

                            
                            setStartingTime(new Date(Date()).getTime())
                            flag = true
                        }
                        setCurrentTime(new Date(Date()).getTime())
                        skeletonColor = 'rgb(0,255,0)'
                    } else {
                        flag = false
                        skeletonColor = 'rgb(255,255,255)'
                        
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

    async function stopPose(postResults,id) {

        console.log("esta es la pose" + pose);
        let gotoPose= pose;
        var poseAct = 0;
        if (currentPose === "Entrenamiento1") {
            var poseAct = 3;
            gotoPose = "Entrenamiento2";
        } else if (currentPose === "Entrenamiento2") {
            var poseAct = 4;
            gotoPose = "Evaluacion";
        } else if (currentPose === "Evaluacion") {
            var poseAct = 5;
            gotoPose = "Habituacion";
        }
        else if(currentPose === "Habituacion"){
            var poseAct = 2;
            gotoPose = "Entrenamiento1";
        }else{
            var poseAct = 0;
        }
        var paso = 0;

        if (bestPerform >= 10) {
            paso = 1;
        }

        postResults(poseAct, paso);


        setIsStartPose(false);
        clearInterval(interval);
        //await unload()
        
        await setPose(gotoPose);
        navigate(`/start/${id}`);
    }






    return {
        poseTime,
        bestPerform,
        currentTime,
        isStartPose,
        startYoga,
        stopPose,
    }
}
