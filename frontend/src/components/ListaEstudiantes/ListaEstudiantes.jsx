import React,{useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useFetchStudentsList } from '../../hooks/useFetchStudentsList';

const ListaEstudiantes = () => {

    const { StudentList } = useFetchStudentsList();


    const columns = [
        { field: 'nombre', headerName: 'Nombre', flex: 1 },
        { field: 'apellido', headerName: 'Apellido', flex: 1  },
        { field: 'fechaNacimiento', headerName: 'Fecha Nacimiento', flex: 1  },
        { field: 'edad', headerName: 'Edad', flex: 1  },
        { field: 'pruebas', headerName: 'Pruebas', flex: 1  },
        { field: 'validacion', headerName: 'Validacion', flex: 1  },

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
