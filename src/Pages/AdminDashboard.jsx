import React, { useEffect, useState } from "react";
import { IoMdHome, IoIosPaper } from "react-icons/io";
import { MdBarChart } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import logo from "../assets/images/logo.jpeg";
import { lsService } from "../services/ls.service";
import { approveDeposit, getCompanyEarnings, getDeposits, getUsers, removeUser, updateActiveStatus } from "../Components/helper/apiCalls";
import { Link, useNavigate } from "react-router-dom";
// import admindp from "https://placehold.co/600x400@2x.png";

const usersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    active: true,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    active: false,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 3,
    name: "Sam Johnson",
    email: "sam@example.com",
    active: true,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const AdminDashboard = () => {
  const [users, setUsers] = useState(usersData);
  const [companyEarnings, setCompanyEarnings] = useState(0);
  const [deposits, setDeposits] = useState([]);
  const [admin,setAdmin]  = useState();
  const [currentSection, setCurrentSection] = useState("dashboard");
  const navigate = useNavigate();
  // Toggle Active Status
  const toggleActiveStatus = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, active: !user.active } : user
    );
    setUsers(updatedUsers);
  };

  // Handle Delete
  const deleteUser = async (id) => {
    try {
      const res = await removeUser(id)
      if (res.status === 200) {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        alert("User deleted successfully");
        return
      }
      alert("Failed to delete user");
      return
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
      return
    }
  };

  // Handle Edit
  const editUser = (id) => {
    alert(`Edit user with ID: ${id}`);
  };

  const updateUserStatus = async (id) => {
    try {
      const res = await updateActiveStatus(id)
      if (res.status === 200) {
        const updatedUsers = users.map((user) =>
          user._id === id ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
        );
        setUsers(updatedUsers);
        alert("User status updated successfully");
        return
      }
      alert("Failed to toggle user status");
      return
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update user status");
      return
    }
  }

  const fetchUsers = async () => {
    // Fetch users from API
    const response = await getUsers()
     ;
    
    if(response.status === 200) {
      setUsers(response.data)
    }
  }

  const fetchDeposits = async () => {
    // Fetch users from API
    const response = await getDeposits()
     ;
    
    if(response.status === 200) {
      setDeposits(response.data)
    }
  }

  const fetchCompanyEarnings = async () => {
    // Fetch users from API
    const response = await getCompanyEarnings()
     ;
    
    if(response.status === 200) {
      setCompanyEarnings(response.data.totalEarnings)
    }
  }

  const handleApproval = async (id) => {
    // Approve deposit
    const response = await approveDeposit(id)
     ;

    if(response.status === 200) {
      alert("Deposit approved successfully")
      setDeposits(deposits.filter(deposit => deposit._id !== id))
    }

    alert("Deposit already approved or failed to approve deposit")
  }

  useEffect(() => {
    const token = lsService.get('token')
    if (!token) {
      navigate('/signin')
    }

    const user = lsService.get('user')
    const isAdmin = user && user.isAdmin;

    if(!isAdmin) {
      navigate('/home')
    }

    fetchUsers()
    fetchCompanyEarnings()
    fetchDeposits()

    setAdmin(lsService.get('user'))
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Left Column */}
      <div className="w-1/6 bg-[#262626] text-white pt-1">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-12 w-auto mt-2" />

          <div className="pt-20 flex flex-col gap-y-2">
            <button onClick={e => setCurrentSection("dashboard")} className={`hover:bg-[#0466c8] font-semibold text-white py-2 text-center px-5 rounded-3xl mb-2 flex items-center ${currentSection === "dashboard" ? "bg-[#0466c8]" : ""}`}>
              <IoMdHome className="mr-1 text-lg" />
              Dashboard
            </button>
            {/* <button className="hover:bg-[#0466c8] font-semibold text-center text-white py-2 px-5 rounded-3xl mb-2 flex items-center">
              <MdBarChart className="mr-1 text-lg" />
              Insight
            </button> */}
            {/* <button className="hover:bg-[#0466c8] font-semibold text-center text-white py-2 px-5 rounded-3xl mb-2 flex items-center">
              <IoIosPaper className="mr-1 text-lg" /> Transaction
            </button> */}
            <button onClick={e => setCurrentSection('deposits')} className={`hover:bg-[#0466c8] font-semibold text-center text-white py-2 px-5 rounded-3xl mb-2 flex items-center ${currentSection === "deposits" ? "bg-[#0466c8]" : ""}`}>
              <IoIosPaper className="mr-1 text-lg" /> Deposits
            </button>
            {/* <button className="hover:bg-[#0466c8] font-semibold text-center text-white py-2 px-5 rounded-3xl mb-2 flex items-center">
              <RiAccountCircleFill className="mr-1 text-lg" />
              Account
            </button>
            <button className="hover:bg-[#0466c8] font-semibold text-center text-white py-2 px-5 rounded-3xl mb-4 flex items-center">
              <IoSettings className="mr-1 text-lg" /> Setting
            </button> */}
          </div>
          {/* Company Earnings Section */}
          <div className="pt-12 px-2">
            <h2 className="text-lg font-semibold mb-4">
              View Company Earnings
            </h2>
            <div className="bg-black p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Company Earnings
              </h2>
              <p className="text-xl"> &#8377; {companyEarnings}</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2 mb-2">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="bg-yellow-500 h-full"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Column */}
      <div className="w-5/6 bg-[#1f1f1f]  text-white p-8 pb-4">
        <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
        {
          currentSection === "dashboard" ? (
            <>
            <div className=" rounded-3xl shadow-2xl bg-black px-6 pb-4">
            <h2 className="text-xl font-semibold mb-4 pt-10">Manage Users</h2>
            <table className="min-w-full table-auto text-black border-collapse mb-6">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Sponsor</th>
                  <th className="border p-2">Referral Code</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Username</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users.map((user) => (
                  <tr key={user._id} className="bg-white">
                    <td className="border p-2">
                      <Link className="text-sky-700 hover:text-sky-500 underline" to={`/admin/user/${user?.sponsor?._id}/${user?.sponsor?.sponsor}`}>{user?.sponsor?.name || 'N/A'}</Link>
                    </td>
                    <td className="border p-2">
                      <Link className="text-sky-700 hover:text-sky-500 underline" to={`/admin/user/${user._id}/${user?.sponsor?._id}`}>{user.referralCode}</Link>
                    </td>
                    <td className="border p-2">{user.name || '-'}</td>
                    <td className="border p-2">{user.username}</td>
                    <td className="border p-2">{user.email || '-'}</td>
                    <td className="border p-2">{user.status || '-'}</td>
                    <td className="border p-2 flex space-x-2">
                      <button
                          onClick={(e) => updateUserStatus(user._id)}
                          className="px-4 py-2 bg-amber-500 text-white rounded"
                        >
                          Toggle Status
                      </button>
                      <button
                        onClick={() => editUser(user._id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </>
          ) : currentSection === "deposits" ? (
            <>
              <div className=" rounded-3xl shadow-2xl bg-black px-6 pb-4">
              <h2 className="text-xl font-semibold mb-4 pt-10">Manage Deposits</h2>
              <table className="min-w-full table-auto text-black border-collapse mb-6">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">SL NO.</th>
                    <th className="border p-2">User</th>
                    <th className="border p-2">Amount</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Approve</th>
                  </tr>
                </thead>
                <tbody>
                  {deposits.map((deposit,index) => (
                    <tr key={deposit._id} className="bg-white">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{deposit.user.name || deposit.user.username}</td>
                      <td className="border p-2">{deposit.amount}</td>
                      <td className="border p-2">{deposit.status || '-'}</td>
                      <td className="border p-2 flex space-x-2">
                        {deposit.status === 'pending' ? (
                          <button
                            onClick={() => handleApproval(deposit._id)}
                            className="px-4 py-2 bg-green-500 text-white rounded"
                          >
                            Approve
                          </button>
                        ) : (
                          <span className="text-gray-500">Approved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* User Avatars Section */}
            {/* <div className="flex space-x-4 mt-52 bg-black rounded-2xl py-4 px-auto pl-4">
              {users.map((user) => (
                <div key={user._id} className="flex items-center space-x-2">
                  <img
                    src={'https:// '}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p>{user.name}</p>
                </div>
              ))}
            </div> */}
            </>
          ) : null
        }
      </div>
    </div>
  );
};

export default AdminDashboard;
