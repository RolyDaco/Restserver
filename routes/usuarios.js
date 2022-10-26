const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, esCorreoExistente, existeUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuariosPut );



//router.post('/', usuariosPost);
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio, más de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'Esto no es un correo').isEmail(),
    check('correo').custom( esCorreoExistente ),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']), es codigo de referencia
    check('rol').custom( esRoleValido ),
    validarCampos

], usuariosPost );

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );

module.exports = router;