import {useRef, useState, useEffect, React} from 'react'
import axios from "../api/Axios"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./register.css";
import TopBytes from '../Assets/LOGOTIPO.png';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,30}[.][a-zA-Z]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const REGISTER_URL = "http://localhost:5000/auth/register";

const Register = () => {

  const userRef = useRef();
  const errorRef = useRef();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);
    
    if ( !v1 || !v2 || !v3 ) {
      setErrorMsg("Entrada invalida");
      return;
    }

    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({ user, email, pwd, matchPwd}),
      {
        headers: { authorization : '*', 'Content-Type': 'register/json'},
        withCredentials: false
      });
      console.log(JSON.stringify(response?.data));
      setSuccess(true);
      setUser('');
      setEmail('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrorMsg('El servidor no responde');
      } else if (err.response?.status === 409){
        setErrorMsg('El usuario ya existe');
      } else {
        setErrorMsg('Falló el registro')
      }

      errorRef.current.focus();

    }

  }

  return (
    <>
      {success ? (
        <section className='bg-segundo p-8'>
          <div className='bg-segundo flex flex-col rounded-md bg-segundo flex flex-col md:shadow-lg rounded-md'>
            <img alt='Bienvenida' src={TopBytes} className='my-32'/>
            <h1 className='md:px-0 text-quinto text-3xl m-10 font-bold m-0 text-center'>¡Gracias por asistir a este taller!</h1>
          </div>
        </section>
      ) : (
        <section className='bg-segundo p-8'>
          <div className='bg-segundo p-10 flex flex-col rounded-md bg-segundo p-10 flex flex-col md:shadow-lg rounded-md'>
            <p ref={errorRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
            <h1 className='text-quinto text-4xl text-center m-10 font-bold m-0'>¡Registrate!</h1>
            <p className='text-center text-quinto py-3 border-b border-quinto'>¡Es fácil y sencillo!</p>
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <label htmlFor="username" className='mt-8 mb-2 text-quinto rounded-md'>
                Usuario:
                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className='mb-3 text-quinto p-2 rounded-md'
              />
              <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                De 4 a 24 caracteres.<br />
                Debe comenzar con una letra.<br />
                Se permiten letras, números y guiones.
              </p>
              <label htmlFor="email" className='mb-2 text-quinto rounded-md'>
                Email:
                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                className='mb-3 text-quinto p-2 rounded-md'
              />
              <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Prueba con un email real.
              </p>
              <label htmlFor="password" className='mb-2 text-quinto rounded-md'>
                Contraseña:
                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className='mb-3 text-quinto p-2 rounded-md'
              />
              <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                De 8 a 24 caracteres.<br/>
                Debes incluir letras mayúsculas y minúsculas, un número y un carácter especial.<br />
                Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>
              <label htmlFor="confirm_pwd" className='mb-2 text-quinto rounded-md'>
                Confirmar contraseña:
                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className='mb-3 text-quinto p-2 rounded-md'
              />
              <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Debe coincidir con la primera contraseña.
              </p>
              <button disabled={!validName || !validPwd || !validMatch ? true : false} className='p-2 bg-green text-segundo rounded-md font-semibold'>Registrarse</button>
            </form>
            <div className='flex flex-col mt-5 pt-3 border-t border-quinto'>
                <p className='mb-3 text-quinto text-center'>¿Ya te encuentras registrado?</p>
                <a href="/http://localhost:3000/" className='p-2 bg-transparent border border-quinto text-quinto rounded-md font-semibold mx-7 text-center'>Volver</a>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Register;