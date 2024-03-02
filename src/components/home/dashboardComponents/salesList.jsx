
import SalesItem from "./salesItem";
import Pagination from "./Paginator";

export default function SalesList(){
    return (
        <div className="grid grid-cols-1 rounded-lg shadow-md bg-white px-3 py-3 my-2 ">
            <h1 className="leading-4 text-indigo-600 font-bold m-2 mb-4">List of the Sales</h1>
            <div className="p-2 overflow-y-auto rounded-md shadow-dm shadow-inner bg-slate-50">
            <SalesItem /> <SalesItem />  
            <SalesItem /> <SalesItem />

            </div>
            <Pagination />
        </div>
    )
}