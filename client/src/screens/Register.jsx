//! ******************** IMPORTACIONES ********************//

// IMPORTACIONES PARA DESARROLLAR LA PARTE FUNCIONAL DEL REGISTER

import {useRef, useState, useEffect, React} from 'react'
import axios from "../api/Axios"
import { Link } from 'react-router-dom'

// IMPORTACIONES PARA LA ESTÉTICA

import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./register.css"
import TopBytes from '../Assets/LOGOTIPO.png'


//! ******************** DESARROLLO DEL REGISTER ********************//

//EXPRESIONES REGULARES: Nos permitirán agregar restricciones a los input.

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,30}[.][a-zA-Z]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

//URL DESDE EL CUAL SE ENVIARÁ LA PETICIÓN.

const REGISTER_URL = "http://localhost:5000/auth/register";

//! COMPONENTE FUNCIONAL

const Register = () => {

  //* HOOKS

  // HOOKS USEREF():

  const userRef = useRef();
  const errorRef = useRef();

  // HOOKS USESTATE():

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // HOOKS USEEFFECT():

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrorMsg('');
  }, [user, email, pwd, matchPwd])


  //! CONEXIÓN AL BACKEND

  //FUNCIÓN FLECHA ASYNC

  const enviarRegister = async (e) => {

    e.preventDefault();

    //TESTEAMOS LAS EXPRESIONES REGULARES RECOLECTANDO LOS DATOS QUE SE ESTÁN ESCRIBIENDO

    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);

    //EN BASE AL TEST ANTERIOR, RETORNAMOS ALGÚN MENSAJE O NO
    
    if ( !v1 || !v2 || !v3 ) {
      setErrorMsg("Entrada invalida");
      return;
    }

    //* TRY CATCH PARA ENVIAR LA INFORMACIÓN AL BACKEND

    try {

      // CREAMOS LA PETICION

      const peticion = await axios.post(REGISTER_URL, 
        JSON.stringify({ user, email, pwd, matchPwd }),
        {
          headers: { authorization : '*', 
          'Content-Type': 'application/json' },
          withCredentials: false
        }
      );
      console.log(JSON.stringify(peticion?.data));

      // ACTUALIZAMOS LOS HOOKS

      setSuccess(true);
      setUser('');
      setEmail('');
      setPwd('');
      setMatchPwd('');

    } catch (err) {

      // ASIGNAMOS LOS MENSAJES EN LOS HOOKS DE ACUERDO A LOS CÓDIGOS QUE NOS DEVUELVA LA API

      if (!err?.peticion) {
        setErrorMsg('El servidor no responde');
      } else if (err.peticion?.status === 418){
        setErrorMsg('El usuario ya existe');
      } else {
        setErrorMsg('Falló el registro')
      }

      // ACTUALIZAMOS EL HOOK

      errorRef.current.focus();

    }
  }

  //! LO QUE SE MOTRARÁ EN PANTALLA

  return (
    <>

      {/* CREAMOS UNA CONDICION DE ACUERDO A LOS HOOKS DEFINIDOS ANTERIORMENTE */}

      {success ? (

        <section className='p-8'>
          <div className='bg-segundo flex flex-col rounded-xl bg-segundo flex flex-col md:shadow-lg rounded-xl'>
            <img alt='Bienvenida' src={TopBytes} className='my-32'/>
            <h1 className='md:px-0 text-sky-500 text-3xl m-10 font-bold m-0 text-center'>¡Gracias por asistir a este taller!</h1>
          </div>
        </section>

        ) : (

          <section className='px-6'>
            <div className='p-7 flex flex-col rounded-xl flex flex-col md:shadow-lg rounded-xl'>

              {/* CREAMOS UN TEXTO QUE ME MUESTRE EL MENSAJE DE ERROR */}
              
              <p ref={errorRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
              
              <h1 className='text-sky-500 text-4xl text-center m-10 font-bold m-0'>¡Registrate!</h1>
              <p className='text-center text-sky-500 py-2 border-b border-sky-500'>¡Es fácil y sencillo!</p>

              {/* CREAMOS EL FORMULARIO ASIGNANDOLE LA FUNCIÓN DE CONEXIÓN CUANDO SE ENVÍE */}
              
              <form onSubmit={enviarRegister} className='flex flex-col'>

                {/* CREAMOS LA LÓGICA PARA DECIRLE AL USUARIO SI ESTÁ BIEN O MAL */}
                
                <label htmlFor="username" className='mt-8 mb-2 text-sky-500 rounded-xl'>

                  Usuario:
                  <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />

                </label>

                <input 
                  
                  className='mb-2 text-sky-500 p-3 rounded-xl border border-sky-500' type="text" id="username" required autoComplete="off" aria-describedby="uidnote" value={user} 
                  
                  // ASIGNAMOS LA LÓGICA AL CAMPO DE TEXTO

                  ref={userRef} 
                  onChange={(e) => setUser(e.target.value)} 
                  aria-invalid={validName ? "false" : "true"} 
                  onFocus={() => setUserFocus(true)} 
                  onBlur={() => setUserFocus(false)}
                
                />

                {/* CREAMOS LA NOTA DE INSTRUCCIONES */}

                <p id="uidnote" 
                  
                  className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  De 4 a 24 caracteres.<br />
                  Debe comenzar con una letra.<br />
                  Se permiten letras, números y guiones.

                </p>

                {/* CREAMOS LA LÓGICA PARA DECIRLE AL USUARIO SI ESTÁ BIEN O MAL */}

                <label htmlFor="email" className='mb-2 text-sky-500 rounded-xl'>

                  Email:
                  <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />

                </label>

                <input

                  type="email" id="email" required autoComplete="off" aria-describedby="emailnote" className='mb-2 text-sky-500 p-3 rounded-xl border border-sky-500' value={email}
                  
                  // ASIGNAMOS LA LÓGICA AL CAMPO DE TEXTO

                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={validEmail ? "false" : "true"}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  
                />

                {/* CREAMOS LA NOTA DE INSTRUCCIONES */}

                <p id="uidnote" 
                
                  className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle}/>
                  Prueba con un email real.

                </p>

                {/* CREAMOS LA LÓGICA PARA DECIRLE AL USUARIO SI ESTÁ BIEN O MAL */}

                <label htmlFor="password" className='mb-2 text-sky-500 rounded-xl'>

                  Contraseña:
                  <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />

                </label>

                <input

                  type="password" id="password" required aria-describedby="pwdnote" className='mb-2 text-sky-500 p-3 rounded-xl border border-sky-500' value={pwd}
                  
                  // ASIGNAMOS LA LÓGICA AL CAMPO DE TEXTO

                  onChange={(e) => setPwd(e.target.value)}
                  aria-invalid={validPwd ? "false" : "true"}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  
                />

                {/* CREAMOS LA NOTA DE INSTRUCCIONES */}

                <p id="pwdnote" 
                
                  className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  De 8 a 24 caracteres.<br/>
                  Debes incluir letras mayúsculas, minúsculas y un número.

                </p>

                {/* CREAMOS LA LÓGICA PARA DECIRLE AL USUARIO SI ESTÁ BIEN O MAL */}

                <label htmlFor="confirm_pwd" className='mb-2 text-sky-500 rounded-xl'>

                  Confirmar contraseña:
                  <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />

                </label>

                <input

                  type="password" id="confirm_pwd" required aria-describedby="confirmnote" className='mb-4 text-sky-500 p-3 rounded-xl border border-sky-500' value={matchPwd}
                  
                  // ASIGNAMOS LA LÓGICA AL CAMPO DE TEXTO

                  onChange={(e) => setMatchPwd(e.target.value)}
                  aria-invalid={validMatch ? "false" : "true"}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}

                />

                {/* CREAMOS LA NOTA DE INSTRUCCIONES */}

                <p id="confirmnote" 
                
                  className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Debe coincidir con la primera contraseña.

                </p>

                {/* CREAMOS LA LÓGICA PARA EL BOTÓN DE ENVÍO */}

                <button disabled={!validName || !validPwd || !validMatch ? true : false} className='p-3 bg-green-500 text-white rounded-xl font-semibold'>Registrarse</button>
              
              </form>

              <div className='flex flex-col mt-5 pt-3 border-t border-sky-500'>
                  <Link to={"/"} className='p-3 bg-transparent border border-sky-500 text-sky-500 rounded-xl font-semibold mx-7 mt-2 text-center'>Volver</Link>
              </div>
            </div>
          </section>

        )}
    </>
  )
}

export default Register;