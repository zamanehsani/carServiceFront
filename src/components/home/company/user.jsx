import { UserIcon } from '@heroicons/react/24/outline';


export default function User({user}){
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
                        <div className=''>
                            <button className="rounded-sm shadow-sm bg-indigo-500 px-3 py-1 text-white mx-2 my-1">
                                remove
                            </button>
                            <button className="rounded-sm shadow-sm bg-red-500 px-3 py-1 text-white mx-2 my-1">
                                update
                            </button>
                        </div>
            </div>

        </div>
  </div>
  
  
}