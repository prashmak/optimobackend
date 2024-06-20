import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const ViewUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [assetsData, setAssetsData] = useState(null);
  const [liabilitiesData, setLiabilitiesData] = useState(null);
  const [insuranceData, setInsuranceData] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [questionsData, setQuestionsData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, "Users", id));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserData(userData);
          
          // Fetch Assets
          const assetsCollectionRef = collection(db, "Users", id, "Assets");
          const assetsSnapshot = await getDocs(assetsCollectionRef);
          const assetsData = assetsSnapshot.docs.map(doc => doc.data());
          setAssetsData(assetsData);

          // Fetch Liabilities
          const liabilitiesCollectionRef = collection(db, "Users", id, "Liabilities");
          const liabilitiesSnapshot = await getDocs(liabilitiesCollectionRef);
          const liabilitiesData = liabilitiesSnapshot.docs.map(doc => doc.data());
          setLiabilitiesData(liabilitiesData);

          // Fetch Insurance
          const insuranceCollectionRef = collection(db, "Users", id, "Insurance");
          const insuranceSnapshot = await getDocs(insuranceCollectionRef);
          const insuranceData = insuranceSnapshot.docs.map(doc => doc.data());
          setInsuranceData(insuranceData);

          // Fetch Transaction
          const transactionCollectionRef = collection(db, "Users", id, "Transaction");
          const transactionSnapshot = await getDocs(transactionCollectionRef);
          const transactionData = transactionSnapshot.docs.map(doc => doc.data());
          setTransactionData(transactionData);

          // Fetch Questions
          const questionsCollectionRef = collection(db, "Users", id, "Questions");
          const questionsSnapshot = await getDocs(questionsCollectionRef);
          const questionsData = questionsSnapshot.docs.map(doc => doc.data());
          setQuestionsData(questionsData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    const initialLoggedInState = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(initialLoggedInState);
    
    if (!initialLoggedInState) {
      navigate('/login');  
    }
  }, [navigate]);

  if (!userData || !assetsData || !liabilitiesData || !insuranceData || !transactionData || !questionsData) {
    return <div>Loading...</div>;
  }

  return (




    <div className='lg:flex lg:flex-col min-h-screen items-center bg-slate-100'>
      
    <Navbar />
    <main className="flex-1 text-2xl pt-10 items-center">
      <div className='bg-white lg:p-8 rounded-xl lg:w-[1300px]'>
        <div class=" bg-gray-100 rounded-lg lg:p-8 flex flex-col md:ml-auto mt-10 md:mt-0 ">
          
          <div class="w-full container px-5 mx-auto">
            <div class="text-center mb-6">
              <h1 class="lg:text-2xl text-2xl font-medium text-center title-font text-gray-900 mb-4">{userData.display_name}</h1>
              <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto"> Complete Details</p>
            </div>
            
            <div class="lg:flex lg:flex-wrap sm:mx-auto sm:mb-2 -mx-2">
              {/* Personal Information */}
              <div className="w-full my-1 font-medium text-center text-lg p-2 rounded uppercase text-gray-900 bg-gray-200">Personal Information</div>
              {/* Users Table */}
              <div class="p-2 lg:w-1/2 ">
                <div class="bg-white rounded flex p-2 lg:h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-blue-500 w-5 h-5 flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font lg:text-xl text-base text-blue-400 font-medium pr-1">User ID:</span>
                  <span class="title-font lg:text-xl text-base font-medium">{userData.user_id}</span>
                </div>
              </div>
              <div class="p-2 lg:w-1/2 w-full">
                <div class="bg-white rounded flex p-2 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-blue-500 w-5 h-5 flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font lg:text-xl text-base text-blue-400 font-medium pr-1">Age:</span>
                  <span class="title-font lg:text-xl text-base font-medium">{userData.user_age}</span>
                </div>
              </div>
              <div class="p-2 lg:w-1/2 w-full">
                <div class="bg-white rounded flex p-2 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-blue-500 w-5 h-5 flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font lg:text-xl text-base text-blue-400 font-medium pr-1">Phone Number:</span>
                  <span class="title-font lg:text-xl text-base font-medium ">{userData.phone_number}</span>
                </div>
              </div>
              <div class="p-2 lg:w-1/2 w-full">
                <div class="bg-white rounded flex p-2 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-blue-500 w-5 h-5 flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font lg:text-xl text-base font-medium  text-blue-400  pr-1">Date of Birth:</span>
                  <span class="title-font lg:text-xl text-base font-medium"> {userData.date_of_birth ? new Date(userData.date_of_birth.seconds * 1000).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
              <div class="p-2 lg:w-1/2 w-full">
                <div class="bg-white rounded flex p-2 lg:h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-blue-500 w-5 h-5 flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font lg:text-xl text-base font-medium  text-blue-400  pr-1">Created:</span>
                  <span class="title-font lg:text-xl text-base font-medium">{userData.created_time ? new Date(userData.created_time.seconds * 1000).toLocaleString() : 'N/A'}</span>
                </div>
              </div>
              <div class="p-2 lg:w-1/2 w-full">
                <div class="bg-white rounded flex p-2 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-blue-500 w-5 h-5 flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font lg:text-xl text-base font-medium  text-blue-400  pr-1">Device Location:</span>
                  <span class="title-font lg:text-xl text-base font-medium">{userData.device_location ? `${userData.device_location.latitude}, ${userData.device_location.longitude}` : 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Questions */}

                           <div class="w-f bg-white">
                  
                  {/* Render all fields from assetsData */}
                  {questionsData.map((questions, index) => (
                    <div key={index} className="p-2">
                    <div className="h1 w-full  my-1 rounded font-medium text-center text-lg p-2 uppercase text-gray-900 bg-gray-200">Questions</div>
                      <div className="bg-white rounded p-2 ">
                        {/* Render each field dynamically */}

                        {/* q1 / q2*/}
                        <div className=" bg-white my-1 border border-blue-400 rounded-md">
                          <div className="flex justify-between p-3 border-b border-gray-200">
                            <div class="title-font text-base text-blue-400 font-medium pr-1">What is your Gender?:</div>
                            <div className="text-base font-semibold ">{questions.q1}</div>
                          </div>
                          <div className="flex justify-between p-3 border-b border-gray-200">
                            <div class="title-font text-base text-blue-400 font-medium pr-1">How many members are in your family?:</div>
                            <div className="text-base font-semibold ">{questions.q2}</div>
                          </div>
                        </div>

                        {/* q3 / q4*/}

                        <div className=" bg-white my-1 border border-blue-400 rounded-md">
                          <div className="flex justify-between p-3 border-b border-gray-200">
                            <div class="title-font text-base text-blue-400 font-medium pr-1">Are you Salaried or Business?:</div>
                            <div className="text-base font-semibold "> {questions.q3}</div>
                          </div>
                          <div className="flex justify-between p-3 border-b border-gray-200">
                            <div class="title-font text-base text-blue-400 font-medium pr-1">How is your income flow:</div>
                            <div className="text-base font-semibold ">{questions.q4}</div>
                          </div>
                        </div>

                        {/* q5 / q6*/}

                        <div className=" bg-white my-1 border border-blue-400 rounded-md">
                          <div className="flex justify-between p-3 border-b border-gray-200">
                            <div class="title-font text-base text-blue-400 font-medium pr-1">What is your Annual Income?:</div>
                            <div className="text-base font-semibold "> ₹ {questions.q5.toLocaleString('en-IN')}</div>
                          </div>
                          <div className="flex justify-between p-3 border-b border-gray-200">
                            <div class="title-font text-base text-blue-400 font-medium pr-1">How are your Monthly Expenses:</div>
                            <div className="text-base font-semibold ">₹ {questions.q6.toLocaleString('en-IN')}</div>
                          </div>
                        </div>


                         {/* Medical Insurance */}



                        {/* Other Insurance */}

                      </div>
                    </div>
                  ))}
                </div>

           
              <div className="lg:flex lg:flex-wrap">

                {/* Assets */}
                <div class="lg:w-1/3 w-full bg-white">
                  
                  {/* Render all fields from assetsData */}
                  {assetsData.map((asset, index) => (
                    <div key={index} className="p-2">
                      <div className="my-1 font-medium text-center text-lg p-2 rounded uppercase text-gray-900 bg-gray-200">Assets</div>
                      <div className="bg-white rounded p-2 ">
                        {/* Render each field dynamically */}
                        <ul>

                          {/* fixed Deposit */}
                          <span className="flex text-sm font-medium pt-4 text-gray-600">Fixed Deposit <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                          <div className=" bg-white my-1 border border-blue-400 rounded-md">
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Fixed Deposit Amount:</div>
                              <div className="text-base font-semibold ">₹ {asset.fd1.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Fixed Deposit Interest:</div>
                              <div className="text-base font-semibold ">₹ {asset.fd2.toLocaleString('en-IN')}</div>
                            </div>
                          </div>

                          {/* Gold */}
                          <span className="flex text-sm font-medium pt-4 text-gray-600">Gold <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                          <div className=" bg-white my-1 border border-blue-400 rounded-md">
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Physical Gold in grams:</div>
                              <div className="text-base font-semibold ">₹ {asset.gd1.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Physical Gold ETFs:</div>
                              <div className="text-base font-semibold ">₹ {asset.gd2.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Soverign Gold Bond:</div>
                              <div className="text-base font-semibold ">₹ {asset.gd3.toLocaleString('en-IN')}</div>
                            </div>
                          </div>

                          {/* Mutual Fund */}
                          <span className="flex text-sm font-medium pt-4 text-gray-600">Mutual Fund <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                          <div className=" bg-white my-1 border border-blue-400 rounded-md">
                          <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">MF Type:</div>
                              <div className="text-base font-semibold ">{asset.mf4}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">MF Lumpsum Current Amount:</div>
                              <div className="text-base font-semibold ">₹ {asset.mf1.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">MF SIP Current Amount:</div>
                              <div className="text-base font-semibold ">₹ {asset.mf2.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">MF SIP:</div>
                              <div className="text-base font-semibold ">₹ {asset.mf3.toLocaleString('en-IN')}</div>
                            </div>
                            
                          </div>


                          {/* Real Estate */}
                          <span className="flex text-sm font-medium pt-4 text-gray-600">Real Estate <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                          <div className=" bg-white my-1 border border-blue-400 rounded-md">
                          <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Real Estate Type:</div>
                              <div className="text-base font-semibold ">{asset.re}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Real Estate Self Occupied:</div>
                              <div className="text-base font-semibold ">₹ {asset.re1.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Real Estate Non Occupied:</div>
                              <div className="text-base font-semibold ">₹ {asset.re2.toLocaleString('en-IN')}</div>
                            </div>
                          </div>

                          

                          {/* Stocks */}
                          <span className="flex text-sm font-medium pt-4 text-gray-600">Stocks <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                          <div className=" bg-white my-1 border border-blue-400 rounded-md">
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Stocks:</div>
                              <div className="text-base font-semibold ">₹ {asset.st.toLocaleString('en-IN')}</div>
                            </div>
                          </div>

                          {/* Vehicle */}
                          <span className="flex text-sm font-medium pt-4 text-gray-600">Vehicle <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                          <div className=" bg-white my-1 border border-blue-400 rounded-md">
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Vehicle:</div>
                              <div className="text-base font-semibold ">₹ {asset.ve.toLocaleString('en-IN')}</div>
                            </div>
                          </div>

                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Liabilities */}

                <div class="lg:w-1/3  bg-white">
                  
                  {/* Render all fields from assetsData */}
                  {liabilitiesData.map((liabilities, index) => (
                    <div key={index} className="p-2  w-full">
                      <div className="h1 w-full  my-1 rounded font-medium text-center text-lg p-2 uppercase text-gray-900 bg-gray-200">Liabilities</div>
                      <div className="bg-white rounded p-2 ">
                        {/* Render each field dynamically */}
                        <ul>

                           {/* Business Loan Amount */}
                           <span className="flex text-sm font-medium pt-4 text-gray-600">Business Loan <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                          <div className=" bg-white my-1 border border-blue-400 rounded-md">
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Business Loan Amount:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.bl1.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">BL EMI Amount:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.bl2.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">BL EMI Remaining:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.bl3.toLocaleString('en-IN')}</div>
                            </div>
                          </div>

                           {/* Home Loan Amount */}
                           <span className="flex text-sm font-medium pt-4 text-gray-600">Home Loan <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                           <div className=" bg-white my-1 border border-blue-400 rounded-md">
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Loan Amount:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.hl1.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">EMI Amount:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.hl2.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">EMIs Remaining:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.hl3.toLocaleString('en-IN')}</div>
                            </div>
                          </div>

                          {/* Personal Amount */}
                          <span className="flex text-sm font-medium pt-4 text-gray-600">Personal Loan <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                          <div className=" bg-white my-1 border border-blue-400 rounded-md">
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Loan Amount:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.pl1.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">EMI Amount:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.pl2.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">EMIs Remaining:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.pl3.toLocaleString('en-IN')}</div>
                            </div>
                          </div>

                           {/* Study Loan Amount */}
                           <span className="flex text-sm font-medium pt-4 text-gray-600">Study Loan <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                          <div className=" bg-white my-1 border border-blue-400 rounded-md">
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Loan Amount:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.sl1.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">EMI Amount:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.sl2.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">EMIs Remaining:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.sl3.toLocaleString('en-IN')}</div>
                            </div>
                          </div>

                          {/* Vehicle Loan Amount */}
                          <span className="flex text-sm font-medium pt-4 text-gray-600">Vehicle Loan <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                          <div className=" bg-white my-1 border border-blue-400 rounded-md">
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Loan Amount:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.ve1.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">EMI Amount:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.ve2.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-200">
                              <div className="text-base text-blue-400 font-medium pr-1 max-w-full">EMIs Remaining:</div>
                              <div className="text-base font-semibold ">₹ {liabilities.ve3.toLocaleString('en-IN')}</div>
                            </div>
                          </div>

                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Insurance */}

                <div class="lg:w-1/3  bg-white">
                  
                  {/* Render all fields from assetsData */}
                  {insuranceData.map((insurance, index) => (
                    <div key={index} className="p-2">
                    <div className="h1 w-full  my-1 rounded font-medium text-center text-lg p-2 uppercase text-gray-900 bg-gray-200">Insurance</div>
                      <div className="bg-white rounded p-2 ">
                        {/* Render each field dynamically */}

                        {/* Home Insurance */}
                        <span className="flex text-sm font-medium pt-4 text-gray-600">Home Insurance <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                        <div className=" bg-white my-1 border border-blue-400 rounded-md">
                          <div className="flex justify-between p-3 border-b border-gray-200">
                            <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Current Amount:</div>
                            <div className="text-base font-semibold ">₹ {insurance.hi1.toLocaleString('en-IN')}</div>
                          </div>
                          <div className="flex justify-between p-3 border-b border-gray-200">
                            <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Total Amount:</div>
                            <div className="text-base font-semibold ">₹ {insurance.hi2.toLocaleString('en-IN')}</div>
                          </div>
                        </div>

                        {/* Life Insurance */}
                        <span className="flex text-sm font-medium pt-4 text-gray-600">Life Insurance <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                        <div className=" bg-white my-1 border border-blue-400 rounded-md">
                          <div className="flex justify-between p-3 border-b border-gray-200">
                            <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Current Amount:</div>
                            <div className="text-base font-semibold ">₹ {insurance.li1.toLocaleString('en-IN')}</div>
                          </div>
                          <div className="flex justify-between p-3 border-b border-gray-200">
                            <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Total Amount:</div>
                            <div className="text-base font-semibold ">₹ {insurance.li2.toLocaleString('en-IN')}</div>
                          </div>
                        </div>


                         {/* Medical Insurance */}
                         <span className="flex text-sm font-medium pt-4 text-gray-600">Medical Insurance <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                         <div className=" bg-white my-1 border border-blue-400 rounded-md">
                          <div className="flex justify-between p-3 border-b border-gray-200">
                            <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Current Amount:</div>
                            <div className="text-base font-semibold ">₹ {insurance.mi1.toLocaleString('en-IN')}</div>
                          </div>
                          <div className="flex justify-between p-3 border-b border-gray-200">
                            <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Total Amount:</div>
                            <div className="text-base font-semibold ">₹ {insurance.mi2.toLocaleString('en-IN')}</div>
                          </div>
                        </div>


                        {/* Other Insurance */}
                        <span className="flex text-sm font-medium pt-4 text-gray-600">Other Insurance <img className="m-1 w-3 h-3" src={require('../images/arrow-down.png')} alt='require function fails'></img></span>
                        <div className=" bg-white my-1 border border-blue-400 rounded-md">
                          <div className="flex justify-between p-3 border-b border-gray-200">
                            <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Current Amount:</div>
                            <div className="text-base font-semibold ">₹ {insurance.oi1.toLocaleString('en-IN')}</div>
                          </div>
                          <div className="flex justify-between p-3 border-b border-gray-200">
                            <div className="text-base text-blue-400 font-medium pr-1 max-w-full">Total Amount:</div>
                            <div className="text-base font-semibold ">₹ {insurance.oi2.toLocaleString('en-IN')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            {/* Transaction */}

            <div className="lg:flex lg:flex-wrap">
                <div class="w-full ">
                  {/* Render all fields from transaction */}
                  {transactionData.map((transaction, index) => (
                    <div key={index} className="p-2 w-full">
                      <div className="w-full my-1 font-medium text-center text-lg p-2 rounded uppercase text-gray-900 bg-gray-200">Premium Member Appointment Booking</div>
                      
                      <div className="flex flex-wrap">
                        <div class="p-2 sm:w-1/2 w-full">
                          <div class="bg-white rounded flex p-2 h-full items-center">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-blue-500 w-5 h-5 flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24">
                              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                              <path d="M22 4L12 14.01l-3-3"></path>
                            </svg>
                            <span class="title-font text-xl text-blue-400 font-medium pr-1">Transaction ID:</span>
                            <span class="title-font text-xl font-medium">{transaction.transaction_id}</span>
                          </div>
                        </div>
                        <div class="p-2 sm:w-1/2 w-full">
                          <div class="bg-white rounded flex p-2 h-full items-center">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-blue-500 w-5 h-5 flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24">
                              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                              <path d="M22 4L12 14.01l-3-3"></path>
                            </svg>
                            <span class="title-font text-xl text-blue-400 font-medium pr-1">Appointment Amount:</span>
                            <span class="title-font text-xl font-medium">₹ {transaction.transaction_amount.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                        <div class="p-2 sm:w-1/2 w-full">
                          <div class="bg-white rounded flex p-2 h-full items-center">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-blue-500 w-5 h-5 flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24">
                              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                              <path d="M22 4L12 14.01l-3-3"></path>
                            </svg>
                            <span class="title-font text-xl text-blue-400 font-medium pr-1">Appointment Date:</span>
                            <span class="title-font text-xl font-medium">{transaction.appointment_date ? new Date(transaction.appointment_date.seconds * 1000).toLocaleDateString() : 'N/A'}</span>
                          </div>
                        </div>
                        <div class="p-2 sm:w-1/2 w-full">
                          <div class="bg-white rounded flex p-2 h-full items-center">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-blue-500 w-5 h-5 flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24">
                              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                              <path d="M22 4L12 14.01l-3-3"></path>
                            </svg>
                            <span class="title-font text-xl text-blue-400 font-medium pr-1">Appointment Time:</span>
                            <span class="title-font text-xl font-medium">{transaction.appointment_time}</span>
                          </div>
                        </div>
                        <div class="p-2 sm:w-1/2 w-full">
                          <div class="bg-white rounded flex p-2 h-full items-center">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-blue-500 w-5 h-5 flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24">
                              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                              <path d="M22 4L12 14.01l-3-3"></path>
                            </svg>
                            <span class="title-font text-xl text-blue-400 font-medium pr-1">Billing Date:</span>
                            <span class="title-font text-xl font-medium">{transaction.billing_date ? new Date(transaction.billing_date.seconds * 1000).toLocaleDateString() : 'N/A'}</span>
                          </div>
                        </div>
                        <div class="p-2 sm:w-1/2 w-full">
                          <div class="bg-white rounded flex p-2 h-full items-center">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-blue-500 w-5 h-5 flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24">
                              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                              <path d="M22 4L12 14.01l-3-3"></path>
                            </svg>
                            <span class="title-font text-xl text-blue-400 font-medium pr-1">Valid Upto Date:</span>
                            <span class="title-font text-xl font-medium">{transaction.valid_upto_date ? new Date(transaction.valid_upto_date.seconds * 1000).toLocaleDateString() : 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                      
                      
                    </div>
                  ))}
                </div>


                
              </div>


            {/* Back Button */}
            <div className="w-50 w-full mt-20 text-center"><Link to={`/Users`} className="text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-blue-400 rounded text-lg ">Back</Link></div>
          </div>
        </div>
      </div>

    </main>
    <div className=" w-full text-center bg-slate-200 py-4">
      <Footer />
    </div>
  </div>
);
};

export default ViewUser;