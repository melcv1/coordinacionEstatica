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

export default function App() {
  return (

    <Router>
      <Routes>       
        <Route path='/' element={<Login />}/>
        <Route path='/inicio' element={<Inicio />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/start' element={<Training />} />
        <Route path='/ej' element={<Exercises />} />
        <Route path='/about' element={<About />} />
        <Route path='/resultados' element={<Resultados />} />
        <Route path='/tutorials' element={<Tutorials />} />
        <Route path='/ejtuturial' element={<ExercisesTutorial />} />
      </Routes>
    </Router>
  )
}


