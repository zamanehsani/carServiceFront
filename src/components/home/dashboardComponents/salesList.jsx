import SalesItem from "./salesItem";
import Pagination from "./Paginator";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../../redux/salesSlice";

export default function SalesList(){
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    
    const auth = useSelector((state)=>state.auth)
    const sales = useSelector((state)=>state.sales.sales)

    const dispatch = useDispatch();

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        dispatch(getSales({pageSize, currentPage, company:auth.company.id}))
    },[currentPage,])

    return (
        <div className="grid grid-cols-1 max-w-6xl mx-auto rounded-lg shadow-md bg-white py-7 my-3 ">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-5">
                <div className="flex flex-col">
                    <h1 className="leading-1 m-0 text-2xl font-bold text-gray-700">Sales</h1>
                    <p className="text-gray-700 m-0 text-sm">The list of all the sales of all types. For more details, click on each item.</p>
                </div>
                <div className="mt-2 sm:my-3 md:mt-0">
                    <Link to={'/add-deal'} className="bg-indigo-600 text-white py-2 px-3 rounded inline-block">Add Sale</Link>
                </div>
            </div>

            <div className="overflow-x-auto rounded px-4 py-2 mt-5">
                <table className="table-auto w-full border-collapse">
                    <thead className="">
                        <tr className="text-left border-b border-gray-200 text-gray-700">
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">Car</th>
                            <th className="px-4 py-2">Customer</th>
                            <th className="px-4 py-2">Services</th>
                            <th className="px-4 py-2"> Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales && sales?.results?.map((sale, index) => {return <SalesItem index={index} key={index} sale={sale} />})}
                    </tbody>
                </table>
            </div>
            {sales?.total_pages > 1 && <Pagination 
                pageSize={pageSize} 
                currentPage={currentPage} 
                handlePageChange={handlePageChange}
                previous ={sales.previous ? true: false}
                next ={sales?.next ? true: false}
                total_pages={sales?.total_pages} />}
        </div>
    )
}