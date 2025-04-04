import React, { useEffect, useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Menu from '../Components/Menu'
import { lsService } from '../services/ls.service'
import { getUser } from '../Components/helper/apiCalls'

const ViewUser = () => {
    const navigate = useNavigate()
    const {userId} = useParams()
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
        const getUserInfo = async () => {
            const res = await getUser(userId)
            console.log(res);
            
            setUserData(res.data)
        }

        getUserInfo()
    },[userId])
  return (
    <div>
        <div className='flex items-center justify-between w-screen h-[60px] fixed top-0 left-0 bg-white shadow-md px-6'>
            <Link to='/home' ><h1 className="font-bold text-center text-gray-600">Dashboard</h1></Link>
            <BiMenu className='text-gray-600 text-[18px]' onClick={e => setIsMenuOpen(!isMenuOpen)} />
        </div>

        {/* User Info Section */}
        <div className="bg-white p-6 rounded-lg">

        {
            userData && (
                <div className="bg-white p-6 mt-[100px] rounded-lg shadow-md mb-6 flex flex-col items-center border-dotted border-gray-600 border-2">
                    <img src="https://api.dicebear.com/9.x/glass/svg" alt="avatar" className='w-[80px] h-[80px] rounded-full' />
                    <p className="text-[18px] font-bold text-gray-700 mt-4">{userData.name}</p>
                    <p className="text-[14px] font-bold text-gray-700">( {userData.referralCode} )</p>
                    <p className="text-[14px] text-red-500">{userData.email}</p>
                    <p className="text-[16px] font-bold text-emerald-500">₹ {userData.walletBalance.toFixed(2)}</p>
                </div>                
            )
        }

        </div>

        {/* Earnings Section */}
        <div className='bg-white p-6 rounded-lg shadow-md mb-6 mt-[60px] flex flex-wrap items-center border-dotted border-gray-600 border-2'>
            <div className='w-[200px] h-[100px] rounded bg-gradient-to-r from-purple-700 to-sky-700 flex flex-col p-6 text-white font-bold items-center gap-2'>
            <h1 className='text-[18px]'>Self Earning</h1>
            <h1 className='text-[18px]'>Rs. {userData.selfEarnings || 0}</h1>
            </div>

            <div className='w-[20px] h-[100px] flex flex-col p-6 text-black font-bold items-center justify-center'>
            <h1 className='text-[28px]'>+</h1>
            </div>

            <div className='w-[200px] h-[100px] rounded bg-gradient-to-r from-purple-700 to-sky-700 flex flex-col p-6 text-white font-bold items-center gap-2'>
            <h1 className='text-[18px]'>Level Earning</h1>
            <h1 className='text-[18px]'>Rs. {userData.earnings || 0}</h1>
            </div>

            <div className='w-[20px] h-[100px] flex flex-col p-6 text-black font-bold items-center justify-center'>
            <h1 className='text-[28px]'>=</h1>
            </div>

            <div className='w-[200px] h-[100px] rounded bg-gradient-to-r from-emerald-600 to-amber-500 flex flex-col p-6 text-white font-bold items-center gap-2'>
            <h1 className='text-[18px]'>Total Earning</h1>
            <h1 className='text-[18px]'>Rs. {(userData.selfEarnings || 0) + (userData.earnings || 0)}</h1>
            </div>        
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 mt-[0px]">
            <h2 className="text-3xl font-semibold mb-4">User Downlines</h2>
            {userData && userData.downlines.length > 0 ? (
                <div className='mt-10 w-full h-max'>
                <table className="min-w-full table-auto text-black border-collapse mb-6">
                <thead>
                    <tr className="bg-gray-200">
                    <th className="border p-2">Sponsor</th>
                    <th className="border p-2">Referral Code</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Username</th>
                    <th className="border p-2">Mobile</th>
                    <th className="border p-2">Total Earnings</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.downlines.length > 0 && userData.downlines.map((user) => (
                        <tr key={user._id} className="bg-white text-center">
                            <td className="border p-2">
                                {user?.referralCode || 'N/A'}
                            </td>
                            <td className="border p-2">
                            <   Link className="text-sky-700 hover:text-sky-500 underline" to={`/view-user/${user._id}`}>{user.referralCode}</Link>
                            </td>
                            <td className="border p-2">{user.name || '-'}</td>
                            <td className="border p-2">{user.username}</td>
                            <td className="border p-2">{user.mobile || '-'}</td>
                            <td className="border p-2">Rs. {(user.earnings || 0) + (user.selfEarnings || 0)}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
                </div>
            ) : (<h2 className='mt-10'> No downlines found... </h2>)}
        </div>

        {
            isMenuOpen && (
            <>
                <div onClick={e => setIsMenuOpen(false)} className='w-screen h-screen bg-[#00000010] fixed top-0 left-0'></div>
                <Menu setIsOpen={setIsMenuOpen} user={user} setUser={setUser} from = 'vu' />
            </>
            )
        }
    </div>
  )
}

export default ViewUser