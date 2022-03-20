import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import { Link } from 'react-router-dom'
import Bienvenida from '../Assets/LOGOTIPO.png';
import axios from '../api/Axios';
const LOGIN_URL = '/login';

const Login = () => {

    // const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        emailRef.current.focus();
    }, [])

    useEffect(()=>{
        setErrMsg("");
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ email, pwd }),
            {
                headers: { "Content-Type" : "application/json" },
                withCredentials: false
            }
            );
            console.log(JSON.stringify(response?.data));
            // const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            // setAuth({ email, pwd, roles, accessToken });
            setEmail('');
            setPwd('');
            setSuccess(true);    
        } catch (err) {
            if (!err?.response) {
                setErrMsg('El servidor no responde');
            } else if (err.response?.status === 418) {
                setErrMsg("Entrada fallida")
            } else {
                setErrMsg('¡Ha ocurrido un error con el servidor!');
            }
            errRef.current.focus();
        }
    }


    return (
        <>
            {success ? (
                <section>
                    <h1>Estamos adentro jej</h1>
                </section>
            ) : (
            <section className='bg-segundo p-8'>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <div className='bg-segundo p-10 flex flex-col rounded-md bg-segundo p-10 flex flex-col md:shadow-lg rounded-md'>
                    <div className='md:bg-segundo md:justify-around md:items-center md:rounded-md md:flex md:flex-row'>
                        <h1 className='px-3 md:px-0 text-quinto text-6xl m-10 font-bold m-0'>¡Hola <br/> de <br/> nuevo!</h1>
                        <img alt='Bienvenida' src={Bienvenida} className='hidden md:block md:w-80'/>
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                    <input type="text" className='mb-3 mt-12 text-quinto p-2 rounded-md' placeholder='Ingresa tu Email'
                    id="username"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    />
                    <input type="password" className='mb-3 text-quinto p-2 rounded-md' placeholder='Ingresa tu contraseña'
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    />
                    <button className='p-2 bg-quinto text-segundo rounded-md'>Entrar</button>
                    <Link to="/register" className='p-2 bg-green text-segundo rounded-md font-semibold mt-6 text-center'>Crea una cuenta</Link>
                    </form>
                </div>
            </section>
            )}
        </>
    )
}

export default Login