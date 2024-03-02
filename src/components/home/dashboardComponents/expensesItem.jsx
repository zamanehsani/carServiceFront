
export default function ExpenseItem({index, expense}){
    return (
        <tr className="text-left border-b my-5 border-gray-100">
            <td className="py-2  ">{index+1}</td>
            <td className="py-2  ">{expense.supplier_name}</td>
            <td className="py-2  ">{expense.invoice_number}</td>
            <td className="py-2  ">{expense.quantity+''}</td>
            <td className="py-2  ">{expense.price+''}</td>
        </tr>
    )
}