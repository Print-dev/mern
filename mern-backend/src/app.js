import express from 'express'
import fileUpload from 'express-fileupload'
import {router} from '../routes/posts.routes.js'
import {routerUser} from '../routes/auth.routes.js'
import {createRoles} from '../libs/rol.js'
import cors from 'cors' 

const app = express()
createRoles()
app.use(cors())
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

app.use(router)
app.use(routerUser)

export default app
