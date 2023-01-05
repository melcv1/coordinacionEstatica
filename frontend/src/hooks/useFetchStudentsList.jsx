import React, { useEffect, useState } from 'react'

export const useFetchStudentsList = (user) => {

    const [StudentList, setStudentList] = useState([]);

    const getStudentList = async () => {
        await fetch(`http://localhost:9000/api/prueba/busqueda/${user}`)
            .then((response) => response.json())
            .then((response) => {
                buildArrayForTable(response);
            });
    }

    const buildArrayForTable = (list) => {
        let rows = [];
        list.forEach((student) => {
            let objectDate = new Date(student.FECHA_NACIMIENTO);
            let day = objectDate.getDate();
            let month = objectDate.getMonth();
            let year = objectDate.getFullYear();
            let format1 = month + "/" + day + "/" + year;
            console.log(student);
            const row = {
                id: student.ID_ESTUDIANTE,
                nombre: student.NOMBRE,
                apellido: student.APELLIDO,
                fechaNacimiento: format1,
                edad: student.EDAD_ACTUAL,
                pruebas: parsePruebas(student.PRUEBAS.split(','), student.VALIDACION.split(',')),
                tInicio: parseTiempos(student.PRUEBAS.split(','), student.TIEMPO_INICIO.split(',')),
                tFin: parseTiempos(student.PRUEBAS.split(','), student.TIEMPO_FIN.split(',')),
                tEj: parseTiempos2(student.PRUEBAS.split(','), student.TIEMPO_EJ.split(',')),
                observaciones: student.OBSERVACIONES,
                evaluador: student.evaluador,
            };
            rows.push(row);
        })
        setStudentList(rows);
    }

    const parsePruebas = (pruebas, vals) => {
        let result = {};
        let a = pruebas.map((item) => {
            switch (parseInt(item)) {
                case 2:
                    return 'pose2';
                case 3:
                    return 'pose3';
                case 4:
                    return 'pose4';
                case 5:
                    return 'pose5';
                default:
                    break;
            }
        });
        a.map((item, index) => {
            let val = vals[index];
            result[item] = (val === '1')? true:false;
        })
        return result;
    }
    const parseTiempos = (pruebas, vals) => {
        let result = {};
        let a = pruebas.map((item) => {
            switch (parseInt(item)) {
                case 2:
                    return 'pose2';
                case 3:
                    return 'pose3';
                case 4:
                    return 'pose4';
                case 5:
                    return 'pose5';
                default:
                    break;
            }
        });
        a.map((item, index) => {
            let val = vals[index];
            result[item] = val/1000;
        })
        return result;
    }

    const parseTiempos2 = (pruebas, vals) => {
        let result = {};
        let a = pruebas.map((item) => {
            switch (parseInt(item)) {
                case 2:
                    return 'pose2';
                case 3:
                    return 'pose3';
                case 4:
                    return 'pose4';
                case 5:
                    return 'pose5';
                default:
                    break;
            }
        });
        a.map((item, index) => {
            let val = vals[index];
            result[item] = val;
        })
        return result;
    }

    
    useEffect(() => {
        getStudentList();
    }, [])

    return {
        StudentList,
    }
}
