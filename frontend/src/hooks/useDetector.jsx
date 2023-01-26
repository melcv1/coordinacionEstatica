import React, { useEffect, useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { count } from '../utils/music';
import { POINTS, keypointConnections } from '../utils/data';
import { drawPoint, drawSegment } from '../utils/helper';
import { TEST_STEPS } from '../data/config';

let flag = false;
let interval;
let skeletonColor = 'rgb(255,255,255)';

const CLASS_NO = {
    EvaluaEtapa1: 0,
    EvaluaEtapa2: 1,
    EvaluaEtapa3: 2,
}


export const useDetector = (
    webcamRef,
    canvasRef,
    currentStep,
) => {
    const currentPose = TEST_STEPS[currentStep].shortName;
    const [poseTime, setPoseTime] = useState(0);
    const [bestPerform, setBestPerform] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [startingTime, setStartingTime] = useState(0);
    const [isDetecting, setIsDetecting] = useState(false);
    const [isLoadingEstimator, setIsLoadingEstimator] = useState(true);

    const detectorConfigRef = useRef(null);
    const detectorRef = useRef(null);
    const poseClassifierRef = useRef(null);

    const detectorConfig = detectorConfigRef.current;
    const detector = detectorRef.current;
    const poseClassifier = poseClassifierRef.current;


    useEffect(() => {
        loadModel();

    }, [])


    useEffect(() => {
        if (CLASS_NO[currentPose] !== undefined) {
            setCurrentTime(0);
            setPoseTime(0);
            setBestPerform(0);
            startDetector();
        } else {
            stopDetector();
        }
    }, [currentPose]);
   

    useEffect(() => {
        const timeDiff = (currentTime - startingTime) / 1000
        if (flag) {
            setPoseTime(timeDiff)
        }
        if ((currentTime - startingTime) / 1000 > bestPerform) {
            setBestPerform(timeDiff)
        }
    }, [currentTime]);

    const loadModel = async () => {
        detectorConfigRef.current = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER };
        detectorRef.current = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
        poseClassifierRef.current = await tf.loadLayersModel('https://primicias.s3.amazonaws.com/comercial/Micrositios/nuevo/model.json');
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
            const pose = await detector.estimatePoses(video);
            if (isLoadingEstimator) {
                setIsLoadingEstimator(false);
            }
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

    function startDetector() {
        setIsDetecting(true);
        runMovenet();
    }

    function stopDetector() {
        clearInterval(interval);
        setIsDetecting(false);
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }






    return {
        poseTime,
        bestPerform,
        currentTime,
        isDetecting,
        isLoadingEstimator,
        startDetector,
        stopDetector,
    }
}
