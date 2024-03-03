import { useEffect, useState } from 'react';
import DealForm from './parts/form';
import FormSubmissionSuccess from '../expense/formSuccess';

export default function Deal(){
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(()=>{ 
    return ()=>{
      setError(false);
      setSuccess(false)
    }
  },[])

  return ( <>
  
      {success ?  <FormSubmissionSuccess setSuccess={setSuccess}/> :
          <div className="flex bg-slate-100 flex-col items-center justify-center py-7 px-4">
          <DealForm success={success} setSuccess={setSuccess} error={error} setError={setError} />
          </div>}
  </>
         

  )
}