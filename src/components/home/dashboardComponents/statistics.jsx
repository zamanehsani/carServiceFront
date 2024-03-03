
export default function Statistics(){
    return (
        <div className=" grid md:grid-cols-3 max-w-6xl mx-auto lg:grid-cols-3 grid-cols-1 gap-4 mt-5">
            <div className="hover:shadow-xl hover:bg-green-50 bg-green-100 p-4 shadow rounded-lg">
                <div className="flex items-center justify-between mb-4">
                <span className="text-xl text-green-900 font-semibold">Total Sales</span>
                <i className="fas fa-chart-line text-blue-900"></i>
                </div>
                <div>
                <span className="text-3xl font-bold text-green-900">AED 10,000</span>
                </div>
            </div>

            <div className="hover:shadow-xl hover:bg-red-50 bg-red-100 p-4 shadow rounded-lg">
                <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold text-red-900">Total Expense</span>
                <i className="fas fa-money-bill text-red-900"></i>
                </div>
                <div>
                <span className="text-3xl font-bold text-red-900">AED 5,000</span>
                </div>
            </div>

            <div className="hover:shadow-xl hover:bg-indigo-50 bg-indigo-100 p-4 shadow rounded-lg">
                <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold text-indigo-900">Balance</span>
                <i className="fas fa-balance-scale text-purple-900"></i>
                </div>
                <div>
                <span className="text-3xl font-bold text-indigo-900">AED 5,000</span>
                </div>
            </div>
        </div>
    )
}