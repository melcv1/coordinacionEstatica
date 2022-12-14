import React, { useEffect, useState } from 'react';
import { Collapse, Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useFetchStudentsList } from '../../hooks/useFetchStudentsList';
import { useLocalStorage } from "../../localStorage/useLocalStorage";
import { useNavigate } from "react-router-dom";

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
                        <div>pose2 : {cellValues.value.pose2 ? 'si' : 'no'}</div>
                        <div>pose3 : {cellValues.value.pose3 ? 'si' : 'no'}</div>
                        <div>pose4 : {cellValues.value.pose4 ? 'si' : 'no'}</div>
                        <div>pose5 : {cellValues.value.pose5 ? 'si' : 'no'}</div>

                    </Box>
                )
            },
        },

    ];

    const handleRowClick = (e) => {
        console.log(e.row);
        setClickedIndex(e.row.id);
        setEstId(e.row.id);

        navigate(`/start/${e.row.id}`)


    }

    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid
                rows={StudentList}
                columns={columns}
                rowHeight={100}
                autoHeight 
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
