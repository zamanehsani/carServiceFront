import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'; 
import { PhotoIcon } from '@heroicons/react/24/solid'
import { getExpenses } from "../../../redux/expensesSlice";
import { useTranslation } from "react-i18next";
import { fixNumbers } from "../../../../utils";


export default function ExpenseEdit(){
    const {id} = useParams(); 
    const [exp, setExp] = useState({});
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const [t] = useTranslation('global');
    const expenses = useSelector((state)=>state.expenses.expenses)
    const auth = useSelector((state)=>state.auth)
    const dispatch = useDispatch();

    const [invoiceNumber , setInvoiceNumber] = useState(null);
    const [supplierNumber , setSupplierNumber] = useState(null);
    const [supplierName , setSupplierName] = useState(null);
    const [name , setName] = useState(null);
    const [description , setDescription] = useState(null);
    const [amount , setAmount] = useState(null);
    const [quantity , setQuantity] = useState(null);
    const [photo , setPhoto] = useState(null);
    const [photoUpload, setPhotoUpload] = useState(null);
    
    const [dragging, setDragging] = useState(false);
    const handleDragOver = (e) => {e.preventDefault(); setDragging(true);};
    const handleDragEnter = (e) => { e.preventDefault();  setDragging(true);};
    const handleDragLeave = () => {setDragging(false)};

  
    const handleDrop = (e) => {
      e.preventDefault(); setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) { setPhoto(file);}
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        // create a formdata instance
        const formData = new FormData();
        formData.append("id", exp.id);
        invoiceNumber && formData.append("invoice_number", invoiceNumber);
        supplierNumber && formData.append("supplier_number", supplierNumber);
        name && formData.append("name", name);
        description && formData.append("description", description);
        amount && formData.append("price", amount);
        quantity && formData.append("quantity", quantity);
        supplierName && formData.append("supplier_name", supplierName);
        photoUpload && formData.append("image", photo);
        // submit form
        sendform(formData);
    }

    const sendform = async(formData)=>{
        await axios.put(process.env.REACT_APP_API_URL + `/api/invoices/${exp.id}/`, formData,{
            headers: { 'Content-Type': 'multipart/form-data'}
        }).then((response)=>{
                setSuccess('Updated successufully!')
            // this is how the expense global state shall be updated.
            // but as of now, I am going to just refetch new expenses
            dispatch(getExpenses({company:auth.company.id}))
        //   const updatedExpList = expenses?.results?.map(expense => {
        //     if (expense.id === response.data.id) {
        //         console.log("respo: ", response.data)
        //       // If the expense ID matches the updated expense ID, update the expense
        //       return response.data; // Replace the old expense with the updated one
        //     }
        //     return expense; // Otherwise, return the expense unchanged
        //   });
        }).catch((err)=>{
            setError('Something went wrong while updating, Please try again!');
            console.log(err)
        })
      }


    useEffect(()=>{ 
        const expObject = expenses.results.find(obj => obj.id === parseInt(id));
        if (!expObject) {
            // get the object from the backend
            axios.get(`${process.env.REACT_APP_API_URL}/api/invoices/${id}/`)
            .then(response => {
              setExp(response?.data);
            })
            .catch(error => {
                setError('Error fetching new data.');
            });
        }else{
            setExp(expenses?.results?.find(ex => ex.id === parseInt(id)));
        }

    },[expenses])
    
    useEffect(() => {setPhoto(exp?.image);},[exp])
    
    useEffect(() => {
        // Scroll the window to the top when the component is mounted
        window.scrollTo(0, 0);
        return ()=>{
            setInvoiceNumber(null);
            setSupplierNumber(null);
            setName(null);
            setDescription(null);
            setAmount(null);
            setQuantity(null);
            setPhoto(null);
        }
    }, []); 

    useEffect(()=>{ 
        // Check if file is valid
        if (photo) {
            try {
            const url = URL.createObjectURL(photo);
            setPhotoUpload(url);
            console.log("upload: ", photoUpload)
            } catch (error) {}
        } 
    },[photo])

    return (
        <div className="grid grid-cols-1 max-w-6xl mx-auto rounded-lg my-4 p-5">
            <div className="flex my-4 ml-5 overflow-x-auto" >
                <Link to={'/'} className="flex"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                 <span className="text-indigo-600 mx-3">/</span></Link> 

                <Link to={`/expense-details/${exp?.id}`} className="text-indigo-600"> {t("dash.expenses.expenses")} <span className="text-indigo-600 mx-3">/</span></Link> 
                <span className="text-indigo-900"> {t("dash.expenses.edit")} </span> 
            </div>
            <div className="m-2 bg-slate-100 rounded-md shadow-md py-5 px-5">
                <h1 className="font-bold leading-10 text-2xl text-indigo-600">{t("dash.expenses.expense-edit")}</h1>
                
                <form className='px-4 py-6 bg-white rounded-lg shadow-md' 
                    onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className="border-b border-gray-900/10 ">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">{t("dash.expenses.purchase-information")}</h2>
                            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 py-3">
                                <div className="sm:col-span-full">
                                    <label htmlFor="invoice" className="block text-sm font-medium leading-6 text-gray-900">
                                        {t("dash.expenses.invoice-number")}
                                    </label>
                                    <input onChange={(e)=>setInvoiceNumber(fixNumbers(e.target.value))} 
                                    defaultValue={fixNumbers(exp?.invoice_number)}
                                    id="invoice"  name="invoice" type="tel" autoComplete="phone" placeholder='1234321'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <div className="sm:col-span-full">
                                    <label htmlFor="supplier_name" className="block text-sm font-medium leading-6 text-gray-900">
                                        {t("dash.expenses.supplier-name")}
                                    </label>
                                    <input onChange={(e)=>setSupplierName(e.target.value)} defaultValue={exp?.supplier_name}
                                        id="supplier_name"  name="supplier_name" type="text" autoComplete="phone" placeholder='free style auto'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="sm:col-span-full">
                                    <label htmlFor="supplier" className="block text-sm font-medium leading-6 text-gray-900">
                                        {t("dash.expenses.supplier-number")}
                                    </label>
                                    <input onChange={(e)=>setSupplierNumber(fixNumbers(e.target.value))} defaultValue={exp?.supplier_number}
                                        id="supplier"  name="supplier" type="tel" autoComplete="phone" placeholder='0566643234'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <div className="sm:col-span-full">
                                    <label htmlFor="expense" className="block text-sm font-medium leading-6 text-gray-900">
                                        {t("dash.expenses.what-did-you-buy")}  </label>
                                    <input onChange={(e)=>setName(e.target.value)} type="text" name="expense" id="expense"
                                        autoComplete="given-name" placeholder='tyres' defaultValue={exp?.name}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="sm:col-span-full">
                                    <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                                        {t("dash.expenses.how-many-pieces")}
                                    </label>
                                    <input onChange={(e)=>setQuantity(parseInt(fixNumbers(e.target.value)))} defaultValue={exp?.quantity}
                                    id="quantity"  name="quantity" type="tel" autoComplete="phone" placeholder='120'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="sm:col-span-full">
                                    <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                        {t("dash.expenses.total-amount")}
                                    </label>
                                    <input onChange={(e)=>setAmount(parseFloat(fixNumbers(e.target.value)))} defaultValue={exp?.price}
                                    id="amount"  name="amount" type="tel" autoComplete="phone" placeholder='12,000'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                
                                <div className="col-span-full mt-3">
                                    {photo ? <>
                                    <div className="mt-4 relative">
                                        <div className='shadow-md rounded-lg p-1'>
                                        <img src={photoUpload || photo} alt="Uploaded" className="max-w-full h-auto rounded-md bg-slate-300" />
                                        </div>
                                        <span onClick={()=>setPhoto(null)} className="absolute shadow-md top-0 right-0 mt-2 mr-2 bg-indigo-600 rounded-full p-1 hover:bg-indigo-400" >
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" >
                                            <path fillRule="evenodd"
                                            d="M5.293 5.293a1 1 0 0 1 1.414 1.414L10 11.414l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 12l3.293 3.293a1 1 0 0 1-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 12 5.293 8.707a1 1 0 0 1 0-1.414z"
                                            clipRule="evenodd"/>
                                        </svg>
                                        </span>
                                    </div>
                                    </>:<>
                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        photo </label> 
                                        <div 
                                        onDragOver={handleDragOver}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        className={`flex justify-center rounded-lg ${dragging ? 'bg-indigo-200 shadow-md' : 'border border-dashed border-gray-900/25'} px-6 py-4`}>
                                        <div className="text-center">
                                            <PhotoIcon className="mx-auto h-8 w-8 text-gray-300" aria-hidden="true" />
                                            <div className=" flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>{t("dash.sales.upload-a-photo")}</span>
                                                <input onChange={(e)=>{setPhoto(e.target.files[0])}} id="file-upload" name="file-upload"  type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">{t("dash.sales.or-drag-and-drop")}</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">{t("dash.sales.PNG-JPG-GIF-up-to-5MB")}</p>
                                        </div>
                                        </div>
                                    </>}
                                </div>

                                <div className="sm:col-span-full">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                        {t("dash.expenses.note")} </label>
                                        <textarea onChange={(e)=>setDescription(e.target.value)}
                                        id="description" defaultValue={exp?.description}
                                        name="description"
                                        placeholder='Your note here...'
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        
                                        />
                                    <p className="px-1 text-sm leading-6 text-gray-600">{t("dash.sales.note-desc")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='space-y-6'>
                        
                        {error && <div className="my-2 rounded-md bg-red-50 p-4">
                                <p className='text-red-800'>Something went wrong!</p>
                            </div>}
                        {success && <div className="my-2 rounded-md bg-green-50 p-4">
                                <p className='text-green-800'>{success}</p>
                            </div>}
                    </div>

                    <div className="grid mt-3">     
                    <button type="submit"
                        className="rounded-md bg-indigo-600 px-6 py-2 text-lg font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        {t("dash.expenses.update")} </button>
                    <br /> 
                    <Link to={`/expense-details/${exp.id}`}
                        className="grid-cols-1 rounded-md mx-auto text-lg font-bold bg-slate-200 py-2 px-20 leading-6 text-gray-900">
                       {t("dash.expenses.cancel")} </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}