
// import { useDispatch, useSelector } from "react-redux";
// const auth = useSelector((state)=>state.auth)

export default function Home(){
    // get the customers list on load

    return(
        <div className="mx-auto p-4 justify-center items-center">
            {/* the totals cards */}
            <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-4 mt-5">
                <div className=" bg-white p-4 shadow rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-semibold">Total Sales</span>
                    <i className="fas fa-chart-line text-blue-500"></i>
                    </div>
                    <div>
                    <span className="text-3xl font-bold text-green-500">$10,000</span>
                    </div>
                </div>

                <div className="bg-white p-4 shadow rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-semibold">Total Expense</span>
                    <i className="fas fa-money-bill text-red-500"></i>
                    </div>
                    <div>
                    <span className="text-3xl font-bold text-red-500">$5,000</span>
                    </div>
                </div>

                <div className="bg-white p-4 shadow rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-semibold">Balance</span>
                    <i className="fas fa-balance-scale text-purple-500"></i>
                    </div>
                    <div>
                    <span className="text-3xl font-bold">$5,000</span>
                    </div>
                </div>
            </div>

            {/* the list of deals */}

            {/* the list of expense */}

        </div>
    )
}