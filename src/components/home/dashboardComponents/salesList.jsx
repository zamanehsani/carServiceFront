
import SalesItem from "./salesItem";
import Pagination from "./Paginator";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SalesList(){
    // get the lis of sales from /api/customers 
    const [sales, setSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);

    const auth = useSelector((state)=>state.auth)

    const getData =()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/api/customers/`,{
            params:{
                page_size: pageSize,
                page: currentPage,
                company:auth.company.id
            }
        })
        .then(res => {
            setSales(res.data);
        })
        .catch(err => console.log(err));
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        getData();
    },[currentPage,])

    useEffect(() => {
        return () => {setSales([]);} 
    },[])

    return (
        <div className="grid grid-cols-1 rounded-lg shadow-md bg-white p-3 my-3 ">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-5">
                <div className="flex flex-col">
                    <h1 className="leading-1 m-0 text-2xl font-bold text-gray-700">Sales</h1>
                    <p className="text-gray-700 m-0 text-sm">The list of all the sales of all types. For more details, click on each item.</p>
                </div>
                <div className="mt-2 sm:my-3 md:mt-0">
                    <Link to={'/add-deal'} className="bg-indigo-600 text-white py-2 px-3 rounded inline-block">Add Sale</Link>
                </div>
            </div>

            <div className="overflow-x-auto mt-5">
                <table className=" border-collapse w-full">
                    <thead className="">
                        <tr className="text-left border-b border-gray-200 text-gray-700">
                            <th className="">No</th>
                            <th className="">Car</th>
                            <th className="">Customer</th>
                            <th className="">Services</th>
                            <th className="">Total Amount</th>
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
                next ={sales.next ? true: false}
                total_pages={sales?.total_pages} />}
        </div>
    )
}