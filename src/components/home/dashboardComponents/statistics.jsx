
export default function Statistics(){
    return (
        <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-4 mt-5">
            <div className=" bg-white p-4 shadow rounded-lg">
                <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold">Total Sales</span>
                <i className="fas fa-chart-line text-blue-500"></i>
                </div>
                <div>
                <span className="text-3xl font-bold text-green-500">AED 10,000</span>
                </div>
            </div>

            <div className="bg-white p-4 shadow rounded-lg">
                <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold">Total Expense</span>
                <i className="fas fa-money-bill text-red-500"></i>
                </div>
                <div>
                <span className="text-3xl font-bold text-red-500">AED 5,000</span>
                </div>
            </div>

            <div className="bg-white p-4 shadow rounded-lg">
                <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold">Balance</span>
                <i className="fas fa-balance-scale text-purple-500"></i>
                </div>
                <div>
                <span className="text-3xl font-bold">AED 5,000</span>
                </div>
            </div>
        </div>
    )
}