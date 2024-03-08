import {useState, useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getSales } from '../../../../redux/salesSlice';
import axios from 'axios'; 
import { useTranslation } from 'react-i18next';
export default function TyreEdit({instance, setEditMode}){
    const [type,setType] = useState(null);
    const [number,setNumber] = useState(null);
    const [quantity,setQuantity] = useState(null);
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
        type && formData.append("tyreType", type);
        number && formData.append("tyreNumber", number);
        quantity && formData.append("quantity", quantity);
        amount && formData.append("amount", amount);

        // submit form
        sendform(formData);
        
    }
    const sendform = async(formData)=>{
        await axios.put(process.env.REACT_APP_API_URL + `/api/tyre/${instance.id}/`, formData)
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
            <h2 className="text-base font-bold leading-7 text-gray-900"> {t("dash.sales.tyre-service")}</h2>
            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-2 gap-4">
                    <div className="px-2">
                        <input id="newTyre" name="tyre" type="radio" value={'new'} defaultChecked={instance?.tyreType === 'new'}
                            onChange={(e)=>setType(e.target.value)} className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                        <label htmlFor="newTyre" className="font-medium text-gray-900"> {t("dash.sales.new")} </label>
                    </div>
                    <div className="px-2">
                        <input id="oldTyre"  name="tyre" type="radio" value={'old'} defaultChecked={instance?.tyreType === 'old'}
                        onChange={(e)=>setType(e.target.value)} className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                        <label htmlFor="oldTyre" className="font-medium text-gray-900"> {t("dash.sales.old")} </label>
                    </div>
                    <div className="px-2">
                        <input id="otherTyre"  name="tyre" type="radio" value={'other'} defaultChecked={instance?.tyreType === 'other'}
                        onChange={(e)=>setType(e.target.value)} className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                        <label htmlFor="otherTyre" className="font-medium text-gray-900"> {t("dash.sales.other")} </label>
                    </div>
                </div>

                <div className="px-4 rounded md">
                    <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("dash.sales.tyre-number")} </label>
                    <input onChange={(e)=>setNumber(e.target.value)} defaultValue={instance?.tyreNumber+""} type="tel"  name="amount" id="street-address" autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="px-4 rounded md">
                    <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("dash.sales.tyre-quantity")}</label>
                    <input onChange={(e)=>setQuantity(e.target.value)} defaultValue={instance?.quantity+''} type="tel"  name="amount" id="street-address" autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="mx-4">
                    <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                        {t("dash.sales.amount")} </label>
                    <input onChange={(e)=>setAmount(parseFloat(e.target.value))} type="tel"  name="amount" id="street-address" autoComplete="street-address"
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