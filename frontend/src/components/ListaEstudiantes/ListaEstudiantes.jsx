import React, { useEffect, useState } from 'react';
import { Collapse, Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useFetchStudentsList } from '../../hooks/useFetchStudentsList';
import { useLocalStorage } from "../../localStorage/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

const ListaEstudiantes = () => {

    const navigate = useNavigate();
    const [estId, setEstId] = useLocalStorage("estId", "0");

    const { StudentList } = useFetchStudentsList();
    const [clickedIndex, setClickedIndex] = useState(-1);

    const columns = [
        { field: 'nombre', headerName: 'Nombre', flex: 1 },
        { field: 'apellido', headerName: 'Apellido', flex: 1 },
        { field: 'fechaNacimiento', headerName: 'Fecha Nacimiento', flex: 1 },
        { field: 'edad', headerName: 'Edad', flex: 1 },
        {
            field: 'pruebas', headerName: 'Pruebas', flex: 1, renderCell: (cellValues) => {
                return (
                    <Box>
                        <div>Habituación : {cellValues.value.pose2 ? <FontAwesomeIcon icon={faCheck} />  : <FontAwesomeIcon icon={faX} /> }</div>
                        <div>Entrenamiento1 : {cellValues.value.pose3 ? <FontAwesomeIcon icon={faCheck} />  : <FontAwesomeIcon icon={faX} /> }</div>
                        <div>Entrenamiento2 : {cellValues.value.pose4 ? <FontAwesomeIcon icon={faCheck} />  : <FontAwesomeIcon icon={faX} /> }</div>
                        <div>Evaluación : {cellValues.value.pose5 ? <FontAwesomeIcon icon={faCheck} />  : <FontAwesomeIcon icon={faX} /> }</div>
                    </Box>
                )
            },
        },
        {
            field: 'tInicio', headerName: 'T Inicio', flex: 1, renderCell: (cellValues) => {
                return (
                    <Box>
                        {
                            cellValues.value.map((t)=><div>{t/1000}</div>)
                        }
                    </Box>
                )
            },
        },
        { field: 'tFin', headerName: 'T Final', flex: 1, renderCell: (cellValues) => {
            return (
                <Box>
                    {
                        cellValues.value.map((t)=><div>{t/1000}</div>)
                    }
                </Box>
            )
        }, },
        { field: 'tEj', headerName: 'T Ej', flex: 1, renderCell: (cellValues) => {
            return (
                <Box>
                    {
                        cellValues.value.map((t)=><div>{t}</div>)
                    }
                </Box>
            )
        }, },
        { field: 'observaciones', headerName: 'Observaciones', flex: 1 },

    ];

    const handleRowClick = (e) => {
        console.log(e.row);
        setClickedIndex(e.row.id);
        setEstId(e.row.id);

        navigate(`/start/${e.row.id}`)


    }

    return (
        <div style={{ height: '650px' , width: '100%' }}>
            <DataGrid
                rows={StudentList}
                columns={columns}
                rowHeight={100}
                onRowClick={(e) => handleRowClick(e)}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}

            />
        </div>
    )
}


export default ListaEstudiantes
