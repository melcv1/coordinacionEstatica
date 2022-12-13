import React, { useEffect, useState } from 'react'

export const useFetchStudentsList = () => {

    const [StudentList, setStudentList] = useState([]);

    const getStudentList = async () => {
        await fetch("http://localhost:9000/api/pruebasfinal")
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
                pruebas: student.PRUEBAS,
                validacion: student.VALIDACION,
            };
            rows.push(row);
        })
        console.log(list);
        setStudentList(rows);
    }

    useEffect(() => {
        getStudentList();
    }, [])

    return {
        StudentList,
    }
}
