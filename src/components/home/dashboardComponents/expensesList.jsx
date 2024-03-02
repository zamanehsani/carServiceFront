import ExpenseItem from "./expensesItem";
import Pagination from "./Paginator";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ExpenseList1(){
    // get the lis of sales from /api/customers 
    const [expenses, setExpenses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const auth = useSelector((state)=>state.auth)

    const getData =()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/api/invoices/`,{
            params:{
                page_size: pageSize,
                page: currentPage,
                company:auth.company.id
            }
        })
        .then(res => {
            setExpenses(res.data);
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
        return () => {setExpenses([]);} 
    },[])

    return (
        <div className="grid grid-cols-1 rounded-lg shadow-md bg-white p-3 my-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-5">
                <div className="flex flex-col">
                    <h1 className="leading-1 m-0 text-2xl font-bold text-gray-700">Expense</h1>
                    <p className="text-gray-700 m-0 text-sm">The list of all the epenses. For more details, click on each item.</p>
                </div>
                <div className="mt-2 sm:my-3 md:mt-0">
                    <Link to={'/add-expense'} className="bg-indigo-600 text-white py-2 px-3 rounded inline-block">Add Expense</Link>
                </div>
            </div>

            <div className="overflow-x-auto rounded border shadow px-4 py-2 mt-5">
                <table className="table-auto w-full border-collapse">
                    <thead className="">
                        <tr className="text-left border-b border-gray-200 text-gray-700">
                            <th className="px-4 py-2 w-1/4">No</th>
                            <th className="px-4 py-2 w-1/4" style={{minWidth:'170px'}}>Supplier</th>
                            <th className="px-4 py-2 w-1/4" style={{minWidth:'170px'}}>Invoice No</th>
                            <th className="px-4 py-2 w-1/4">Quantity</th>
                            <th className="px-4 py-2 w-1/4" style={{minWidth:'170px'}}>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses && expenses?.results?.map((expense, index) => {return <ExpenseItem index={index} key={index} expense={expense} />})}
                    </tbody>
                </table>
            </div>
           

            {expenses?.total_pages > 1 && <Pagination 
                pageSize={pageSize} 
                currentPage={currentPage} 
                handlePageChange={handlePageChange}
                previous ={expenses.previous ? true: false}
                next ={expenses.next ? true: false}
                total_pages={expenses?.total_pages} />}
        </div>
    )
}