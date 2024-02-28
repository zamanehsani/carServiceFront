
import { createBrowserRouter } from 'react-router-dom';
import Header from '../header';
import PageNotFound from '../pageNotFound';
import Login from '../login';
import Deal from '../deal';
import App from '../../App';
import Expense from '../expense';
import PrivateRoute from './PrivateRoute';

// Define Layout component
const Layout = ({ children }) => {
    return (
      <div className='bg-slate-100'>
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
  ])

  export default routes;