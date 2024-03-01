import { PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'; // Import axios


export default function Form({setSuccess,  error, setError}){
    const auth = useSelector((state)=>state.auth)
    const [invoiceNumber , setInvoiceNumber] = useState(null);
    const [supplierNumber , setSupplierNumber] = useState(null);
    const [name , setName] = useState(null);
    const [description , setDescription] = useState(null);
    const [amount , setAmount] = useState(null);
    const [quantity , setQuantity] = useState(null);
    const [photo , setPhoto] = useState(null);
    
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
        invoiceNumber && formData.append("invoice_number", invoiceNumber);
        supplierNumber && formData.append("supplier_number", supplierNumber);
        name && formData.append("name", name);
        description && formData.append("description", description);
        amount && formData.append("price", amount);
        quantity && formData.append("quantity", quantity);
        photo && formData.append("image", photo);
        formData.append('company_id', auth.company.id);
        formData.append('user_id', auth.user.id);

        // submit form
        sendform(formData);
    }

    const sendform = async(formData)=>{
        await axios.post(process.env.REACT_APP_API_URL + '/api/invoices/', formData,{
            headers: { 'Content-Type': 'multipart/form-data'}
        }).then((response)=>{
          // if the response status is create clear all the states.
          if(response.status === 201){
            // clear all the states
            setInvoiceNumber(null);
            setSupplierNumber(null);
            setName(null);
            setDescription(null);
            setAmount(null);
            setQuantity(null);
            setPhoto(null);
            setSuccess(true);
          }
        }).catch((err)=>{setError('Something went wrong, Please try again!')})
      }

    useEffect(()=>{
        return ()=>{
            setInvoiceNumber(null);
            setSupplierNumber(null);
            setName(null);
            setDescription(null);
            setAmount(null);
            setQuantity(null);
            setPhoto(null);
        }
    },[])

    return (
        <form className='w-full md:w-1/2 lg:w-1/2 px-4 py-6 bg-white rounded-lg shadow-md' 
            onSubmit={handleSubmit}>
            <div className="space-y-6">
                <div className="border-b border-gray-900/10 ">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Purchase Information</h2>
                    <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 py-3">
                        <div className="sm:col-span-full">
                            <label htmlFor="invoice" className="block text-sm font-medium leading-6 text-gray-900">
                                Invoice Number
                            </label>
                            <input onChange={(e)=>setInvoiceNumber(e.target.value)} defaultValue={invoiceNumber}
                            id="invoice"  name="invoice" type="tel" autoComplete="phone" placeholder='1234321'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="sm:col-span-full">
                            <label htmlFor="supplier" className="block text-sm font-medium leading-6 text-gray-900">
                                Supplier Number
                            </label>
                            <input onChange={(e)=>setSupplierNumber(e.target.value)} defaultValue={supplierNumber}
                                id="supplier"  name="supplier" type="tel" autoComplete="phone" placeholder='0566643234'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="sm:col-span-full">
                            <label htmlFor="expense" className="block text-sm font-medium leading-6 text-gray-900">
                                What did you buy?  </label>
                            <input onChange={(e)=>setName(e.target.value)} type="text" name="expense" id="expense"
                                autoComplete="given-name" placeholder='tyres' defaultValue={name}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="sm:col-span-full">
                            <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                                How many pieces? 
                            </label>
                            <input onChange={(e)=>setQuantity(parseInt(e.target.value))} defaultValue={quantity}
                            id="quantity"  name="quantity" type="tel" autoComplete="phone" placeholder='120'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="sm:col-span-full">
                            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                Total Amount
                            </label>
                            <input onChange={(e)=>setAmount(parseFloat(e.target.value))} defaultValue={amount}
                            id="amount"  name="amount" type="tel" autoComplete="phone" placeholder='12,000'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        
                        <div className="col-span-full mt-3">
                            {photo ? <>
                            <div className="mt-4 relative">
                                <div className='shadow-md rounded-lg p-1'>
                                <img src={photo && URL.createObjectURL(photo)} alt="Uploaded" className="max-w-full h-auto rounded-md bg-slate-300" />
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
                                        <span>Upload a photo</span>
                                        <input onChange={(e)=>{setPhoto(e.target.files[0])}} id="file-upload" name="file-upload"  type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                </div>
                            </>}
                        </div>

                        <div className="sm:col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Note </label>
                                <textarea onChange={(e)=>setDescription(e.target.value)}
                                id="description" defaultValue={description}
                                name="description"
                                placeholder='Your note here...'
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                
                                />
                            <p className="px-1 text-sm leading-6 text-gray-600">Write a note or anything to remember about this.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='space-y-6'>
                
                {error && <div className="my-2 rounded-md bg-red-50 p-4">
                        <p className='text-red-800'>Something went wrong!</p>
                    </div>}
            </div>

            <div className="grid mt-3">     
            <button type="submit"
                className="rounded-md bg-indigo-600 px-6 py-2 text-lg font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Upload </button>
            <br /> 
            <button type="button" 
                className="rounded-md text-lg font-bold bg-slate-200 py-2 px-6 leading-6 text-gray-900">
                Cancel </button>
            </div>
        </form>
    )
}