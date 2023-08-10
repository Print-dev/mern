import {publicacion} from '../models/Post.js'
import {usuario} from '../models/usuario.js'
import {uploadImage, deleteImage} from '../libs/cloudinary.js'
import fs, { remove } from 'fs-extra'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
export const getPosts = async (req, res) => {
    try {
        const posts = await publicacion.find().populate("creadoPor", {_id: 1, nombre: 1})
        return res.send(posts)
    }
    catch(error){
        res.status(500).send({error: error.message})
    }
    
}

export const createPost = async (req, res) => {
    try{
        
        const token = req.headers["x-access-token"]
        const file = req.files.imagen.tempFilePath
        const {nombre, info , categoria} = req.body
        let imagen
        if (req.files.imagen){
            const resultado = await uploadImage(file)
            console.log("resultado : ",resultado)
            fs.remove(file)
            imagen = {
                url : resultado.secure_url,
                public_id: resultado.public_id
            }
        }
        
        
        
        const userToken = jwt.verify(token, process.env.SECRET_KEY)
        const userId = await usuario.findById(userToken.id)

        
        const newPost = new publicacion({nombre, info ,categoria, imagen})
        newPost.creadoPor = userToken.id
    

        const postsaved = await newPost.save()
        userId.publicaciones = userId.publicaciones.concat(postsaved._id)
        await userId.save()
        
        res.json(postsaved)
        
        
    }catch(error)
    {
        console.log(error)
        res.status(500).json(error)
    }
    
    
}


export const deletePost = async (req,res) =>{
    try{
        
        const token = req.headers["x-access-token"]
        const {id} = jwt.verify(token, process.env.SECRET_KEY)
        const usuarioEncontrado = await usuario.findById(id).populate("roles")
     
        const {creadoPor} = await publicacion.findById(req.params.id)
        const idrolAdmin = process.env.IDROLADMIN
        const idRol = usuarioEncontrado.roles.map(i => i.id)

        console.log("usuarioencontrado:", idRol)
        console.log("rol de admin: ", idrolAdmin)
        
        if (id != creadoPor && idRol != idrolAdmin) { 
            return res.status(403).send("esta publicacion no le pertenece")
        }
        
        const removePost = await publicacion.findByIdAndDelete(req.params.id)
            const file = req.files
            console.log("esta es la publicacion eliminada:  -->  ",removePost)
            if (!removePost) {
                return res.sendStatus(404)  // ID NO ENCONTRADO
            }
            /*if (removePost.imagen.public_id) {
                const file = req.files.imagen.tempFilePath
                const pub = await deleteImage(removePost.imagen.public_id)
                console.log(pub) 
            }*/
            if (removePost && removePost.imagen.public_id){   
                await deleteImage(removePost.imagen.public_id)
                
            }

            if(file && file.imagen.tempFilePath) {
                fs.remove(file.imagen.tempFilePath)
            }
            

            //fs.remove(file)
            res.send("eliminado")
            console.log("eliminado")
        
        
        
    }
    catch(error){
        res.status(500).send({error: error.message})
    }
}

export const getPost = async (req, res) => {
    try{
        const obtenerPost = await publicacion.findById(req.params.id).populate("creadoPor")
        if ( !obtenerPost) return res.sendStatus(404)
        return res.send(obtenerPost) 
    }catch(error){
        res.status(500).send({error: error.message})
    }
    
}