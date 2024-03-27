import { useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {getUserCompany} from '../../redux/authSlice';

import { useDispatch, useSelector } from "react-redux";
import { fixNumbers } from '../../../utils';

export default function EditCompany({setEditMode, company,  error, setError}){
    const auth = useSelector((state)=>state.auth)
    const [name , setName] = useState(company?.name);
    const [address , setAddress] = useState(company?.address);
    const [phone , setPhone] = useState(company?.phone);
    const [note , setNote] = useState(company?.description);

    const [t] = useTranslation('global');
    const lng = useSelector((state)=>state.lng);
    const dispatch = useDispatch();
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
        name && formData.append("name", name);
        address && formData.append("address", address);
        phone && formData.append("phone", phone);
        photo && formData.append("logo", photo);
        note && formData.append("description", note);
        formData.append("id", company?.id)
        sendform(formData);
    }

    const sendform = async(formData)=>{
        await axios.put(`${process.env.REACT_APP_API_URL}/api/companies/${company?.id}/`, formData,{
            headers: { 'Content-Type': 'multipart/form-data'}
        })
        .then((response)=>{
          if(response.status === 200){
            dispatch(getUserCompany(company?.admin?.username));
            setEditMode(false)
        }
        }).catch((err)=>{ setError('Something went wrong, Please try again!');})
      }

    return (
        <div className='w-full md:w-1/2 lg:w-1/2 mx-auto'>
            <form className='px-4 py-6 bg-white rounded-lg shadow-md' 
                onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div className="border-b border-gray-900/10 ">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Profile</h2>
                        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 py-3">
                            <div className="sm:col-span-full">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                     Name
                                </label>
                                <input onChange={(e)=>setName(e.target.value)} defaultValue={name}
                                id="name"  name="name" type="text" autoComplete="Name" placeholder='testing'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="sm:col-span-full">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone
                                </label>
                                <input onChange={(e)=>setPhone(fixNumbers(e.target.value))} value={phone+''}
                                    id="phone"  name="phone" type="text" autoComplete="phone" placeholder="0456543234"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="sm:col-span-full">
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Address
                                </label>
                                <input onChange={(e)=>setAddress(e.target.value)} defaultValue={address}
                                    id="address"  name="address" type="text" autoComplete="address" placeholder="somedf"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            
                            <div className="sm:col-span-full">
                                <label htmlFor="note" className="block text-sm font-medium leading-6 text-gray-900">
                                    {t("dash.expenses.note")} </label>
                                    <textarea onChange={(e)=>setNote(e.target.value)}
                                    id="note" defaultValue={note}
                                    name="note"
                                    placeholder={t("dash.sales.note-placeholder")}
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    
                                    />
                                <p className="px-1 text-sm leading-6 text-gray-600">{t("dash.expenses.note-desc")}</p>
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
                <div className="grid mt-3">     
                    <button type="submit"
                        className="rounded-md bg-indigo-600 px-6 py-2 text-lg font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        {t("dash.expenses.submit")} </button>
                <br /> 
                <button type='reset' onClick={()=>setEditMode(false)}
                    className="rounded-md bg-slate-200 px-6 py-2 text-lg font-bold text-gray-900 shadow-sm hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    {t("dash.expenses.cancel")} </button>
                </div>
            </form>
        </div>
    )
}