import React, { Fragment, useState, useEffect } from 'react';

import { poseInstructions } from '../../utils/data';

import { audiosPoses } from '../../utils/audios';

import './Instructions.css';

import UnityComponent from "../Unity/UnityComponent";

import { UNITY_LOADERS } from '../../data/unityData';


export default function Instructions({ currentPose }) { 

    const [isComponentUnloaded, setIsComponentUnloaded] = useState(false);
    const [unityConfig, setUnityConfig] = useState(UNITY_LOADERS[1]);

    

    return (
        <div className="instructions-container">            
            <UnityComponent setIsComponentUnloaded={setIsComponentUnloaded} unityConfig={unityConfig} />                
        </div>

    )
}


