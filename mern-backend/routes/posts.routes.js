import {Router} from "express"
import { createPost, deletePost, getPost, getPosts } from "../controllers/post.controllers.js"
import {verificarToken, esUsuario, esAdmin} from '../middleware/authJwt.js'

export const router = Router()

router.get('/api/posts', getPosts)

router.post('/api/posts', [verificarToken, esUsuario || esAdmin], createPost)

router.delete('/api/posts/:id', [verificarToken, esUsuario || esAdmin], deletePost)

router.get('/api/posts/:id', getPost)
