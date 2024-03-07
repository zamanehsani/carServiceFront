import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getSales } from '../../../redux/salesSlice';
import axios from 'axios'; 

export default function SalesNoteEdit({instance, setEditMode}){
    // it takes the auth.user and permissionName as params
    const auth = useSelector(state => state.auth);
    const [note, setNote] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const dispatch = useDispatch();

    let timeoutId = null;

    console.log("insta: ", instance)
    const handleSubmit =(e)=>{
        e.preventDefault();
        // create a formdata instance
        const formData = new FormData();
        formData.append("id", instance.id);
        note && formData.append("description", note);
        // submit form
        sendform(formData);
        
    }
    const sendform = async(formData)=>{
        await axios.put(process.env.REACT_APP_API_URL + `/api/customers/${instance.id}/`, formData)
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
            setError('Something went wrong while updating, Please try again!');
        })
      }

      useEffect(()=>{ 
        return ()=>{
            setNote(null);
            clearTimeout(timeoutId); // Clear the timeout when the component unmounts
        }
    },[])

    return(
        <div className='flex flex-col mb-2'>
            <form className='px-4 py-6 bg-white rounded-lg shadow-md' onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {/* Note */}
                    <div className="col-span-full">
                        <textarea onChange={(e)=>{setNote(e.target.value)}}
                        id="description"
                        name="description"
                        placeholder='Your note here...'
                        defaultValue={instance?.description }
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
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
                        Save </button> <br />
                    <button type='reset' onClick={()=>setEditMode(false)}
                        className="grid-cols-1 rounded-md mx-auto text-lg font-bold bg-slate-200 py-2 px-10 leading-6 text-gray-900">
                        Cancel </button>
               
                </div>
            </form>

        </div>
    )
}
