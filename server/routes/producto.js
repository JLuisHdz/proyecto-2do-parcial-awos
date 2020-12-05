const express = require('express');
const _ = require('underscore');
const  Producto= require('../models/producto');
const app = express();


app.get('/producto', (req,res) =>{
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;
    
    Producto.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario', 'nombre email password')
    .populate('categoria', 'descripcion')
    .exec ((err, productos) =>{
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al listar los productos',
                err
            });
        }
        res.json({
            ok: true,
            msj: 'Productos listados con exito',
            conteo: productos.length,
            productos
        });
    });
    });

    app.post('/producto', (req, res) =>{
        let body = req.body;
        let pro = new Producto({
                nombre: body.nombre,
                precioUni: body.precioUni,
                categoria: body.categoria,
                disponible: body.disponible,
                usuario: body.usuario
    
        });
        pro.save((err, proDB) =>{
            if(err) {
                return res.status(400).json({
                    ok: false,
                    msj: 'Error al insertar producto',
                    err
                });
            }
       
             res.json({
                ok: true,
                msj: 'Producto insertado con exito',
                proDB
            });
      
             });
        });

        
app.put('/producto/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','precioUni']);

    Producto.findByIdAndUpdate(id, body, { context: 'query' },(err, proDB) => { 
        if(err) {
            return res.status(400).json({
                ok: false,
                msj: 'Ocurrio un error al momento de actualizar',
                err
            });
        }
        res.json({
        ok: true,
        msg: 'Producto actualizado con exito',
        producto: proDB    
        });
    });
});

app.delete('/producto/:id', function(req, res) {
    let id = req.params.id;
 
    Producto.findByIdAndUpdate(id,{disponible: false} ,{context: 'query'}, (err, proDB) => {
           
           if (err) {
                   return res.status(400).json({
                           ok: false,
                             msj: 'Ocurrio un error al momento de eliminar',
                             err
                       });
                     }
   
                     res.json({
                       ok: true, 
                        msg: 'Producto eliminado con exito',
                        proDB
                     });
   
           });       
   });

    module.exports = app;