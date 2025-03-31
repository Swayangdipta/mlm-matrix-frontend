import React from 'react'
import logo from '../assets/images/logo.jpeg'
import { CgProfile } from 'react-icons/cg'
import { BiUser } from 'react-icons/bi'
import { lsService } from '../services/ls.service'
import { useNavigate } from 'react-router-dom'
const Menu = ({setIsOpen = f => f, user, setUser = f => f}) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        lsService.remove('token')
        lsService.remove('user')
        setUser(null)

        navigate('/sign-in')
    }
  return (
    <div className='fixed top-[0px] right-[0px] w-1/2 sm:w-[200px] min-h-1/2 h-screen bg-gradient-to-br from-sky-500 to-emerald-500 shadow-lg p-4 border-dotted border-gray-600 border-l-2'>
        <img src={logo} alt="company" className=' mx-auto' />

        <div className='flex items-center gap-2 h-max mt-6' >
            <img src="https://api.dicebear.com/9.x/glass/svg" alt="avatar" className='w-[40px] h-[40px] rounded-full' />
            <div className='flex flex-col justify-center'>
                <p className="text-[14px] font-bold text-gray-700">{user?.name}</p>
                <p className="text-[14px] font-bold text-gray-700">( {user?.referralCode} )</p>
            </div>
        </div>

        <div className='mt-4'>
            <div className='flex gap-2 items-center text-18px p-2 border-2 rounded border-dashed border-white'>
                <BiUser className='text-[20px]' />
                My Profile
            </div>
            <button className='w-full p-2 bg-rose-500 text-white rounded mt-2' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Menu