const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario'); //U mayuscula es un standar para poner


const usuariosGet = (req, res = response) => {

    //const query = req.query; Con esto se hace que (http://localhost:8080/api/usuarios?q=hola&nombre=roly&apikey=1234567890) se muestre ordenado.
   const { q, nombre = 'No name', apikey, page = "1", limit } = req.query;   // tambien se puede usar 1 en page
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });    
}

const usuariosPost = async(req, res = response) => {

 
    const { nombre, correo, password, rol } = req.body;
    //const body = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol });


    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );


    //Guardar en DB
    await usuario.save();
   

    res.json({
        usuario
        //nombre,
        //edad
    });    
}
const usuariosPut = (req, res = response) => {

    const { usuarioid } = req.params;
   
    res.json({
        msg: 'put API - usuariosPut',
        usuarioid
    });    
}
const usuariosPatch = (req, res = response) => {
   
    res.json({
        msg: 'patch API - usuariosPatch'
    });    
}
const usuariosDelete = (req, res = response) => {
   
    res.json({
        msg: 'delete API - usuariosDelete'
    });    
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
    
}