import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'; 
import { PhotoIcon } from '@heroicons/react/24/solid'
import { getSales } from '../../../redux/salesSlice';
import { useTranslation } from 'react-i18next';


export default function SalesImageEdit({instance, setEditMode}){
    // it takes the auth.user and permissionName as params
    const [t] = useTranslation('global');
    const auth = useSelector(state => state.auth);
    const [image, setImage] = useState(null);
    const [photoUpload, setPhotoUpload] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const dispatch = useDispatch();

    let timeoutId = null;

    const [dragging, setDragging] = useState(false);
    const handleDragOver = (e) => {e.preventDefault(); setDragging(true);};
    const handleDragEnter = (e) => { e.preventDefault();  setDragging(true);};
    const handleDragLeave = () => {setDragging(false)};

  
    const handleDrop = (e) => {
      e.preventDefault(); setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {setImage(file);}
    };


    const handleSubmit =(e)=>{
        e.preventDefault();
        // create a formdata instance
        const formData = new FormData();
        formData.append("id", instance.id);
        photoUpload && formData.append("image", image);
        // submit form
        sendform(formData);
        
    }
    const sendform = async(formData)=>{
        await axios.put(process.env.REACT_APP_API_URL + `/api/customers/${instance.id}/`,formData,{
            headers: { 'Content-Type': 'multipart/form-data'}
        })
        .then((response)=>{
            if(response.status === 200){
                setSuccess('Updated successufully!')
                // update the global sales
                dispatch(getSales({company:auth.company.id}))
                timeoutId = setTimeout(() => {
                    setEditMode(false);
                }, 5000); // Set a timeout of 3000 milliseconds (3 seconds)
            }

        }).catch((err)=>{
            setError('Something went wrong while updating, Please try again!',err);
        })
      }

      useEffect(()=>{ 
        return ()=>{
            setImage(null);
            clearTimeout(timeoutId); // Clear the timeout when the component unmounts
        }
    },[])

    useEffect(()=>{ 
        // Check if file is valid
        if (image) {
            try {
            const url = URL.createObjectURL(image);
            setPhotoUpload(url);
            console.log("upload: ", photoUpload)
            } catch (error) {}
        } 
    },[image])

    return(
        <div className='flex flex-col mb-2'>
            <form className='px-4 py-6 bg-white rounded-lg shadow-md' onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {/* Image */}
                    <div className="col-span-full mt-3">
                            {image ? <>
                            <div className="mt-4 relative">
                                <div className='shadow-md rounded-lg p-1'>
                                <img src={photoUpload || image} alt="Uploaded" className="max-w-full h-auto rounded-md bg-slate-300" />
                                </div>
                                <span onClick={()=>setImage(null)} className="absolute shadow-md top-0 right-0 mt-2 mr-2 bg-indigo-600 rounded-full p-1 hover:bg-indigo-400" >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" >
                                    <path fillRule="evenodd"
                                    d="M5.293 5.293a1 1 0 0 1 1.414 1.414L10 11.414l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 12l3.293 3.293a1 1 0 0 1-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 12 5.293 8.707a1 1 0 0 1 0-1.414z"
                                    clipRule="evenodd"/>
                                </svg>
                                </span>
                            </div>
                            </>:<div 
                                onDragOver={handleDragOver}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`flex justify-center rounded-lg ${dragging ? 'bg-indigo-200 shadow-md' : 'border border-dashed border-gray-900/25'} px-6 py-4`}>
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-14 w-14 text-gray-300" aria-hidden="true" />
                                    <div className=" flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>{t("dash.sales.upload-a-photo")}</span>
                                        <input onChange={(e)=>{setImage(e.target.files[0])}} id="file-upload" name="file-upload"  type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">{t("dash.sales.or-drag-and-drop")}</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">{t("dash.sales.PNG-JPG-GIF-up-to-5MB")}</p>
                                </div>
                                </div>
                            }
                        </div>
                </div>

                <div className='space-y-6 pb-4'>
                    {error && <div className="my-2 rounded-md bg-red-50 p-4">
                            <p className='text-red-800'>{error}</p>
                    </div>}
                    {success && <div className="my-2 rounded-md bg-green-50 p-4">
                            <p className='text-green-800'>{success}</p>
                    </div>}
                </div>
                    
                <div className="flex flex-col">     
                    <button type="submit"
                        className="rounded-md bg-indigo-600 mx-auto px-12 py-2 text-lg font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        {t("dash.sales.submit")} </button> <br />
                    <button type='reset' onClick={()=>setEditMode(false)}
                        className="grid-cols-1 rounded-md mx-auto text-lg font-bold bg-slate-200 py-2 px-10 leading-6 text-gray-900">
                        {t("dash.sales.cancel")} </button>
                </div>
            </form>

        </div>
    )
}
