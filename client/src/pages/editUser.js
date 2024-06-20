import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import Navbar from './Navbar'
import Footer from './Footer'

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        display_name: "",
        pin_number: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDoc = await getDoc(doc(db, "Users", id));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setFormData(userData);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userDoc = doc(db, "Users", id);
            await updateDoc(userDoc, formData);
            navigate("/users");
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className='flex flex-col min-h-screen items-center bg-slate-100'>
            <Navbar />
            <main className="flex-1 text-4xl pt-10 items-center">
            <div className='bg-white p-8 rounded-xl w-[1000px]'>
                <div class=" bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto mt-10 md:mt-0 ">
                    <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Edit User</h2>
                    <form onSubmit={handleSubmit}>
                    <div class="relative mb-4">
                        <label for="full-name" class="leading-7 text-sm text-gray-600">Full Namee</label>
                        <input type="text" id="display_name" name="display_name" value={formData.display_name} onChange={handleChange} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div class="relative mb-4">
                        <label for="email" class="leading-7 text-sm text-gray-600">Pin Number</label>
                        <input type="text" id="pin_number" name="pin_number" value={formData.pin_number} onChange={handleChange} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <button class="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Save Edit</button>
                    <p class="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
                    </form>

                </div>
                </div>
                
            </main>
            <div className=" w-full text-center bg-slate-200 py-4">
                <Footer />
            </div>
        </div>
    );
};

export default EditUser;
