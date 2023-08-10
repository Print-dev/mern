import "../style/inicio.css";
import React from "react";
import { Link } from "react-router-dom";
import { usePost } from "../context/Postcontext";


const Divcategoria = ({categoria}) => {   
  const { posts } = usePost();

  return (
    <section>
      <div className='contenedor-general-cartas'>
        <div className="titulo-tema">
          <b>
            <h1>ESQUEMAS DE BASE DE DATOS</h1>
          </b>
        </div>
        <div className="contenido">
          {posts != 0 ? posts.map((esque) => {
            return (
              <div key={esque._id}  >
                {esque.categoria == categoria ? <div className='carta'>
                      <figure>
                        {esque.imagen && (
                          <img
                            src={esque.imagen.url}
                            className="imagen"
                            alt="imagenes referenciales*"
                          />
                        )}
                      </figure>
                      <div>
                        <h1>
                          <b>{esque.nombre.toUpperCase()}</b>
                        </h1>
                        <p>{esque.descripcion}</p>

                        <Link to={`/items/${esque._id}`}>
                          <button className="boton-imagen">Vista Previa</button>
                        </Link>
                      </div>
                    </div> : null }
              </div>
            );
          }) : <h1>No hay contenido 😪</h1>}
        </div>
      </div>
    </section>
  );

  
}
export default Divcategoria;
