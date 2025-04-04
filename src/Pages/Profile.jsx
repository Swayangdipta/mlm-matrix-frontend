import React, { useEffect, useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Menu from '../Components/Menu'
import { lsService } from '../services/ls.service'

const Profile = () => {
    const navigate = useNavigate()
    const [userData,setUserData] = useState(undefined)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(undefined);
    

    useEffect(() => {
    // Fetch user data from API
    // setUser(response.data);
    const token = lsService.get('token')
    if (!token) {
        navigate('/signin')
    }

    setUser(lsService.get('user'))
    }, []);

    useEffect(()=>{

    },[])
  return (
    <div>
        <div className='flex items-center justify-between w-screen h-[60px] fixed top-0 left-0 bg-white shadow-md px-6'>
            <Link to='/home' ><h1 className="font-bold text-center text-gray-600">Dashboard</h1></Link>
            <BiMenu className='text-gray-600 text-[18px]' onClick={e => setIsMenuOpen(!isMenuOpen)} />
        </div>

        {
            isMenuOpen && (
            <>
                <div onClick={e => setIsMenuOpen(false)} className='w-screen h-screen bg-[#00000010] fixed top-0 left-0'></div>
                <Menu setIsOpen={setIsMenuOpen} user={user} setUser={setUser} from="profile" />
            </>
            )
        }
    </div>
  )
}

export default Profile