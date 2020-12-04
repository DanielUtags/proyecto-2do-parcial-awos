const express = require('express');
const Usuario = require('../models/usuario') 
const app = express();

  app.get('/usuario', function (req, res) {
    Usuario.find({}).exec((err,usuarios)=>{
      if(err){
        return res.status(400).json({
          ok:false,
          msg:'Ocurrioun error al momento de consultar',
          err
        })
      }
      res.json({
        ok:true,
        msg: 'Lista de usuarios obtenida con exito',
        conteo: usuarios.length,
        usuarios
      })
    });
  })
  
  app.post('/usuario', function(req,res){
    let body = req.body;
    let usr = new Usuario ({
      nombre:body.nombre,
      email: body.email,
      password: body.password
    });
    usr.save((err,usrDB)=>{
      if (err){
       return res.status(400).json({
         ok:false,
         err
       })
      }
      res.json({
        ok: true,
        msg: 'Usuario insertado con exito',
        usrDB
      })
    })
  });
  
  app.put('/usuario/:id/:nombre', function(req,res){
    let id = req.params.id;
    let nombre = req.params.nombre;
  
    res.json({
      ok:200,
      mensaje: 'Usuario actualizado con exito',
      id : id,
      nombre: nombre
    });
  });
  
  app.delete('/usuario/:id', function (req, res) {
      let id = req.params.id;
      res.json({
        ok:200,
        mensaje:'Usuario eliminado con exito',
        id: id
      });
  });

  module.exports = app