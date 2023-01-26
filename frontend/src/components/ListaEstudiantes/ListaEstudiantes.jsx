import React, { useContext, useEffect, useState } from 'react';
import { Collapse, Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useFetchStudentsList } from '../../hooks/useFetchStudentsList';
import { useLocalStorage } from "../../localStorage/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import "../../App.css";

import Modal from '@mui/material/Modal';
import Resultado from '../../pages/Resultados/Resultado';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent:'center',
};

const ListaEstudiantes = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [estId, setEstId] = useLocalStorage("estId", "0");

    const { StudentList } = useFetchStudentsList(user);
    const [clickedStudent, setClickedStudent] = useState({});
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const columns = [
        { field: 'nombre', headerName: 'Nombre', flex: 1 },
        { field: 'apellido', headerName: 'Apellido', flex: 1 },
        { field: 'fechaNacimiento', headerName: 'Fecha Nacimiento', flex: 1 },
        { field: 'edad', headerName: 'Edad', width: 40 },
        {
            field: 'pruebas', headerName: 'Evaluaciones', flex: 1, renderCell: (cellValues) => {
                return (
                    <Box>
                        {/* <div>Entrenamiento1 : {cellValues.value.pose3 ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faX} />}</div> */}
                        <div>Entrenamiento1 : </div>
                        <div>Entrenamiento2 :</div>
                        <div>Evaluación : </div>
                    </Box>
                )
            },
        },
        {
            field: 'tInicio', headerName: 'T.Entranamiento', flex: 1, renderCell: (cellValues) => {
                return (
                    <Box>
                        <div>{cellValues.value.pose3}</div>
                        <div>{cellValues.value.pose4}</div>
                        <div>{cellValues.value.pose5}</div>
                    </Box>
                )
            },
        },
        {
            field: 'tFin', headerName: 'T.Evaluacion', flex: 1, renderCell: (cellValues) => {
                return (
                    <Box>
                        <div>{cellValues.value.pose3}</div>
                        <div>{cellValues.value.pose4}</div>
                        <div>{cellValues.value.pose5}</div>
                    </Box>
                )
            },
        },
        {
            field: 'tEj', headerName: 'T.Tarea', flex: 1, renderCell: (cellValues) => {
                return (
                    <Box>
                        <div>{cellValues.value.pose3}</div>
                        <div>{cellValues.value.pose4}</div>
                        <div>{cellValues.value.pose5}</div>
                    </Box>
                )
            },
        },
        { field: 'observaciones', headerName: 'Observaciones', flex: 1 },
        { field: 'intentos', headerName: 'Intentos', flex: 1 },
        { field: 'evaluador', headerName: 'Evaluador', flex: 1 },
        {
            field: 'resultado', headerName: 'Resultados', flex: 1, renderCell: (cellValues) => {
                return (
                    <>
                        <button onClick={handleOpen} className="btn_primary btn-table">Ver resultados</button>
                    </>

                )
            },
        },

    ];

    const handleRowClick = (e) => {
        console.log(e.row);
        setClickedStudent(e.row);
        //setEstId(e.row.id);

        //navigate(`/start/${e.row.id}`)


    }

    return (
        <>
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Resultado estudiante={clickedStudent}/>
                </Box>
            </Modal>
        </>
    )
}


export default ListaEstudiantes
