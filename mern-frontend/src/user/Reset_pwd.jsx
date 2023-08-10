import React from "react";
import { usePost } from "../context/Postcontext";
import { Formik,Form,Field, ErrorMessage } from 'formik'
import toast from 'react-hot-toast'
import { AiOutlineSave } from "react-icons/ai"
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
//import {useLoginValues} from './LoginValues'
import '../style/registerAndlogin.css'



function Reset_pwd() {
    const {cambiarContraseña} = usePost()
    const navigate = useNavigate()
    
    
    return (<>
        <div className='contenedor-formulario-reset'>
            <b><h1>Resetear contraseña</h1></b>
            <Formik 
            initialValues={{nuevaContraseña: "", repetirContraseña: ""}} 
            validationSchema={yup.object({
                nuevaContraseña: yup.string().required("la contrasena es requerida"),
                repetirContraseña:  yup.string().required("la contrasena es requerida")
            })}
            onSubmit={
                async (value, action) =>{
                    await cambiarContraseña(value)
                    action.setSubmitting(false)
                    
                }
            }> 
            {({handleSubmit, isSubmitting}) => (
                
                <Form onSubmit={handleSubmit}>
                
                    <Field type="password" className="campo" name="nuevaContraseña" placeholder="nueva contraseña" />
                    <ErrorMessage component="p" name="nuevaContraseña" className='alert'/>

                    <Field type="password" className="campo" name="repetirContraseña" placeholder="repetir contraseña" />
                    <ErrorMessage component="p" name="repetirContraseña" className='alert'/>
                    
                    
                    <button className='boton-guardar' type="submit" disabled={isSubmitting}>{isSubmitting ? (<AiOutlineSave className='animate-bounce'/>) : "guardar"}</button>

                  
                    
                </Form>)}
            
            </Formik>
        </div>
        
        </>
        )
}

export default Reset_pwd