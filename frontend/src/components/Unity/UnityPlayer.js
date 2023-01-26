import React, { useRef, useEffect, useState, Children } from 'react'
import './UnityPlayer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';


export const UnityPlayer = ({ source, CallbackFn }) => {
    const [isPlaying, setIsPlaying] = useState(true)
    const videoEl = useRef(null);
    const playBtn = useRef(null);



    const togglePlay = () => {
        console.log('togglePlay');
        if (videoEl.current.paused || videoEl.current.ended) {
            videoEl.current.play()
                .then(() => setIsPlaying(true));

        } else {
            videoEl.current.pause();
            setIsPlaying(false);
        }
        CallbackFn();
    }

    const unmute = () =>{
        videoEl.current.play();
        videoEl.current.muted = false;
        videoEl.current.play();
    }

    const reset = () => {
        videoEl.current.pause();
        videoEl.current.load();
        videoEl.current.play();
    }

    useEffect(() => {
        
    }, []);

    

    return (
        <div className="UnityPlayer">
            <iframe src={"https://olafwempe.com/mp3/silence/silence.mp3"} type={"audio/mp3"} allow={"autoplay"}  style={{display:'none'}}></iframe>
            <video
                style={{ maxWidth: "100%", height: "60vh", margin: "0 auto", borderRadius: '50px' }}
                playsInline
                alt="All the devices"
                src={source}
                ref={videoEl}
                // autoPlay
                muted={false}
            /> 
            <div className="UnityPlayerControls">
                <button onClick={togglePlay} className="botones-unity">
                    <span>{isPlaying ?  <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}</span>
                </button>
                <button onClick={() => reset()} className="botones-unity"  ref={playBtn}>
                    <span> <FontAwesomeIcon icon={faRepeat} /></span>
                </button>
            </div>
        </div>
    )
}

