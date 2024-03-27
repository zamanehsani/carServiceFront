import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {fixNumbers} from '../../../utils/index';

export default function Battery({warranty,setWarranty, batterySize, batteryAmount,setBatteryAmount, setBatteryName, setBatterySize}){
    const [t] = useTranslation('global');
    const lng = useSelector((state)=>state.lng);

    // Function to update battery amount
    const handleBatteryAmountChange = (amount) => {
        // If amount is NaN or not a valid number, default it to 0
        if (isNaN(amount)) {amount = 0}
        setBatteryAmount(amount);
    };

    useEffect(()=>{
        // set the amount back to zero
        return ()=>{setBatteryAmount(0)}
    },[])

    return (
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 bg-indigo-100 rounded-lg p-4 my-2"> 
            <h2 className="text-base font-bold leading-7 text-gray-900"> {t("dash.sales.battery-service")}</h2>

            <div className="rounded md">
                <label htmlFor="batteryName" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("dash.sales.battery-name")} </label>
                <input onChange={(e)=>setBatteryName(e.target.value)} type="text"  name="batteryName" id="batteryName" autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>

            <div className="rounded-md">
                <label htmlFor="batterySize" className="block text-sm font-medium leading-6 text-gray-900"> {t("dash.sales.battery-size")} </label>
                <select id="batterySize" name="batterySize" autoComplete="batterySize"
                    onChange={(e)=>{setBatterySize(parseInt(e.target.value))}} defaultValue={batterySize}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" >
                    <option value={20}>20 </option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                    <option value={60}>60</option>
                    <option value={70}>70</option>
                    <option value={80}>80</option>
                    <option value={90}>90</option>
                    <option value={100}>100</option>
                    <option value={110}>110</option>
                    <option value={120}>120</option>
                </select>
            </div>

            <div className="rounded md">
                <label htmlFor="warranty" className="block text-sm font-medium leading-6 text-gray-900">
                {t("dash.sales.battery-warrenty-start")} </label>
                <input onChange={(e)=>setWarranty(e.target.value)} defaultValue={warranty+''} type="date"  name="warranty" id="warranty" 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>

            <div className="">
                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("dash.sales.amount")} </label>
                <input onChange={(e)=>handleBatteryAmountChange(parseFloat(fixNumbers(e.target.value)))} type="tel"  name="amount" id="street-address"
                placeholder='120' value={batteryAmount} style={{direction:lng?.direction}}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    )
}