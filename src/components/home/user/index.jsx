import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

export default function UserProfile(){
    const auth = useSelector((state)=>state.auth)
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
        <div className="grid sm:grid-cols-1 md:grid-cols-3">
            <div className="flex justify-center items-center py-4 px-3">
                {auth?.user?.user_profile?.profile && (
                    <img
                    src={auth.user.user_profile.profile}
                    alt="user photo"
                    className="rounded-full w-1/2"
                    />
                )}
            </div>
            <div className=" px-4 py-3">
                <h1 className=" text-indigo-600 leading-10 text-2xl font-bold">Profile Detials:</h1>
                <p>Full Name: {auth.user?.first_name +" "+ auth.user?.last_name}</p>
                <p>Name: {auth.user?.username}</p>
                <p>Email: {auth.user?.email}</p>
            </div>
         
        </div>

        </div>
    )
}