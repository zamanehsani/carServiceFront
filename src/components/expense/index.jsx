import { PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'; // Import axios
import Form from './form';
import FormSubmissionSuccess from './formSuccess';


export default function Expense(){
    const auth = useSelector((state)=>state.auth)
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{ return ()=>{setError(null);}
    },[])

    return ( <>
        {success ?  <FormSubmissionSuccess message={success} setSuccess={setSuccess}/> :
            <div className="flex flex-col items-center justify-center py-7 px-4">
            <Form success={success} setSuccess={setSuccess} error={error} setError={setError} />
            </div>}
    </>
           

    )
}