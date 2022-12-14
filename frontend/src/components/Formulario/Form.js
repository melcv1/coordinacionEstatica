import React, { Fragment, useState, useEffect } from 'react';
import "./Form.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../localStorage/useLocalStorage";

export default function Form({ nino, setNino }) {
    const navigate = useNavigate();
    const [pose, setPose] = useLocalStorage("pose", "Habituacion");

    const [estId, setEstId] = useLocalStorage("estId", "0");
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setNino(values => ({ ...values, [name]: value }));

    }
    const [isSaved, setisSaved] = useState(false);

    let { nombre, apellido, edad_actual, fecha_nacimiento, observaciones } = nino

    const handleSubmit = async () => {
        console.log("si vino a submit");
        console.log(fecha_nacimiento);

        if (nombre === '' || apellido === '' || observaciones === '' || typeof fecha_nacimiento === 'undefined') {
            alert('Todos los campos son obligatorios')
            return

        }

        if(!/^[a-zA-Z]*$/g.test(nombre)){
            alert('Solo ingresar letras en nombre');
            return
        }

        if(!/^[a-zA-Z]*$/g.test(apellido)){
            alert('Solo ingresar letras en apellido');
            return
        }

        var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
      if (!(fecha_nacimiento.match(RegExPattern))) {
        alert('Fecha de nacimiento incorrecta')  
        return 
      } 
        var birthday_arr = fecha_nacimiento.split("-");
        var birthday_date = new Date(birthday_arr[0], birthday_arr[1] - 1, birthday_arr[2]);
        console.log(birthday_date);
        var ageDifMs = Date.now() - birthday_date.getTime();
        var ageDate = new Date(ageDifMs);
        edad_actual = Math.abs(ageDate.getUTCFullYear() - 1970);
        console.log(edad_actual);
        var newState = nino;
        nino.edad_actual = edad_actual;
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
        await fetch('http://localhost:9000/api', requestInit)
            .then(res => res.json())
            .then(res => (r = String(res)))
            .then(res => setEstId(String(res)))
            .then(res => setisSaved(true))
     
        console.log(r);

       
        var resultado = ({
            ID_PRUEBA: 2,
            ID_ESTUDIANTE: parseInt(r),
            TIEMPO_EJ: 0,
            VALIDACION: 0,
            TIEMPO_FIN: 0,
            TIEMPO_INI: 0,
        })   
        const requestInit2 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resultado)
        }   
        await fetch('http://localhost:9000/api/valor', requestInit2)
                .then(res => res.text())
                .then(res => console.log(res))



                var resultado2 = ({
                    ID_PRUEBA: 3,
                    ID_ESTUDIANTE: parseInt(r),
                    TIEMPO_EJ: 0,
                    VALIDACION: 0,
                    TIEMPO_FIN: 0,
                    TIEMPO_INI: 0,
                })   
                const requestInit3 = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(resultado2)
                }   
                await fetch('http://localhost:9000/api/valor', requestInit3)
                        .then(res => res.text())
                        .then(res => console.log(res))


            
                        var resultado3 = ({
                            ID_PRUEBA: 4,
                            ID_ESTUDIANTE: parseInt(r),
                            TIEMPO_EJ: 0,
                            VALIDACION: 0,
                            TIEMPO_FIN: 0,
                            TIEMPO_INI: 0,
                        })   
                        const requestInit4 = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(resultado3)
                        }   
                        await fetch('http://localhost:9000/api/valor', requestInit4)
                                .then(res => res.text())
                                .then(res => console.log(res))


                                var resultado4 = ({
                                    ID_PRUEBA: 5,
                                    ID_ESTUDIANTE: parseInt(r),
                                    TIEMPO_EJ: 0,
                                    VALIDACION: 0,
                                    TIEMPO_FIN: 0,
                                    TIEMPO_INI: 0,
                                })   
                                const requestInit5 = {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(resultado4)
                                }   
                                await fetch('http://localhost:9000/api/valor', requestInit5)
                                        .then(res => res.text())
                                        .then(res => console.log(res))
    
        
    }


    return (
        <div>
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

                    <Link to="/home">
                        <button type="submit" className="btn start-btn cancelar">Cancelar</button>
                    </Link>

                    <button onClick={handleSubmit} className="btn btn-start-btn guardar">Guardar</button>






                </div>
                {
                    isSaved ?
                        <Link to="/start">
                            <button className="btn btn-start-btn siguiente">Siguiente</button>
                        </Link>
                        :
                        <div></div>
                }




            </div>

        </div>
    )
}
