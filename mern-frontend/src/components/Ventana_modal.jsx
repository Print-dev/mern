import React , {useState, useEffect}from 'react'
import { usePost } from '../context/Postcontext'
import { useParams ,useNavigate, Link} from 'react-router-dom'
import { VscAccount , VscChromeClose } from "react-icons/vsc";


function Ventana_modal() {
    const {id} = useParams()
    const {obtenerPost, posts, postInfo} = usePost()
    const [post, setPost] = useState([])
    const [userinfo, setUserinfo] = useState("")
    const navigate = useNavigate()
    
    useEffect(() => {
        (
            async () => {
                
                setPost(await obtenerPost(id))
                
                setUserinfo(await postInfo(id))
                
                
                        
            }
        )()
    }, [])

    const cerrar_info = () =>{
        modal.style.display = "none"
    }
    

  return (
    <div className='contenedor-ventanaEmergente' id='modal'>
            <div className='ventanaEmergente'>
                
                <div>
                    <b><h1>PUBLICACIONES</h1></b>
                    
                </div>
                <hr /> 
                <div className="cerrar-modal">
                    <button onClick={cerrar_info}><VscChromeClose className="icono-cerrar-info"/></button>
                </div>
                <div className='icono-usuario-contenedor'>
                    <VscAccount className='icono-usuario-perfil'/>
                </div>
                <br />
                {post.creadoPor ? 
                <b><h1>{post.creadoPor.nombre}</h1></b>
                : <h1>does not exist</h1>}
                

                <br />
                <hr />
                <br />
                <div className='contenedor-publicaciones-user'>
                    {post ? <>{posts.map(publicacion => {
                    return <div key={publicacion._id}>
                                
                                {publicacion.creadoPor._id == userinfo._id ? <div className='contenedor-carta'>
                                    <figure>
                                        {publicacion.imagen ? <img className='pub-imagen-perfil' src={publicacion.imagen.url}></img> : null}
                                    </figure>
                                    <div className='info-post'>
                                        <h1><b>{publicacion.nombre}</b></h1>                                    
                                        <br />
                                        
                                            <a className='boton-imagen' href={`/items/${publicacion._id}`}>
                                                Visitar
                                            </a>
                                            
                                        
                                    </div>
                                </div> : null} 
                                    
                                    
                                </div>
                            
                    })}</>: null}
                
                </div>
            </div>
        </div>
  )
}

export default Ventana_modal