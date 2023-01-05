import React, { useRef, useState, useEffect } from 'react';
import {U_LOADERS_TRAINING } from '../../data/unityData';
import './exercises.css'

//hooks
import { useLocalStorage } from "../../localStorage/useLocalStorage";

import nueve from "../../utils/images/8.png";
import diez from "../../utils/images/aaa.jpg";
import doce from "../../utils/images/12.png";
import trece from "../../utils/images/13.png";
import { UnityPlayer } from '../../components/Unity/UnityPlayer';
import { useOnChangeStorage } from '../../localStorage/useOnChangeStorage';

function TrainingTutorial({source}) {
    const [pose, setPose] = useLocalStorage("pose", "Habituacion");   
    const {storage} = useOnChangeStorage('pose');
    return (
        <>
            <div>{storage}</div>
            <div className="yoga-container tuturialContainer" >
                <UnityPlayer
                    source={U_LOADERS_TRAINING[pose]}
                    CallbackFn={()=>{}}
                />
               
              
              
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

export default TrainingTutorial;

