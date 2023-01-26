import React, { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react';
import { Navigate, useNavigate, useParams } from "react-router-dom";
//components
import { ExcerciseStepper } from '../../components/stepper/Stepper';

//hooks
import { useLocalStorage } from "../../localStorage/useLocalStorage";

import './EvaluatorInterface.css';

import nueve from "../../utils/images/8.png";
import diez from "../../utils/images/aaa.jpg";

import trece from "../../utils/images/13.png";
import Header from '../../components/Header/Header';
import { AuthContext } from '../../context/AuthContext';
import { TEST_STEPS } from '../../data/config';
import Webcam from 'react-webcam';
import { useFetchStudentById } from '../../hooks/useFetchStudentById';
import "../../App.css";
import { useDetector } from '../../hooks/useDetector';
import CircularProgress from '@mui/material/CircularProgress';

export const EvaluatorInterface = (stepInicial = 0) => {

    const navigate = useNavigate();
    const intervalId = useRef(0);

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const idEstudiante = useParams().id;
    const { status } = useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(0)
    const [play, setPlay] = useLocalStorage("play", JSON.stringify(0));
    const [isplaying, setIsplaying] = useLocalStorage("isplaying", JSON.stringify(false));
    const [timeElapsed, setTimeElapsed] = useState(0);
    const Estudiante = useFetchStudentById(idEstudiante);
    const [isPaused, setIsPaused] = useState(true);
    const [started, setStarted] = useState(false);

    const trainingTime = useRef(0);
    const exerciseTime = useRef(0);
    const to = useRef(0);
    const tf = useRef(0);
    const taskTime = useRef(0);

    const { poseTime, bestPerform, currentTime, isLoadingEstimator, startDetector, stopDetector } = useDetector(
        webcamRef,
        canvasRef,
        currentStep,
    );


    const handleNext = () => {
        tf.current = timeElapsed;
        taskTime.current = tf.current - to.current;
        console.log(taskTime.current);
        if (TEST_STEPS[currentStep].type === 'training') {
            trainingTime.current = taskTime.current;
        }
        if (TEST_STEPS[currentStep].type === 'exercise') {
            exerciseTime.current = taskTime.current;
        }
        postResults(trainingTime.current, exerciseTime.current);
        to.current = tf.current;
    }


    async function postResults(exerciseTime, trainingTime) {
        let idPrueba = TEST_STEPS[currentStep].idPrueba;
        if (!idPrueba) {
            setCurrentStep(currentStep + 1);
            return
        }
        let paso = 0;
        if (bestPerform >= 10) {
            paso = 1;
        }
        var resultado = ({
            ID_PRUEBA: idPrueba,
            ID_ESTUDIANTE: idEstudiante,
            TIEMPO_EJ: bestPerform,
            VALIDACION: paso,
            TIEMPO_FIN: exerciseTime,
            TIEMPO_INI: trainingTime,
        })
        console.log("resultado" + JSON.stringify(resultado));
        const requestInit = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resultado)
        }
        await fetch('http://localhost:9000/api/actualizardatos/' + idEstudiante + "/" + idPrueba, requestInit)
            .then(res => res.text())

        if (currentStep < 7) {
            setCurrentStep(currentStep + 1);
        } else {
            navigate(`/final`);
        }
    }
    const handleStart=()=>{
        startTestTimer();
        setIsplaying(JSON.stringify(true));
        if(!started){
            window.open('/play', '_blank');
            setStarted(true);
        }
    }

    function startTestTimer() {
        if (intervalId.current === 0) {
            intervalId.current = setInterval(() => {
                setTimeElapsed((time) => time + 10);
            }, 10);
            setIsPaused(false);
        }
    }

    function pauseTestTimer() {
        clearInterval(intervalId.current);
        intervalId.current = 0;
        setIsPaused(true);
        setIsplaying(JSON.stringify(false));
    }

    useEffect(() => {
        setPlay(currentStep);
    }, [currentStep])

    useLayoutEffect(() => {
        //window.open('/play', '_blank');
    }, []);


    if (status === 'notAuthenticated') {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="yoga-container" >
                <Header />
                <ExcerciseStepper Steps={TEST_STEPS} activeStep={currentStep} />
                <div className='layout pt-2'>
                    <div className='layout-row-block'  >
                        {
                            Estudiante &&
                            <div className='card-information'>
                                <p className='card-lbl'>Participante: </p>
                                <p className='card-value'>{Estudiante.NOMBRE} {Estudiante.APELLIDO}</p>
                                <p className='card-lbl'>Edad: </p>
                                <p className='card-value'>{Estudiante.EDAD_ACTUAL}</p>
                            </div>
                        }
                    </div>
                    <div className='flex-column'>

                        <div className='webcam-container' >
                            <  Webcam
                                className='loadable'
                                width='640px'
                                height='480px'
                                id="webcam"
                                ref={webcamRef}
                            />
                            {(isLoadingEstimator && currentStep > 2) && <div className='loading'><CircularProgress color="secondary" /><span style={{ marginLeft: 10 }}> Cargando ...</span> </div>}
                            <canvas ref={canvasRef}
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
                    <div className='layout-row-block'>
                        <div className='card-information'>
                            <p className='card-lbl'>Tiempo</p>
                            <p className='card-value'>{Math.round(timeElapsed / 1000)} seg</p>
                        </div>
                    </div>
                </div>

                <div className="btn-centered">
                    <button className="btn_cancel" onClick={()=>navigate('/home')}> Cancelar</button>
                    <button className="btn_success" onClick={handleStart} disabled={(!isPaused) ? true : false}> Iniciar</button>
                    <button className="btn_primary" onClick={pauseTestTimer} disabled={(isPaused) ? true : false}> Pausar</button>
                    {/* <button onClick={() => setCurrentStep(currentStep - 1)} className="btn_primary"> atras</button> */}
                    <button onClick={handleNext} className="btn_primary"> {(currentStep == 7) ? 'Finalizar' : 'Siguiente'}</button>
                </div>



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
            </div>
        </>
    )
}
