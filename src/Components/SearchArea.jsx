import React, { useState } from 'react';

const SearchArea = () => {
    const [searchResults, setSearchResults] = useState(undefined)
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 mt-[60px] flex flex-col items-center border-dotted border-gray-600 border-2">
      <h2 className='text-left font-bold py-2'>Search Downline Members</h2>
      <input
        type="text"
        placeholder="Search here..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600 transition">
        Search
      </button>

      {
        searchResults ? searchResults.length > 0 ? (
            <div className='mt-10 w-full h-max'>
                           <table className="min-w-full table-auto text-black border-collapse mb-6">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Sponsor</th>
                  <th className="border p-2">Referral Code</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Username</th>
                  <th className="border p-2">Email</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        ) : (<h2 className='mt-10'> Nothing Found. </h2>) : (<h2 className='mt-10'> Search something... </h2>)
      }
    </div>
  );
};

export default SearchArea;
