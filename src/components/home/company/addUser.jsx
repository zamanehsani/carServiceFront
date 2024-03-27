import { PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'; // Import axios
import { Link,useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AddUser(){
    const auth = useSelector((state)=>state.auth)
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const lng = useSelector((state)=>state.lng);
    const [t] = useTranslation('global');
    const navigate = useNavigate();
    const [first_name , setFirst_name] = useState(null);
    const [last_name , setLast_name] = useState(null);
    const [email , setEmail] = useState(null);
    const [username , setUsername] = useState(null);
    const [password , setPassword] = useState(null);

    const [photo , setPhoto] = useState(null);
    const [dragging, setDragging] = useState(false);
    const handleDragOver = (e) => {e.preventDefault(); setDragging(true);};
    const handleDragEnter = (e) => { e.preventDefault();  setDragging(true);};
    const handleDragLeave = () => {setDragging(false)};

    const handleDrop = (e) => {
      e.preventDefault(); setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) { setPhoto(file);}
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        // create a formdata instance
        const formData = new FormData();
        first_name && formData.append("first_name", first_name);
        last_name && formData.append("last_name", last_name);
        username && formData.append("username", username);
        email && formData.append("email", email);
        password && formData.append("password", password);
        photo && formData.append("profile", photo);
        formData.append('company_id', auth?.company?.id);
        formData.append('user_id', auth?.user?.id)

        // submit form
        sendform(formData);
    }

    const sendform = async(formData)=>{
        await axios.post(process.env.REACT_APP_API_URL + '/api/profile/', formData,{
            headers: { 'Content-Type': 'multipart/form-data'}
        }).then((response)=>{
          // if the response status is create clear all the states.
          if(response.status === 201){
            // clear all the states
            setSuccess('User added.')
            navigate('/company');
          }
        }).catch((err)=>{console.log(err);setError('Something went wrong, Please try again!')})
      }

    return (
        <div className='w-full md:w-1/2 lg:w-1/2'>
            <div className="flex my-4 ml-5 overflow-x-auto" >
                <Link to={'/'} className="flex"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                 <span className="text-indigo-600 mx-3">/</span></Link> 
                <span className="text-indigo-900">add user</span> 
            </div>
        <form className='px-4 py-6 bg-white rounded-lg shadow-md' 
            onSubmit={handleSubmit}>
            <div className="space-y-6">
                <div className="border-b border-gray-900/10 ">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Add a new user</h2>
                    <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 py-3">
                        <div className="sm:col-span-full">
                            <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                                First Name
                            </label>
                            <input onChange={(e)=>setFirst_name(e.target.value)} defaultValue={first_name}
                            id="first_name"  name="first_name" type="text"  placeholder='ahmad'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="sm:col-span-full">
                            <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                               Last Name
                            </label>
                            <input onChange={(e)=>setLast_name(e.target.value)} defaultValue={last_name}
                                id="last_name"  name="last_name" type="text" placeholder='ahmadi'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="sm:col-span-full">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <input onChange={(e)=>setUsername(e.target.value)} defaultValue={username}
                                id="username"  name="username" type="text" placeholder='ahmad'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="sm:col-span-full">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email</label>
                            <input onChange={(e)=>setEmail(e.target.value)} type="text" name="email" id="email"
                                placeholder='email' defaultValue={email}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="sm:col-span-full">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <input onChange={(e)=>setPassword(e.target.value)} defaultValue={password}
                            id="password"  name="password" type="text" 
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
            
                        <div className="col-span-full mt-3">
                            {photo ? <>
                            <div className="mt-4 relative">
                                <div className='shadow-md rounded-lg p-1'>
                                <img src={photo && URL.createObjectURL(photo)} alt="Uploaded" className="max-w-full h-auto rounded-md bg-slate-300" />
                                </div>
                                <span onClick={()=>setPhoto(null)} className="absolute shadow-md top-0 right-0 mt-2 mr-2 bg-indigo-600 rounded-full p-1 hover:bg-indigo-400" >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" >
                                    <path fillRule="evenodd"
                                    d="M5.293 5.293a1 1 0 0 1 1.414 1.414L10 11.414l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 12l3.293 3.293a1 1 0 0 1-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 12 5.293 8.707a1 1 0 0 1 0-1.414z"
                                    clipRule="evenodd"/>
                                </svg>
                                </span>
                            </div>
                            </>:<>
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                {t("dash.expenses.photo")} </label> 
                                <div 
                                onDragOver={handleDragOver}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`flex justify-center rounded-lg ${dragging ? 'bg-indigo-200 shadow-md' : 'border border-dashed border-gray-900/25'} px-6 py-4`}>
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-8 w-8 text-gray-300" aria-hidden="true" />
                                    <div className=" flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>{t("dash.sales.upload-a-photo")}</span>
                                        <input onChange={(e)=>{setPhoto(e.target.files[0])}} id="file-upload" name="file-upload"  type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">{t("dash.sales.or-drag-and-drop")}</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">{t("dash.sales.PNG-JPG-GIF-up-to-5MB")}</p>
                                </div>
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
            <div className='space-y-6'>
                {error && <div className="my-2 rounded-md bg-red-50 p-4">
                        <p className='text-red-800'>Something went wrong!</p>
                    </div>}
            </div>
            <div className='space-y-6'>
                {success && <div className="my-2 rounded-md bg-green-50 p-4">
                        <p className='text-green-800'>{success}</p>
                    </div>}
            </div>

            <div className="grid mt-3">     
            <button type="submit"
                className="rounded-md bg-indigo-600 px-6 py-2 text-lg font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {t("dash.expenses.submit")} </button>
            <br /> 
            <Link to={`/company`}
                className="grid-cols-1 rounded-md mx-auto text-lg font-bold bg-slate-200 py-2 px-6 leading-6 text-gray-900">
                {t("dash.expenses.cancel")} </Link>
            </div>
        </form>
        </div>
    )
}