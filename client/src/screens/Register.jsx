import {useRef, useState, useEffect, React} from 'react'
import axios from "../api/Axios"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,30}[.][a-zA-Z]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'http://127.0.0.1:5000/auth/register';

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

  const [errMsg, setErrMsg] = useState('');
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
    setErrMsg('');
  }, [user, email, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(email);
    
    if ( !v1 || !v2 || !v3 ) {
      setErrMsg("Entrada invalida");
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
        setErrMsg('El servidor no responde');
      } else if (err.response?.status === 409){
        setErrMsg('El usuario ya existe');
      } else {
        setErrMsg('Falló el registro')
      }

      errorRef.current.focus();

    }

  }

  return (
    <>

    </>
  )
}

export default Register;