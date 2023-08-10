import '../style/inicio.css'
import {Link} from 'react-router-dom'
import { TbTruckLoading } from "react-icons/tb";
import { usePost } from '../context/Postcontext'

function Inicio() {
  

    const { posts } =  usePost()


    

    return (
        
        <section>
            <div className='contenedor-general-cartas'>
                <div className='titulo-tema'>
                    <b><h1>ESQUEMAS DE BASE DE DATOS</h1></b>
                </div>
                    <div className='contenido'>
                        {posts != 0 ? posts.map((publicacion)=>{
                            return <div className='carta' key={publicacion._id}>
                                        <figure>
                                            {publicacion.imagen && <img src={publicacion.imagen.url} className="imagen" alt="imagenes referenciales*" />}
                                        </figure>
                                        <div>    
                                            <div>
                                                <h1><b>{(publicacion.nombre).toUpperCase()}</b></h1>
                                            </div>
                                            <Link to={`/items/${publicacion._id}`}>
                                                <button className='boton-imagen'>Vista Previa</button>
                                            </Link>
                                        </div>
                                    </div>     
                        }) : <h1>Se esta cargando el contenido 🧐</h1>}
                
                    </div>
            </div>
        </section>
    )
}

export default Inicio
