import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { addDoc, collection, serverTimestamp, getDocs, query, orderBy, deleteDoc, doc} from "firebase/firestore";
import { db } from "../firebase-config";


const Signup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === '' || message.trim() === '') {
      setError('Title and message cannot be empty');
      return;
    }
    try {
      const notificationRef = collection(db, 'notifications');
      await addDoc(notificationRef, {
        date: serverTimestamp(),
        title: title,
        message: message
      });
      console.log('Data pushed to Firebase: Title:', title, 'Message:', message);
      setTitle('');
      setMessage('');
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    } catch (error) {
      console.error('Error adding document: ', error);
      setError('Failed to submit notification');
    }
  };

  const handleDelete = async (index) => {
    try {
      const notificationId = notifications[index].id;
      await deleteDoc(doc(db, 'notifications', notificationId));
      setNotifications(prevNotifications => prevNotifications.filter((_, idx) => idx !== index));
      console.log('Notification deleted successfully');
    } catch (error) {
      console.error('Error deleting notification:', error);
      setError('Failed to delete notification');
    }
  };

  useEffect(() => {
    const initialLoggedInState = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(initialLoggedInState);

    if (!initialLoggedInState) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsCollection = collection(db, 'notifications');
        const q = query(notificationsCollection, orderBy('date', 'desc')); // Sort notifications by date in descending order
        const snapshot = await getDocs(q);
        const notificationData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNotifications(notificationData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to fetch notifications');
      }
    };

    fetchNotifications();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className='lg:flex lg:flex-col bg-slate-100'>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <main className='flex-1 text-4xl pt-10'>
        <div className='p-8 rounded-xl lg:w-[1300px] w-full mx-auto'>
          <div className="lg:flex">
            <div className="lg:w-2/3 lg:pr-14 w-full">
              {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
              {notifications.map((notification, index) => (
                <div key={index} className='bg-white p-2 rounded-lg my-2'>
                  <div className="pl-6 mt-3 text-sm font-medium text-blue-900 flex justify-between">
                    <span>{notification.date ? new Date(notification.date.seconds * 1000).toLocaleString() : 'N/A'}</span>
                    <span>
                      <button onClick={() => handleDelete(index)} className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-center'>Delete</button>
                    </span>
                  </div>
                  <div className="px-6">
                    <p className="lg:text-2xl pt-4 lg:leading-10 text-xl leading-7 font-semibold text-gray-900 mb-3">{notification.title}</p>
                    <p className="pt-1 mb-5 text-base">{notification.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:w-1/3 lg:flex lg:flex-col w-full ml-auto">
              <div className='bg-white lg:p-8 p-8 rounded-lg shadow'>
                <form onSubmit={handleSubmit}>
                  <h2 className="text-gray-900 text-2xl font-semibold title-font mb-5">Add Notifications</h2>
                  
                  <div className="relative mb-1">
                    <label htmlFor="title" className="leading-7 text-base font-medium text-gray-600">Title</label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative mb-1">
                    <label htmlFor="message" className="leading-7 text-base font-medium text-gray-600">Message</label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                  {error && <p className="text-red-500 text-lg">{error}</p>}
                  <button
                    className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                    type="submit"
                  >
                    Submit
                  </button>
                  
                  {showConfirmation && <p className="text-green-600 text-sm font-medium mt-2">Successfully Submitted Notification</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className='w-full text-center bg-slate-200 py-4'>
        <Footer />
      </div>
    </div>
  );
}

export default Signup;
