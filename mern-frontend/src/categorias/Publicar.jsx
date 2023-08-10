import React from 'react'
import { Formik,Form,Field, ErrorMessage } from 'formik'
import {usePost} from '../context/Postcontext'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { AiOutlineSave } from "react-icons/ai"
import '../style/postear.css'

export const Newpost = function Newpost() {
    const navigate = useNavigate()
    const {createPost} = usePost()
  return (
    <div className='formulario-contenedor'>
        <b><h1>Publicar</h1></b>
        <Formik 
        initialValues={{nombre: "", info: "", categoria:"" ,imagen: null}} 
        validationSchema={Yup.object({
            nombre: Yup.string().required("el nombre es requerido").max(30),
            info: Yup.string().required("info es requerida"),
            
            imagen: Yup.mixed().required("la imagen es necesaria"),
            categoria: Yup.string().required("la categoria es requerida")
        })}
        onSubmit={async (values, actions)=>{
              
                await createPost(values)
                
                navigate('/')
                actions.setSubmitting(false)
            }}>
        
        
        {({handleSubmit, setFieldValue, isSubmitting})=>(
                <Form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <Field className="campo" name="nombre" placeholder="nombre" />
                <ErrorMessage component="p" className='alert' name='nombre'/>

                <label>Descripcion</label>
                <Field className="textoarea" name="info" as="textarea" placeholder="descripcion"/>
                <ErrorMessage component="p" className='alert-desc' name='info'/>

                

                <label>Categoria</label>
                <Field className="campo" name="categoria" as="select" placeholder="categoria">
                    <option value="">-Escoje una categoria-</option>
                    <option value="ventas">ventas</option>
                    <option value="lugares">lugares</option>
                    <option value="empresas">empresas</option>
                    <option value="paginas_web">paginas_web</option>
                </Field>
                
                <ErrorMessage component="p" className='alert' name='categoria'/>
                
                <label className='label-imagen' htmlFor="imagen">Subir archivo</label>
                <input className='file-imagen' type="file" name='imagen' id="imagen" onChange={(img)=>setFieldValue("imagen",img.target.files[0])}/>  
                <ErrorMessage component="p" className='alert' name='imagen'/>

                <button className='boton-guardar' type='submit' disabled={isSubmitting}>{isSubmitting ? (<AiOutlineSave className='animate-bounce'/>) : "guardar"}</button>
                
            </Form>)}
        </Formik>
    </div>
  )
}