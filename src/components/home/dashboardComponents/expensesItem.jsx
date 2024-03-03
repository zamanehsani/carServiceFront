import { useNavigate } from "react-router-dom"

export default function ExpenseItem({index, expense}){
    const navigate = useNavigate();
    return (
        <tr onClick={()=>navigate(`/expense-details/${expense.id}`)} className="text-left border-b border-gray-100 hover:font-semibold hover:shadow-lg hover:bg-indigo-50">
            <td className="px-4 py-3">{index+1}</td>
            <td className="px-4 py-3">{expense.supplier_name}</td>
            <td className="px-4 py-3">{expense.invoice_number}</td>
            <td className="px-4 py-3">{expense.quantity+''}</td>
            <td className="px-4 py-3">AED {expense.price+''}</td>
        </tr>
    )
}