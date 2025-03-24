import React, { useState } from "react";
import { IoMdHome, IoIosPaper } from "react-icons/io";
import { MdBarChart } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import logo from "../assets/images/logo.jpeg";
import admindp from "../assets/images/admindp.png";

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

  // Toggle Active Status
  const toggleActiveStatus = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, active: !user.active } : user
    );
    setUsers(updatedUsers);
  };

  // Handle Delete
  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  // Handle Edit
  const editUser = (id) => {
    alert(`Edit user with ID: ${id}`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column */}
      <div className="w-1/6 bg-[#262626] text-white pt-1">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-12 w-auto mt-2" />

          <div className="pt-20 flex flex-col gap-y-2">
            <button className="hover:bg-[#0466c8] font-semibold text-white py-2 text-center px-5 rounded-3xl mb-2 flex items-center">
              <IoMdHome className="mr-1 text-lg" />
              Dashboard
            </button>
            <button className="hover:bg-[#0466c8] font-semibold text-center text-white py-2 px-5 rounded-3xl mb-2 flex items-center">
              <MdBarChart className="mr-1 text-lg" />
              Insight
            </button>
            <button className="hover:bg-[#0466c8] font-semibold text-center text-white py-2 px-5 rounded-3xl mb-2 flex items-center">
              <IoIosPaper className="mr-1 text-lg" /> Transaction
            </button>
            <button className="hover:bg-[#0466c8] font-semibold text-center text-white py-2 px-5 rounded-3xl mb-2 flex items-center">
              <RiAccountCircleFill className="mr-1 text-lg" />
              Account
            </button>
            <button className="hover:bg-[#0466c8] font-semibold text-center text-white py-2 px-5 rounded-3xl mb-4 flex items-center">
              <IoSettings className="mr-1 text-lg" /> Setting
            </button>
          </div>
          {/* Company Earnings Section */}
          <div className="pt-12">
            <h2 className="text-lg font-semibold mb-4">
              View Company Earnings
            </h2>
            <div className="bg-black p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Company Earnings
              </h2>
              <p className="text-xl"> 3,20,502$</p>
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
      <div className="w-4/6 bg-[#1f1f1f]  text-white p-8 pb-4">
        <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
        <div className=" rounded-3xl shadow-2xl bg-black px-6 pb-4">
          <h2 className="text-xl font-semibold mb-4 pt-10">Manage Users</h2>
          <table className="min-w-full table-auto text-black border-collapse mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Active</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-white">
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => toggleActiveStatus(user.id)}
                      className={`px-4 flex py-2 text-white rounded ${
                        user.active ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="border p-2 flex space-x-2">
                    <button
                      onClick={() => editUser(user.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
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

        {/* User Avatars Section */}
        <div className="flex space-x-4 mt-52 bg-black rounded-2xl py-4 px-auto pl-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center space-x-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="w-1/5 text-white  bg-[#222222] p-6">
        <div className="flex items-center justify-between">
          <p className="flex flex-col">
            <span>Veronica Fernandes</span>
            <span className="text-end">admin</span>
          </p>
          <img
            src={admindp}
            alt="profile"
            className="w-16 h-16 rounded-full border-4 border-gray-500"
          />
        </div>
        <div className="space-y-6">
          {/* Achievers Section */}
          <div className="pt-10">
            <h2 className="text-lg font-semibold mb-4">View Achievers</h2>
            <div className="flex flex-col space-y-4 mt-4 bg-black rounded-2xl py-4 px-auto pl-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p>{user.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Trees Section */}
          <div className="pt-10">
            <div className="bg-black p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-white">
                View Individual Trees
              </h2>

              {/* Tree Structure */}
              <div className="flex flex-col items-center">
                {/* First Level */}
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                    <img
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      alt="User 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="ml-4 text-white">User 1</p>
                </div>
                {/* Second Level */}
                <div className="flex flex-col items-center mb-4">
                  {/* Child 1 */}
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                      <img
                        src="https://randomuser.me/api/portraits/women/2.jpg"
                        alt="User 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="ml-4 text-white">User 2</p>
                  </div>
                  {/* Child 2 */}
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                      <img
                        src="https://randomuser.me/api/portraits/men/2.jpg"
                        alt="User 3"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="ml-4 text-white">User 3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
