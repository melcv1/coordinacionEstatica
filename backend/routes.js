const express = require('express')
const routes = express.Router()
var edad=0;
const bcrypt = require("bcryptjs");

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

routes.get('/prueba/busqueda', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT a.ID_ESTUDIANTE, a.NOMBRE, a.APELLIDO, a.FECHA_NACIMIENTO, a.EDAD_ACTUAL, GROUP_CONCAT(b.id_prueba) AS PRUEBAS, GROUP_CONCAT(b.validacion) AS VALIDACION,  GROUP_CONCAT(b.TIEMPO_INI) AS TIEMPO_INICIO, GROUP_CONCAT(b.TIEMPO_FIN) AS TIEMPO_FIN, group_concat(b.TIEMPO_EJ) AS TIEMPO_EJ, a.OBSERVACIONES FROM estudiante as a INNER JOIN estudiante_prueba as b ON a.ID_ESTUDIANTE = b.ID_ESTUDIANTE GROUP BY a.ID_ESTUDIANTE;', (err, rows)=>{
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



routes.get('/usuario/users', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM usuario',  (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
 routes.post('/login/users',  (req, res)=>{
    try {

         req.getConnection( (err, conn)=>{
            if(err) return res.send(err)
    
             conn.query('SELECT contrasena FROM usuario WHERE usuario= ?', [req.body.usuario], (err, rows)=>{
                if(err) return res.send(err)
    
                const cmp =  bcrypt.compare(req.body.contrasena, rows.contrasena.toString());
                if (cmp) {
                  res.send("Auth Successful");
                } else {
                  res.send("Wrong username or password.");
                }
            })
        })


        
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
      }

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
routes.post('/agregarusuario', (req, res)=>{

   
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        const rondasDeSal = 10;
        var contra= req.body.contrasena;
        var palabraSecretaEncriptada2;
        bcrypt.hash(contra, rondasDeSal, (err, palabraSecretaEncriptada) => {
            if (err) {
                console.log("Error hasheando:", err);
            } else {
                conn.query('INSERT INTO  usuario (usuario, contrasena, nombre, rol) VALUES (?, ?, ?, ?)', [req.body.usuario, palabraSecretaEncriptada, req.body.nombre, req.body.rol], (err, results, rows)=>{
                    if(err) return res.send(err)
                    
                    res.json(results.insertId);
                })

            }
        });
        
       
        
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