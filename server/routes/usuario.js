const express = require('express')
const Usuario = require('../models/usuario')
const app = express()

  app.get('/usuario', function (req, res) {
      res.json({
          ok: '200',
          mensaje: 'usuarios consultados con exito'
      })
    })
  
    app.post('/usuario', function (req, res) {
      let body = req.body
      let usr = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password
      })

      usr.save((err, usrBD) => {
        if(err) {
          return res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error',
            err
          })
        }

        res.json({
          ok:true,
          msg: 'Usuario insertado con exito',
          usrBD
        })
      })
    })
  
    app.put('/usuario/:id/:nombre', function (req, res) {
      let id = req.params.id
      let nombre = req.params.nombre
  
      res.json({
          ok: 200,
          mensaje: 'usuario actualizado con exito',
          id: id,
          nombre: nombre
      })
    })
  
    app.delete('/usuario/:id', function (req, res) {
      let id = req.params.id
  
      res.json({
          ok: 200,
          mensaje: 'usuario eliminada con exito',
          id: id,
      })
    })

    module.exports = app