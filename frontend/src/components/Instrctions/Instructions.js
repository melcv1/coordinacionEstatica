import React, { useState } from 'react'

import { poseInstructions } from '../../utils/data'

import { poseImages } from '../../utils/pose_images'

import './Instructions.css'

import uno from "../../utils/images/1.png";
import dos from "../../utils/images/2.png";
import tres from "../../utils/images/3.png";
import cuatro from "../../utils/images/4.png";
import cinco from "../../utils/images/5.png";
import seis from "../../utils/images/6.png";

import siete from "../../utils/images/7.png";
import ocho from "../../utils/images/8.png";
export default function Instructions({ currentPose }) {

    const [instructions, setInsntructions] = useState(poseInstructions)

    return (
        <div className="instructions-container">
               <div className="social">
           <img src={siete} />
      </div>

      <div className="social2">
           <img src={ocho} />
      </div>
      
      <div className="social3">
           <img src={uno} />
      </div>
     
      <div className="social5">
           <img src={tres} />
      </div>
      <div className="social6">
           <img src={cuatro} />
      </div>
      <div className="social7">
           <img src={cinco} />
      </div>
      
            <ul className="instructions-list">
                {instructions[currentPose].map((instruction) => {
                    return(
                        <li className="instruction">{instruction}</li>
                    )
                    
                })}
            </ul>
            <img 
                className="pose-demo-img"
                src={poseImages[currentPose]}
            />
        </div>
    )
}
