import React from 'react'
import { Link } from "react-router-dom";
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
                            <a className="nav-link" >Registro</a>
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
        </nav>

    )
}

export default Header;