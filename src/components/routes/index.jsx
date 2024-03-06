
import { createBrowserRouter } from 'react-router-dom';
import Header from '../header';
import PageNotFound from '../pageNotFound';
import Login from '../login';
import Deal from '../deal';
import App from '../../App';
import Expense from '../expense';
import PrivateRoute from './PrivateRoute';
import SalesDetails from '../home/dashboardComponents/sales/salesDetails';
import ExpenseDetails from '../home/dashboardComponents/expenses/expenseDetails';
import ExpenseEdit from    '../home/dashboardComponents/expenses/expenseEdit';
import UserProfile from '../home/user/index'
import CompanyProfile from '../home/company/index'


// Define Layout component
const Layout = ({ children }) => {
    return (
      <div>
        <Header/>
        <main className=''>{children}</main>
        {/* footer here */}
      </div>
    );
  };

const routes = createBrowserRouter([
    {
      path: "/",
      element:<PrivateRoute><Layout><App /></Layout></PrivateRoute> ,
      errorElement:<Layout><PageNotFound /></Layout>
    },
    {
      path: "/login",
      element: <Login/>,
      errorElement:<Layout><PageNotFound /></Layout>
    },
    {
      path: "/add-deal",
      element: <PrivateRoute><Layout> <Deal /></Layout></PrivateRoute>,
      errorElement:<Layout><PageNotFound /></Layout>
    },
    {
      path: "/add-expense",
      element:<PrivateRoute> <Layout> <Expense /></Layout></PrivateRoute>,
      errorElement:<Layout><PageNotFound /></Layout>
    },
    {
      path: "/sale-details/:id",
      element:<PrivateRoute> <Layout> <SalesDetails /></Layout></PrivateRoute>,
      errorElement:<Layout><PageNotFound /></Layout>
    },
    {
      path: "/expense-details/:id",
      element:<PrivateRoute> <Layout> <ExpenseDetails /></Layout></PrivateRoute>,
      errorElement:<Layout><PageNotFound /></Layout>
    },
    {
      path: "/expense-edit/:id",
      element:<PrivateRoute> <Layout> <ExpenseEdit /></Layout></PrivateRoute>,
      errorElement:<Layout><PageNotFound /></Layout>
    },
    {
      path: "/user",
      element:<PrivateRoute> <Layout> <UserProfile /></Layout></PrivateRoute>,
      errorElement:<Layout><PageNotFound /></Layout>
    },
    {
      path: "/company",
      element:<PrivateRoute> <Layout> <CompanyProfile /></Layout></PrivateRoute>,
      errorElement:<Layout><PageNotFound /></Layout>
    },
  ])

  export default routes;