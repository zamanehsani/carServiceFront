import {useState, useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getSales } from '../../../../redux/salesSlice';
import axios from 'axios'; 

export default function OilChangeEdit({instance, setEditMode}){
    const [oil,setOil] = useState(null);
    const [currentMilage, setCurrentMilage] = useState(0);
    const [amount, setAmount] = useState(0);
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
        oil && formData.append("oil", oil);
        currentMilage && formData.append("currentMilage", currentMilage);
        amount && formData.append("amount", amount);
        // submit form
        sendform(formData);
        
    }
    const sendform = async(formData)=>{
        await axios.put(process.env.REACT_APP_API_URL + `/api/oil-change/${instance.id}/`, formData)
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
            <h2 className="text-base font-bold leading-7 text-gray-900"> Oil Change Service Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <label htmlFor="oil" className="block text-sm font-medium leading-6 text-gray-900"> Oil Type </label>
                    <select id="oil" name="oil" defaultValue={instance?.oil}  autoComplete="oil-name"
                        onChange={(e)=>{setOil(parseInt(e.target.value))}} 
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" >
                        <option value={5000}>5,000</option>
                        <option value={10000}>10,000</option>
                        <option value={0}>Other</option>
                    </select>
                </div>
                <div className="">
                    <label htmlFor="milage" className="block text-sm font-medium leading-6 text-gray-900">Current Milage </label>
                    <input type="tel" name="milage" id="milage"
                    autoComplete="milage" placeholder='120,000' defaultValue={instance?.currentMilage+''}
                    onChange={(e)=>{setCurrentMilage(parseInt(e.target.value))}}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="rounded-md">
                    <label htmlFor="nextMilage" className="block text-sm font-medium leading-6 text-gray-900">Next Oil Change Milage </label>
                    <p className="bg-indigo-200 w-full px-2 rounded-md py-1.5 text-gray-900 sm:text-sm sm:leading-6"
                    >{parseFloat(instance.oil)+ parseFloat(instance.currentMilage)+''}</p>
                </div>

                <div className="">
                    <label htmlFor="oilAmount" className="block text-sm font-medium leading-6 text-gray-900">
                        Amount </label>
                    <input onChange={(e)=>setAmount(parseFloat(e.target.value))} type="tel"  name="amount" id="oilAmount" autoComplete="oilAmount"
                    placeholder='120.00' defaultValue={instance?.amount}
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
                        Submit </button>
                    <button type='reset' onClick={()=>setEditMode(false)}
                        className="grid-cols-1 rounded-md mx-auto text-lg font-bold bg-slate-300 hover:bg-slate-200 py-2 px-10 leading-6 text-gray-900">
                        Cancel </button>
                </div>

            </form>
        </div>
    )
}