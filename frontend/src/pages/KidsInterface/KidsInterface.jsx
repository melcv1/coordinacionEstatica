import React, { useRef, useState, useEffect } from 'react';
import { LOADERS, STEPS as steps } from '../../data/unityData';
import './exercises.css'

//hooks
import { useLocalStorage } from "../../localStorage/useLocalStorage";

import nueve from "../../utils/images/8.png";
import diez from "../../utils/images/aaa.jpg";
import doce from "../../utils/images/12.png";
import trece from "../../utils/images/13.png";
import { UnityPlayer } from '../../components/Unity/UnityPlayer';
import { useOnChangeStorage } from '../../localStorage/useOnChangeStorage';

import MovingText from 'react-moving-text';
import { TEST_STEPS } from '../../data/config';



export const KidsInterface = ({ source }) => {


    const { storage } = useOnChangeStorage('play', '0');
    const { isPlaying } = useOnChangeStorage('isPlaying', 'false');
    
    const [animation, setAnimation] = useState({
        name: 'zoomIn',
        iteration: '1',
    });
    const [showText, setShowText] = useState(true);

    const changeToVideo = () => {
        
        setTimeout(() => {
            setAnimation({
                name: 'swing',
                iteration: '3',
            });
        }, 2000);
        setTimeout(() => {
            setAnimation({
                name: 'popOut',
                iteration: '1',
            });
        }, 5000);
        setTimeout(() => {
            setShowText(false);
        }, 6000);
    }


    useEffect(() => {
            setShowText(true);
            setAnimation({
                name: 'zoomIn',
                iteration: '1',
            });
        
    }, [storage])




    return (
        <>
        {console.log(storage)}
                <div style={{ display: 'flex', flex: 1, minHeight: '55vh', marginTop: '50px', justifyContent: 'center', alignItems: 'center' }}>
                    
                    
                    {
                        showText ?
                            <>
                                <MovingText
                                    type={animation.name}
                                    duration="1000ms"
                                    delay="0s"
                                    direction="normal"
                                    timing="ease"
                                    iteration={animation.iteration}
                                    fillMode="none">
                                    <p className='gameText'>L I S T O !</p>
                                </MovingText>
                                {changeToVideo()}
                            </>
                            :
                            <UnityPlayer
                                source={TEST_STEPS[storage].media}
                                CallbackFn={() => { }}
                            />

                    }
                </div>

                <div className="social2" >
                    <img src={nueve} />
                </div>
                <div className="social" >
                    <img src={diez} />
                </div>
        </>
    )

}

