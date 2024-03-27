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
    
    return <div className="w-full md:w-80 m-1 p-3 shadow-md bg-indigo-50 my-3 rounded-md hover:bg-indigo-100 hover:shadow-lg">
            <div className=" mx-auto w-32 p-3 ">
                {user?.profile && 
                <img src={user?.profile} alt="" className='rounded-full' />}
                {!user?.profile && <div className="w-50 h-50 flex rounded-full justify-center items-center">
                    <UserIcon className="w-50 h-50 text-indigo-500" />
                </div>}
            </div>
            <div className="w-full p-4 min-w-80 text-center ">
                        <h1 className="mx-auto font-bold my-0">{user?.user?.username}</h1>
                        <p className=' p-0 m-0'>{user?.user?.first_name} {user?.user?.last_name}</p>
                        <p className=" p-0 m-0">{user?.user?.email}</p>

                        {/* do not render if the user is the current logged in user */}
                        {!(user?.user?.username === auth?.user?.username) && 
                        <div className='flex flex-row flex-wrap justify-center'>
                            <RemoveUser user={user} />
                            <Link to={`/edit-user/${extractIdFromUrl(user?.user?.url)}`} 
                            className="rounded-sm shadow-sm bg-indigo-500 hover:bg-indigo-400 px-3 py-1 text-white mx-2 my-1">
                                Update </Link>
                            <Link to={`/edit-user-permissions/${extractIdFromUrl(user?.user?.url)}`} 
                            className="rounded-sm shadow-sm bg-indigo-500 hover:bg-indigo-400 px-3 py-1 text-white mx-2 my-1 ">
                                Permissions </Link>
                        </div>}
            </div>
         </div>
  
  
}