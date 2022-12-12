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

routes.get('/pruebas/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM estudiante_prueba WHERE id_estudiante = ?', [req.params.id],  (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


routes.get('/ninos', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM estudiante',  (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO estudiante set ?', [req.body], (err, results, rows)=>{
            if(err) return res.send(err)
            
            res.json(results.insertId);
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
routes.post('/process', function(req, res){
   let data='';
   if(req.xhr){
    data+='Hello, ';

   }
   if(req.body.fieldB){
    data+='world';
   }
   data+='!';
})
routes.put('/actualizar/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE estudiante set ? WHERE id_estudiante = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('NINO  ACTUALIZADO!')
        })
    })
})


routes.put('/actualizardatos/:id/:prueba', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE estudiante_prueba set ? WHERE id_estudiante = ? and id_prueba = ?', [req.body, req.params.id, req.params.prueba], (err, rows)=>{
            if(err) return res.send(err)

            res.send('NINO  ACTUALIZADO!')
        })
    })
})




module.exports = routes