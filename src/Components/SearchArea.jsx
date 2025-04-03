import React, { useState } from 'react';
import { searchDownline } from './helper/apiCalls';
import { Link } from 'react-router-dom';

const SearchArea = ({userId}) => {
    const [searchResults, setSearchResults] = useState(undefined)
    const [query, setQuery] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        if(query === '') alert('Invalid Data')
        const res = await searchDownline(userId,query)

        console.log(res);
        
        if(res.status === 200){
            setSearchResults(res.data)
            return
        }

        alert('Faild to search')
        
    }
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 mt-[60px] flex flex-col items-center border-dotted border-gray-600 border-2">
      <h2 className='text-left font-bold py-2'>Search Downline Members</h2>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        type="text"
        placeholder="Search here..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={handleSearch} className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600 transition">
        Search
      </button>

      {
        searchResults ? (
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
                {searchResults &&  (
                  <tr className="bg-white">
                    <td className="border p-2">
                      <Link className="text-sky-700 hover:text-sky-500 underline" to={`/admin/user/${searchResults?.sponsor}/${searchResults?.sponsor?.sponsor}`}>{searchResults?.sponsor || 'N/A'}</Link>
                    </td>
                    <td className="border p-2">
                      <Link className="text-sky-700 hover:text-sky-500 underline" to={`/admin/user/${searchResults._id}/${searchResults?.sponsor?._id}`}>{searchResults.referralCode}</Link>
                    </td>
                    <td className="border p-2">{searchResults.name || '-'}</td>
                    <td className="border p-2">{searchResults.username}</td>
                    <td className="border p-2">{searchResults.email || '-'}</td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
        ) : (<h2 className='mt-10'> Search something... </h2>)
      }
    </div>
  );
};

export default SearchArea;
