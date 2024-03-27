import {useState, useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getSales } from '../../../../redux/salesSlice';
import axios from 'axios'; 
import { useTranslation } from 'react-i18next';
import { fixNumbers } from '../../../../../utils';

export default function TintEdit({instance, setEditMode}){
    const [percentage,setPercentage] = useState(null);
    const [windows,setWindows] = useState(null);
    const [type,setType] = useState(null);
    const [amount,setAmount] = useState(null);
    const [t] = useTranslation('global');
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
        type && formData.append("tintType", type);
        percentage && formData.append("tintPercentage", percentage);
        windows && formData.append("tintedWindows", windows);
        amount && formData.append("amount", amount);

        // submit form
        sendform(formData);
        
    }
    const sendform = async(formData)=>{
        await axios.put(process.env.REACT_APP_API_URL + `/api/tint/${instance.id}/`, formData)
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
            clearTimeout(timeoutId); // Clear the timeout when the component unmounts
        }
    },[])

    
    return (
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 rounded-lg my-2 bg-indigo-100 p-4"> 
            <form onSubmit={handleSubmit}>
                <div className=" rounded-md">
                    <label htmlFor="tints" className="block text-sm font-medium leading-6 text-gray-900"> {t("dash.sales.tinted-windows")} </label>
                    <select id="tints" name="tints" autoComplete="tints" defaultValue={instance?.tintedWindows}
                        onChange={(e)=>setWindows(parseInt(e.target.value))} 
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                </div>
                <div className=" rounded-md">
                    <label htmlFor="tint-percentage" className="block text-sm font-medium leading-6 text-gray-900"> {t("dash.sales.tint-percentage")}</label>
                    <select id="tint-percentage" name="tint-percentage" autoComplete="tint-percentage"
                        onChange={(e)=>{setPercentage(parseInt(e.target.value))}} defaultValue={instance?.tintPercentage}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" >
                            <option value={30}>30 %</option>
                            <option value={40}>40 %</option>
                            <option value={50}>50 %</option>
                            <option value={60}>60 %</option>
                            <option value={70}>70 %</option>
                            <option value={80}>80 %</option>
                            <option value={90}>90 %</option>
                            <option value={100}>100 %</option>
                    </select>
                </div>
                <div className=" rounded md">
                    <label htmlFor="tint-type" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("dash.sales.tint-type")} </label>
                    <input defaultValue={instance?.tintType+''} onChange={(e)=>setType(e.target.value)} type="text"  name="tint-type" id="tint-type" autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="mx-4">
                    <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                        {t("dash.sales.amount")} </label>
                    <input onChange={(e)=>setAmount(parseFloat(fixNumbers(e.target.value)))} type="tel"  name="amount" id="street-address" autoComplete="street-address"
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