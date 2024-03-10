import Statistics from "./dashboardComponents/statistics";
import SalesList from "./dashboardComponents/sales/salesList";
import SearchView from "./dashboardComponents/search";
import ExpensesList  from './dashboardComponents/expenses/expensesList';
import { useSelector } from "react-redux";

export default function Home(){
    // get the customers list on load
    const auth = useSelector((state)=>state.auth);
    function hasPermission(permissionName) {return auth.user.user_permissions.some(permission => permission.codename === permissionName);}

    return(
        <div className="mx-auto p-4 justify-center items-center bg-slate-100">
            <SearchView />
            {/* the totals cards */}
            {hasPermission('view_statistics') && <Statistics/> }

            {/* the list of deals */}
            {hasPermission('view_customers') && <SalesList />}

            {/* the list of expense */}
            {/* check if the auth.user.is active */}
            {hasPermission('view_invoice') && <ExpensesList />}

        </div>
    )
}