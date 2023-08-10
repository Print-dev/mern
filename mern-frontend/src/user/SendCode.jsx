import React from "react";
import { usePost } from "../context/Postcontext";
import { Formik,Form,Field, ErrorMessage } from 'formik'
import toast from 'react-hot-toast'
import { AiOutlineSave } from "react-icons/ai"
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
//import {useLoginValues} from './LoginValues'
import '../style/registerAndlogin.css'



function SendCode() {
    const {enviarCodigo} = usePost()
    const navigate = useNavigate()
    
    
    return (
        <div className='contenedor-formulario-code'>
            <b><h1>Codigo</h1></b>
            <Formik 
            initialValues={{verificarCodigo: ""}} 
            validationSchema={yup.object({
                verificarCodigo: yup.string().required("el codigo es requerido")
            })}
            onSubmit={
                async (value, action) =>{
                    await enviarCodigo(value)
                    action.setSubmitting(false)
                    //navigate('/')
                }
            }> 
            {({handleSubmit, isSubmitting}) => (
                
                <Form onSubmit={handleSubmit}>
               
                    <Field className="campo-code" name="verificarCodigo" placeholder=" - - - - " />
                    <ErrorMessage component="p" name="verificarCodigo" className='alert'/>
                    
                    
                    <button className='boton-guardar' type="submit" disabled={isSubmitting}>{isSubmitting ? (<AiOutlineSave className='animate-bounce'/>) : "guardar"}</button>

                  
                    
                </Form>)}
            
            </Formik>
        </div>
        )
}

export default SendCode