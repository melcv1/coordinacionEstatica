import React,{useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useFetchStudentsList } from '../../hooks/useFetchStudentsList';

const ListaEstudiantes = () => {

    const { StudentList } = useFetchStudentsList();


    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'apellido', headerName: 'Apellido', width: 150 },
    ];

    const handleRowClick = (e) =>{
        console.log(e.row)
    }

    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={StudentList} columns={columns} onRowClick={(e)=>handleRowClick(e)}/>
        </div>
    )
}

export default ListaEstudiantes
