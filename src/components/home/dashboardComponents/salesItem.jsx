
export default function SalesItem({sale,index}){

    return (
        <tr className="text-left border-b my-5 border-gray-100">
            <td className="py-2  ">{index+1}</td>
            <td className="py-2 ">
                {sale.car_model} <br /> {sale.car_plate_source} - {sale.car_plate_number}
            </td>
            <td className="py-2 capitalize">
                {sale.name} <br /> {sale.phone}
            </td>
            <td className="py-2 ">
                { sale.tintService?.length> 0 && <span 
                    className="m-1 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10">
                    Tint</span>
                }
                { sale.otherService?.length> 0 && <span 
                    className="m-1 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10">
                    Other</span> }
                { sale.tyreService?.length> 0 && <span 
                    className="m-1 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10">
                    Tyre</span>}
                { sale.oilchangeService?.length> 0 && <span 
                    className="m-1 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10">
                    Oil</span> }
                { sale.batteryService?.length> 0 && <span 
                    className="m-1 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10">
                    Battery</span> }
            </td>
            <td className="py-2 ">
                AED { sale.price }
            </td>
        </tr>
    )
}