import React from 'react'

import { poseImages } from '../../utils/pose_images'

import './DropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson} from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';


export default function DropDown({ poseList, currentPose, setCurrentPose, pruebas }) {


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
            {poseList.map((pose,index) => (
                <li onClick={() => setCurrentPose(pose)}>
                    <div className="dropdown-item-container">
                        <p className="dropdown-item-1">{pose}  {pruebas[index]['VALIDACION']===1? <FontAwesomeIcon icon={faPerson} /> :<FontAwesomeIcon icon={faMagnifyingGlass} /> }</p>
                    </div>
                </li>
            ))}
            
        </ul>
              
          
      </div>
      </>
    )
}
 