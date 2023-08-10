import {Schema, model} from 'mongoose'


const postSchema = new Schema({
    imagen: {
        url: String,
        public_id: String,
        required: Boolean
    },
    nombre:{
        type: String,
        required: Boolean,
        trim: Boolean
    },
    info:{
        type: String,
        required: Boolean,
        trim: Boolean
    },
    imagen_usuario: {
        url: String,
        public_id: String,
        required: Boolean
    },
    categoria: {
        type: String,
        required: Boolean,
        trim: Boolean,
    },
    creadoPor: {
        ref: "Users",
        type: Schema.Types.ObjectId 
    }
})

export const publicacion = model("Posts", postSchema)