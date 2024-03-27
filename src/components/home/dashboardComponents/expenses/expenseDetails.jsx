import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import axios from 'axios'; 
import { useTranslation } from "react-i18next";
import RemoveItemModal from "./expenseRemove";

export default function ExpenseDetails(){
    const {id} = useParams(); 
    const [exp, setExp] = useState({});
    const [error, setError] = useState('')
    const [t] = useTranslation('global');
    const nagivate = useNavigate();
    const expenses = useSelector((state)=>state.expenses.expenses)
    const auth = useSelector((state)=>state.auth)

        // check for permissions in user. 
    // it takes the auth.user and permissionName as params
    function hasPermission(permissionName) {
        return auth.user.user_permissions.some(permission => permission.codename === permissionName);
    }
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

                <Link to={'/'} className="text-indigo-600"> {t("dash.expenses.expenses")} <span className="text-indigo-600 mx-3">/</span></Link> 
                <span className="text-indigo-900"> {t("dash.expenses.details")} </span> 
            </div>
            <div className="m-2 bg-slate-100 rounded-md shadow-md py-5 px-5">
                 
                <h1 className="font-bold leading-10 text-2xl text-indigo-600">{t("dash.expenses.expense-details")}:</h1>

                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600 ">{t("dash.expenses.invoice-number")}: </span>{exp?.invoice_number}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">{t("dash.expenses.date-of-purchase")}: </span>{exp?.date}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">{t("dash.expenses.expense-name")}: </span>{exp?.name}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">{t("dash.expenses.quantity")}: </span > {exp?.quantity}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2">{t("dash.expenses.price")}: </span > AED {exp?.price}</p>
                
                {/* Edit and Delete icons */}
                <div className="flex">
                        {hasPermission('change_invoice') &&
                        <button className="m-3" onClick={()=>nagivate(`/expense-edit/${exp.id}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-indigo-500 w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" 
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button> }
                        
                        {hasPermission('delete_invoice') && <RemoveItemModal instance={exp} />}
                </div>

                <hr className="my-5 border-gray-100"/>
                <h1 className="font-bold leading-10 text-2xl text-indigo-600">{t("dash.expenses.note")}</h1>
                <div className="w-full rounded-md border p-3 border-gray-100">
                    <p className="text-gray-600">{exp?.description}</p>
                </div>
                <hr className="my-2 border-gray-100"/>
               
                <h1 className="font-bold leading-10 text-2xl text-indigo-600">{t("dash.expenses.supplier-details")}</h1>
                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">{t("dash.expenses.supplier-name")}: </span> {exp?.supplier_name}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">{t("dash.expenses.supplier-number")}: </span> {exp?.supplier_number}</p>
                <hr className="my-2 border-gray-100"/>
            
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
                                <p>{error+""}</p>
                            </div>
                        </div>
                    </div>
                </div>
            
            </>}
        </div>
    )
}