import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDownlineTree, getUplineTree } from '../Components/helper/apiCalls'
import TeamTree from './TreeData'
import { BiArrowToBottom } from 'react-icons/bi'

const UserView = () => {
    const {userId, sponsorId} = useParams()
  const [downline, setDownline] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [upline, setUpline] = useState([]);

      const getDownlineData = async (user) => {   
        
        if(user){
          const response = await getDownlineTree(user)
           ;
          
          if(response.status === 200) {
            // Transform data for react-d3-tree
            const transformTree = (node) => ({
              name: node.name,
              children: node.children.map(transformTree),
          });
          
            setUserData({...response.data, children: null})
            setDownline(transformTree(response.data))
          }
        }
      }

        const getUplineData = async (sponsor) => {    
          if(sponsor){
            const response = await getUplineTree(sponsor)
            
            if(response.status === 200) {
              setUpline(response.data)
            }
          }
        }

      useEffect(() => {
        if(userId){
            getDownlineData(userId)
        }

        if(sponsorId){
            getUplineData(sponsorId)
        }
      },[userId])
  return (
    <div className='px-8'>
        <h1 className="text-4xl font-semibold mb-6">User View</h1>
        {
            userData && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-3xl font-semibold mb-4">User Info</h2>
                <p className="text-lg"><strong>Name:</strong> {userData?.name}</p>
                <p className="text-lg"><strong>Email:</strong> {userData && userData.email}</p>
                <p className="text-lg"><strong>Referral Code:</strong> {userData && userData.referralCode }</p>
                {/* Display Rewards */}
                <p className="text-lg"><strong>Wallet Balance:</strong> ${userData?.walletBalance}</p>
                {/* <p className='text-xl'>Rewards</p> */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Rewards</h3>
                    <ul>
                        {userData && userData.rewards?.length > 0 ? userData.rewards.map((reward, index) => (
                            <li key={index} className="mb-2">
                                <p className="text-lg">{reward}</p>
                            </li>
                        )) : <h1>No Rewards acheived</h1>}
                    </ul>
                </div>
            </div>
            )
        }
              {/* Downline Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-semibold mb-4">Downline Tree</h2>
        {downline ? (
          <TeamTree data={downline} />
        ) : (
          <p>No downline users found.</p>
        )}
      </div>

      Upline Section
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-semibold mb-4">Upline Tree</h2>
        {upline && upline.length > 0 ? (
          <ul>
            {upline.map((user) => (
              <li key={user._id} className="mb-2">
                <p className="text-lg">Level - {user.level} -- {user.name || user.username} ({user.email || user.referralCode})</p>
                <BiArrowToBottom />
              </li>
            ))}
            <p>-- END OF TREE --</p>
          </ul>
        ) : (
          <p>No upline users found.</p>
        )}
      </div>
    </div>
  )
}

export default UserView