import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Bienvenida from '../Assets/LOGOTIPO.png';
import axios from '../api/Axios';
const LOGIN_URL = '/login';

const Login = () => {

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
                    <h1>the pythonist are gay</h1>
                </section>
            ) : (
            <section className='bg-segundo p-8'>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <div className='bg-segundo p-10 flex flex-col rounded-xl bg-segundo p-10 flex flex-col md:shadow-lg rounded-xl'>
                    <div className='md:bg-segundo md:justify-around md:items-center md:rounded-xl md:flex md:flex-row'>
                        <h1 className='px-3 md:px-0 text-sky-500 text-6xl m-10 font-bold m-0'>¡Hola <br/> de <br/> nuevo!</h1>
                        <img alt='Bienvenida' src={Bienvenida} className='hidden md:block md:w-80'/>
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                    <input type="text" className='mb-3 mt-12 text-sky-500 p-3 rounded-xl border border-sky-500' placeholder='Ingresa tu Email'
                    id="username"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    />
                    <input type="password" className='text-sky-500 p-3 rounded-xl border border-sky-500' placeholder='Ingresa tu contraseña'
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    />
                    <button className='p-3 bg-sky-500 text-white rounded-xl mt-8'>Entrar</button>
                    <Link to="/register" className='p-3 bg-green-500 text-white rounded-xl mt-2 text-center'>Crea una cuenta</Link>
                    <Link to="/" className='p-3 bg-green text-sky-500 font-semibold mt-4 text-center'>Volver</Link>
                    </form>
                </div>
            </section>
            )}
        </>
    )
}

export default Login