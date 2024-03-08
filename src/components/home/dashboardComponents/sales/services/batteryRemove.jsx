import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../../../../redux/salesSlice";
import { useNavigate } from "react-router-dom"
import axios from 'axios'; 
import { useTranslation } from 'react-i18next';
function RemoveItemModal({ instance }) {
    const auth = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const nagivate = useNavigate();
    const [t] = useTranslation('global');
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {setIsOpen(true);};
    const closeModal = () => {setIsOpen(false);};
    function hasPermission(permissionName) {return auth.user.user_permissions.some(permission => permission.codename === permissionName);}


  const handleConfirm = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/battery/${instance.id}`)
      .then(response => {
        if(response.status === 204){
          dispatch(getSales({company:auth.company.id}))
          closeModal(); 
        }
      })
      .catch(error => {
        console.error('Error removing item:', error);
      });
    };

  return (
    <div>
      <svg onClick={openModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
        className="text-red-400 w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" 
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-lg z-50">
          <h2 className="text-lg font-bold mb-4">{t("dash.sales.confirm-removal")}</h2>
          <p className="mb-4">{t("dash.sales.remove-text")}</p>
          <div className="flex justify-end">
            <button onClick={()=>handleConfirm()} className="rounded-md bg-red-600 hover:bg-red-500 text-white py-2 px-6 mx-2">{t("dash.sales.confirm")}</button>
            <button onClick={closeModal} className="rounded-md bg-gray-300 hover:bg-gray-200 text-gray-800 py-2 px-6">{t("dash.sales.cancel")}</button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default RemoveItemModal;
