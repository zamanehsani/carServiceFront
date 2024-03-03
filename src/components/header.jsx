import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {logout} from './redux/authSlice';
import { useSelector } from "react-redux";

export default function Header() {
    const auth = useSelector((state)=>state.auth)
    const [menu, setMenu] = useState(false);
    
    const toggleMenu = () => { setMenu(!menu)};

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        await dispatch(logout());
        navigate('/login');
    }
    return (
        <div className="bg-indigo-600 bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-600 shadow-lg">
            <div className="container mx-auto">
                <div className="flex items-center justify-between p-4">
                    <div className="flex">
                        <h1 className="ml-4 lg:ml-0 font-bold text-white text-2xl">{auth && auth.company?.name}</h1>
                    </div>
                <div className="flex-grow "></div>

                <div className="hidden lg:flex items-center space-x-6">
                    <Link to={'/'} className="text-xl text-white hover:text-gray-300 ">Home</Link>
                    <Link to={'/add-deal'} className="text-xl text-white hover:text-gray-300 ">Add Deal</Link>
                    <Link to={'/add-expense'} className="text-xl text-white hover:text-gray-300 ">Add Expense</Link>
                    <Link to={'/user'} className="text-xl text-white hover:text-gray-300 ">My Profile</Link>
                    <Link to={'/company'} className="text-xl text-white hover:text-gray-300 ">Company</Link>
                    <span onClick={handleLogout} className="text-xl text-white hover:text-gray-300 ">Logout</span>
                </div>

                {/* <!-- Mobile menu icon (shown on small screens) --> */}
                <div className="lg:hidden">
                    <button onClick={toggleMenu}  className="text-white hover:text-gray-300">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>

                    {/* Off-screen menu */}
                    <div  className={`fixed inset-y-0 right-0 bg-indigo-600 w-8/12 sm:w-1/2 md:w-1/3 p-3 shadow-lg
                                transform lg:hidden transition-transform duration-300  z-20
                                ease-in-out ${menu ? 'translate-x-0':'translate-x-full'}`}>
                        <div className="bg-indigo-600">

                        </div>
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-indigo-900">
                            <h1 className="font-bold text-white text-xl">{auth && auth.company?.name}</h1>
                            <button onClick={toggleMenu} className="text-white hover:text-gray-300">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        
                        <div className="flex flex-col rounded-md mt-8 bg-indigo-100 p-2 m-2">
                            {/* user profile image centered */}
                            <div className="flex justify-center py-5 items-center w-full">
                                <img src={auth?.user?.user_profile?.profile} alt="user profile image" className="p-1 bg-indigo-600 w-1/2 h-auto shadow-md rounded-full" />
                            </div>
                            <div className="flex flex-col justify-center items-center w--full">
                                <h1 className="text-xl text-indigo-800 capitalize leading-9 my-1 font-extrabold">{auth?.user?.username}</h1>
                                <h1 className="text-xl text-white ">{auth?.user?.email}</h1> 
                                <Link to={'/user'} className="text-xl bg-indigo-700 shadow-md px-4 py-1 mb-3 rounded-md text-white hover:bg-indigo-600 hover:text-gray-300 ">My Profile</Link>
                            </div>
                        </div>
                        {/* Menu items */}
                        <div className="flex flex-col space-y-4 px-4">
                            <Link onClick={toggleMenu} to={'/'} className="text-xl text-white hover:font-bold hover:text-gray-200 ">Home</Link>
                            <Link onClick={toggleMenu} to={'/add-deal'} className="text-xl  text-white hover:text-gray-300 ">Add Deal</Link>
                            <Link onClick={toggleMenu} to={'/add-expense'} className="text-xl text-white hover:text-gray-300 ">Add Expense</Link>
                            <Link onClick={toggleMenu} to={'/company'} className="text-xl text-white hover:text-gray-300 ">Company</Link>
                            <span onClick={handleLogout} className="text-xl text-white hover:text-gray-300 ">Logout</span>
                            {/* <Link onClick={toggleMenu} to={'/blog'} className="text-xl text-white hover:text-gray-300 ">Blogs</Link> */}
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    );
}