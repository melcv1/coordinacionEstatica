import React, {Fragment, useState, useEffect} from 'react';
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
  const [isSaved, setisSaved] = useState(false);

  let{nombre, apellido, edad_actual, fecha_nacimiento, observaciones} = nino

  const handleSubmit = () => {
    console.log("si vino a submit");

    console.log(fecha_nacimiento);
    
    //validación de los datos
    if (nombre === '' || apellido === '' || observaciones === ''  ) {
        alert('Todos los campos son obligatorios')
        return
        
    }
   
    var birthday_arr = fecha_nacimiento.split("-");
    var birthday_date = new Date(birthday_arr[0], birthday_arr[1] - 1, birthday_arr[2]);
    console.log(birthday_date);
    var ageDifMs = Date.now() - birthday_date.getTime();
    var ageDate = new Date(ageDifMs);
    edad_actual= Math.abs(ageDate.getUTCFullYear() - 1970);
     console.log(edad_actual);
    var newState= nino;
    nino.edad_actual= edad_actual;
     setNino(
        newState
    )


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
    .then(navigate("/start"))
    
   

    //reiniciando state de libro
    setNino({
      nombre: '',
      apellido: '',
        edad_actual: '',
        observaciones:'',
    })
    

}


    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3 algn-cnt">
                <div className="d-flex align-items-center mt-4">
                <h2 className="lbl-cnt">Nombres Completos</h2>
                <input type="text" value={nombre} name="nombre" onChange={handleChange} className="form-control nombre">

            </input>
                </div>

                
                <div className="d-flex align-items-center mt-4">
                <h2 className="lbl-cnt">Apellidos Completos</h2>
                <input type="text" value={apellido} name="apellido" onChange={handleChange} className="form-control nombre">

            </input>
                </div>


                <div className="d-flex align-items-center mt-4">
                     <h2 className="lbl-cnt">Fecha de Nacimiento</h2>

                    <input type="date" value={fecha_nacimiento} name="fecha_nacimiento" onChange={handleChange} className="form-control nombre">

                    </input>

               </div>

               <div className="d-flex align-items-center mt-4">
                <h2 className="lbl-cnt ob">Observaciones    </h2>
                <input type="text" value={observaciones} name="observaciones" onChange={handleChange} className="form-control nombre">

            </input>
                </div>

           

            

           <div className="form-sub">
           <button type="submit" className="btn start-btn guardar">Guardar</button>
          
           <Link to="/home">
           <button type="submit" className="btn start-btn cancelar">Cancelar</button>
            </Link>

           

          
           </div>
           
           
                 

            </div>
            
        </form>
    )
}
