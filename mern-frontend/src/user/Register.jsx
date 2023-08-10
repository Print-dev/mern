import React from 'react'
import * as Yup from 'yup'
import { Formik,Form,Field, ErrorMessage } from 'formik'
import toast from 'react-hot-toast'
import { AiOutlineSave } from "react-icons/ai"
import {usePost} from '../context/Postcontext'
import { useNavigate } from 'react-router-dom'
import '../style/registerAndlogin.css'



function Register() {
    
    const {registrarUsuario} = usePost()
  return (
    
    <div className='contenedor-formulario'>
        <b><h1>Registrarse</h1></b>
        <Formik 
        initialValues={{nombre: "", correo: "", contraseña: ""}} 
        validationSchema={Yup.object({
            nombre: Yup.string().required("el nombre es requerido").max(30),
            correo: Yup.string().email().required("el email es muy pero MUY NECESEARIOOOOO"),
            contraseña: Yup.string().required("la contraseña es necesario ").max(30)
        })}
        onSubmit={async (values, actions)=>{
                
                await registrarUsuario(values)  // CORREGIR
                
                
                actions.setSubmitting(false)
            }}>
        
        
        {({handleSubmit, isSubmitting })=>(
                <Form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <Field className="campo" name="nombre" placeholder="nombre" />
                <ErrorMessage component="p" className='alert' name='nombre'/>

                <label>Correo</label>
                <Field className="campo" name="correo" placeholder="correo"/>
                <ErrorMessage component="p" className='alert' name='correo'/>

                <label>Contraseña</label>
                <Field type="password" className="campo" name="contraseña" placeholder="contraseña"/>
                <ErrorMessage component="p" className='alert' name='contraseña'/>


                <button className='boton-guardar' type='submit' disabled={isSubmitting}> {isSubmitting ? (<AiOutlineSave className='animate-bounce'/>) : "guardar"}</button>
                
            </Form>)}
        </Formik>
    </div>
  )
}

export default Register