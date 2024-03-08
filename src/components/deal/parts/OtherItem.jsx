import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export default function Item({changeName,changeAmount,removeItem,item}){
    const [t] = useTranslation('global');
    return (
        <div className="my-2">
            <div className="grid grid-cols-6">
                <div className="col-span-5">
                    <div className="bg-white p-2 px-3 rounded-l-lg">
                        <div className="rounded">
                            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                            {t("dash.sales.name")} </label>
                            <input type="text" name="amount" id="street-address" autoComplete="street-address"
                                onChange={(e)=>changeName(item.id,e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="">
                            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                {t("dash.sales.amount")} </label>
                            <input onChange={(e)=>changeAmount(item.id,parseFloat(e.target.value))} type="tel"  name="amount" id="street-address" autoComplete="street-address"
                            placeholder='120.00'
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center bg-red-100 rounded-r-lg">
                    <svg onClick={()=>removeItem(item.id)}
                     xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 font-extrabold"
                            fill="none"  viewBox="0 0 24 24" stroke="currentColor" >
                        <path strokeLinecap="round"  strokeLinejoin="round" strokeWidth={3}
                            d="M6 18L18 6M6 6l12 12" />
                       
                    </svg>
                </div>
            </div>

        </div>

    )
}