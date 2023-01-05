import React, { useEffect, useState } from 'react';
import { Collapse, Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useFetchStudentsList } from '../../hooks/useFetchStudentsList';
import { useLocalStorage } from "../../localStorage/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useFetchUsuarios } from '../../hooks/useFetchUsuarios';

export const ListaUsuarios = () => {

    const navigate = useNavigate();
    const [estId, setEstId] = useLocalStorage("estId", "0");

    const { StudentList } = useFetchUsuarios();
    const [clickedIndex, setClickedIndex] = useState(-1);

    const columns = [
        { field: 'usuario', headerName: 'Usuario', flex: 1 },
        { field: 'nombre', headerName: 'Nombre', flex: 1 },
        { field: 'rol', headerName: 'Rol', flex: 1 },
    ];

    const handleRowClick = (e) => {
        console.log(e.row);
        setClickedIndex(e.row.id);
       // setEstId(e.row.id);

       // navigate(`/start/${e.row.id}`)


    }

    return (
        <div style={{ height: '450px', width: '100%' }}>
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
