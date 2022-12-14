import React from 'react'
import './Timer.css';
const Timer = ({testTime, startTestTimer}) => {
  return (
    <div className="time-container">
                        <div className="pose-performance timer" >
                            {
                                testTime === 0 ?
                                    <button className='timeButton'
                                        onClick={() => startTestTimer()}
                                    >
                                        < h4 class="inicio-tst">
                                            Iniciar test
                                        </h4>
                                    </button>
                                    :
                                    <div>
                                        <h4>
                                            <span className="digits">
                                                {("0" + Math.floor((testTime / 60000) % 60)).slice(-2)}:
                                            </span>
                                            <span className="digits">
                                                {("0" + Math.floor((testTime / 1000) % 60)).slice(-2)}
                                            </span>
                                        </h4>
                                    </div>
                            }
                        </div>
                    </div>
  )
}

export default Timer
