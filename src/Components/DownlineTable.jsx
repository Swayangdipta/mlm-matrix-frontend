import { useState } from 'react';

const DownlineTable = ({ downline }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const totalPages = Math.ceil(downline.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = downline.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => setCurrentPage(p => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage(p => Math.max(p - 1, 1));

  return (
    <div className='w-full mt-6'>
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
            {currentData.map((user, index) => (
              <tr key={index} className='border-b'>
                <td className='px-4 py-2'>{startIndex + index + 1}</td>
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

      {/* Pagination */}
      <div className='flex justify-between items-center mt-4'>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className='px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50'
        >
          Previous
        </button>
        <span className='text-sm'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className='px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DownlineTable;