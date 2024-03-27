import {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { fixNumbers } from '../../../utils';

export default function Tinting({tintAmount, setTintAmount,tintType,setTintType,windows, setWindows, tintPercentage, setTintPercentage }){
    // Function to update battery amount
    const [t] = useTranslation('global');
    const lng = useSelector((state)=>state.lng);

    const handleTintAmountChange = (amount) => {
        // If amount is NaN or not a valid number, default it to 0
        if (isNaN(amount)) {amount = 0}
        setTintAmount(amount);
    };
    useEffect(()=>{
        // set the amount back to zero
        return ()=>{setTintAmount(0)}
    },[])

    return (
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 bg-indigo-100 rounded-lg my-2 p-4"> 
            <h2 className="text-base font-bold leading-7 text-gray-900"> {t("dash.sales.tint-service")}</h2>
            <div className=" rounded-md">
                <label htmlFor="tints" className="block text-sm font-medium leading-6 text-gray-900"> {t("dash.sales.tinted-windows")} </label>
                <select id="tints" name="tints" autoComplete="tints"
                    onChange={(e)=>setWindows(parseInt(e.target.value))} 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option defaultValue={windows === 4} value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                </select>
            </div>
            <div className=" rounded-md">
                <label htmlFor="tint-percentage" className="block text-sm font-medium leading-6 text-gray-900">{t("dash.sales.tint-percentage")} </label>
                <select id="tint-percentage" name="tint-percentage" autoComplete="tint-percentage"
                    onChange={(e)=>{setTintPercentage(parseInt(e.target.value))}} 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" >
                        <option defaultValue={tintPercentage === 30} value={30}>30 %</option>
                        <option value={40}>40 %</option>
                        <option value={50}>50 %</option>
                        <option value={60}>60 %</option>
                        <option value={70}>70 %</option>
                        <option value={80}>80 %</option>
                        <option value={90}>90 %</option>
                        <option value={100}>100 %</option>
                </select>
            </div>
            <div className=" rounded md">
                <label htmlFor="tint-type" className="block text-sm font-medium leading-6 text-gray-900">
                {t("dash.sales.tint-type")} </label>
                <input defaultValue={tintType+''} onChange={(e)=>setTintType(e.target.value)} type="text"  name="tint-type" id="tint-type" autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="">
                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("dash.sales.amount")} </label>
                <input onChange={(e)=>handleTintAmountChange(parseFloat(fixNumbers(e.target.value)))}  type="tel"  name="amount" id="street-address" autoComplete="street-address"
                placeholder='120.00' value={tintAmount+''} style={{direction:lng?.direction}}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
    </div>
    )
}