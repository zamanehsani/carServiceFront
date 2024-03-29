import React, { useState } from 'react';

import SalesCustomerEdit from './salesCustomerEdit';
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

export default function SalesCustomer({instance}){
    // it takes the auth.user and permissionName as params
    const auth = useSelector(state => state.auth);
    const [editMode, setEditMode] = useState(false);
    const [t] =useTranslation('global');
    function hasPermission(permissionName) {return auth.user.user_permissions.some(permission => permission.codename === permissionName);}
    return(
        <div className='flex flex-col mb-2'>
            <div className='flex items-center'>
            <h1 className="font-bold leading-10 text-2xl text-indigo-600">{t("dash.sales.customer-details")}:</h1>
            {hasPermission('change_customers') &&
                <span style={{display: editMode ? "none" :null}} className='px-2'
                    onClick={(e)=>setEditMode(!editMode)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-indigo-500 w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" 
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </span>}
            </div>



            {editMode ? <SalesCustomerEdit instance={instance} setEditMode={setEditMode} /> : <>
            <p className="text-gray-600"><span className="font-semibold mx-2"></span>{instance?.date}</p>
            <p className="text-gray-600"><span className="font-semibold mx-2">{t("dash.sales.name")}: </span>{instance?.name}</p>
            <p className="text-gray-600"><span className="font-semibold mx-2">{t("dash.sales.phone")}: </span>{instance?.phone}</p>
            <p className="text-gray-600"><span className="font-semibold mx-2">{t("dash.sales.amount")}: </span>AED {instance?.price}</p>
            <hr className=" border-gray-100"/>
            </>}
            
                        
        </div>
    )
}
