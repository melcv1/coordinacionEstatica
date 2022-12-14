import React, { useEffect, useState } from 'react'

export const useFetchStudentsList = () => {

    const [StudentList, setStudentList] = useState([]);

    const getStudentList = async () => {
        await fetch("http://localhost:9000/api/prueba/busqueda")
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

            const row = {
                id: student.ID_ESTUDIANTE,
                nombre: student.NOMBRE,
                apellido: student.APELLIDO,
                fechaNacimiento: format1,
                edad: student.EDAD_ACTUAL,
                pruebas: aux(student.PRUEBAS.split(','), student.VALIDACION.split(',')),
            };
            rows.push(row);
        })
        setStudentList(rows);
    }

    const aux = (pruebas, vals) => {
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

    useEffect(() => {
        getStudentList();
    }, [])

    return {
        StudentList,
    }
}
