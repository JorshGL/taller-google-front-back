import React from 'react'
import { Link } from 'react-router-dom'
import TopBytes from "../Assets/HomeTopBytes.png"

const Home = () => {
  return (
    <div className="overflow-hidden">
      <section className='flex flex-col overflow-x-hidden items-center'>
        <div className='bg-sky-500 w-96 px-96 h-80 absolute rounded-t rounded-full -z-10'></div>
        <p className='text-6xl text-white font-bold text-center mt-8 -mb-20'>TopBytes App</p>
        <img src={TopBytes} alt="TopBytes" className='mt-14'/>
        <Link to={"/register"} className='p-3 bg-sky-500 text-white rounded-xl font-semibold px-14 my-5 text-center'>¡Registrate!</Link>
        <p className='text-center'>¿Ya tienes una cuenta? <Link to={"/login"} className="text-sky-500 font-semibold">Inicia sesión</Link></p>
      </section>
    </div>
  )
}

export default Home