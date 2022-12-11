import React from 'react'
import "./Form.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../localStorage/useLocalStorage";

export default function Form({nino, setNino}) {
  const navigate = useNavigate();
  const [pose, setPose] = useLocalStorage("pose", "Habituacion");

  const handleChange = e => {
    setNino({
        ...nino,
        [e.target.name]: e.target.value
    })
  }
  let{nombre, edad_actual} = nino

  const handleSubmit = () => {
    console.log("si vino a submit");
    edad_actual = parseInt(edad_actual, 10)
    //validación de los datos
    if (nombre === '' || edad_actual === ''  ) {
        alert('Todos los campos son obligatorios')
        return
        
    }

    //consulta
    const requestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(nino)
    }
    console.log("niño: "+nino);
    fetch('http://localhost:9000/api', requestInit)
    .then(res => res.text())
    .then(res => console.log(res))
    setPose("Habituacion");
    navigate("/start");

    //reiniciando state de libro
    setNino({
      nombre: '',
        edad_actual: 0
    })
    

}


    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3 algn-cnt">

            <h2 className="description2">Ingrese nombres y apellidos del estudiante </h2>

            <input type="text" value={nombre} name="nombre" onChange={handleChange} className="form-control nombre">

            </input>

            <h2 className="description3">Ingrese edad del estudiante</h2>

            <input type="text" value={edad_actual} name="edad_actual" onChange={handleChange} className="form-control nombre">

            </input>
            <button type="submit" className="btn start-btn">Iniciar</button>
                 

            </div>
            
        </form>
    )
}
