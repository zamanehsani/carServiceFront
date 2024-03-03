import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios';

export default function SalesDetails(){
    const {id} = useParams(); 
    const [sale, setSale] = useState({});
    const [error, setError] = useState('')

    useEffect(()=>{
        // fetch the instance of expense of load
        axios.get(`${process.env.REACT_APP_API_URL }/api/customers/${id}`)
        .then((response)=>{console.log("res: ", response.data)
            setSale(response.data);
        })
        .catch(()=>{ setError('Something went wrong!')})
    },[])

    return (
        <div className="grid grid-cols-1 max-w-6xl mx-auto rounded-lg my-4 p-5">
            {!error && <>
            <div className="m-2 bg-white rounded-md shadow-md py-5 px-5">
                <h1 className="font-bold leading-10 text-2xl text-indigo-600">Expense Details:</h1>
                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600 ">Invoice Number: </span>{sale?.invoice_number}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">Date of Purchase: </span>{sale?.date}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">Expense Name: </span>{sale?.name}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">Quantity: </span> {sale?.quantity}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">Price: </span>AED {sale?.price}</p>
                <hr className="my-5 border-gray-100"/>
                <h1 className="font-bold leading-10 text-2xl text-indigo-600">Note</h1>
                <div className="w-full h-40 rounded-md border p-3 border-gray-100">
                    <p className="text-gray-600">{sale?.description}</p>
                </div>
                <hr className="my-5 border-gray-100"/>
               
                <h1 className="font-bold leading-10 text-2xl text-indigo-600">Supplier Information</h1>
                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Supplier Name: </span> {sale?.supplier_name}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Supplier Number: </span> {sale?.supplier_number}</p>
                <hr className="my-5 border-gray-100"/>
            
                <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
                    {/* Conditional check for image presence */}
                    {sale?.image ? (
                        <img src={sale?.image} alt="the invoice photo" />
                    ) : (
                        /* If image is null, display placeholder */
                        <div className="w-full max-h-52 mx-auto h-48 rounded-sm bg-indigo-50 flex items-center justify-center">
                            <p className="text-indigo-400">No image available</p>
                        </div>
                    )}
                </div>
                <div>
                    <span className="text-gray-500 mt-5 text-sm ">This Invoice is added by {sale?.user?.username}.</span>
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