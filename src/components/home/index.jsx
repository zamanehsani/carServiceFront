
// import { useDispatch, useSelector } from "react-redux";
// const auth = useSelector((state)=>state.auth)
import Statistics from "./dashboardComponents/statistics";
import SalesList from "./dashboardComponents/sales/salesList";
import SearchView from "./dashboardComponents/search";
import ExpensesList  from './dashboardComponents/expenses/expensesList';

export default function Home(){
    // get the customers list on load

    return(
        <div className="mx-auto p-4 justify-center items-center bg-slate-100">
            <SearchView />
            {/* the totals cards */}
            <Statistics/>

            {/* the list of deals */}
            <SalesList />

            {/* the list of expense */}
            {/* check if the auth.user.is active */}
            <ExpensesList />

        </div>
    )
}