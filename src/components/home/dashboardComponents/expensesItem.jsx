
export default function ExpenseItem(){
    return (
        <div className="card border rounded-lg px-3 py-2 my-2">
            <div className="card-body">
                <h2 className="card-title">Expense List</h2>
            </div>
            <div className="card-footer">
                <button className="btn btn-primary">Add Expense</button>
            </div>
        </div>
    )
}