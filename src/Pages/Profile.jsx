import React, { useEffect, useState } from 'react';
import { BiMenu, BiUser, BiPhone, BiEnvelope, BiHome, BiKey, BiWallet } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineSave } from 'react-icons/ai';
import { motion } from 'framer-motion';
import Menu from '../Components/Menu';
import { lsService } from '../services/ls.service';
import { BsBank } from 'react-icons/bs';
import { updateUserPassword, updateUserProfile } from '../Components/helper/apiCalls';
import { IoIosImages } from 'react-icons/io';

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [editMode, setEditMode] = useState(null);
    const [formData, setFormData] = useState({});
    const [filePreviews, setFilePreviews] = useState({});

    useEffect(() => {
        const token = lsService.get('token');
        if (!token) navigate('/signin');

        const user = lsService.get('user');
        if (user) {
            setUserData(user);
            setFormData(user);
        }
    }, []);

    const handleInputChange = (e) => {
        if (e.target.type === "file") {
            const file = e.target.files[0];
            if (file) {
                setFormData({ ...formData, [e.target.name]: file });
                setFilePreviews({
                    ...filePreviews,
                    [e.target.name]: URL.createObjectURL(file)
                });
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleUpdate = async (section) => {
        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value && typeof value === 'object') {
                    form.append(key, value); // file
                } else {
                    form.append(key, value ?? '');
                }
            });

            form.append("section", section);
            const response = await updateUserProfile(userData._id, form);

            if (response.status !== 200) {
                alert("Update failed! Try again.");
                return;
            }

            setFormData(response.data.user);
            setUserData(response.data.user);
            setEditMode(null);
            setFilePreviews({});
            alert("Profile updated successfully!");
        } catch (error) {
            console.error('Update failed:', error);
            alert("Update failed! Try again.");
        }
    };

    const handlePasswordChange = async () => {
        if (!formData.newPassword || formData.newPassword.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        try {
            const response = await updateUserPassword(userData._id, { newPassword: formData.newPassword });

            if (response.status !== 200) {
                alert("Password update failed! Try again.");
                return;
            }
            alert("Password updated successfully!");
            setEditMode(null);
            setFormData({ ...formData, newPassword: "" });
        } catch (error) {
            console.error('Password update failed:', error);
            alert("Failed to update password. Try again.");
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 to-purple-200">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between w-full h-[60px] fixed top-0 left-0 bg-white shadow-md px-6"
            >
                <Link to='/home'>
                    <h1 className="font-bold text-gray-700 text-xl">Dashboard</h1>
                </Link>
                <BiMenu className='text-gray-700 text-[22px] cursor-pointer hover:text-blue-500' onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </motion.div>

            {isMenuOpen && (
                <>
                    <div onClick={() => setIsMenuOpen(false)} className='w-screen h-screen bg-[#00000050] fixed top-0 left-0'></div>
                    <Menu setIsOpen={setIsMenuOpen} user={userData} setUser={setUserData} from="profile" />
                </>
            )}

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto mt-24 bg-white p-8 rounded-2xl shadow-xl"
            >
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Profile Details</h2>

                {[
                    {
                        title: "Personal Information",
                        icon: <BiUser className="text-blue-500 text-2xl mr-2" />,
                        fields: ["name", "mobile", "email"],
                        editKey: "personal",
                        color: "bg-blue-50 border-blue-300"
                    },
                    {
                        title: "Address",
                        icon: <BiHome className="text-green-500 text-2xl mr-2" />,
                        fields: ["address"],
                        editKey: "address",
                        color: "bg-green-50 border-green-300"
                    },
                    {
                        title: "Bank Details",
                        icon: <BsBank className="text-yellow-500 text-2xl mr-2" />,
                        fields: ["bankName", "accountNumber", "ifscCode", "upiNumber"],
                        editKey: "bank",
                        color: "bg-yellow-50 border-yellow-300"
                    },
                    {
                        title: "KYC Details",
                        icon: <IoIosImages className="text-purple-500 text-2xl mr-2" />,
                        fields: ["aadharFront", "aadharBack", "pancard"],
                        editKey: "kyc",
                        color: "bg-purple-50 border-purple-300"
                    }
                ].map((section) => (
                    <div key={section.editKey} className={`mb-6 border-2 p-6 rounded-xl shadow-md ${section.color}`}>
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center">
                                {section.icon}
                                <h3 className="text-lg font-semibold text-gray-700">{section.title}</h3>
                            </div>
                            {editMode !== section.editKey && (
                                <AiOutlineEdit
                                    className="text-blue-500 cursor-pointer text-xl hover:text-blue-600"
                                    onClick={() => setEditMode(section.editKey)}
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {section.fields.map((field) => (
                                <div key={field}>
                                    <label className="text-sm font-medium text-gray-600 capitalize">
                                        {field.replace(/([A-Z])/g, ' $1')}
                                    </label>

                                    {section.editKey === 'kyc' ? (
                                        <>
                                            <input
                                                type="file"
                                                name={field}
                                                accept="image/*"
                                                onChange={handleInputChange}
                                                className="w-full border-2 p-2 rounded-lg bg-white"
                                                disabled={editMode !== section.editKey}
                                            />
                                            {editMode === section.editKey && filePreviews[field] && (
                                                <img src={filePreviews[field]} alt="preview" className="mt-2 h-24 rounded-md object-cover" />
                                            )}
                                            {editMode !== section.editKey && userData?.[field] && (
                                                <img src={userData[field]} alt="uploaded" className="mt-2 h-24 rounded-md object-cover" />
                                            )}
                                        </>
                                    ) : (
                                        <input
                                            type="text"
                                            name={field}
                                            value={formData[field] || ""}
                                            onChange={handleInputChange}
                                            className={`w-full border-2 p-3 rounded-lg bg-white ${
                                                editMode === section.editKey ? 'border-blue-400' : 'border-gray-300'
                                            }`}
                                            disabled={editMode !== section.editKey}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {editMode === section.editKey && (
                            <div className="mt-4 flex gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
                                    onClick={() => handleUpdate(section.editKey)}
                                >
                                    <AiOutlineSave /> Save
                                </motion.button>
                                <button
                                    className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
                                    onClick={() => setEditMode(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                <div className="mb-6 border-2 p-6 rounded-xl shadow-md bg-indigo-50 border-indigo-300 flex items-center gap-3">
                    <BiWallet className="text-indigo-500 text-2xl" />
                    <h3 className="text-lg font-semibold text-gray-700">Wallet Balance: ₹{userData?.walletBalance}</h3>
                </div>

                <div className="border-2 p-6 rounded-xl shadow-md bg-red-50 border-red-300 flex items-center gap-3">
                    <BiKey className="text-red-500 text-2xl" />
                    {editMode === "security" ? (
                        <div className="w-full">
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                value={formData.newPassword || ""}
                                onChange={handleInputChange}
                                className="w-full border-2 p-3 rounded-lg border-gray-300 bg-white"
                            />
                            <button className="bg-blue-600 text-white px-5 py-2 mt-3 rounded-lg" onClick={handlePasswordChange}>
                                <AiOutlineSave /> Save
                            </button>
                        </div>
                    ) : (
                        <button className="text-red-500 hover:underline font-medium" onClick={() => setEditMode("security")}>
                            Change Password
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;