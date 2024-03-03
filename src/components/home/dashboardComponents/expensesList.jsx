import ExpenseItem from "./expensesItem";
import Pagination from "./Paginator";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getExpenses } from "../../redux/expensesSlice";

export default function ExpenseList1(){
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);

    const auth = useSelector((state)=>state.auth)
    const expenses = useSelector((state)=>state.expenses.expenses)
    const dispatch = useDispatch();

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        dispatch(getExpenses({pageSize, currentPage, company:auth.company.id}))
    },[currentPage,])


    return (
        <div className="grid grid-cols-1 max-w-6xl mx-auto rounded-lg shadow-md bg-white py-7 my-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-5">
                <div className="flex flex-col">
                    <h1 className="leading-1 m-0 text-2xl font-bold text-gray-700">Expense</h1>
                    <p className="text-gray-700 m-0 text-sm">The list of all the epenses. For more details, click on each item.</p>
                </div>
                <div className="mt-2 sm:my-3 md:mt-0">
                    <Link to={'/add-expense'} className="bg-indigo-600 text-white py-2 px-3 rounded inline-block">Add Expense</Link>
                </div>
            </div>

            <div className="overflow-x-auto rounded px-4 py-2 mt-5">
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
                previous ={expenses?.previous ? true: false}
                next ={expenses?.next ? true: false}
                total_pages={expenses?.total_pages} />}
        </div>
    )
}