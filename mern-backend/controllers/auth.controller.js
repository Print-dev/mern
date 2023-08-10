import {usuario} from '../models/usuario.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { role } from '../models/roles.js';
import { enviarEmail } from '../src/nodemailer_config.js';



export const register = async (req, res) => {
    const {nombre, correo, contraseña, roles} = req.body
    
    
    const registro = new usuario({ 
        nombre, 
        correo,
        contraseña: await usuario.encriptarContraseña(contraseña),
        publicaciones: []
    })

    if(roles) {
        const admin = await role.find({nombreRol: {$in: roles}})
        registro.roles = admin.map(id => id._id)
    } else{ 
        const user = await role.findOne({nombreRol: "usuario"})
        registro.roles = user._id   /// REVISAR AQUI
    }

    const usuarios = await usuario.findOne({correo})   //ESTO TRAERA EL USUARIO ENCONTRADO
    if (usuarios) return res.status(404).send("ya existe el correo")
    

   

    const usuarioGuardado = await registro.save()
    res.json(usuarioGuardado)


}

export const login = async (req, res) => {
    const  {correo} = req.body
    const usuarioEncontrado = await usuario.findOne({correo}).populate("roles")
    if (!usuarioEncontrado) return res.status(401).send("correo invalido")
    

    const comparar = await usuario.compararContraseña(req.body.contraseña, usuarioEncontrado.contraseña) // req.body.contraseña es lo q nosotros hemos escrito por tunderclient para poder logearnos // y usuarioEncontrado.contraseña es para buscar en la B.D el correo que esta guardado y comparar
     // si no comparamos la contraseña con el "hash" de la contraseña BD saltara un error de q el HASH es requerido

    if (!comparar) return res.status(401).send("la contraseña es incorrecta") // 401 = no autorizado

    console.log("usuario encontrado: ",usuarioEncontrado)

    const token = jwt.sign({id: usuarioEncontrado._id}, process.env.SECRET_KEY)  //ESTE TOKEN SERA LLEVADO AL ARCHIVO DE AUTHJWT.JS

    //req.headers["x-access-token"] = token

    res.json({token, id: usuarioEncontrado._id, contraseña: usuarioEncontrado.contraseña})
    
}

export const users = async (req, res) => {
    const users = await usuario.find()
    return res.json({users})
}

export const user = async (req, res) => {
    try{
        const obtenerUser = await usuario.findById(req.params.id).populate("roles")
        if ( !obtenerUser) return res.sendStatus(404)
        return res.send(obtenerUser) 
    }catch(error){
        res.status(500).send({error: error.message})
    }
}

export const rol = async (req,res) =>{
    const obtenerRol = await role.find()
    return res.send(obtenerRol)
}

export const forgotPassword = async (req, res) =>{
    try {
        
        const {correo} = req.body
        const user = await usuario.findOne({correo})
        
        if (!user) return res.json({messageError: "serivico de correcto electronico no valido solo usar gmail"})
        
        //console.log("el token: ", token)
        console.log("MENSAJE DESDE EL SERVER")
        const letrasYnumeros = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890'
        let codigo = ''

        for (let i = 0; i < 4 ; i++) {
        codigo += letrasYnumeros.charAt(Math.floor(Math.random() * letrasYnumeros.length))

        }

        

        console.log(codigo)

        //const linkVerificar = `http://localhost:3000/reset_password/${user._id}/${token}`
        console.log(user)
        
       
        await enviarEmail(user.correo, codigo)
          
        const token = jwt.sign({userId: user._id, codigo: codigo}, process.env.SECRET_KEY)
        console.log({message: "peticion de reseteo de contraseña enviada", token})
        res.json({message: "peticion de reseteo de contraseña enviada", token})
        
   
    } catch (error) {
        res.send(error)
    }
}



export const recibirCodigo = async (req, res) => {
    try {
        const tokenPwd = req.headers['token-pwd']
        const {verificarCodigo} = req.body
        const tokenPwdDestructuring = jwt.verify(tokenPwd, process.env.SECRET_KEY) 
        console.log("token destructurado: ",tokenPwdDestructuring)
        if (verificarCodigo != tokenPwdDestructuring.codigo) return res.json({errorMessage: "el codigo no coincide"})
        console.log("codigo pasado")
        const token = jwt.sign({_id: tokenPwdDestructuring.userId}, process.env.SECRET_KEY)
        // EL TOKEN CONTENDRA EL CODIGO Q ENVIO EL CLIENTE EN LA RUTA ANTERIOR
        
        res.json({token})
       
    } catch (error) {
        res.status(404).send({error: "algo salio mal"})
    }
}

export const send_ChangedPassword = async (req, res) => {
   
    
    try {
        const tokenPwd = req.headers['token-pwd']
        const {nuevaContraseña} = req.body
        const {repetirContraseña} = req.body
        //const {id, token} = req.params
        
        
        const tokenPwdDestructuring = jwt.verify(tokenPwd, process.env.SECRET_KEY) // { userId: '640a5f6fc7cb838c95f8b32e', codigo: 'H9OJ', iat: 1678579039 }
        
        const usuarioSolicitando = await usuario.findById({_id: tokenPwdDestructuring._id})
        if (!(usuarioSolicitando && tokenPwd)) return res.json({tokenError: "usuario no encontrado o token incorrecto"})

        if (nuevaContraseña != repetirContraseña) return res.json({messageError: "las contraseñas no coinciden"})

        await usuario.updateOne({_id: tokenPwdDestructuring._id},{$set: {contraseña: await usuario.encriptarContraseña(nuevaContraseña)}})

        res.json({message: "contraseña actualizada"})
        
    } catch (error) {
        res.json({error})
    }
}