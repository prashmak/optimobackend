import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { collection, getDocs, deleteDoc, doc, query, where, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { db } from '../firebase-config';
import ReactPaginate from 'react-paginate';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const usersPerPage = 50;

  const getUsers = async () => {
    const usersCollectionRef = collection(db, 'Users');
    const data = await getDocs(usersCollectionRef);
    const usersData = [];
    for (const userDoc of data.docs) {
      const userData = userDoc.data();
      const userId = userDoc.id;
      const assetsCollectionRef = collection(db, 'Users', userId, 'Assets');
      const assetsSnapshot = await getDocs(assetsCollectionRef);
      const assetsData = assetsSnapshot.docs.map((assetDoc) => assetDoc.data());
      usersData.push({ ...userData, id: userId, assets: assetsData });
    }
    setUsers(usersData);
  };

  const deleteUser = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        // Delete user document
        const userDocRef = doc(db, 'Users', id);
        await deleteDoc(userDocRef);
  
        // Delete associated documents in 'Assets' subcollection
        const assetsQuery = query(collection(db, 'Users', id, 'Assets'));
        const assetsSnapshot = await getDocs(assetsQuery);
        const deletePromises = assetsSnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
  
        // Repeat the above for other subcollections like 'Insurance', 'Liabilities', etc.
  
        // Refresh users list
        getUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  

  useEffect(() => {
    const initialLoggedInState = localStorage.getItem('isLoggedIn') === 'true';
    if (!initialLoggedInState) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    getUsers();
  }, []);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const filteredUsers = users.filter(user =>
    user.display_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = filteredUsers.slice().sort((a, b) => {
    if (sortBy === 'display_name') {
      return sortOrder === 'asc' ? a.display_name.localeCompare(b.display_name) : b.display_name.localeCompare(a.display_name);
    } else if (sortBy === 'created_time') {
      return sortOrder === 'asc' ? a.created_time - b.created_time : b.created_time - a.created_time;
    } else {
      return 0;
    }
  });

  const offset = currentPage * usersPerPage;
  const pageCount = Math.ceil(sortedUsers.length / usersPerPage);
  const displayedUsers = sortedUsers.slice(offset, offset + usersPerPage);

  return (
    <div className='flex flex-col min-h-screen items-center bg-slate-100'>
      <Navbar />
      <main className='flex-1 text-4xl pt-10 items-center'>
        <div className='bg-white lg:p-8 p-2 rounded-xl w-full lg:w-[1300px]'>
          <input
            type='text'
            placeholder='Search users...'
            value={searchQuery}
            onChange={handleSearch}
            className='w-full border lg:text-base text-base font-semibold border-slate-300 rounded-md py-2 pl-2 pr-3 mt-6 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
          />
          <div className='py-3 mb-1 text-base'>
            Total Users: {users.length}
          </div>
          <table className='table table-hover text-lg w-full font-normal'>
            {/* Table header */}
            <thead className='bg-slate-200 h-10'>
              <tr className='border-b-1 border-gray-600 text-base font-normal'>
                <th scope='col'>#</th>
                <th scope='col' className='text-left' onClick={() => handleSort('display_name')}>Name</th>
                <th scope='col' className='lg:flex lg:text-left lg:pt-2 lg:text-base md:text-sm hidden' onClick={() => handleSort('created_time')}>Created Date <img className="mt-2 ml-2 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></th>
                <th scope='col'>View</th>
                <th scope='col'>Edit</th>
                <th scope='col'>Delete</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {displayedUsers.map((user, index) => (
                <tr key={user.id} className='text-center bg-white odd:bg-gray-100'>
                  <th scope='row'>{offset + index + 1}</th>
                  <td className='text-left p-2'>{user.display_name}</td>
                  <td className='lg:block lg:text-left lg:p-2 lg:text-base lg:font-medium text-sm hidden'>{user.created_time ? new Date(user.created_time.seconds * 1000).toLocaleDateString() : 'N/A'}</td>
                  <td className='w-[100px]'>
                    <Link to={`/viewUser/${user.id}`} className='bg-green-600 hover:bg-green-500 text-white text-sm p-1 m-1 rounded text-center'>
                      View User
                    </Link>
                  </td>
                  <td className='lg:w-[100px] w-[130px]'>
                    <Link to={`/editUser/${user.id}`} className='bg-blue-500 hover:bg-blue-600 text-white text-sm p-1 m-1 rounded text-center'>
                      Edit User
                    </Link>
                  </td>
                  <td className='lg:w-[100px] w-[140px]'>
                    <button
                      className='bg-red-500 hover:bg-red-600 text-white text-sm p-1 m-1 rounded text-center'
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'number-link-active'}
            previousClassName={'prev'}
            nextClassName={'next'}
            pageClassName={'pagination-link'}
            pageLinkClassName={'number-link'}
            breakClassName={'pagination-br'}
            disabledClassName={'pagination-link disabled'}
            //containerClassName={'pagination-container'} // Add this line
          />
        </div>
      </main>
      <div className='w-full text-center bg-slate-200 py-4'>
        <Footer />
      </div>
    </div>
  );
};

export default Users;
