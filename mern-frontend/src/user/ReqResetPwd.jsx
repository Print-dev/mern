import React from "react";
import { usePost } from "../context/Postcontext";
import { Formik,Form,Field, ErrorMessage } from 'formik'
import toast from 'react-hot-toast'
import { AiOutlineSave } from "react-icons/ai"
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
//import {useLoginValues} from './LoginValues'
import '../style/registerAndlogin.css'



function ReqResetPwd() {
    const {enviarSolicitudDeCambiodePWD} = usePost()
    const navigate = useNavigate()
    
    
    return (
        <div className='contenedor-formulario-forgot'>
            <b><h1>Resetear contraseña</h1></b>
            <Formik 
            initialValues={{correo: ""}} 
            validationSchema={yup.object({
                correo: yup.string().email().required("el email es requerido (solo usuarios gmail)")
            })}
            onSubmit={
                async (value, action) =>{
                    await enviarSolicitudDeCambiodePWD(value)
                    action.setSubmitting(false)
                    console.log("enviado")
                    //navigate('/')
                }
            }> 
            {({handleSubmit, isSubmitting }) => (
                
                <Form onSubmit={handleSubmit}>
                    
                    <Field className="campo" name="correo" placeholder="correo" />
                    <ErrorMessage component="p" name="correo" className='alert'/>
                    

                    
                    <button className='boton-guardar' type="submit" disabled={isSubmitting}>{isSubmitting ? (<AiOutlineSave className='animate-bounce'/>) : "guardar"}</button>

                    
                    
                </Form>)}
            
            </Formik>
        </div>
        )
}

export default ReqResetPwd