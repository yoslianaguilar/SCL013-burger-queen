import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../img/App.css';
import 'firebase/auth';
import {Link} from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import ComponentsDataHours from '../ComponentsDataHours';
import { saveUserInLocalStorage } from "../helpers/session-service";
import '../img/Login.css';

export const LoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const [error, setError] = useState('');

  const resetState = () => {
    setEmail('');
    setPasword('');
    setError('');
  };

  const navigate = (job) => {
    const routesMap = { // this object is called map
      mesonero: "./portalmesero",
      cocinero: "./cocina"
    };
    // routesMap["mesero"] is the same as routesMap.mesero
    history.push(routesMap[job]);
  };


  const login = () => {
   auth.signInWithEmailAndPassword(email,password)
    .then(async res => {
      const userId = res.user.uid;
      const docRef = db.collection("usuario").doc(userId);
      docRef.get()
        .then((userDoc) => {
          if (userDoc.exists) {
            const userData = userDoc.data();
            // save the user data in userDoc.data() in the local storage
            saveUserInLocalStorage(userData);
            navigate(userData.job);
          } else {
            console.log("No such document");
            alert("No encontramos el usuario especificado");
          }
        })
        .catch(err => console.error(err));
        resetState();
    }) // end then
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        setError('⚠️ Email no registrado')
        return
      }
      if (error.code === 'auth/wrong-password') {
        setError('⚠️ Contraseña invalida')
        return
      }
   }); // end catch
 }

  return (
    <div className="App">
    <div className='fondo'>
      <div id='contenedorLogin'>
        <div className='dia'>
          <ComponentsDataHours />
          </div>
            <input
              className='inputRegistro'
              placeholder='Ingrese su email'
              type='email'
              id='email'
              value={email}
              onChange={(ev)=> setEmail(ev.target.value)} />
            <input
              className='inputRegistro'
              placeholder='Ingrese su contrtaseña'
              type='password'
              value={password}
              id='password'
              onChange={(ev)=> setPasword(ev.target.value)} />
            <button
              className='btnEntrada'
              onClick= {login}>
              Inicia Sesión
            </button>
            <p>¿No tienes cuenta?</p><Link to='/register'>Registrate</Link>
            {/*
            Don't use Link if you need to handle some validations
            If you use Link, you will be redirected
            <Link
              className='btnEntrada'
              onClick={login}
              type='button'
              to='/portalmesero'>
              Inciar
            </Link>
            */}
          <div className='error'>
            {error}
          </div>
        </div>
      </div>
    </div>
  );
}

