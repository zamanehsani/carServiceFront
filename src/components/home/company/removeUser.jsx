import { useState } from "react";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function RemoveUser({user}){
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {setIsOpen(true);};
    const closeModal = () => {setIsOpen(false);};
    const [t] = useTranslation('global')
    
  const handleConfirm = () => {
    axios.delete(`${user?.user?.url}`)
      .then(response => {
        if(response.status === 204){
            closeModal(); // Close the modal after successful removal
            window.location.reload();
        }
        // You can also perform additional actions here, such as updating the UI
      })
      .catch(error => {
        console.error('Error removing item:', error);
        // Handle error if removal fails
      });
    };

    return (
        <>
        <button onClick={openModal}
        className="rounded-sm shadow-sm bg-red-500 px-3 py-1 text-white mx-2 my-1">
        remove </button>
        
        {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-lg z-50">
            <h2 className="text-lg font-bold mb-4">{t("dash.sales.confirm-removal")}</h2>
            <p className="mb-4">{t("dash.expenses.remove-text")}</p>
            <div className="flex justify-end">
              <button onClick={()=>handleConfirm()} className="rounded-md bg-red-600 hover:bg-red-500 text-white py-2 px-6 mx-2">{t("dash.sales.confirm")}</button>
              <button onClick={closeModal} className="rounded-md bg-gray-300 hover:bg-gray-200 text-gray-800 py-2 px-6">{t("dash.sales.cancel")}</button>
            </div>
          </div>
        </div>
      )}
        </>

    )
}