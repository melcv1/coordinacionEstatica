import React, { useRef, useEffect, useState, Children } from 'react'
import './UnityPlayer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';

export const UnityPlayer = ({ source, CallbackFn }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const videoEl = useRef(null);


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

    const reset = () => {
        videoEl.current.pause();
        videoEl.current.load();
        videoEl.current.play();
    }

    useEffect(() => {
        //unmute()

    }, []);

    return (
        <div className="UnityPlayer">
            <video
                style={{ maxWidth: "100%", width: "1199px", margin: "0 auto" }}
                playsInline
                alt="All the devices"
                src={source}
                ref={videoEl}
            />
            <div className="UnityPlayerControls">
                <button onClick={() => togglePlay()} className="botones-unity">
                    <span>{isPlaying ?  <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}</span>
                </button>
                <button onClick={() => reset()} className="botones-unity">
                    <span> <FontAwesomeIcon icon={faRepeat} /></span>
                </button>
            </div>
        </div>
    )
}

