
import { createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import AddUser from '../home/company/addUser';
import EditUser from '../home/company/EditUser';
import UpdatePermissions from '../home/company/updatePermission';

// Define Layout component
const Layout = ({ children }) => {
  // this is for the direction of langauges. 
  // so we are changing the directionn of anything inside the layouts.
  const direction = useSelector(state => state.lng.direction);
    return (
      <div dir={direction}>
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
      path: "/edit-user/:id",
      element:<PrivateRoute> <Layout> <EditUser /></Layout></PrivateRoute>,
      errorElement:<Layout><PageNotFound /></Layout>
    },
    {
      path: "/edit-user-permissions/:id",
      element:<PrivateRoute> <Layout> <UpdatePermissions /></Layout></PrivateRoute>,
      errorElement:<Layout><PageNotFound /></Layout>
    },
    {
      path: "/add-user",
      element:<PrivateRoute> <Layout> <AddUser /></Layout></PrivateRoute>,
      errorElement:<Layout><PageNotFound /></Layout>
    },
    {
      path: "/company",
      element:<PrivateRoute> <Layout> <CompanyProfile /></Layout></PrivateRoute>,
      errorElement:<Layout><PageNotFound /></Layout>
    },
  ])

  export default routes;