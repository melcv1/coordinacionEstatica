import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Home from './pages/Home/Home'
import Inicio from './pages/Inicio/Inicio'
import Login from './pages/Login/Login'
import {Training} from './pages/Training/Training'
import About from './pages/About/About'
import Resultados from './pages/Resultados/Resultados'
import Tutorials from './pages/Tutorials/Tutorials'

import './App.css'
import Exercises from './pages/Exercises/Exercises'
import ExercisesTutorial from './pages/ExerciseTutorial/ExercisesTutorial'
import TrainingTutorial from './pages/TrainingTutorial/TrainingTutorial'
import { Registro1 } from './pages/Registro1/Registro1'
import { Busqueda } from './pages/Busqueda/Busqueda'

export default function App() {
  return (

    <Router>
      <Routes>       
        <Route path='/' element={<Login />}/>
        <Route path='/inicio' element={<Inicio />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/start/:id' element={<Training />} />
        <Route path='/ej/:id' element={<Exercises />} />
        <Route path='/about' element={<About />} />
        <Route path='/resultados' element={<Resultados />} />
        <Route path='/tutorials' element={<Tutorials />} />
        <Route path='/ejtuturial' element={<ExercisesTutorial />} />
        <Route path='/tratutorial' element={<TrainingTutorial />} />
        <Route path='/registro1' element={<Registro1 />} />
        <Route path='/busqueda' element={<Busqueda />} />
      
      </Routes>
    </Router>
  )
}


