import React, { useState } from 'react';
import SalesCarEdit from './salesCarEdit';
import { useSelector } from "react-redux";
import SalesNoteEdit from './salesNoteEdit'
import { useTranslation } from 'react-i18next';

export default function SalesNote({instance}){
    // it takes the auth.user and permissionName as params
    const auth = useSelector(state => state.auth);
    const [t] = useTranslation('global');
    const [editMode, setEditMode] = useState(false);
    function hasPermission(permissionName) {return auth.user.user_permissions.some(permission => permission.codename === permissionName);}
    return(
        <div className='flex flex-col mb-2'>
            <div className='flex items-center'>
            <h1 className="font-bold leading-10 text-2xl text-indigo-600">{t("dash.sales.note")} </h1>
                {hasPermission('change_invoice') &&
                <span className='mx-3' onClick={(e)=>setEditMode(!editMode)} style={{display: editMode ? "none" :null}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-indigo-500 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" 
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </span>
                }
            </div>
            {editMode ? <SalesNoteEdit instance={instance} setEditMode={setEditMode}/>:
            <div className="w-full h-40 rounded-md border p-3 bg-white border-gray-100">
                <p className="text-gray-600">{instance?.description}</p>
            </div>
            }
        </div>
    )
}
