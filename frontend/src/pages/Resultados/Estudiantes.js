import React, { useRef, useState, useEffect } from 'react';
import { count } from '../../utils/music';
import './Resultados.css';
import c from "../../utils/images/rojo.png";

import veve2 from "../../utils/images/veve.png";


const Estudiantes = ({ setListUpdated }) => {

    const [estudiantes, setEstudiantes] = useState([])
    
   

    const getEstudiantes = () => {
        fetch("http://localhost:9000/api/ninos")
            .then((response) => response.json())
            .then((response) => {

                setEstudiantes(response);
                setListUpdated(true);
                resultados();
            });
    }


    const resultados = () => {
        var boton;
        estudiantes.map((estudiante) => {
            fetch("http://localhost:9000/api/pruebas/" + estudiante.ID_ESTUDIANTE)
                .then((response) => response.json())
                .then((response) => {
                    calculo(response, estudiante);
                   
                  
                });

        });
        
    }

        const calculo = (pruebas, estudiante) => {
            console.log("**************** PRUEBAS DE ESTUDIANTE:  " + estudiante.ID_ESTUDIANTE + "  EDAD: " + estudiante.EDAD_ACTUAL);
           
            //pruebas = pruebas.filter(prueba => prueba.VALIDACION == 1);
            console.log(pruebas);
            var suma;
            var p=[];
            var aux=0;
            pruebas.forEach(prueba => {
                p[aux]=prueba.VALIDACION;
                aux++;
            });

            var edadMotora;
            
            var c= 1/7;
            var w1 = 1;
            var w2 = 2;
            var w3 = 4;   

            if(p[0] ==1 && p[1]==0 && p[2]==0){
                edadMotora= 3;
            }else if(p[0]==1 && p[1]==1 && p[2]==0){
                edadMotora= 4;
            }else{
                 edadMotora = (c*w1*p[0]+ c*w2*p[1] + c*w3*p[2])*5;
            }
                
            var cocienteMotor = 100*(edadMotora / estudiante.EDAD_ACTUAL);
            
            console.log('pruebas pasadas =  ' + p);
            console.log('EDAD_MOTORA = ' + edadMotora);
            console.log('COCIENTE_MOTOR = ' + cocienteMotor);

            var resultado = ({
                EDAD_MOTORA: edadMotora,
                COCIENTE_MOTOR: cocienteMotor
            })

            const requestInit = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resultado)
            }
            fetch('http://localhost:9000/api/actualizar/' + estudiante.ID_ESTUDIANTE, requestInit)
                .then(res => res.text())



        }


    
            function handleClickCollapsable(id) {
                console.log(id)
              document.getElementById(id).classList.toggle('nocollapsed');
              getPruebasById(id);
              getEstudiantes();
              //div_collapsable.classList.toggle('nocollapsed');

            }
           
                       
            function getPruebasById(id) {
                var aux=0;
                    fetch("http://localhost:9000/api/pruebas/" + id)
                        .then((response) => response.json())
                        .then((response) => {
                            response.forEach(p => {
                                console.log(id+"p"+aux)
                                if(p.VALIDACION==1){
                                     document.getElementById(id+"p"+aux).innerHTML='<img src="/static/media/veve.147bfda7.png" class="fotos">';                                   
                                   
                                    
                                }else{
                                    document.getElementById(id+"p"+aux).innerHTML='<img src="/static/media/veve.147bfda7.png" class="fotos">';
                                }
                                aux++;
                            });
                        });
        
                
            }
            function pro(){
                
                getEstudiantes();
            }


            useEffect(() => {
      
                getEstudiantes();
        
            }, []);
           

        return (
            <div>
                {estudiantes.map((estudiante) => (

                    <div className="flex-column" 
                        key={estudiante.ID_ESTUDIANTE}>
                        <div className="flex-row li_estudiante" onClick={()=>handleClickCollapsable(estudiante.ID_ESTUDIANTE)}>
                            <div>
                                {estudiante.NOMBRE}
                            </div>
                            <div className="li_age">
                                <span>{estudiante.EDAD_ACTUAL} </span>                                
                                <span className="li_age_lbl">años</span>
                            </div>
                        </div>
                        <div id={estudiante.ID_ESTUDIANTE} className="collapsable flex-column nocollapsed">
                            <div className="flex-column">
                                <p className="li_habi">Habituación   <span  id={estudiante.ID_ESTUDIANTE+"p0"}>   </span>  </p>
                                <p className="li_habi">Entrenamiento <span  id={estudiante.ID_ESTUDIANTE+"p1"}>  </span>  </p>
                                <p className="li_habi">Evaluación    <span  id={estudiante.ID_ESTUDIANTE+"p2"}> </span>  </p>
                            </div>
                            <div className="flex-row div_edades">
                                <div className="flex-column ">
                                    <p  className="par par2"> EDAD MOTORA</p>
                                    <div className="li_age">
                                        <span className="par3">{estudiante.EDAD_MOTORA} </span>                                
                                        <span className="li_age_lbl">años</span>
                                    </div>
                                </div>
                                <div className="flex-column">
                                    <p  className="par par2"> EDAD CRONOLÓGICA</p>
                                    <div className="li_age">
                                        <span className="par3">{estudiante.EDAD_ACTUAL} </span>                                
                                        <span className="li_age_lbl">años</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-column">
                                <p  className="par par2">COCIENTE MOTOR</p>
                                <p className="par3">{estudiante.COCIENTE_MOTOR} % </p>
                            </div>
                            <div className="flex-column div_infocategorias">
                                <p  className="par par2">Nivel de Motricidad </p>
                                <p className="li_habi">120% o más = Nivel de motricidad superior</p>
                                <p className="li_habi">110% o 119% = Nivel de motricidad normal superior</p>
                                <p className="li_habi">90% a 109% = Nivel de motricidad normal</p>
                                <p className="li_habi">80% a 89% = Nivel de motricidad normal inferior</p>
                                <p className="li_habi">79% o menos = Nivel de motricidad inferior</p>
                            </div>
                        </div>
                        

                    </div>
                  
                ))}

                
            </div>
        
           
           
        );





    };
    
    export default Estudiantes;
  