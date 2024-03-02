
export default function ExpenseItem({index, expense}){
    return (
        <tr className="text-left border-b border-gray-200">
            <td className="px-4 py-2">{index+1}</td>
            <td className="px-4 py-2">{expense.supplier_name}</td>
            <td className="px-4 py-2">{expense.invoice_number}</td>
            <td className="px-4 py-2">{expense.quantity+''}</td>
            <td className="px-4 py-2">AED {expense.price+''}</td>
        </tr>
    )
}