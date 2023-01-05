import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import "./Header.css"
function Header(props) {

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse jsflx" id="navbarTogglerDemo01">

                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link to="/inicio">
                            <a className="nav-link">Inicio</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/home">
                            <a className="nav-link" >Participante</a>
                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link to="/usuarios">
                            <a className="nav-link" >Usuario</a>
                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link to="/resultados">
                            <a className="nav-link">Resultados</a>
                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link to="/about">
                            <a className="nav-link" >Créditos</a>
                        </Link>


                    </li>

                </ul>

                

            </div>
            <div>
            <Dropdown  className="user-dos">
      <Dropdown.Toggle id="dropdown-basic"  className="user-dos">
      <FontAwesomeIcon icon={faUser} /> Usuario
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">Cerrar Sesión</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </div>
        </nav>

    )
}

export default Header;