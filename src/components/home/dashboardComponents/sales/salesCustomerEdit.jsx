import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getSales } from '../../../redux/salesSlice';
import axios from 'axios'; 
import { use } from 'i18next';
import { useTranslation } from 'react-i18next';
import { fixNumbers } from '../../../../utils';


export default function SalesCustomerEdit({instance, setEditMode}){
    // it takes the auth.user and permissionName as params
    const auth = useSelector(state => state.auth);
    const[name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [price, setPrice] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const [success, setSuccess] = useState(null);
    let timeoutId = null;
    const [t] = useTranslation('global');

    const handleSubmit =(e)=>{
        e.preventDefault();
        // create a formdata instance
        const formData = new FormData();
        formData.append("id", instance.id);
        name && formData.append("name", name);
        price && formData.append("price", price);
        phone && formData.append("phone", phone);
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
            console.log(err)
        })
      }

      useEffect(()=>{ 
        return ()=>{
            setName(null);
            setPhone(null);
            setPrice(null);
            clearTimeout(timeoutId); // Clear the timeout when the component unmounts
        }
    },[])

    return(
        <div className='flex flex-col mb-2'>
            <form className='px-4 py-6 bg-white rounded-lg shadow-md' 
                onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {/* customer info  */}
                    <div className=" grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                        {/* name */}
                        <div className="sm:col-span-full">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            {t("dash.sales.name")}</label>
                            <input type="text" name="name" defaultValue={instance.name} id="name" onChange={(e)=>setName(e.target.value)}
                                autoComplete="given-name" placeholder='Mohammad'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        {/* phone  */}
                        <div className="sm:col-span-full">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                {t("dash.sales.phone")}</label>
                            <input id="phone" defaultValue={instance.phone} 
                            onChange={(e)=>setPhone(fixNumbers(e.target.value))}  name="phone" type="tel" autoComplete="phone" placeholder='0566652534'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="sm:col-span-full">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                            {t("dash.sales.amount")} </label>
                            <input id="price" defaultValue={instance.price} 
                            onChange={(e)=>setPrice(parseFloat(fixNumbers(e.target.value)))}  name="price" type="tel" autoComplete="price" placeholder='12.00'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
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
