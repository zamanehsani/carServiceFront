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
        .then((response)=>{
            setSale(response.data);
        })
        .catch(()=>{ setError('Something went wrong!')})
    },[])

    return (
        <div className="grid grid-cols-1 max-w-6xl mx-auto  rounded-lg my-4 p-5">
            {!error && <>
            <div className="m-2 bg-slate-100 rounded-md shadow-md py-5 px-5">
                {/* customer details */}
                <h1 className="font-bold leading-10 text-2xl text-indigo-600">Customer Details:</h1>
                <p className="text-gray-600"><span className="font-semibold mx-2"></span>{sale?.date}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">Name: </span>{sale?.name}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">Phone: </span>{sale?.phone}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">Amount: </span>AED {sale?.price}</p>
                <hr className="my-5 border-gray-100"/>

                {/* car details */}
                <h1 className="font-bold leading-10 text-2xl text-indigo-600">Car Details:</h1>
                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600 ">Car Model: </span>{sale?.car_model}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Plate: </span>{sale?.car_plate_source} {sale?.car_plate_number}</p>
                <hr className="my-5 border-gray-100"/>
                
                {/* service details */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {sale?.oilChangeService && sale.oilChangeService?.length > 0 && <>
                        {sale?.oilChangeService.map((oil, index)=>{
                            return <div key={index} className="rounded-md w-full bg-white p-4 mx-auto">
                                <h1 className="font-bold leading-10 text-2xl text-indigo-600">Oil Change Service Details</h1>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Oil Type: </span> {oil?.oil}</p>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Car Milage: </span> {oil?.currentMilage}</p>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Next Oil Change Milage: </span> {parseFloat((oil?.oil))+parseFloat((oil?.currentMilage))}</p>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Service Amount: </span>AED {oil?.amount}</p>
                            </div>
                        })}
                    </> }
                    {sale?.batteryService && sale.batteryService?.length > 0 && <>
                        {sale?.batteryService.map((battery, index)=>{
                            return <div key={index} className="rounded-md w-full bg-white p-4 mx-auto">
                                <h1 className="font-bold leading-10 text-2xl text-indigo-600">Battery Service Details</h1>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Battery Name: </span> {battery?.name}</p>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Battery Size: </span> {battery?.size}</p>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Battery Warranty Ends: </span> {battery?.warrenty}</p>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Service Amount: </span>AED {battery?.amount}</p>
                            </div>
                        })}
                    </> }

                    {sale?.tintService && sale.tintService?.length > 0 && <>
                        {sale?.tintService.map((tint, index)=>{
                            return <div key={index} className="rounded-md w-full bg-white p-4 mx-auto">
                                <h1 className="font-bold leading-10 text-2xl text-indigo-600">Tint Service Details</h1>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Type Of Tint: </span> {tint?.tintType}</p>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Tint Percentage: </span> {tint?.tintPercentage} %</p>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Classes Tinted: </span> {tint?.tintedWindows}</p>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Service Amount: </span>AED {tint?.amount}</p>
                            </div>
                        })}
                    </> }
                    {sale?.tyreService && sale.tyreService?.length > 0 && <>
                        {sale?.tyreService.map((tyre, index)=>{
                            return <div key={index} className="rounded-md w-full bg-white p-4 mx-auto">
                                <h1 className="font-bold leading-10 text-2xl text-indigo-600">Tyre Service Details</h1>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Type Of Tyre: </span> {tyre?.tyreType}</p>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Tyre Model Number: </span> {tyre?.tyreNumber}</p>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Tyres Serviced: </span> {tyre?.quantity}</p>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Service Amount: </span>AED {tyre?.amount}</p>
                            </div>
                        })}
                    </> }

                    {sale?.otherService && sale.otherService?.length > 0 && <>
                        {sale?.otherService.map((service, index)=>{
                            return <div key={index} className="rounded-md w-full bg-white p-4 mx-auto">
                                <h1 className="font-bold leading-10 text-2xl text-indigo-600">Other Service Details</h1>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Name of the Service: </span> {service?.name}</p>
                                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">Amount: </span>AED {service?.amount}</p>
                            </div>
                        })}
                    </> }
                </div>
              
                        <br />
                <h1 className="font-bold leading-10 text-2xl text-indigo-600">Note</h1>
                <div className="w-full h-40 rounded-md border p-3 bg-white border-gray-100">
                    <p className="text-gray-600">{sale?.description}</p>
                </div>
                <br />
            
                <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
                    {/* Conditional check for image presence */}
                    {sale?.image ? (
                        <img src={sale?.image} alt="the invoice photo" />
                    ) : (
                        /* If image is null, display placeholder */
                        <div className="w-full max-h-52 mx-auto h-48 rounded-sm bg-indigo-100 flex items-center justify-center">
                            <p className="text-indigo-400">No image available</p>
                        </div>
                    )}
                </div>
                <div>
                    <span className="text-gray-500 mt-5 text-sm ">This sale is added by {sale?.user?.username}.</span>
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