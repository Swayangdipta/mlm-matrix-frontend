import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUplineTree, getUserPaymentStatus, payToIndividual } from '../Components/helper/apiCalls';
import { lsService } from '../services/ls.service';
import toast from 'react-hot-toast';
import { BiMenu } from 'react-icons/bi';
import Menu from '../Components/Menu';
import PaymentQr from '../assets/images/payment_method.jpeg'

const Payment = () => {
    const [user, setUser] = React.useState(undefined);
    const [paymentData, setPaymentData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [upline, setUpline] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [currentReceipt, setCurrentReceipt] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const token = lsService.get('token')
        if (!token) {
            navigate('/signin')
        }
    
        setUser(lsService.get('user'))
    }, [])

      const getUplineData = async () => {    
        if(user.sponsor){
          const response = await getUplineTree(user.sponsor)
          console.log(response);
          
          if(response.status === 200) {
            setUpline(response.data)
          }
        }
      }

    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const paymentData = await getUserPaymentStatus(user._id);
                
                if (paymentData.status === 200) {
                    setPaymentData(paymentData.data);
                } else {
                    toast.error('Failed to fetch payment data');
                }
            } catch (error) {
                toast.error('Failed to fetch payment data');
            }finally{
                setLoading(false);
            }
        }

        if(user){
            fetchPaymentData()
            getUplineData()
        }
        fetchPaymentData()
    },[user])

    const unpaidLevels = [];

    for (let level = 1; level <= 9; level++) {
    if (!paymentData?.[`level${level}`]) {
        unpaidLevels.push({
        level,
        user: level === 1 ? user : upline[level - 2],
        amount: level === 1 ? 300 : 100,
        });
    }
    }

    if (!paymentData?.company) {
    unpaidLevels.push({
        level: 'company',
        user: { name: 'Company' },
        amount: 700,
    });
    }

    const totalUnpaid = unpaidLevels.reduce((sum, item) => sum + item.amount, 0);

    const handlePayment = async (level, recipient, amount) => {
        toast.loading(`Processing payment to ${recipient.name}...`);

        if(!currentReceipt){
            toast.dismiss();
            toast.error('Please upload a payment receipt or screenshot');
            return
        }
        try {
          const data = {
            level,
            amount,
            recipient: recipient.name === 'Company' ? recipient : recipient._id,
            receipt: currentReceipt,
            userId: user._id
          };

            const form = new FormData();
            form.append('level', data.level);
            form.append('amount', data.amount);
            form.append('recipient', data.recipient);
            form.append('receipt', data.receipt);
            form.append('userId', data.userId);

      
          const response = await payToIndividual(user._id, form);
      
          if (response.status === 200) {
            toast.dismiss();
            toast.success(`Paid ₹${amount} to ${recipient.name}`);
      
            // Update wallet balance (only if not company)
            if (recipient._id && recipient.wallet_balance !== undefined) {
              recipient.wallet_balance += amount;
            }
      
            // Refetch updated payment status
            const refreshed = await getUserPaymentStatus(user._id);
            if (refreshed.status === 200) {
              setPaymentData(refreshed.data);
            }

            let data = lsService.get('user')
            data.walletBalance -= amount
            lsService.set('user', data)
            setUser(data)
            setCurrentReceipt(null); // Reset receipt after successful payment
            setIsPaymentModalOpen(false); // Close the payment modal
          } else {
            toast.dismiss();
            toast.error(response.data?.message || `Failed to pay ${recipient.name}`);
          }
        } catch (error) {
          toast.dismiss();
          toast.error(`Error: ${error.message}`);
        }
      };      
      
    const setPaymentModal = (level, recipient, amount) => {
        setIsPaymentModalOpen(
            {
                level,
                recipient,
                amount
            }
        );
    }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
        <div className='flex items-center justify-between w-screen h-[60px] fixed top-0 left-0 bg-white shadow-md px-6'>
        <h1 className="font-bold text-center text-gray-600">Dashboard</h1>
            <BiMenu className='text-gray-600 text-[18px]' onClick={e => setIsMenuOpen(!isMenuOpen)} />
        </div>

        <div className='w-full min-h-screen h-max p-4 mt-20'>
            <h1 className='text-center text-2xl font-bold'>Payment Form</h1>
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="py-2 px-4 text-left">Level</th>
                        <th className="py-2 px-4 text-left">Name & Details</th>
                        <th className="py-2 px-4 text-left">Payment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.from({ length: 9 }, (_, i) => {
                        const level = 9 - i;
                        let uplineUser = null;

                        if (level === 1) {
                        uplineUser = user;
                        } else if (upline.length >= (level - 1)) {
                        uplineUser = upline[level - 2]; // index 0 for level 2
                        }

                        const paid = paymentData?.[`level${level}`];
                        const amount = level === 1 ? 300 : 100;

                        return (
                        <tr key={level} className="border-t">
                            <td className="py-2 px-4 font-semibold">Level {level}</td>
                            <td className="py-2 px-4">
                            {uplineUser ? (
                                <>
                                <div className="font-medium">{uplineUser.name}</div>
                                <div className="text-sm text-gray-500">{uplineUser.mobile}</div>
                                <div className="text-xs text-gray-400">ID: {uplineUser.referralCode}</div>
                                </>
                            ) : (
                                <div className="text-gray-400 italic">Not Available</div>
                            )}
                            </td>
                            <td className="py-2 px-4">
                            {paid ? (
                                <span className="text-green-600 font-semibold">Paid</span>
                            ) : uplineUser ? (
                                <button
                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
                                onClick={() => setPaymentModal(level, uplineUser, amount)}
                                >
                                Pay ₹{amount}
                                </button>
                            ) : (
                                <span className="text-gray-400 italic">N/A</span>
                            )}
                            </td>
                        </tr>
                        );
                    })}

                    {/* Company Payment Row */}
                    <tr className="border-t bg-yellow-50">
                        <td className="py-2 px-4 font-semibold">—</td>
                        <td className="py-2 px-4">
                        <div className="font-medium">ProDeal</div>
                        {/* <div className="text-sm text-gray-500">Main Platform</div> */}
                        <div className="text-xs text-gray-400">ID: COMPANY</div>
                        </td>
                        <td className="py-2 px-4">
                        {paymentData?.company ? (
                            <span className="text-green-600 font-semibold">Paid</span>
                        ) : (
                            <button
                            className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 text-sm"
                            onClick={() => setPaymentModal('company', { name: 'Company', qrCode: PaymentQr }, 700)}
                            >
                            Pay ₹700
                            </button>
                        )}
                        </td>
                    </tr>

                    {/* Pay Everyone Summary Row */}
                    <tr className="border-t bg-green-50">
                    <td className="py-2 px-4 font-semibold text-green-700">Total</td>
                    <td className="py-2 px-4 text-green-700 font-semibold">Unpaid: ₹{totalUnpaid}</td>
                    <td className="py-2 px-4">
                        {totalUnpaid > 0 ? (
                        <button
                            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
                            onClick={() => {
                                setPaymentModal('company', { name: 'Company', qrCode: PaymentQr }, totalUnpaid)
                            }}
                        >
                            Pay all to company
                        </button>
                        ) : (
                        <span className="text-green-600 font-semibold">All Paid</span>
                        )}
                    </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>

        

        {
            isMenuOpen && (
                <>
                <div onClick={e => setIsMenuOpen(false)} className='w-screen h-screen bg-[#00000010] fixed top-0 left-0'></div>
                <Menu setIsOpen={setIsMenuOpen} user={user} setUser={setUser} />
                </>
            )
        }

        {
            isPaymentModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-max">
                        <h2 className="text-xl font-bold mb-4">Confirm Payment</h2>
                        <p className="mb-4">Pay ₹{isPaymentModalOpen.amount} to {isPaymentModalOpen.recipient.name} for Level {isPaymentModalOpen.level}?</p>
                        <img className='w-[100px] h-[100px]' src={isPaymentModalOpen.recipient.qrCode} alt="" />
                        <p className="text-sm text-gray-500 mb-4">Scan the QR code to complete the payment.</p>
                        <p className='mt-4 text-lg underline underline-offset-8 text-emerald-800 font-semibold'>Payment receipt / screenshot</p>
                        <input onChange={e => setCurrentReceipt(e.target.files[0])} type="file" className='w-full py-2 px-2 my-4 border-2 rounded text-emerald-800 font-semibold' alt="" />
                        <div className="flex justify-end space-x-2">
                            <button 
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setIsPaymentModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => handlePayment(isPaymentModalOpen.level, isPaymentModalOpen.recipient, isPaymentModalOpen.amount)}
                            >
                                Confirm Payment
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Payment