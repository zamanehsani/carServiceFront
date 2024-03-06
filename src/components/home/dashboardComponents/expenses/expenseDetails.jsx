import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import axios from 'axios'; 


export default function ExpenseDetails({match}){
    const {id} = useParams(); 
    const [exp, setExp] = useState({});
    const [error, setError] = useState('')

    const expenses = useSelector((state)=>state.expenses.expenses)
    const auth = useSelector((state)=>state.auth)

    useEffect(()=>{ 
        const expObject = expenses.results.find(obj => obj.id === parseInt(id));
        if (!expObject) {
            // get the object from the backend
            axios.get(`${process.env.REACT_APP_API_URL}/api/invoices/${id}/`)
            .then(response => {
              setExp(response.data);
            })
            .catch(error => {
              setError('Error fetching new data.');
            });
        }else{
            setExp(expenses?.results?.find(ex => ex.id === parseInt(id)));
        }

    },[expenses])

    useEffect(() => {
        // Scroll the window to the top when the component is mounted
        window.scrollTo(0, 0);
    }, []); 

    return (
        <div className="grid grid-cols-1 max-w-6xl mx-auto rounded-lg my-4 p-5">
            {!error && <>
            <div className="flex my-4 ml-5 overflow-x-auto" >
                <Link to={'/'} className="flex"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                 <span className="text-indigo-600 mx-3">/</span></Link> 

                <Link to={'/'} className="text-indigo-600"> Expenses <span className="text-indigo-600 mx-3">/</span></Link> 
                <span className="text-indigo-900"> Details</span> 
            </div>
            <div className="m-2 bg-slate-100 rounded-md shadow-md py-5 px-5">

                <h1 className="font-bold leading-10 text-2xl text-indigo-600">Expense Details:</h1>
                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600 ">Invoice Number: </span>{exp?.invoice_number}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">Date of Purchase: </span>{exp?.date}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">Expense Name: </span>{exp?.name}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">Quantity: </span> {exp?.quantity}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">Price: </span>AED {exp?.price}</p>
                <hr className="my-5 border-gray-100"/>
                <h1 className="font-bold leading-10 text-2xl text-indigo-600">Note</h1>
                <div className="w-full h-40 rounded-md border p-3 border-gray-100">
                    <p className="text-gray-600">{exp?.description}</p>
                </div>
                <hr className="my-5 border-gray-100"/>
               
                <h1 className="font-bold leading-10 text-2xl text-indigo-600">Supplier Information</h1>
                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Supplier Name: </span> {exp?.supplier_name}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Supplier Number: </span> {exp?.supplier_number}</p>
                <hr className="my-5 border-gray-100"/>
            
                <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
                    {/* Conditional check for image presence */}
                    {exp?.image ? (
                        <img src={exp?.image} alt="the invoice photo" />
                    ) : (
                        /* If image is null, display placeholder */
                        <div className="w-full max-h-52 mx-auto h-48 rounded-sm bg-indigo-50 flex items-center justify-center">
                            <p className="text-indigo-400">No image available</p>
                        </div>
                    )}
                </div>
                <div>
                    <span className="text-gray-500 mt-5 text-sm ">This Invoice is added by {exp?.user?.username}.</span>
                </div>

            </div>
            
            </>}

            {error.length > 0 && <>
                <div  className="flex justify-center items-center" style={{minHeight:'85vh'}}>
                    <div className="flex-1  bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                        <div className="flex">
                            <div className="py-1">
                                <svg className="h-6 w-6 text-red-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold">Error:</p>
                                <p>{error+""}</p>
                            </div>
                        </div>
                    </div>
                </div>
            
            </>}
        </div>
    )
}