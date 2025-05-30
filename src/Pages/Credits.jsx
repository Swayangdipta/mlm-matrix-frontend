import React, { use, useEffect, useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import Menu from '../Components/Menu';
import { lsService } from '../services/ls.service';
import { getUserCredits, getUserWithdrawals } from '../Components/helper/apiCalls';

const Credits = ({type = 'credits'}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [historyData, setHistoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = lsService.get('token');
        if (!token) navigate('/signin');

        const user = lsService.get('user');
        if (user) {
            setUserData(user);
        }
    }, []);

    useEffect(() => {
        if(userData){
            (
                async () => {
                    setIsLoading(true);
                    
                    try {
                        const res = type === 'credits' ? await getUserCredits(userData?._id) : await getUserWithdrawals(userData?._id);
                        
                        if (res.status === 200) {
                            setHistoryData(res.data);
                        } else {
                            console.error("Failed to fetch user data:", res.data);
                        }
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                    }finally{
                        setIsLoading(false);
                    }
                }
            )()            
        }

    }, [userData, type]);
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className='flex items-center justify-between w-screen h-[60px] fixed top-0 left-0 bg-white shadow-md px-6'>
        <h1 className="font-bold text-center text-gray-600">Dashboard</h1>
        <BiMenu className='text-gray-600 text-[18px]' onClick={e => setIsMenuOpen(!isMenuOpen)} />
      </div>

      <div className='mt-[60px] px-[30px] w-full min-h-[80vh] h-max' >
        {
            isLoading && (
                <div className='flex items-center justify-center h-full'>
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
                </div>
            )
        }

        <div className='flex flex-col items-center justify-center mt-6'>
        <h2 className='text-2xl font-bold text-gray-700 mb-4'>
            {type === 'credits' ? 'Your Credits' : 'Withdrawal History'}
        </h2>
        <div className='w-full max-w-4xl bg-white shadow-md rounded-lg p-6 overflow-x-auto'>
            {historyData.length > 0 ? (
            <table className='min-w-full table-auto border-collapse'>
                <thead>
                <tr className='bg-gray-100 text-gray-700'>
                    <th className='px-4 py-2 text-left'>SL NO</th>
                    <th className='px-4 py-2 text-left'>{type === 'credits' ? 'Paid From' : 'Paid To'}</th>
                    <th className='px-4 py-2 text-left'>Description</th>
                    <th className='px-4 py-2 text-left'>Amount</th>
                </tr>
                </thead>
                <tbody>
                {historyData.map((item, index) => (
                    <tr key={index} className='border-b'>
                    <td className='px-4 py-2 text-gray-600'>#{index + 1}</td>
                    <td className='px-4 py-2 text-gray-600'>
                        {type === 'credits' ? item.paidFrom : item.paidTo}
                    </td>
                    <td className='px-4 py-2 text-gray-600'>
                        {item.description || `Transaction ${index + 1}`}
                    </td>
                    <td className={`px-4 py-2 font-bold ${type === 'credits' ? 'text-emerald-700' : 'text-rose-700'} font-semibold`}>Rs. {item.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            ) : (
            <p className='text-gray-500'>No {type === 'credits' ? 'credits' : 'withdrawals'} found.</p>
            )}
        </div>
        </div>

      </div>

        {isMenuOpen && (
            <>
                <div onClick={() => setIsMenuOpen(false)} className='w-screen h-screen bg-[#00000050] fixed top-0 left-0'></div>
                <Menu setIsOpen={setIsMenuOpen} user={userData} setUser={setUserData} />
            </>
        )}
      </div>
  )
}

export default Credits