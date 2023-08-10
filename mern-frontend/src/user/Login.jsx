import React from "react";
import { usePost } from "../context/Postcontext";
import { Formik,Form,Field, ErrorMessage } from 'formik'
import toast from 'react-hot-toast'
import { AiOutlineSave } from "react-icons/ai"
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import '../style/registerAndlogin.css'



function Login() {
    const {logearUsuario} = usePost()
    const navigate = useNavigate()
    
    
    return (
        <div className='contenedor-formulario'>
            <b><h1>Iniciar Sesion</h1></b>
            <Formik 
            initialValues={{correo: "", contraseña: ""}} 
            validationSchema={yup.object({
                correo: yup.string().email().required("el email es requerido"), 
                contraseña: yup.string().required("La contraseña es requerida")
            })}
            onSubmit={
                async (value, action) =>{
                    await logearUsuario(value)
                    action.setSubmitting(false)
                    //navigate('/')
                }
            }> 
            {({handleSubmit, isSubmitting}) => (
                
                <Form onSubmit={handleSubmit}>
                    <label>Correo</label>
                    <Field className="campo" name="correo" placeholder="nombre" />
                    <ErrorMessage component="p" name="correo" className='alert'/>
                    <label>Contraseña</label>
                    <Field type="password" className="campo" name="contraseña" placeholder="contraseña"/>
                    <ErrorMessage component="p" name="contraseña" className='alert'/>
                    <button className='boton-guardar' type="submit" disabled={isSubmitting}>{isSubmitting ? (<AiOutlineSave className='animate-bounce'/>) : "guardar"}</button>
                    
                    <Link className="olvidoContraseña" to={"/forgot-password"}>¿olvido la contraseña?</Link>
                </Form>)}
            
            </Formik>
        </div>
        )
}

export default Login