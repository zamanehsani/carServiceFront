import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getSales } from '../../../redux/salesSlice';
import axios from 'axios'; 


export default function SalesCarEdit({instance, setEditMode}){
    // it takes the auth.user and permissionName as params
    const auth = useSelector(state => state.auth);
    const [car_model, setCarModel] = useState(null);
    const [car_plate_number, setPlateNumber] = useState(null);
    const [car_plate_source, setPlateSource] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const [success, setSuccess] = useState(null);
    let timeoutId = null;


    const handleSubmit =(e)=>{
        e.preventDefault();
        // create a formdata instance
        const formData = new FormData();
        formData.append("id", instance.id);
        car_model && formData.append("car_model", car_model);
        car_plate_number && formData.append("car_plate_number", car_plate_number);
        car_plate_source && formData.append("car_plate_source", car_plate_source);
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
            setPlateNumber(null);
            setCarModel(null);
            setPlateSource(null);
            clearTimeout(timeoutId); // Clear the timeout when the component unmounts
        }
    },[])

    return(
        <div className='flex flex-col mb-2'>
            <form className='px-4 py-6 bg-white rounded-lg shadow-md' onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {/* car info */}
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
                        <div className="">
                            <label htmlFor="plate-source" className="block text-sm font-medium leading-6 text-gray-900"> Plate Source </label>
                            <select onChange={(e)=>setPlateSource(e.target.value)} defaultValue={instance.car_plate_source} id="plate-source" name="plate-source" autoComplete="plate-source"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" >
                                <option value={'Abu Dhabi'}>Abu Dhabi</option>
                                <option value={'Dubai'}>Dubai</option>
                                <option value={'A Ain'}>AL Ain</option>
                                <option value={'Sharjah'}>Sharjah</option>
                                <option value={'Ajman'}> Ajman</option>
                                <option value={'Ras Al Khaimah'}> Ras Al Khaimah</option>
                                <option value={'Other'}> Other</option>
                            </select>
                        </div>
                
                        <div className="">
                            <label htmlFor="plate-number" className="block text-sm font-medium leading-6 text-gray-900">
                                Plate Number <span className='text-red-500'>*</span> </label>
                            <input required={true}  type="text" defaultValue={instance.car_plate_number} onChange={(e)=>setPlateNumber(e.target.value)} name="plate-number" id="plate-number" autoComplete="plate-number"
                                placeholder='Y21320'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div className='mt-2  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4'>        
                        <div className="">
                            <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900">
                            Model</label>
                            <div className="">
                                <input onChange={(e)=>setCarModel(e.target.value)} type="text" defaultValue={instance.car_model} placeholder='Kia Sedona 2025'  name="model" id="model" autoComplete="model"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
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
                        Save </button> <br />
                    <button type='reset' onClick={()=>setEditMode(false)}
                        className="grid-cols-1 rounded-md mx-auto text-lg font-bold bg-slate-200 py-2 px-10 leading-6 text-gray-900">
                        Cancel </button>
               
                </div>
            </form>

        </div>
    )
}
