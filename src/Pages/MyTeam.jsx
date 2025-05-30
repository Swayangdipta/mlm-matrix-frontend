import React, { use, useEffect, useState } from 'react'
import { BiMenu } from 'react-icons/bi';
import Menu from '../Components/Menu';
import { useNavigate } from 'react-router-dom';
import { lsService } from '../services/ls.service';
import SearchArea from '../Components/SearchArea';
import TwoLevelTree from '../Components/TwoLevelTree';
import { getDownlineTree, getUplineTree, getWholeDownlines } from '../Components/helper/apiCalls';
import { MdAccountTree } from 'react-icons/md';
import { FaThList } from 'react-icons/fa';
import DownlineTable from '../Components/DownlineTable';

const MyTeam = ({type = 'downlines'}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = React.useState(undefined);
  const [upline, setUpline] = useState([]);
  const [downline, setDownline] = useState(undefined);
  const [downlineList, setDownlineList] = useState(undefined);
  const [selectedView, setSelectedView] = useState('tree'); // 'tree' or 'list'
  const [isLoading, setIsLoading] = useState(false); // 'tree' or 'list'
  const navigate = useNavigate()


  const getUplineData = async () => {    
    if(user.sponsor){
      const response = await getUplineTree(user.sponsor)
      
      if(response.status === 200) {
        setUpline(response.data)
        setIsLoading(false)
      }
    }
  }
  
  const getDownlineData = async () => {   
    if(user && user._id){
      const response = await getWholeDownlines(user._id)
      
      if(response.status === 200) {
        setDownline(response.data)
        setDownlineList(response.data)
        setIsLoading(false)
      }
    }
  }

    
  useEffect(() => {
      const token = lsService.get('token')
      if (!token) {
          navigate('/signin')
      }

      setUser(lsService.get('user'))
  }, [])

  useEffect(() => {
      setIsLoading(true)
      if(type === 'uplines') {
        getUplineData()
      } else {
        getDownlineData()
      }
  }
  , [user, type])

  return (
    <div className="bg-gray-100 min-h-screen p-6">
        <div className='flex items-center justify-between w-screen h-[60px] fixed top-0 left-0 bg-white shadow-md px-6'>
        <h1 className="font-bold text-center text-gray-600">Dashboard</h1>
            <BiMenu className='text-gray-600 text-[18px]' onClick={e => setIsMenuOpen(!isMenuOpen)} />
        </div>

        {
            isMenuOpen && (
                <>
                <div onClick={e => setIsMenuOpen(false)} className='w-screen h-screen bg-[#00000010] fixed top-0 left-0'></div>
                <Menu setIsOpen={setIsMenuOpen} user={user} setUser={setUser} />
                </>
            )
        }

        <div className='w-full h-max p-4'>
          {
            type === 'downlines' && user && user._id && (<SearchArea userId={user._id} />)
          }
        </div>

        {
          isLoading ? (
            <div className='w-full h-[200px] flex items-center justify-center'>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900"></div>
            </div>
          ) : (
            type === 'downlines' ? (
              user && user._id && (
              <div className='w-full h-max p-4'>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-dotted border-gray-600 border-2">
                  <h2 className="text-xl sm:text-3xl font-semibold mb-4">Downline Tree</h2>
                  <div className='w-full h-max flex items-center gap-8'>
                    <h1 onClick={e => setSelectedView('tree')} className={`cursor-pointer px-4 py-2 rounded border-2 border-dotted border-amber-400 ${selectedView === 'tree' ? 'bg-amber-900 text-amber-100' : 'bg-amber-100 text-amber-900' }  flex items-center gap-2`}><MdAccountTree className='text-[18px]' />Two-Level Tree</h1>
                    <h1 onClick={e => setSelectedView('list')} className={`cursor-pointer px-4 py-2 rounded border-2 border-dotted border-amber-400 ${selectedView === 'list' ? 'bg-amber-900 text-amber-100' : 'bg-amber-100 text-amber-900' }  flex items-center gap-2`}><FaThList /> List</h1>
                  </div>
                  {downline ? (
                    selectedView === 'list' ? (
                      <div className='w-full h-max mt-4'>
                        <DownlineTable downline={downline} />
                      </div>
                    ) : (
                      <TwoLevelTree userId={user._id} />
                    )
                  ) : (
                    <p>No downline users found.</p>
                  )}
                </div>
              </div>
            )
            ) : (
              user && user._id && (
                <div className='w-full h-max p-4 border-dotted border-gray-600 border-2 bg-white rounded-lg shadow-md mt-[60px]'>
                  <h1 className="text-xl sm:text-2xl font-semibold mb-4">My Uplines</h1>
                  <div className='overflow-x-auto rounded-lg shadow'>
                    <table className='min-w-full text-sm text-left text-gray-700'>
                      <thead className='bg-gray-100 text-xs uppercase'>
                        <tr>
                          <th className='px-4 py-2'>SL No</th>
                          <th className='px-4 py-2'>Username</th>
                          <th className='px-4 py-2'>Referral Code</th>
                          <th className='px-4 py-2'>Sponsor</th>
                          <th className='px-4 py-2'>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upline.map((user, index) => (
                          <tr key={index} className='border-b'>
                            <td className='px-4 py-2'>{index + 1}</td>
                            <td className='px-4 py-2'>{user.username}</td>
                            <td className='px-4 py-2'>{user.referralCode}</td>
                            <td className='px-4 py-2'>{user.sponsor?.referralCode || 'N/A'}</td>
                            <td className='px-4 py-2'>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {user.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            )
          )
        }

    </div>
  )
}

export default MyTeam