import React from 'react';

// this form is being used in beal and expense both.
const FormSubmissionSuccess = ({ setSuccess }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
    <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded relative w-full max-w-md">
      <strong className="font-bold h1">Success!</strong> <br /> <br />
      <span className="block sm:inline">Expense has been added successfully.</span>
      <span className="absolute top-0 right-0 px-4 py-3">
        <svg onClick={()=>setSuccess(false)}  className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title >Close</title>
          <path  d="M14.354 5.646a.5.5 0 0 0-.708 0L10 9.293 5.354 4.646a.5.5 0 1 0-.708.708L9.293 10l-4.647 4.646a.5.5 0 0 0 .708.708L10 10.707l4.646 4.647a.5.5 0 0 0 .708-.708L10.707 10l4.647-4.646a.5.5 0 0 0 0-.708z"/>
        </svg>
      </span>
    </div>
  </div>
);
};

export default FormSubmissionSuccess;