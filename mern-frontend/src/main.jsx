import React from 'react'
import  ReactDOM  from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Info from './categorias/Info'
import Cabecera from './components/Cabecera'
import Inicio from './categorias/Inicio'
import Ventas from './categorias/Ventas'
import Category from './components/Category'
import Category_responsive from './components/Categories_responsive'
import {PostProvider} from './context/Postcontext'
import {Newpost} from './categorias/Publicar'
import { Toaster } from 'react-hot-toast'
import Register from './user/Register'
import Login from './user/Login'
import Lugares from './categorias/Lugares'
import Empresas from './categorias/Empresas'
import Paginas_web from './categorias/Paginas_web'
import ReqResetPwd from './user/ReqResetPwd'
import Reset_pwd from './user/Reset_pwd'
import SendCode from './user/SendCode'


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    
        <Router>
            <PostProvider>
                <Routes>
                    <Route path='/' exact element={<>
                            <Category_responsive/> 
                            <Cabecera/>
                            <Inicio/>
                            <Category/>    
                            
                        </>
                    }/>
                    <Route path='/:items/:id' element={<>   
                            <Info/>
                            
                        </>
                    }/>  
                    <Route path='/categoria-ventas' element={<>          
                            <Category_responsive/> 
                            <Cabecera/>
                            <Ventas/>
                            <Category/>            
                        </>
                    }/>
                    <Route path='/categoria-lugares' element={<>
                            <Category_responsive/>           
                            <Cabecera/>
                            <Lugares/>
                            <Category/>            
                        </>
                    }/>
                    <Route path='/categoria-empresas' element={<>  
                            <Category_responsive/>         
                            <Cabecera/>
                            <Empresas/>
                            <Category/>            
                        </>
                    }/>
                    <Route path='/categoria-paginasweb' element={<>
                            <Category_responsive/>           
                            <Cabecera/>
                            <Paginas_web/>
                            <Category/>            
                        </>
                    }/>
                    
                    <Route path='/new' element={<>             
                        <Newpost/>
                    </>}/>
                    <Route path='/registrar' element={<>             
                        <Register/>
                    </>}/>
                    <Route path='/logear' element={<>             
                        <Login/>
                    </>}/>
                    <Route path='/forgot-password' element={
                    <>
                        <ReqResetPwd/>
                        <SendCode/>
                        <Reset_pwd/>
                        </>
                    }/>
                    
                </Routes>
                <Toaster/>
            </PostProvider>
        </Router>
      
  
)
