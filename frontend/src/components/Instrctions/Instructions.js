import React, { Fragment, useState, useEffect } from 'react';

import { poseInstructions } from '../../utils/data'

import { poseImages } from '../../utils/pose_images'

import { audiosPoses } from '../../utils/audios'

import play from "../../utils/audios/imagen.png";

import './Instructions.css'

import uno from "../../utils/images/1.png";
import dos from "../../utils/images/2.png";
import tres from "../../utils/images/3.png";

import cuatro from "../../utils/images/4.png";
import cinco from "../../utils/images/5.png";
import seis from "../../utils/images/6.png";

import siete from "../../utils/images/7.png";
import ocho from "../../utils/images/8.png";
import { log } from '@tensorflow/tfjs-core/dist/log';
import countUno from '../../utils/audios/uno.mp3';

import videos from './Habituación.mp4'
import videos1 from './Entrenamiento1.mp4'
import videos2 from './Entrenamiento2.mp4'

import videos3 from './Evaluación.mp4'

export default function Instructions({ currentPose }) {

    const [instructions, setInsntructions] = useState(poseInstructions)
    const [audio, setAudio] = useState(new Audio(audiosPoses[currentPose]))

    function stopRecordaudio() {

        audio.play();
    }
    useEffect(() => {
        setAudio(new Audio(audiosPoses[currentPose]));
        audio.pause();
    }, [currentPose]) // <-- here put the parameter to listen


    return (
        <div className="instructions-container">
            <div className="social">
                <img src={siete} />
            </div>

            <div className="social2">
                <img src={ocho} />
            </div>

            <div className="social3 rotate">
                <img src={uno} />
            </div>

          
            <div className="social6 rotate">
                <img src={cuatro} />
            </div>
            <div className="social7 rotate">
                <img src={cinco} />
            </div>

           

            {currentPose == 'Habituación' &&
                 <video width="950" height="500" controls >
                    <source src={videos} type="video/mp4" />
                </video>

                
            }
             {currentPose == 'Entrenamiento1' &&
                 <video width="950" height="500" controls >
                    <source src={videos1} type="video/mp4" />
                </video> 
            }
            {currentPose == 'Entrenamiento2' &&
                 <video width="950" height="500" controls >
                    <source src={videos2} type="video/mp4" />
                </video> 
            }
                      {currentPose == 'Evaluación' &&
                  <video width="950" height="500" controls >
                    <source src={videos3} type="video/mp4" />
                </video> 
            }     

            



        </div>

    )
}
