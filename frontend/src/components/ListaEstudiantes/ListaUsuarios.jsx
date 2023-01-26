import React, { useEffect, useState } from 'react';
import { Collapse, Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter, esES  } from '@mui/x-data-grid';
import { useFetchStudentsList } from '../../hooks/useFetchStudentsList';
import { useLocalStorage } from "../../localStorage/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useFetchUsuarios } from '../../hooks/useFetchUsuarios';
import "../../App.css"
export const ListaUsuarios = () => {

    const navigate = useNavigate();
    const [estId, setEstId] = useLocalStorage("estId", "0");

    const { StudentList } = useFetchUsuarios();
    const [clickedIndex, setClickedIndex] = useState(-1);

    const columns = [
        { field: 'usuario', headerName: 'Usuario', flex: 1 },
        { field: 'nombre', headerName: 'Nombre', flex: 1 },
        { field: 'rol', headerName: 'Rol', flex: 1 },
        {
            headerName: 'Acciones', width: 100, renderCell: (cellValues) => {
                return (
                    <Box className='d-flex'>
                        <div className='m-1' onClick={()=>console.log('edit')}><FontAwesomeIcon icon={faEdit} className='color_primary'/></div>
                        <div className='m-1' onClick={()=>console.log('remove')}><FontAwesomeIcon icon={faTrash} className='color_cancel' /></div>
                    </Box>
                )
            },
        },
    ];

    const handleRowClick = (e) => {
        console.log(e.row);
        setClickedIndex(e.row.id);
        // // setEstId(e.row.id);

        // navigate(`/start/${e.row.id}`)


    }

    return (
        <div style={{ height: '450px', width: '100%' }}>
            
            <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={StudentList}
                columns={columns}
                rowHeight={100}

                onRowClick={(e) => handleRowClick(e)}
                components={{
                    Toolbar: () => (<>
                        <div className='d-flex justify-content-between p-4'>
                            <div>
                                <GridToolbarFilterButton />
                                <GridToolbarExport />
                            </div>
                            <div>
                                <GridToolbarQuickFilter />
                            </div>
                        </div>
                    </>)
                }}
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
