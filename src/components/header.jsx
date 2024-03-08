import { useState,useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {logout} from './redux/authSlice';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setLng } from "./redux/lngSlice";

export default function Header() {
    const auth = useSelector((state)=>state.auth)
    const [menu, setMenu] = useState(false);
    const [t, i18n] = useTranslation("global");
    const toggleMenu = () => { setMenu(!menu)};
    const [showLang, setShowLang] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const langRef = useRef();

    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (langRef.current && !langRef.current.contains(event.target)) {
            setShowLang(false);
          }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);

    const handleLogout = async (e) => {
        await dispatch(logout());
        navigate('/login');
    }

    const handleLanguageChange = (lng,dir) => {
        i18n.changeLanguage(lng);
        console.log("lng:",lng);
        console.log("dir:",dir);
        dispatch(setLng({ lng: lng, direction: dir }));
        // set the lng to localstorage as well.
        // localStorage.setItem('lng', lng);
        // close the language pop up as well
        setShowLang(false);
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
                    <Link to={'/'} className="text-xl text-white hover:text-gray-300 ">{t("header.home")}</Link>
                    <Link to={'/add-deal'} className="text-xl text-white hover:text-gray-300 ">{t("header.add-deal")}</Link>
                    <Link to={'/add-expense'} className="text-xl text-white hover:text-gray-300 ">{t("header.add-expense")}</Link>
                    <Link to={'/user'} className="text-xl text-white hover:text-gray-300 ">{t("header.my-profile")}</Link>
                    <Link to={'/company'} className="text-xl text-white hover:text-gray-300 ">{t("header.company")}</Link>
                    {/* <div className="relative">
                        <svg onClick={()=>setShowLang(!showLang)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                        className="w-6 h-6 text-white font-bold text-2xl">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                        </svg>
                        {showLang &&
                        <div ref={langRef} className="absolute left-1/2 z-10 mt-6 flex w-screen max-w-max -translate-x-1/2 px-4">
                            <div className=" max-w-md flex-auto overflow-hidden rounded-lg bg-white text-sm leading-6 shadow-lg">
                                <div onClick={()=>handleLanguageChange('en')} className="px-8 py-3 group relative rounded-lg hover:bg-gray-50 px-4">
                                    <span  className="font-semibold text-indigo-600"> Enlish </span>
                                </div>
                                <div onClick={()=>handleLanguageChange('ar')} className="px-8 py-3 group relative rounded-lg hover:bg-gray-50">
                                    <span  className="font-semibold text-indigo-600"> العربية </span>
                                </div>
                                <div onClick={()=>handleLanguageChange('fr')} className="px-8 py-3 group relative rounded-lg hover:bg-gray-50">
                                    <span  className="font-semibold text-indigo-600"> فارسی </span>
                                </div>
                            </div>
                        </div>}
                    </div> */}

                    <span onClick={handleLogout} className="text-xl text-white hover:text-gray-300 ">{t("header.logout")}</span>
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
                                {/* <h1 className="text-xl text-white ">{auth?.user?.email}</h1>  */}
                                <Link to={'/user'} className="text-xl bg-indigo-700 shadow-md px-4 py-1 mb-3 rounded-md text-white hover:bg-indigo-600 hover:text-gray-300 ">My Profile</Link>
                            </div>
                        </div>

                        <br />
                        <div className="relative">
                            <svg onClick={()=>setShowLang(!showLang)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                                className="w-6 h-6 mx-auto text-white font-bold text-2xl">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                            </svg>
                            {showLang &&
                            <div ref={langRef} className="absolute left-1/2 z-10 mt-6 flex w-screen max-w-max -translate-x-1/2 px-4">
                                <div className=" max-w-md flex-auto overflow-hidden rounded-lg bg-white text-sm leading-6 shadow-lg">
                                    <div onClick={()=>handleLanguageChange('en','ltr')} className="px-8 py-3 group relative rounded-lg hover:bg-gray-50 cursor-pointers">
                                        <span  className="font-semibold text-indigo-600"> Enlish </span>
                                    </div>
                                    <div onClick={()=>handleLanguageChange('ar','rtl')} className="px-8 py-3 group relative rounded-lg hover:bg-gray-50 cursor-pointers">
                                        <span  className="font-semibold text-indigo-600"> العربية </span>
                                    </div>
                                    <div onClick={()=>handleLanguageChange('fr','rtl')} className="px-8 py-3 group relative rounded-lg hover:bg-gray-50 cursor-pointers">
                                        <span  className="font-semibold text-indigo-600"> فارسی </span>
                                    </div>
                                </div>
                            </div>}
                        </div>


                        {/* Menu items */}
                        <div className="flex flex-col space-y-4 px-4">
                            <Link onClick={toggleMenu} to={'/'} className="text-xl text-white hover:font-bold hover:text-gray-200 ">{t("header.home")}</Link>
                            <Link onClick={toggleMenu} to={'/add-deal'} className="text-xl  text-white hover:text-gray-300 ">{t("header.add-deal")}</Link>
                            <Link onClick={toggleMenu} to={'/add-expense'} className="text-xl text-white hover:text-gray-300 ">{t("header.add-expense")}</Link>
                            <Link onClick={toggleMenu} to={'/company'} className="text-xl text-white hover:text-gray-300 ">{t("header.company")}</Link>
                            <span onClick={handleLogout} className="text-xl text-white hover:text-gray-300 ">{t('header.logout')}</span>
                            {/* <Link onClick={toggleMenu} to={'/blog'} className="text-xl text-white hover:text-gray-300 ">Blogs</Link> */}
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    );
}