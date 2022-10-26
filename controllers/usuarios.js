const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario'); //U mayuscula es un standar para poner

const usuariosGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query; 
    const query = { estado: true };
    //const usuarios = await Usuario.find(query)
       // //.skip( Number( desde ) )
        //.limit(Number( limite ));
    
    //const total = await Usuario.countDocuments(query);    

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        //resp
        total,
        usuarios
    
    //const query = req.query; Con esto se hace que (http://localhost:8080/api/usuarios?q=hola&nombre=roly&apikey=1234567890) se muestre ordenado.
   //const { q, nombre = 'No name', apikey, page = "1", limit } = req.query;   // tambien se puede usar 1 en page
        //msg: 'get API - controlador',
        //q,
        //nombre,
        //apikey,
        //page,
        //limit
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
const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validad contra base de datos

    if ( password ) {
         // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );

    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );
   
    res.json(usuario);
    
        //msg: 'put API - usuariosPut', ejemplo
}
const usuariosPatch = (req, res = response) => {
   
    res.json({
        msg: 'patch API - usuariosPatch'
    });    
}
const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borarmos 
    //const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

   
    res.json(usuario);    
        //msg: 'delete API - usuariosDelete'
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
    
}