import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../../../redux/salesSlice";
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


  const handleConfirm = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/customers/${instance.id}`)
      .then(response => {
        if(response.status === 204){
            closeModal(); // Close the modal after successful removal
            dispatch(getSales({company:auth.company.id}))
            nagivate('/');
        }
        // You can also perform additional actions here, such as updating the UI
      })
      .catch(error => {
        console.error('Error removing item:', error);
        // Handle error if removal fails
      });
    };

  return (
    <div>
        <div className="flex justify-center">
          <button className="w-full max-w-md py-2 px-6 my-4 text-white rounded-md bg-red-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50" 
            onClick={openModal}>{t("dash.sales.remove-this-sale")} </button>
        </div>


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
