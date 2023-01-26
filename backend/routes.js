const express = require('express')
const routes = express.Router()
var edad = 0;
const bcrypt = require("bcryptjs");

routes.get('/edad', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        res.send(edad)

    })
})

routes.get('/id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT MAX(ID_ESTUDIANTE) AS id_est FROM estudiante;', (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.get('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM estudiante', (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/participante/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM estudiante WHERE id_estudiante = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err) 

            res.json(rows)
        })
    })
})

routes.get('/prueba/busqueda/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        if(req.params.id==='admin'){
            conn.query('SELECT a.ID_ESTUDIANTE, a.NOMBRE, a.APELLIDO, a.FECHA_NACIMIENTO, a.EDAD_ACTUAL, GROUP_CONCAT(b.id_prueba) AS PRUEBAS, GROUP_CONCAT(b.validacion) AS VALIDACION,  GROUP_CONCAT(b.TIEMPO_INI) AS TIEMPO_INICIO, GROUP_CONCAT(b.TIEMPO_FIN) AS TIEMPO_FIN, group_concat(b.TIEMPO_EJ) AS TIEMPO_EJ, a.OBSERVACIONES, a.evaluador FROM estudiante as a INNER JOIN estudiante_prueba as b ON a.ID_ESTUDIANTE = b.ID_ESTUDIANTE  GROUP BY a.ID_ESTUDIANTE;',  (err, rows) => {
                if (err) return res.send(err)
    
                res.json(rows)
            })

        }else{

            conn.query('SELECT a.ID_ESTUDIANTE, a.NOMBRE, a.APELLIDO, a.FECHA_NACIMIENTO, a.EDAD_ACTUAL, GROUP_CONCAT(b.id_prueba) AS PRUEBAS, GROUP_CONCAT(b.validacion) AS VALIDACION,  GROUP_CONCAT(b.TIEMPO_INI) AS TIEMPO_INICIO, GROUP_CONCAT(b.TIEMPO_FIN) AS TIEMPO_FIN, group_concat(b.TIEMPO_EJ) AS TIEMPO_EJ, a.OBSERVACIONES, a.evaluador FROM estudiante as a INNER JOIN estudiante_prueba as b ON a.ID_ESTUDIANTE = b.ID_ESTUDIANTE WHERE a.evaluador = ? GROUP BY a.ID_ESTUDIANTE;',  [req.params.id], (err, rows) => {
                if (err) return res.send(err)
    
                res.json(rows)
            })

        }

       
    })
})

routes.get('/pruebas/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM estudiante_prueba WHERE id_estudiante = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})


routes.get('/ninos/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        if(req.params.id==="admin"){

            conn.query('SELECT * FROM estudiante', (err, rows) => {
                if (err) return res.send(err)
    
                res.json(rows)
            })

        }else{
            conn.query('SELECT * FROM estudiante WHERE evaluador = ?',[req.params.id], (err, rows) => {
                if (err) return res.send(err)
    
                res.json(rows)
            })

        }



       
    })
})



routes.get('/usuario/users', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM usuario', (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})
routes.post('/login/users',  (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.send(err);

         conn.query('SELECT contrasena, usuario, rol  FROM usuario WHERE usuario= ?', [req.body.usuario], async(err, rows) => {
            if (err) return res.send(err)
            if (rows.length > 0) {
                try {
                   
                      const cmp =  await bcrypt.compare(req.body.contrasena, rows[0].contrasena);
                      console.log(cmp);
                        if (cmp) {
                            res.json({ status: 'authenticated', user:  rows[0].usuario, rol:  rows[0].rol  });
                        } else {
                            res.json({ status: 'notAuthenticated', user:  rows[0].usuario, rol: rows[0].rol  });
                        }

                    
                 

                } catch (error) {
                    res.send("Algo malo pasó");
                    console.log(error);

                }

            } else {
                res.json({ status: 'notAuthenticated' });
            }


        })
    })





})


routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO estudiante set ?', [req.body], (err, results, rows) => {
            if (err) return res.send(err)

            res.json(results.insertId);
        })

    })
})
routes.post('/agregarusuario', (req, res) => {


    req.getConnection(async (err, conn) => {
        if (err) return res.send(err)

        const rondasDeSal = 10;
        var contra = req.body.contrasena;
        var palabraSecretaEncriptada2;
        try{

       
      await  bcrypt.hash(contra, rondasDeSal, (err, palabraSecretaEncriptada) => {
            if (err) {
                console.log("Error hasheando:", err);
            } else {

                conn.query('SELECT usuario FROM usuario WHERE usuario = ?', [req.body.usuario], (err, results, rows) => {
                    if (err) return res.send(err)

                  

                    if(results.length > 0){
                        res.json(0);

                    }else{
       
                        conn.query('INSERT INTO  usuario (usuario, contrasena, nombre, rol) VALUES (?, ?, ?, ?)', [req.body.usuario, palabraSecretaEncriptada, req.body.nombre, req.body.rol], (err2, results2, rows2) => {
                            if (err) return res.send(err2)

                            res.json(results2.insertId);
                        })

                       // res.send("no hay usuario");

                    }

                   
                })


            }
        });
    }catch (error) {
        res.send("Algo malo pasó");
        console.log(error);

    }


    })
})




routes.post('/valor', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO estudiante_prueba set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)



            res.send("todo ok!")
        })
    })
})
routes.post('/process', function (req, res) {
    let data = '';
    if (req.xhr) {
        data += 'Hello, ';

    }
    if (req.body.fieldB) {
        data += 'world';
    }
    data += '!';
})
routes.put('/actualizar/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE estudiante set ? WHERE id_estudiante = ?', [req.body, req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.send('NINO  ACTUALIZADO!')
        })
    })
})

routes.put('/actualizarprueba/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE estudiante_prueba set ? WHERE id_estudiante = ?', [req.body, req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.send('NINO  ACTUALIZADO!')
        })
    })
})



routes.put('/actualizardatos/:id/:prueba', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE estudiante_prueba set ? WHERE id_estudiante = ? and id_prueba = ?', [req.body, req.params.id, req.params.prueba], (err, rows) => {
            if (err) return res.send(err)

            res.send('NINO  ACTUALIZADO!')
        })
    })
})




module.exports = routes