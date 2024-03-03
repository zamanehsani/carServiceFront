import { useSelector } from "react-redux"

export default function CompanyProfile(){
    const auth = useSelector((state)=>state.auth)
    return (
        <div className="bg-slate-100 grid sm:grid-cols-1 md:grid-cols-3 max-w-6xl gap-4 mx-auto rounded-lg my-4 p-5">
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
    )
}