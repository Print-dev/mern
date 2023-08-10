import {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'

const usuarios = new Schema({
    nombre: {
        type: String,
        required: Boolean,
        unique: Boolean
    },
    correo: {
        type: String,
        required: Boolean,
        unique: Boolean
    },
    contraseña: {
        type: String,
        required: Boolean,
        unique: Boolean
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId 
    }],
    publicaciones: [{
        ref: "Posts",
        type: Schema.Types.ObjectId 
    }]
}, )

usuarios.statics.encriptarContraseña = async (contraseña) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(contraseña, salt)
}  

usuarios.statics.compararContraseña = async (contraseña, contraseñaNueva) => {
    return await bcrypt.compare(contraseña, contraseñaNueva)
}

export const usuario = model("Users", usuarios)