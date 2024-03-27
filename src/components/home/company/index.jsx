import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditCompany from "./edit";
import axios from "axios";
import User from "./user";
import Pagination from "../dashboardComponents/Paginator";


export default function CompanyProfile(){
    const auth = useSelector((state)=>state.auth)
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState(false);
    const [ userPageSize , setUserPageSize] = useState(10);
    const [ userCurrentPage , setUserCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);

    const handlePageChange = (page) => {
        setUserCurrentPage(page)
    }
    useEffect(() => {
        getUsers();
    },[userCurrentPage,])


    function getUsers(){
        const queryParams = {};
            if (userPageSize) {
                queryParams.page_size = userPageSize
            }
            if (userCurrentPage) {
                queryParams.page = userCurrentPage;
            }
            if (auth?.company) {
                queryParams.company = auth?.company;
            }
        axios.get(`${process.env.REACT_APP_API_URL}/api/company-users/`,{ params:queryParams})
        .then(response =>{
            setUsers(response?.data)
        })
        .catch((err)=>{
            console.log("err: ", err)
        })
    }

    return (
        <div className="grid grid-cols-1 max-w-6xl mx-auto rounded-lg my-4 p-5 ">
            <div className="flex my-4 ml-5 overflow-x-auto" >
                <Link to={'/'} className="flex"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                 <span className="text-indigo-600 mx-3">/</span></Link> 
                <span className="text-indigo-900"> Company Profile</span> 
            </div>

            {!editMode &&
                <div className="bg-slate-100 grid sm:grid-cols-1 md:grid-cols-3">
                    <div className="p-3 rounded-lg bg-indigo-400">
                        <img src={auth?.company?.logo} alt="company logo" 
                        className=" rounded-md"/>
                    </div>
                    <div className="col-span-2 px-3">
                        <h1 className=" text-indigo-600 leading-10 text-2xl font-bold">Company Detials:</h1>
                        <p>Name: {auth.company?.name}</p>
                        <p>Phone: {auth.company?.phone}</p>
                        <p>Address: {auth.company?.address}</p>
                        <div> {auth.company?.description} </div>
                    
                        {(auth?.company?.admin?.username === auth?.user?.username) && 
                        <span >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                            className="text-indigo-500 w-8 h-8"
                            onClick={(e)=>setEditMode(true)}>
                                <path strokeLinecap="round" strokeLinejoin="round" 
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </span> }
                    </div>

                    <div className="flex flex-row my-2 p-3">
                            <Link className="rounded-md hover:bg-indigo-800 bg-indigo-600 text-lg text-white px-4 py-2 " 
                            to={'/add-user'}> Add a new user </Link >
                    </div>
                    <br />
                    <div className="flex flex-wrap">
                            {users?.results?.map((user, index)=> <User key={index} user={user}/> )}
                    </div>
                    {users?.total_pages > 1 && <Pagination 
                        pageSize={userPageSize} 
                        currentPage={userCurrentPage} 
                        handlePageChange={handlePageChange}
                        previous={users.previous ? true: false}
                        next ={users?.next ? true: false}
                        total_pages={users?.total_pages} />}
                </div>
            }
           
            {editMode && <EditCompany
                setEditMode={setEditMode} 
                error={error}
                setError={setError}
                company={auth?.company}
                /> }
        </div>
    )
}