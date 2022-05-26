import React from 'react'
import "./Form.css";

import { Link } from "react-router-dom";
export default function Form() {
    return (
        <form>
            <div className="mb-3">

            <h2 className="description2">¿Cómo te llamas?</h2>

            <input type="text" id="nombre" className="form-control nombre">

            </input>
            
            <div className="btn-section">
              <Link to="/start">
                <button className="btn start-btn">Comencemos</button>
              </Link>              
            </div>            

            </div>
            
        </form>
    )
}
