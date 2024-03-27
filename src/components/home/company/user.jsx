import { UserIcon } from '@heroicons/react/24/outline';
import  {Link} from 'react-router-dom';
import RemoveUser from './removeUser';
import { useSelector } from 'react-redux';

export default function User({user}){
    const auth = useSelector((state)=>state.auth)
    function extractIdFromUrl(url) {
        // Regular expression to match the ID part of the URL
        const regex = /\/(\d+)\/$/;
        // Match the regex pattern against the URL
        const match = url.match(regex);
        // If a match is found, return the extracted ID, otherwise return null
        return match ? match[1] : null;
    }
    
    return <div className=" m-1 p-3 border border-indigo-500 rounded-md">
        <div className=''>
            <div className="flex-none mx-auto w-32 p-3 justify-center items-center ">
                {user?.profile && 
                <img src={user?.profile} alt="" />}
                {!user?.profile && <div className="w-50 h-50 flex justify-center items-center">
                    <UserIcon className="w-50 h-50 text-indigo-500" />
                </div>}
            </div>
            <div className="flex-auto w-full p-4 min-w-80 ">
                        <h1 className=" font-bold my-0">{user?.user?.username}</h1>
                        <p className=' p-0 m-0'>{user?.user?.first_name} {user?.user?.last_name}</p>
                        <p className=" p-0 m-0">{user?.user?.email}</p>

                        {/* do not render if the user is the current logged in user */}
                        {!(user?.user?.username === auth?.user?.username) && 
                        <div className=''>
                            <RemoveUser user={user} />
                            <Link to={`/edit-user/${extractIdFromUrl(user?.user?.url)}`} 
                            className="rounded-sm shadow-sm bg-indigo-500 px-3 py-1 text-white mx-2 my-1">
                                update </Link>
                            <Link to={`/edit-user-permissions/${extractIdFromUrl(user?.user?.url)}`} 
                            className="rounded-sm shadow-sm bg-indigo-500 px-3 py-1 text-white mx-2 my-1">
                                Permissions </Link>
                        </div>}
            </div>

        </div>
  </div>
  
  
}