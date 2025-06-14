import React, { useEffect, useState } from 'react';
import { lsService } from '../services/ls.service';
import { Link, useNavigate } from 'react-router-dom';
import { generateSIForm, getDownlineCount, getDownlineTree, getFreeSlots, getUplineTree, payToComapny, postDeposit } from '../Components/helper/apiCalls';
import { BiArrowToBottom, BiArrowToLeft, BiMenu, BiMobile } from 'react-icons/bi';
import TeamTree from './TreeData';
import SignUp from '../Components/SignUp';
import Menu from '../Components/Menu';
import Footer from '../Components/Footer';
import SearchArea from '../Components/SearchArea';
import { MdEmail } from 'react-icons/md';
import TwoLevelTree from '../Components/TwoLevelTree';
import PaymentQr from '../assets/images/payment_method.jpeg'
import { FaUsers } from 'react-icons/fa';
import { FaBuilding, FaBuildingUser } from 'react-icons/fa6';

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
  const [slots, setSlots] = useState(0);
  const [downlineCount, setDownlineCout] = useState(0);
  const [user, setUser] = useState(userData);
  const [upline, setUpline] = useState([]);
  const [downline, setDownline] = useState(undefined);
  const [depositAmount, setDepositAmount] = useState('');
  const [isNewReigtrationOpen, setIsNewReigtrationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle Deposit to Wallet
  const handleDeposit = async () => {
    if (depositAmount > 0) {
      const response = await postDeposit({ user: user._id, amount: depositAmount });
       ;
      

      if (response.status === 200) {
        alert('Deposit successful.Amount Will be credited once approved!');
        setDepositAmount('');
      }
    } else {
      alert('Please enter a valid deposit amount.');
    }
  };

  const handleTransfer = async () => {
    try {
      const res = await payToComapny(user._id);
       (res);

      if (res.status === 200) {
        alert('Transfer successful!');
        setSlots(3)
        setUser({...user, walletBalance: user.walletBalance - 1500})
        lsService.set('user',{...user, walletBalance: user.walletBalance - 1500})
      }

      alert(res.data.message || 'Transfer failed. Please try again.');

    } catch (error) {
      console.error('Error during transfer:', error);
      alert(error.data.message || 'Transfer failed. Please try again.');
    }
  };


  const getSlotsData = async () => {
    if(user._id){
      const response = await getFreeSlots(user._id)
       ;
      
      if(response.status === 200) {                      
        setSlots(response.data.freeSlots)
      }
    }
  }

  const getDownlineLength = async () => {
    if(user._id){
      const response = await getDownlineCount(user._id)
       ;
      
      if(response.status === 200) {                      
        setDownlineCout(response.data.downlineCount)
      }
    }
  }

  const handleFormDownload = async () => {
    try {
      const response = await generateSIForm(user._id); // Call API
  
      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });
  
      // Create a link element and trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "mlm_printable_form.pdf";
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };  

  const handleNewRegistration = () => {
    setIsNewReigtrationOpen(true)
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
    getSlotsData()
    getDownlineLength()
  }, [user])

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className='flex items-center justify-between w-screen h-[60px] fixed top-0 left-0 bg-white shadow-md px-6'>
        <h1 className="font-bold text-center text-gray-600">Dashboard</h1>
        <BiMenu className='text-gray-600 text-[18px]' onClick={e => setIsMenuOpen(!isMenuOpen)} />
      </div>

      {/* User Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 mt-[60px] flex flex-col items-center border-dotted border-gray-600 border-2">
        <img src="https://api.dicebear.com/9.x/glass/svg" alt="avatar" className='w-[80px] h-[80px] rounded-full' />
        <p className="text-[18px] font-bold text-gray-700 mt-4">{user.name}</p>
        <p className="text-[14px] font-bold text-gray-700">( {user.referralCode} )</p>
        <p className="text-[14px] text-red-500">{user.email}</p>
        <p className="text-[16px] font-bold text-emerald-500">₹ {user.walletBalance.toFixed(2)}</p>
      </div>

      {/* Earnings Section */}
      <div className='bg-white p-6 rounded-lg shadow-md mb-6 mt-[60px] flex flex-wrap items-center border-dotted border-gray-600 border-2'>
        <div className='w-[200px] h-[100px] rounded bg-gradient-to-r from-purple-700 to-sky-700 flex flex-col p-6 text-white font-bold items-center gap-2'>
          <h1 className='text-[18px]'>Self Earning</h1>
          <h1 className='text-[18px]'>Rs. {user.selfEarnings || 0}</h1>
        </div>

        <div className='w-[20px] h-[100px] flex flex-col p-6 text-black font-bold items-center justify-center'>
          <h1 className='text-[28px]'>+</h1>
        </div>

        <div className='w-[200px] h-[100px] mt-4 sm:mt-0 rounded bg-gradient-to-r from-purple-700 to-sky-700 flex flex-col p-6 text-white font-bold items-center gap-2'>
          <h1 className='text-[18px]'>Level Earning</h1>
          <h1 className='text-[18px]'>Rs. {user.earnings || 0}</h1>
        </div>

        <div className='w-[20px] h-[100px] flex flex-col p-6 text-black font-bold items-center justify-center'>
          <h1 className='text-[28px]'>=</h1>
        </div>

        <div className='w-[200px] h-[100px]  mt-4 sm:mt-0 rounded bg-gradient-to-r from-emerald-600 to-amber-500 flex flex-col p-6 text-white font-bold items-center gap-2'>
          <h1 className='text-[18px]'>Total Earning</h1>
          <h1 className='text-[18px]'>Rs. {(user.selfEarnings || 0) + (user.earnings || 0)}</h1>
        </div>        
      </div>

      {/* Downline Count Section */}
      <div className='bg-white p-6 rounded-lg shadow-md mb-6 mt-[60px] flex flex-wrap items-center border-dotted border-gray-600 border-2'>
        <Link to='/downline/direct' ><div className='w-[200px] h-[100px] rounded bg-gradient-to-r from-purple-700 to-sky-700 flex flex-col p-6 text-white font-bold items-center gap-2'>
          <h1 className='text-[18px]'>Direct Downline</h1>
          <h1 className='text-[18px]'>{user.downlines.length || 0}</h1>
        </div>
        </Link>
        <div className='w-[20px] h-[100px] flex flex-col p-6 text-black font-bold items-center justify-center'>
          <h1 className='text-[28px]'>+</h1>
        </div>


        <div className='w-[200px] h-[100px]  mt-4 sm:mt-0 rounded bg-gradient-to-r from-purple-700 to-sky-700 flex flex-col p-6 text-white font-bold items-center gap-2'>
          <h1 className='text-[18px]'>Linked Downlines</h1>
          <h1 className='text-[18px]'>{downlineCount || 0}</h1>
        </div>

        <div className='w-[20px] h-[100px] flex flex-col p-6 text-black font-bold items-center justify-center'>
          <h1 className='text-[28px]'>=</h1>
        </div>

        <Link to='/downline/all' >
          <div className='w-[200px] h-[100px]  mt-4 sm:mt-0 rounded bg-gradient-to-r from-emerald-600 to-amber-500 flex flex-col p-6 text-white font-bold items-center gap-2'>
            <h1 className='text-[18px]'>Total Members</h1>
            <h1 className='text-[18px]'>{(user.downlines.length || 0) + (downlineCount || 0)}</h1>
          </div>  
        </Link>
       
      </div>

      {/* Deposit to Wallet Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-dotted border-gray-600 border-2">
        <h2 className="text-xl sm:text-3xl font-semibold mb-4">Deposit to Wallet</h2>
        <div className='flex sm:items-start sm:flex-row flex-col gap-10 sm:gap-10'>
          <img src={PaymentQr} className='h-[200px] w-[200px] mx-auto sm:mx-0' alt="" />
          <div >
            <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="border p-2 rounded-lg mb-4 w-full"
            placeholder="Enter deposit amount"
          />

          <div className='flex sm:items-center sm:flex-row flex-col gap-2 sm:gap-0'>
          <button
            onClick={handleDeposit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Deposit
          </button>

          <Link to='/payment'
            className="bg-emerald-500 sm:ml-6 text-white px-6 py-2 rounded-lg cursor-pointer"
          >
            Pay Company and Upline
          </Link>
          </div>
          </div>
        </div>
      </div>

        {
        slots > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-dotted border-gray-600 border-2">
            <h2 className="text-xl sm:text-3xl font-semibold mb-4">Free Slots</h2>
            <p className="text-lg">You have <strong>{slots}</strong> free slots available.</p>
            <div className='flex sm:items-center sm:flex-row flex-col gap-2 sm:gap-0'>
              <button
                onClick={handleNewRegistration}
                className="bg-amber-500 text-white px-6 py-2 rounded-lg mt-4 cursor-pointer"
              >New Recruit</button>
              <button
                onClick={handleFormDownload}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg sm:mt-4 cursor-pointer sm:ml-6"
              >Download SI Form </button>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-dotted border-gray-600 border-2">
        <h2 className="text-xl sm:text-3xl font-semibold mb-4">Team Data</h2>
        <div className='flex sm:items-start sm:flex-row flex-col gap-10 sm:gap-10'>
          <Link to='/downlines'>
            <div className='w-[200px] h-[100px] border-dotted bg-emerald-100 border-emerald-600 border-2 rounded-lg flex items-center justify-center'>
              <h1 className='text-emerald-900 font-bold flex items-center justify-center gap-2'><FaUsers className='text-[26px]' /> My Downlines</h1>
            </div>
          </Link>
          <Link to='/uplines'>
            <div className='w-[200px] h-[100px] border-dotted bg-purple-100 border-purple-600 border-2 rounded-lg flex items-center justify-center'>
              <h1 className='text-purple-900 font-bold flex items-center justify-center gap-2'><FaBuildingUser className='text-[26px]' /> My Uplines</h1>
            </div>
          </Link>
        </div>
      </div>

      {/* Downline Section
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-dotted border-gray-600 border-2">
        <h2 className="text-xl sm:text-3xl font-semibold mb-4">Downline Tree</h2>
        {downline ? (
          <TwoLevelTree userId={user._id} />
        ) : (
          <p>No downline users found.</p>
        )}
      </div>


      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-dotted border-gray-600 border-2">
        <h2 className="text-xl sm:text-3xl font-semibold mb-4">Upline Tree</h2>
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
      </div> */}
      
      {
        isNewReigtrationOpen && (
          <div className="bg-white border-dotted border-gray-600 border-2 p-6 rounded-lg shadow-lg mb-6 w-[95%] h-[95%] fixed top-[2.5%] left-[2.5%] z-50 overflow-y-scroll">
            <div onClick={e => setIsNewReigtrationOpen(false)}  className='absolute w-[40px] h-[40px] flex items-center justify-center cursor-pointer shadow-2xl top-[10px] p-2 bg-amber-100 rounded-full left-[10px]'>
            <BiArrowToLeft className='text-[20px]'/>
            </div>
            <SignUp from='dashboard' sponsorID={user.referralCode} />
          </div>
        )
      }

      {
        isMenuOpen && (
          <>
            <div onClick={e => setIsMenuOpen(false)} className='w-screen h-screen bg-[#00000010] fixed top-0 left-0'></div>
            <Menu setIsOpen={setIsMenuOpen} user={user} setUser={setUser} />
          </>
        )
      }

      {/* Customer Support Section */}
      <div className="bg-white p-6 pt-0 rounded-lg shadow-md mb-6 border-dotted border-gray-600 border-2 relative top-0 z-0">
        <div className='w-full h-[30px] absolute top-0 left-0 bg-gradient-to-r from-emerald-500 to-sky-500'></div>
        <h2 className="text-xl font-semibold mb-4 mt-[40px]">Customer Support (WhatsApp)</h2>
        <h4 className='flex items-center justify-center gap-2 w-max h-max'><BiMobile /> 1234567890</h4>
        <p className='flex items-center justify-center gap-2 w-max h-max'><MdEmail /> support@prodeal.com</p>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;

