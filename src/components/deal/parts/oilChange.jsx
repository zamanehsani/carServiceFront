import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function OilChange({currentMilage, setCurrentMilage, setOil,nextMilage, oilAmount, setOilAmount}){
    // Function to update battery amount
    const [t] = useTranslation('global');
    const lng = useSelector((state)=>state.lng);

    const handleOilAmountChange = (amount) => {
        // If amount is NaN or not a valid number, default it to 0
        if (isNaN(amount)) {amount = 0}
        setOilAmount(amount);
    };
    useEffect(()=>{
        // set the amount back to zero
        return ()=>{setOilAmount(0)}
    },[])

    return (
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 rounded-lg my-2 bg-indigo-100 p-4"> 
            <h2 className="text-base font-bold leading-7 text-gray-900"> {t("dash.sales.oil-change")}</h2>
            <div className="">
                <label htmlFor="oil" className="block text-sm font-medium leading-6 text-gray-900"> {t("dash.sales.oil-type")} </label>
                <select id="oil" name="oil" autoComplete="oil-name"
                    onChange={(e)=>{setOil(parseInt(e.target.value))}} 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" >
                    <option value={5000}>5,000</option>
                    <option value={10000}>10,000</option>
                    <option value={0}>Other</option>
                </select>
            </div>
            <div className="">
                <label htmlFor="milage" className="block text-sm font-medium leading-6 text-gray-900">{t("dash.sales.current-milage")} </label>
                <input type="tel" name="milage" id="milage" style={{direction:lng?.direction}}
                autoComplete="milage" placeholder='120,000' defaultValue={currentMilage+''}
                onChange={(e)=>{setCurrentMilage(parseInt(e.target.value))}}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>

            <div className="rounded-md">
                <label htmlFor="nextMilage" className="block text-sm font-medium leading-6 text-gray-900">{t("dash.sales.next-oil-change-milage")} </label>
                <p className="bg-indigo-200 w-full px-2 rounded-md py-1.5 text-gray-900 sm:text-sm sm:leading-6"
                >{nextMilage+''}</p>
            </div>

            <div className="">
                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("dash.sales.amount")} </label>
                <input onChange={(e)=>handleOilAmountChange(parseFloat(e.target.value))} type="tel" style={{direction:lng?.direction}} name="amount" id="street-address" autoComplete="street-address"
                placeholder='120.00' defaultValue={oilAmount}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    )
}