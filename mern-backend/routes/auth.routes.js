import {Router} from 'express'
import {login,register, users, user, rol, forgotPassword,recibirCodigo, send_ChangedPassword } from '../controllers/auth.controller.js'

export const routerUser = Router()

routerUser.post('/api/register', register)
routerUser.post('/api/login', login)
routerUser.get('/api/users', users)
routerUser.get('/api/users/:id', user)
routerUser.get('/api/roles', rol)
routerUser.post('/api/forgotPassword', forgotPassword) // esta ruta nos pedira poner nuestro gmail para poder enviarle una solictud mediante una ruta
//routerUser.get('/reset_password/:id/:token', reset_password) // esta ruta lo obtendremos a traves de nuestro gmail
routerUser.post('/api/codigo-contrasena', recibirCodigo)
routerUser.post('/api/reset_password', send_ChangedPassword) 