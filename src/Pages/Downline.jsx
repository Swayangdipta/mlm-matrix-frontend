import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { BiMenu } from 'react-icons/bi';
import Menu from '../Components/Menu';
import { useNavigate } from 'react-router-dom';
import { lsService } from '../services/ls.service';
import { getDirectDownline, getWholeDownlines } from '../Components/helper/apiCalls';
import toast from 'react-hot-toast';

// Dummy data for now
const userData = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    walletBalance: 1000,
    downlines: [
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Sam Johnson', email: 'sam@example.com' },
    ],
    upline: [
      { id: 4, name: 'Admin User', email: 'admin@example.com' },
    ],
  };

const Downline = ({type = 'all'}) => {
    const [downlineData, setDownlineData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(userData);
    const navigate = useNavigate()


    useEffect(() => {
        // Fetch user data from API
        // setUser(response.data);
        const token = lsService.get('token')
        if (!token) {
            navigate('/signin')
        }

        setUser(lsService.get('user'))
    }, []);

    useEffect(() => {
        const fetchDownlineData = async () => {
            try {
                const downlines = type !== 'all' ? await getDirectDownline(user._id) : await getWholeDownlines(user._id);
                console.log(downlines);
                
                if (downlines.status === 200) {
                    setDownlineData(downlines.data);
                } else {
                    toast.error('Failed to fetch downline data');
                }
            } catch (error) {
                toast.error('Failed to fetch downline data');
                console.error('Error fetching downline data:', error);
            }finally{
                setLoading(false);
            }
        }

        if(user._id){
            console.log(user);
            
            fetchDownlineData();
        }
    },[user,type])
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className='flex items-center justify-between w-screen h-[60px] fixed top-0 left-0 bg-white shadow-md px-6'>
        <h1 className="font-bold text-center text-gray-600">Dashboard</h1>
        <BiMenu className='text-gray-600 text-[18px]' onClick={e => setIsMenuOpen(!isMenuOpen)} />
      </div>

      <div className='w-full min-h-screen h-max p-4'>
        {
            loading ? (
                <div className='w-full h-full flex items-center justify-center'>
                <img src="/assets/loading.gif" alt="Loading..." className='w-[50px] h-[50px]' />
                </div>
            ) : (
            <div className="overflow-x-auto shadow-lg rounded-lg mt-10">
                <h1 className='p-2 text-[18px] font-semibold'>My {type.toUpperCase()} Downline Data</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                    <th className="px-6 py-3 border-b">SL No</th>
                    <th className="px-6 py-3 border-b">Sponsor ID</th>
                    <th className="px-6 py-3 border-b">Self ID</th>
                    <th className="px-6 py-3 border-b">Name</th>
                    <th className="px-6 py-3 border-b">Status</th>
                </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                {downlineData && downlineData.length > 0 ? (
                    downlineData.map((user, index) => (
                    <tr key={user._id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-3 border-b text-center">{index + 1}</td>
                        <td className="px-6 py-3 border-b text-center">{user.sponsor.referralCode}</td>
                        <td className="px-6 py-3 border-b text-center">{user.referralCode}</td>
                        <td className="px-6 py-3 border-b text-center">{user.name}</td>
                        <td className="px-6 py-3 border-b text-center">
                        <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                            user.status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                        >
                            {user.status}
                        </span>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No data found.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
            )
        }

      </div>

      {
        isMenuOpen && (
          <>
            <div onClick={e => setIsMenuOpen(false)} className='w-screen h-screen bg-[#00000010] fixed top-0 left-0'></div>
            <Menu setIsOpen={setIsMenuOpen} user={user} setUser={setUser} />
          </>
        )
      }

    </div>
  )
}

export default Downline