import { useSelector } from "react-redux"
import { useState } from "react";
import { Link } from "react-router-dom";
import EditProfile from "./edit";

export default function UserProfile(){
    const auth = useSelector((state)=>state.auth)
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div className="grid grid-cols-1 max-w-6xl mx-auto rounded-lg my-4 p-5 ">
            <div className="flex my-4 ml-5 overflow-x-auto" >
                <Link to={'/'} className="flex"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                 <span className="text-indigo-600 mx-3">/</span></Link> 
                <span className="text-indigo-900"> User Profile</span> 
            </div>
            {!editMode && 
                <div className="grid sm:grid-cols-1 md:grid-cols-3">
                    <div className="flex justify-center items-center py-4 px-3">
                        {auth?.user?.user_profile?.profile && (
                            <img
                            src={auth.user.user_profile.profile}
                            alt={auth?.user?.username}
                            className="rounded-full w-8/12"
                            />
                        )}
                    </div>
                    <div className=" px-4 py-3 text-center">
                        {/* <h1 className=" text-indigo-600 leading-10 text-2xl font-bold">Profile Detials:</h1> */}
                        <p>{auth.user?.username}</p>
                        <p>{auth.user?.first_name +" "+ auth.user?.last_name}</p>
                        <p>{auth.user?.email}</p>
                        <span className='' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                            className="text-indigo-500 w-8 h-8 mx-auto"
                            onClick={(e)=>setEditMode(true)}>
                                <path strokeLinecap="round" strokeLinejoin="round" 
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </span> 
                    </div>
                </div>
            }
            {/* in case of editing, show the editing component */}
            {editMode && <EditProfile 
                setEditMode={setEditMode} 
                setError={setError}
                error={error}
                user={auth?.user} />}
              
        </div>
    )
}