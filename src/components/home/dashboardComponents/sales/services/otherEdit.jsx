import {useState, useEffect, useTransition} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getSales } from '../../../../redux/salesSlice';
import axios from 'axios'; 
import { useTranslation } from 'react-i18next';
import { fixNumbers } from '../../../../../utils';

export default function OtherEdit({instance, setEditMode}){
    const [name,setName] = useState(null);
    const [amount,setAmount] = useState(null);
    const [t] = useTransition('global');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    let timeoutId = null;


    const handleSubmit =(e)=>{
        e.preventDefault();
        // create a formdata instance
        const formData = new FormData();
        formData.append("id", instance.id);
        name && formData.append("name", name);
        amount && formData.append("amount", amount);

        // submit form
        sendform(formData);
    }
    const sendform = async(formData)=>{
        await axios.put(process.env.REACT_APP_API_URL + `/api/other-service/${instance.id}/`, formData)
        .then((response)=>{
            if(response.status === 200){
                setSuccess('Updated successufully!')
                // update the global sales
                dispatch(getSales({company:auth.company.id}))
                timeoutId = setTimeout(() => {
                    setEditMode(false);
                }, 3000); // Set a timeout of 3000 milliseconds (3 seconds)
            }

        }).catch((err)=>{
            setError('Something went wrong while updating, Please try again!');
        })
      }

      useEffect(()=>{ 
        return ()=>{
            clearTimeout(timeoutId); // Clear the timeout when the component unmounts
        }
    },[])

    
    return (
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 rounded-lg my-2 bg-indigo-100 p-4"> 
            <form onSubmit={handleSubmit}>
                <div className="rounded md">
                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">
                        {t("dash.sales.name")} </label>
                    <input onChange={(e)=>setName(e.target.value)} type="text" defaultValue={instance?.name}
                    name="Name" id="Name" autoComplete="name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                
                <div className="mx-4">
                    <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                        {t("dash.sales.amount")} </label>
                    <input onChange={(e)=>setAmount(parseFloat(fixNumbers(e.target.value)))} type="tel"  name="amount" id="amount" autoComplete="street-address"
                    placeholder='120.00' defaultValue={instance?.amount+''}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>


                <div className='space-y-6 pb-4'>
                    {error && <div className="my-2 rounded-md bg-red-50 p-4">
                            <p className='text-red-800'>{error}</p>
                    </div>}
                    {success && <div className="my-2 rounded-md bg-green-50 p-4">
                            <p className='text-green-800'>{success}</p>
                    </div>}
                </div>
                
                <div className="flex justify-between my-2">
                    <button type='submit' className="rounded-md bg-indigo-600 mx-auto px-12 py-2 text-lg font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        {t("dash.sales.submit")} </button>
                    <button type='reset' onClick={()=>setEditMode(false)}
                        className="grid-cols-1 rounded-md mx-auto text-lg font-bold bg-slate-300 hover:bg-slate-200 py-2 px-10 leading-6 text-gray-900">
                        {t("dash.sales.cancel")} </button>
                </div>

            </form>
        </div>
    )
}