import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CompanyProfile(){
    const auth = useSelector((state)=>state.auth)
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
            <div className="bg-slate-100 grid sm:grid-cols-1 md:grid-cols-3">
                <div className="p-3 rounded-lg bg-indigo-400">
                    <img src={auth?.company?.logo} alt="company logo" 
                    className=" rounded-md"/>
                </div>
                <div className="col-span-2">
                    <h1 className=" text-indigo-600 leading-10 text-2xl font-bold">Company Detials:</h1>
                    <p>Name: {auth.company?.name}</p>
                    <p>Phone: {auth.company?.phone}</p>
                    <p>Address: {auth.company?.address}</p>
                    <div>
                        {auth.company?.description}
                    </div>
                </div>
            
            </div>

        </div>
    )
}