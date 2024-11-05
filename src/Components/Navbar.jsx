import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
    return (
        <div>
            <div className="nav fixed w-full bg-black p-5">
                <img src={logo} alt="" height={'50px'} width={'50px'} />
                <h1 className='text-white font-bold text-3xl'> Notehere</h1>
            </div>
        </div>
    )
}

export default Navbar