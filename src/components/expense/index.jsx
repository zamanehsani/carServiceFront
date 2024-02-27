import { PhotoIcon } from '@heroicons/react/24/solid'


export default function Expense(){
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log('submit');
    }
    return (
        <div className="flex flex-col items-center justify-center py-7 px-4">
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
                                <input id="invoice"  name="invoice" type="tel" autoComplete="phone" placeholder='1234321'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="supplier" className="block text-sm font-medium leading-6 text-gray-900">
                                    Supplier Number
                                </label>
                                <input id="supplier"  name="supplier" type="tel" autoComplete="phone" placeholder='0566643234'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="expense" className="block text-sm font-medium leading-6 text-gray-900">
                                    What did you buy?  </label>
                                <input type="text" name="expense" id="expense"
                                    autoComplete="given-name" placeholder='tyres'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="sm:col-span-full">
                                <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                                    How many pieces? 
                                </label>
                                <input id="quantity"  name="quantity" type="tel" autoComplete="phone" placeholder='120'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="sm:col-span-full">
                                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                    Total Amount
                                </label>
                                <input id="amount"  name="amount" type="tel" autoComplete="phone" placeholder='12,000'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            
                            <div className="sm:col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo </label>
                                <div className=" flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                                    <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className=" flex text-sm leading-6 text-gray-600">
                                        <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                        <span>Upload a photo</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG and JPG up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Note </label>
                                    <textarea
                                    id="description"
                                    name="description"
                                    placeholder='Your note here...'
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                    />
                                <p className="px-1 text-sm leading-6 text-gray-600">Write a note or anything to remember about this.</p>
                            </div>


                        </div>
                    </div>
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
        </div>
    )
}