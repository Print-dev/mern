import expressApp from './app.js'

import {connectDB} from '../db.js'


connectDB()
const PORT = process.env.PORT || 3000

expressApp.listen(PORT,()=>{console.log("server iniciado en puerto ", PORT)})
