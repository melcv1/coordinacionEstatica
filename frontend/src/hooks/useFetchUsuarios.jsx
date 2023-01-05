import React, { useEffect, useState } from 'react'

export const useFetchUsuarios = () => {

    const [StudentList, setStudentList] = useState([]);

    const getStudentList = async () => {
        await fetch("http://localhost:9000/api/usuario/users")
            .then((response) => response.json())
            .then((response) => {
                buildArrayForTable(response);
            });

            
    }

    const buildArrayForTable = (list) => {
        console.log(list);
        let rows = [];
        list.forEach((student) => {
            const row = {
                id: student.idusuario,
                usuario: student.usuario,
                nombre: student.nombre,
                rol: student.rol,

            };
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
