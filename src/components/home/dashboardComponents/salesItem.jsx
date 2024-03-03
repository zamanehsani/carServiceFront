import { useNavigate } from "react-router-dom"

export default function SalesItem({sale,index}){
    const navigate = useNavigate()
    return (
        <tr onClick={()=>navigate(`/sale-details/${sale.id}`)} className="text-left border-b my-5 border-gray-100 hover:font-semibold hover:shadow-lg hover:bg-indigo-50">
            <td className="px-4 py-2">{index+1}</td>
            <td className="px-4 py-2" style={{minWidth:'170px'}} >
                <span className="font-semibold">{sale.car_model}</span> <br /> <span>{sale.car_plate_source}  {sale.car_plate_number} </span> 
            </td>
            <td className="px-4 py-2 capitalize">
                <span className="font-semibold">{sale.name}</span> <br /> {sale.phone}
            </td>
            <td className="px-4 py-2">
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
                { sale.oilChangeService?.length> 0 && <span 
                    className="m-1 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10">
                    Oil</span> }
                { sale.batteryService?.length> 0 && <span 
                    className="m-1 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10">
                    Battery</span> }
            </td>
            <td className="px-4 py-2" style={{minWidth:'150px'}} >
                AED { sale.price }
            </td>
        </tr>
    )
}