const express = require('express')
const routes = express.Router()
var edad=0;
routes.get('/edad', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
            res.send(edad)
       
    })
})

routes.get('/id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT MAX(ID_ESTUDIANTE) AS id_est FROM estudiante;', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM estudiante', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO estudiante set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            edad=req.body.edad_actual;

            res.send(edad)
        })
    })
})
routes.post('/valor', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO estudiante_prueba set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

          

            res.send("todo ok!")
        })
    })
})

module.exports = routes