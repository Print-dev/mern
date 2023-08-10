import React from 'react'
import { VscMenu, VscAccount } from "react-icons/vsc";
import "../style/categories_responsive.css"
import { Link } from 'react-router-dom';

function Category_responsive() {
  const abrir_categoria = () =>{
    const abrir = document.querySelector('.listas')
    abrir.classList.toggle('abrir')
  }

  const abrir_opciones_usuario = () =>{
    const abrir = document.querySelector('.contenedor-usuario-opciones')
    abrir.classList.toggle('abrir')
  }

  const borrarRecargar = () => {
    window.localStorage.removeItem("UsuarioLogeado")
    location.reload() 
  }
  return (
    <div>        
        <div className='cabecera'>
          <div className='icono-usuario'>
            <VscAccount onClick={abrir_opciones_usuario}/>
            
          </div>
          <div className='icono-abrir-categoria'>
            <VscMenu onClick={abrir_categoria}/>  
          </div>
        </div>
        <div className='contenedor-general-usuario'>
              <div className='contenedor-usuario-opciones'>
                <ul>
                  {window.localStorage.getItem("UsuarioLogeado") ? <Link to={'/new'}>
                      <li className='subir'>
                          Subir
                      </li>
                  </Link> : null}  
                  
                  {window.localStorage.getItem("UsuarioLogeado") ? <button onClick={borrarRecargar}>
                      <li className='cerrar-sesion'>
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
        <div className='contenedor-lista'>                      
          <div className='listas'>
            <ul>
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
            </ul>
          </div>            
        </div>          
    </div>
  )
}

export default Category_responsive