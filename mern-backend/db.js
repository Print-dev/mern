import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', true);
export async function connectDB() {
    try{
        const db = await mongoose.connect(process.env.MONGODBURI)
        console.log("--------------------- CONECTADO -----------------------")
        console.log("connected to ", db.connection.name)
    }
    catch(error){
        console.log(" ---------------------- ERROR ---------------------- ")
        console.error(error)
    }
}

//process.env.MONGODB_URI