import { Schema, model } from "mongoose";

const rol = new Schema({
    nombreRol: String
})

export const role = model("Role", rol)