import React, { useRef, useEffect, useState, Children } from 'react'
import './UnityPlayer.css';
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
                style={{ maxWidth: "100%", width: "800px", margin: "0 auto" }}
                playsInline
                alt="All the devices"
                src={source}
                ref={videoEl}
            />
            <div className="UnityPlayerControls">
                <button onClick={() => togglePlay()}>
                    <span>{isPlaying ? "Stop" : "Play"}</span>
                </button>
                <button onClick={() => reset()}>
                    <span>REPETIR</span>
                </button>
            </div>
        </div>
    )
}

