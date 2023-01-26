import React, { Fragment, useState, useEffect } from 'react';
import "./Form.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../localStorage/useLocalStorage";
import "../../App.css";

export default function Form2({ nino, setNino }) {
    const navigate = useNavigate();
  
    const handleChange = e => {
       
        const name = e.target.name;
        const value = e.target.value;
        setNino(values => ({ ...values, [name]: value }));

    }
    const [isSaved, setisSaved] = useState(false);

    let { usuario, contrasena, nombre, rol } = nino

    const handleSubmit = async () => {
        console.log("si vino a submit");
        if (usuario === '' || contrasena === '' || nombre === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }
        console.log(typeof(nombre));
        var newState = nino;
        setNino(
            newState
        )
        //consulta
        const requestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nino)
        }
        console.log("niño: " + nino);
        let r = "";
        let response1= await fetch('http://localhost:9000/api/agregarusuario', requestInit)
            
            .then(res =>  res.json())
            .then(res => String(res))

            if(response1!=="0"){
                navigate("/usuarios")
            }else{
                alert("Usuario ya registrado")
            }
            
                
                
    
        
    }


    return (
        <div className="d-flex justify-content-center">
            <div className="mb-3 form_container">
                <div className="d-flex align-items-center mt-4">
                    <h2 className="lbl-cnt form_lbl">Usuario</h2>
                    <input type="text" value={usuario} name="usuario" onChange={handleChange} className="form-control nombre form_input">

                    </input>
                </div>
                <div className="d-flex align-items-center mt-4">
                    <h2 className="lbl-cnt form_lbl">Contrasena</h2>
                    <input type="password" value={contrasena} name="contrasena" onChange={handleChange} className="form-control nombre form_input">

                    </input>
                </div>


                <div className="d-flex align-items-center mt-4">
                    <h2 className="lbl-cnt form_lbl">Nombre</h2>

                    <input type="text" value={nombre} name="nombre" onChange={handleChange} className="form-control nombre form_input">

                    </input>

                </div>

                <div className="d-flex align-items-center mt-4">
                    <h2 className="lbl-cnt form_lbl">Rol    </h2>
                    <select  name="rol" onChange={handleChange} className="form-control nombre form_input">
                        <option value="evaluador">Evaluador</option>
                    </select>
                </div>





                <div className="form-sub form_btn_row">

                    <Link to="/home">
                        <button className="btn_cancel">Cancelar</button>
                    </Link>

                    <button onClick={handleSubmit} className="btn_primary">Registrar</button>







                </div>
               



            </div>

        </div>
    )
}
