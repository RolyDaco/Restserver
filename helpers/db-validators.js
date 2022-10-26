const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error( `El rol ${ rol } no está registrado en la DB`)
    }
}

const esCorreoExistente = async( correo = '' ) => {
   // Verificar si el correo existe
   const existeEmail = await Usuario.findOne({ correo });
   if ( existeEmail ){
       throw new Error(`El correo: ${ correo } ya está registrado`)
           //msg: 'El correo ya está registrado'
   }
}   

const existeUsuarioPorId = async( id ) => {
    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ){
        throw new Error(`El id no existe ${ id }`);
            //msg: 'El correo ya está registrado'
    }
 }   

module.exports = {
    esRoleValido,
    esCorreoExistente,
    existeUsuarioPorId
}