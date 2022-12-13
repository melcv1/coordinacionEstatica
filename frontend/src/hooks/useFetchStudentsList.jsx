import React, { useEffect, useState } from 'react'

export const useFetchStudentsList = () => {

    const [StudentList, setStudentList] = useState([]);

    const getStudentList = async () => {
       await fetch("http://localhost:9000/api/ninos")
            .then((response) => response.json())
            .then((response) => {
                buildArrayForTable(response);                
            });       
    }

    const buildArrayForTable = (list) => {
        let rows = [];
        list.forEach((student) => {
            const row = { id:student.ID_ESTUDIANTE,nombre: student.NOMBRE, apellido: student.APELLIDO };
            rows.push(row);
        })
        console.log(rows);
        setStudentList(rows);
    }

    useEffect(() => {
        getStudentList();
    }, [])

    return {
        StudentList,
    }
}
