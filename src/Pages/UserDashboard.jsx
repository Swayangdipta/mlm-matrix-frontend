import React, { useEffect, useState } from 'react';
import { lsService } from '../services/ls.service';
import { useNavigate } from 'react-router-dom';
import { getUplineTree, postDeposit } from '../Components/helper/apiCalls';
import { BiArrowToBottom } from 'react-icons/bi';

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

const UserDashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(userData);
  const [upline, setUpline] = useState([]);
  const [depositAmount, setDepositAmount] = useState('');

  // Handle Deposit to Wallet
  const handleDeposit = async () => {
    if (depositAmount > 0) {
      const response = await postDeposit({ user: user._id, amount: depositAmount });
      console.log(response);
      

      if (response.status === 200) {
        alert('Deposit successful.Amount Will be credited once approved!');
        setDepositAmount('');
      }
    } else {
      alert('Please enter a valid deposit amount.');
    }
  };

  const getUplineData = async () => {    
    if(user.sponsor){
      const response = await getUplineTree(user.sponsor)
      console.log(user.downlines);
      
      if(response.status === 200) {
        setUpline(response.data)
      }
    }
  }

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
    getUplineData()
  }, [user])

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center mb-6">User Dashboard</h1>

      {/* User Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-semibold mb-4">User Info</h2>
        <p className="text-lg"><strong>Name:</strong> {user.name}</p>
        <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        <p className="text-lg"><strong>Wallet Balance:</strong> ${user.walletBalance.toFixed(2)}</p>
      </div>

      {/* Deposit to Wallet Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-semibold mb-4">Deposit to Wallet</h2>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          className="border p-2 rounded-lg mb-4 w-full"
          placeholder="Enter deposit amount"
        />
        <button
          onClick={handleDeposit}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Deposit
        </button>
      </div>

      {/* Downline Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-semibold mb-4">Downline Tree</h2>
        {user.downlines.length > 0 ? (
          <ul>
            {user.downlines.map((user) => (
              <li key={user._id} className="mb-2">
                <p className="text-lg">{user.name} ({user.email})</p>
              </li>
            ))}
          </ul>
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
  );
};

export default UserDashboard;

