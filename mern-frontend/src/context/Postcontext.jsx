import React, { useState,useContext,createContext,useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const postContext = createContext()


export const usePost = function(){
  const context = useContext(postContext)
  return context
} 

export const PostProvider = function({children}) {

    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [token, setToken] = useState("")
    const [userid, setUserid] = useState("")
    const [tokenCode, setTokenCode] = useState("")
    const [tokenResetPwd, setTokenResetPwd] = useState("")


    const obtenerPosts = async ()=>{
      const respuesta = await axios.get('https://mern-backend-0gvx.onrender.com/api/posts')
      setPosts(respuesta.data)
      
    }

    const createPost = async (pub) =>{
      try {
        const formulario = new FormData()
      
        for(let clave in pub){
          formulario.append(clave, pub[clave])
        }
        
        

        const respuesta = await axios.post('https://mern-backend-0gvx.onrender.com/api/posts',formulario, {
          headers:{
            "Content-Type":"multipart/form-data",
            "x-access-token": token
          }
        })
        setPosts([...posts, respuesta.data])
        toast.success("Publicado!", {duration:10000})
      } catch (error) {
        toast.error(error.response?.data.message, {duration:10000})
      }
      
    }
    
    const obtenerPost = async (id) => {
      const respuesta = await axios.get('https://mern-backend-0gvx.onrender.com/api/posts/' + id)

      return respuesta.data
    }

    const postInfo = async (id) => {
      const respuesta = await axios.get('https://mern-backend-0gvx.onrender.com/api/posts/' + id)
      return respuesta.data.creadoPor
    }

    const obtenerUsuario = async (id) =>{
      const usuarioEncontrado = axios.get('https://mern-backend-0gvx.onrender.com/api/users/' + id)
      return usuarioEncontrado
    }

    const eliminarPost = async (id) => {
      const del = await axios.delete('https://mern-backend-0gvx.onrender.com/api/posts/' + id, {headers: {"x-access-token":token}})
      
      if (del.status == 200){
        setPosts(posts.filter(post => post._id !== id))
      }
      
    }

    const registrarUsuario = async (userRegister) => {
      try {
        const {data} = await axios.post("https://mern-backend-0gvx.onrender.com/api/register", userRegister)  
        console.log(data)
        toast.success("usuario "+data.nombre+" registrado correctamente!", {duration:10000})
        navigate('/')
      } catch (error) {
        toast.error(error.response?.data, {duration:10000})
      }
    }

    const logearUsuario = async (loginUser) => {
      try {
        const {data} = await axios.post('https://mern-backend-0gvx.onrender.com/api/login', loginUser)
        
        setToken(data.token)
        setUserid(data.id)
        
        toast.success("sesion iniciado correctamente", {duration: 10000})
        navigate('/')
        window.localStorage.setItem('UsuarioLogeado', JSON.stringify(data))
        
      } catch (error) {
        toast.error("credenciales incorrectas", {duration: 10000})
      } 
      
    }
    
    const enviarSolicitudDeCambiodePWD = async (correo) =>{
      try {
        const {data} = await axios.post('https://mern-backend-0gvx.onrender.com/api/forgotPassword', correo)
        setTokenCode(data.token)
        console.log("ENVIAOOOOO")
        console.log(data)
        if (data.messageError) return toast.error("direccion de servicio de correo electronico invalido (SOLO GMAIL)")
        toast.success(data.message)
      } catch (error) {
        console.log(error)
        
      }
    }

    const enviarCodigo = async (codigo) =>{
      try {
        const {data} = await axios.post('https://mern-backend-0gvx.onrender.com/api/codigo-contrasena', codigo, {headers: {"token-pwd": tokenCode}})
        setTokenResetPwd(data.token)
        
        if (data.errorMessage) return toast.error("el codigo no coincide")
        else if (data.token) return toast.success("el codigo es correcto")
      } catch (error) {
        toast.error("el codigo es incorrecto")
      }
    }

    const cambiarContraseña = async (contraseña) =>{
        try {
          const {data} = await axios.post('https://mern-backend-0gvx.onrender.com/api/reset_password', contraseña, {headers: {'token-pwd': tokenResetPwd}})
          
          if(data.messageError) return toast.error("las contraseñas no coinciden")
          else if (data.message) {
            toast.success("contraseña cambiada correctamente", {duration: 10000})
            navigate('/logear')
          }
          
          
         
        } catch (error) {
          toast.error("las contraseñas deben ser iguales")
        }
    }

  


    useEffect(()=>{
      obtenerPosts()
    },[])

    useEffect(()=>{
      logearUsuario
      
    },[userid])

    useEffect(()=>{
      const usuarioLogeadoJson = window.localStorage.getItem('UsuarioLogeado')
      if (usuarioLogeadoJson) {
        const usuario = JSON.parse(usuarioLogeadoJson)
        setUserid(usuario.id)
        setToken(usuario.token)
        
      }
    }, [])
    
    

    

    return <postContext.Provider value={{
      posts, obtenerPosts, createPost, obtenerPost, postInfo, eliminarPost, registrarUsuario, logearUsuario, userid, obtenerUsuario, enviarSolicitudDeCambiodePWD, enviarCodigo, cambiarContraseña
      }}>
      {children}
    </postContext.Provider>
      
    
}