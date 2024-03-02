
// import { useDispatch, useSelector } from "react-redux";
// const auth = useSelector((state)=>state.auth)
import Statistics from "./dashboardComponents/statistics";
import DealList from "./dashboardComponents/dealList";
import SearchView from "./dashboardComponents/search";

export default function Home(){
    // get the customers list on load

    return(
        <div className="mx-auto p-4 justify-center items-center">
            <SearchView />
            {/* the totals cards */}
            <Statistics/>

            {/* the list of deals */}
            <DealList />

            {/* the list of expense */}

        </div>
    )
}