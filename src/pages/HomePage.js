import React from 'react';
import '../img/App.css';
import '../img/Inicio.css';
import ComponentsDataHours from '../ComponentsDataHours';
import {Link} from 'react-router-dom';


export const HomePage = () => {

  return (
    <div className="App">

      <div className='fondo'>
        <div id='contenedorLogin'>
          <div className='dia'>

            <ComponentsDataHours />

          </div>
          
          <Link to='/register'><button className='btnEntrada' >Administrador</button></Link>

          <Link to='/register'><button className='btnEntrada' >Cocina</button></Link>

          <Link to='/register'><button className='btnEntrada'>Mesonero</button></Link>

        </div>
      </div>

    </div>
  );
}

