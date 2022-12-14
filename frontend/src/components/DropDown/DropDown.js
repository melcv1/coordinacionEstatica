import React from 'react'

import { poseImages } from '../../utils/pose_images'

import './DropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function DropDown({ poseList, currentPose, setCurrentPose, pruebas, isLoading }) {


    return (
        <>

            <div
                className='dropdown dropdown-container '


            >
                <button
                    className="btny  dropdown-toggle"
                    type='button'
                    data-bs-toggle="dropdown"
                    id="pose-dropdown-btn"
                    aria-expanded="false"
                >{currentPose}
                </button>
                <ul className="dropdown-menu dropdown-custom-menu" aria-labelledby="dropdownMenuButton1">
                    {poseList.map((pose, index) => (
                        <li onClick={() => setCurrentPose(pose)}>
                            {
                                !isLoading &&
                                    <div className="dropdown-item-container">
                                        <p className="dropdown-item-1">{pose}  {pruebas[index]['VALIDACION'] === 1 ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faX} />}</p>
                                    </div>
                            }
                        </li>
                    ))}

                </ul>


            </div>
        </>
    )
}
