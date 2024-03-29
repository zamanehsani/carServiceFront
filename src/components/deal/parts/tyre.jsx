import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { fixNumbers } from "../../../utils";

export default function Tyre({tyreType, setTyreType, tyreQuantity, setTyreQuantity, tyreAmount, setTyreAmount, tyreNumber, setTyreNumber}){
// Function to update battery amount
const lng = useSelector((state)=>state.lng);

const [t] = useTranslation('global');
const handleTyreAmountChange = (amount) => {
    // If amount is NaN or not a valid number, default it to 0
    if (isNaN(amount)) {amount = 0}
    setTyreAmount(amount);
};

useEffect(()=>{
    // set the amount back to zero
    return ()=>{setTyreAmount(0)}
},[])


    return (
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 bg-indigo-100 rounded-lg my-2 p-4"> 
            <h2 className="text-base font-bold leading-7 text-gray-900"> {t("dash.sales.tyre-service")}</h2>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
            <div className="px-2">
                <input id="newTyre"  name="tyre" type="radio" value={'new'}
                   onChange={(e)=>setTyreType(e.target.value)} className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                <label htmlFor="newTyre" className="font-medium text-gray-900"> {t("dash.sales.new")} </label>
            </div>
            <div className="px-2">
                <input id="oldTyre"  name="tyre" type="radio" value={'old'}
                   onChange={(e)=>setTyreType(e.target.value)} className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                <label htmlFor="oldTyre" className="font-medium text-gray-900"> {t("dash.sales.old")} </label>
            </div>
            <div className="px-2">
                <input id="otherTyre"  name="tyre" type="radio" value={'other'}
                   onChange={(e)=>setTyreType(e.target.value)} className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                <label htmlFor="otherTyre" className="font-medium text-gray-900"> {t("dash.sales.other")} </label>
            </div>
         </div>

        <div className="px-4 rounded md">
            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
            {t("dash.sales.tyre-model-number")} </label>
            <input onChange={(e)=>setTyreNumber(fixNumbers(e.target.value))} value={tyreNumber+""} type="tel"  name="amount" id="street-address" autoComplete="street-address"
                style={{direction:lng?.direction}}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>

        <div className="px-4 rounded md">
            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
            {t("dash.sales.tyre-quantity")} </label>
            <input onChange={(e)=>setTyreQuantity(fixNumbers(e.target.value))} value={tyreQuantity+''} type="tel"  name="amount" id="street-address" autoComplete="street-address"
                style={{direction:lng?.direction}}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>

        <div className="mx-4">
                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("dash.sales.amount")} </label>
                <input onChange={(e)=>handleTyreAmountChange(parseFloat(fixNumbers(e.target.value)))} type="tel"  name="amount" id="street-address" autoComplete="street-address"
                placeholder='120.00' value={tyreAmount+''} style={{direction:lng?.direction}}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>

        </div>
    )
}