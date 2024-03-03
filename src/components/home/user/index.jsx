import { useSelector } from "react-redux"

export default function UserProfile(){
    const auth = useSelector((state)=>state.auth)
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto rounded-lg pt-4">
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
    )
}