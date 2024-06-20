import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import Navbar from './Navbar';
import Footer from './Footer';

const initialLoggedInState = localStorage.getItem('isLoggedIn') ?? false;

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedin, setIsLoggedin] = useState(initialLoggedInState === 'true');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    const querySnapshot = await getDocs(collection(db, 'adminuser'));
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.username === username && userData.password === password) {
        setIsLoggedin(true);
      } else {
        setErrorMessage('You have entered wrong details.');
      }
    });
  }

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedin);
    if (isLoggedin) {
      navigate("/users");
    } else {
      navigate("/login");
    }
  }, [isLoggedin]);

  return (
    <div>
      <div>
        <form>
          <div className='flex flex-col min-h-screen items-center bg-slate-100'>
            <Navbar />
            <main className="flex-1 text-4xl pt-10 items-center">
              <div>
                <section className="text-gray-600 body-font">
                  <div className="lg:w-[1300px] md:w-32 sm:w-32 px-5 lg:py-24 sm:py-4 mx-auto flex flex-wrap items-center">
                    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                      <h1 className="text-xl font-bold  text-gray-900 md:text-base lg:text-3xl lg:font-medium">Optimo App administrator login</h1>
                      <p className="lg:leading-relaxed lg:mt-4 lg:text-xl lg:font-medium text-base "><span className='text-blue-700'>Welcome, Administrator!</span> Your secure gateway to system management awaits. Please proceed with your credentials.</p>
                    </div>
                    <div className="lg:w-2/6 md:w-1/2 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-white">
                      <h2 className="text-gray-900 text-3xl font-medium title-font mb-5">Login</h2>
                      <div className="relative mb-4">
                        <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Username</label>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                      </div>
                      <div className="relative mb-4">
                        <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Password</label>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                      </div>
                      <button type="button" className="text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-blue-500 rounded text-lg" onClick={handleLogin}>Login</button>
                      {errorMessage && <p className="text-red-500 text-sm font-semibold text-center mt-3">{errorMessage}</p>}
                      <p className="text-xs text-gray-500 mt-3">Attention Administrator: Unauthorized access is strictly prohibited. Please ensure proper credentials are used for login.</p>
                    </div>
                  </div>
                </section>
              </div>
            </main>
            <div className="w-full text-center bg-slate-200 py-4">
              <Footer />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
