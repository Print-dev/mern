import {role} from '../models/roles.js'

export const createRoles = async () => {
    try{
    const count = await role.estimatedDocumentCount()

    if (count > 0) return;

    const values = await Promise.all(
    [
        new role({nombreRol: "usuario"}).save(),
        new role({nombreRol: "administrador"}).save()
    ]
    )
    console.log(values) 
    } 
    
    catch(error){
        console.log(error)
    }

}