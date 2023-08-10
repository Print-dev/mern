import jwt from "jsonwebtoken"
import { role } from "../models/roles.js"
import {usuario} from '../models/usuario.js'
import dotenv from 'dotenv'

export const verificarToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        
        if (!token) return res.status(403).json({message: "no token dada"})

        const decodificado = jwt.verify(token, "secretKey")  // UNA VEZ DADA EL TOKEN EN EL HEADER SE PROCEDE A DECODIFICARLO PARA OBTENER SU INFORMACION
        req.userId = decodificado.id
        console.log(req.userId)

        const user = await usuario.findById(req.userId, {contraseña: 0})
        console.log("usuario : " , user)
        if(!user) return res.status(404).json({message: "usuario no encontrado"})
        next()
    } catch (error) {
        res.status(401).json({message:"no autorizado"})
    }
}

export const esAdmin = async (req, res, next) => {
    try {
        const user = await usuario.findById(req.userId)
        console.log(user)
        const rol = await role.findOne({id: user.roles})
        console.log(rol)
        next()
    } catch (error) {
        res.json({message: "error"})
    }
}

export const esUsuario = async (req, res, next) => {
    try {
        const user = await usuario.findById(req.userId)
        console.log(user)
        const rol = await role.findOne({id: user.roles})
        console.log(rol)
        next()
    } catch (error) {
        res.json({message: "error"})
    }
}