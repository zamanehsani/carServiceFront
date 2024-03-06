import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios'; 
import SalesCustomer from "./salesCustomer";
import SalesCar from "./salesCar";
import SalesNote from "./salesNote";
import SalesImage from "./salesImage";

export default function SalesDetails(){

    const {id} = useParams(); 
    const [sale, setSale] = useState({});
    const [error, setError] = useState('')
    const sales = useSelector((state)=>state.sales.sales)
    const auth = useSelector((state)=>state.auth)

    useEffect(()=>{ 
        const saleObject = sales.results.find(obj => obj.id === parseInt(id));
        if (!saleObject) {
            // get the object from the backend
            axios.get(`${process.env.REACT_APP_API_URL}/api/customers/${id}/`)
            .then(response => {
              setSale(response.data);
            })
            .catch(error => {
              setError('Error fetching new data.');
            });
        }else{
            setSale(sales.results.find(sal => sal.id === parseInt(id)));
        }
    },[sales])
    useEffect(() => {
        // Scroll the window to the top when the component is mounted
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className="grid grid-cols-1 max-w-6xl mx-auto  rounded-lg my-4 p-5">
            {!error && <>
                <div className="flex my-4 ml-5 overflow-x-auto">
                <Link to={'/'} className="flex "> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                 <span className="text-indigo-600 mx-3">/</span></Link> 

                <Link to={'/'} className="text-indigo-600"> Sales <span className="text-indigo-600 mx-3">/</span></Link> 
                <span className="text-indigo-900"> Details</span> 
            </div>

            <div className="m-2 bg-slate-100 rounded-md shadow-md py-5 px-5">
                {/* customer details */}
                <SalesCustomer instance={sale} />

                {/* car details */}
               <SalesCar instance={sale} />
                
                {/* service details */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {sale?.oilChangeService && sale?.oilChangeService?.length > 0 && <>
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
                    {sale?.batteryService && sale?.batteryService?.length > 0 && <>
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

                    {sale?.tintService && sale?.tintService?.length > 0 && <>
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
                    {sale?.tyreService && sale?.tyreService?.length > 0 && <>
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

                    {sale?.otherService && sale?.otherService?.length > 0 && <>
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

                <SalesNote instance={sale} />
            
                <br />
            
                <SalesImage instance={sale} />
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