import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../images/logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <header className="text-gray-600 body-font bg-white w-full">
      <div className="lg:w-[1300px] mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={logo} alt="Optimo Logo" className="w-12"/>
          <span className="ml-3 text-xl">Optimo Financial App</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center space-x-3">
          <NavLink to="/" className="lg:px-6 lg:pb-1 lg:text-lg lg:text-gray-500 lg:bg-blue-200 lg:rounded-full px-4 py-1 rounded-md bg-blue-400 text-white px-1  [&.active]:bg-blue-600 [&.active]:text-white">Home</NavLink>
          <NavLink to="/users" className="lg:px-6 lg:pb-1 lg:text-lg lg:text-gray-500 lg:bg-blue-200 lg:rounded-full px-4 py-1 rounded-md bg-blue-400 text-white px-1  [&.active]:bg-blue-600 [&.active]:text-white">Users</NavLink>
          <NavLink to="/signup" className="lg:px-6 lg:pb-1 lg:text-lg lg:text-gray-500 lg:bg-blue-200 lg:rounded-full px-4 py-1 rounded-md bg-blue-400 text-white px-1  [&.active]:bg-blue-600 [&.active]:text-white" >Notifications</NavLink>
          {!isLoggedIn && <NavLink to="/login" className="lg:px-6 lg:pb-1 lg:text-lg lg:text-gray-500 lg:bg-blue-200 lg:rounded-full px-4 py-1 rounded-md bg-blue-400 text-white px-1  [&.active]:bg-blue-600 [&.active]:text-white" >Login</NavLink>}
        </nav>
        {isLoggedIn && (
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-6 ml-3 focus:outline-none hover:bg-gray-200 rounded-full text-base mt-4 md:mt-0" onClick={logout}>
            Logout
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
