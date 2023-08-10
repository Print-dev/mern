import React from 'react'
import '../style/categorias.css'
import { Link } from 'react-router-dom'

function Category() {

    function borrarRecargar() {
        window.localStorage.removeItem("UsuarioLogeado")
        location.reload() 
    }
  return (
    <div className='ventana-general-categoria'>
        
        <div className='ventana-categoria'>
            <b><h1>Categoria</h1></b>
            <ul className='lista-categorias'>
                <Link to={'/'}> 
                    <li className='lista'>
                        Inicio
                    </li>
                </Link>
                <Link to={'/categoria-ventas'}>
                    <li className='lista'>
                        Ventas
                    </li>
                </Link>
                <Link to={'/categoria-lugares'}>
                    <li className='lista'>
                        Lugares
                    </li>
                </Link>
                <Link to={'/categoria-empresas'}>
                    <li className='lista'>
                        Empresas
                    </li>
                </Link>
                <Link to={'/categoria-paginasweb'}>
                    <li className='lista'>
                        Paginas web
                    </li>
                </Link>
                
                <hr />
            </ul>
        </div>
        <div className='ventana-otro'>
            <ul className='lista-otro'>
                <hr />
                {window.localStorage.getItem("UsuarioLogeado") ? <Link to={'/new'}>
                    <li className='lista'>
                        Subir
                    </li>
                </Link> : null}  
                
                {window.localStorage.getItem("UsuarioLogeado") ? <button onClick={()=>{borrarRecargar()}}>
                    <li className='boton-cerrar-sesion'>
                        Cerrar Sesion
                    </li>
                </button> : <><Link to={'/registrar'}>
                    <li className='lista'>
                        Registrarse
                    </li>
                </Link>
                <Link to={'/logear'}>
                    <li className='lista'>
                        Iniciar Sesion
                    </li>
                </Link></>}                  
                
                
                

            </ul>
        </div>
                        
        
    </div>
    
  )
}

export default Category