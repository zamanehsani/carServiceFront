import { useEffect, useState } from 'react'
import Form from './form';
import FormSubmissionSuccess from './formSuccess';

export default function Expense(){
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{ 
        return ()=>{
            setError(false);
            setSuccess(false);
        }
    },[])

    return ( <>
        {success ?  <FormSubmissionSuccess setSuccess={setSuccess}/> :
            <div className="flex flex-col items-center justify-center py-7 px-4">
                <Form success={success} setSuccess={setSuccess} error={error} setError={setError} />
            </div>}
    </>
           

    )
}