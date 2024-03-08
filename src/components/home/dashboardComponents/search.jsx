import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Import axios
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const SearchView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customersResults, setCustomersResults] = useState([])
  const [expensesResult, setExpensesResults] = useState([])
  
  const [oilResult, setOilResults] = useState([])
  const [tintResult, setTintResults] = useState([])
  const [tyreResult, setTyreResults] = useState([])
  const [batteryResult, setBatteryResults] = useState([])
  const [otherResult, setOtherResults] = useState([])
  const searchRef = useRef(null);
  const [t, i18n] = useTranslation("global");
  const auth = useSelector(state => state.auth);

//   if the search input is empty, hide the results
  useEffect(()=>{if(searchTerm.length === 0){ setShowResults(false) }},[searchTerm])


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }};
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

// Function to search in the backend
const searchBackend = async (value) => {
  try {
    // search in customer model
    const cust_res = await axios.get(`${process.env.REACT_APP_API_URL}/api/customers/`,
      {params: { "search": value, "company": auth?.company?.id},
    });
    setCustomersResults(cust_res?.data?.results)

    // search in expense model
    const exp_res = await axios.get(`${process.env.REACT_APP_API_URL}/api/invoices/`,
      {params: { "search": value, "company": auth?.company?.id}
    });
    setExpensesResults(exp_res?.data?.results)

    // search in oil change model
    const oil_res = await axios.get(`${process.env.REACT_APP_API_URL}/api/oil-change/`,
      {params: { "search": value, "company": auth?.company?.id}
    });
    setOilResults(oil_res?.data?.results)

    // search in tyre model
    const tyre_res = await axios.get(`${process.env.REACT_APP_API_URL}/api/tyre/`,
      {params: { "search": value, "company": auth?.company?.id}
    });
    setTyreResults(tyre_res?.data?.results)

    // search in tint model
    const tint_res = await axios.get(`${process.env.REACT_APP_API_URL}/api/tint/`,
      {params: { "search": value, "company": auth?.company?.id}
    });
    setTintResults(tint_res?.data?.results)

    // search in oil change model
    const battery_res = await axios.get(`${process.env.REACT_APP_API_URL}/api/battery/`,
      {params: { "search": value, "company": auth?.company?.id}
    });
    setBatteryResults(battery_res?.data?.results)

    // search in other services model
    const other_res = await axios.get(`${process.env.REACT_APP_API_URL}/api/other-service/`,
      {params: { "search": value, "company": auth?.company?.id}
    });
    setOtherResults(other_res?.data?.results)

  } catch (error) {
    console.error('Error searching:', error);
  }
};

  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (value) => {
    setSearchTerm(value);
    searchBackend(value);
    setShowResults(true);
  };

  return (
    <div className="max-w-6xl mx-auto" ref={searchRef}>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder={t("dash.search.search")}
          className="w-full px-4 py-2 rounded-full border-0 shadow-md hover:bg-indigo-100"
          onChange={(e)=>handleInputChange(e.target.value)}
        />
        {showResults && (
          <div className="absolute px-3 py-3 top-full mt-2 w-full 
                max-h-80 overflow-y-auto bg-white border-indigo-300 rounded-md shadow-2xl">
            {customersResults && customersResults.length > 0 && <ul className="divide-y divide-gray-100 py-2">
                {customersResults.map((item, index) => (
                  <Link to={`/sale-details/${item.id}`} key={index} 
                    className="flex py-2 px-4 hover:bg-indigo-600 hover:text-white bg-indigo-100 my-1 rounded-md  ">
                   Sales / {item?.name}
                  </Link>
                ))}
              </ul>
            }
            {/* oil change list */}
            { oilResult && oilResult.length > 0 && <ul className="divide-y divide-gray-100 py-2">
                {oilResult.map((item, index) => (
                  <Link to={`/sale-details/${item.customer?.id}`} key={index} 
                    className="flex py-2 px-4 hover:bg-indigo-600 hover:text-white bg-indigo-100 my-1 rounded-md  ">
                   Oil Change / {item?.oil}
                  </Link>
                ))}
              </ul>
            }
            {/* tint list */}
            { tintResult &&  tintResult.length> 0 && <ul className="divide-y divide-gray-100 py-2">
                {tintResult?.map((item, index) => (
                  <Link to={`/sale-details/${item.customer?.id}`} key={index} 
                    className="flex py-2 px-4 hover:bg-indigo-600 hover:text-white bg-indigo-100 my-1 rounded-md  ">
                    Tints / {item?.amount}
                  </Link>
                ))}
              </ul>
            }
            {/* tyre list */}
            { tyreResult && tyreResult.length> 0 && <ul className="divide-y divide-gray-100 py-2">
                {tyreResult?.map((item, index) => (
                  <Link to={`/sale-details/${item.customer?.id}`} key={index} 
                    className="flex py-2 px-4 hover:bg-indigo-600 hover:text-white bg-indigo-100 my-1 rounded-md  ">
                   Tyres / {item?.amount}
                  </Link>
                ))}
              </ul>
            }
            {/* battery list */}
            { batteryResult && batteryResult.length> 0 && <ul className="divide-y divide-gray-100 py-2">
                {batteryResult?.map((item, index) => (
                  <Link to={`/sale-details/${item.customer?.id}`} key={index} 
                    className="flex py-2 px-4 hover:bg-indigo-600 hover:text-white bg-indigo-100 my-1 rounded-md  ">
                    Batteries / {item?.name}
                  </Link>
                ))}
              </ul>
            }
            {/* other list */}
            { otherResult && otherResult.length> 0 && <ul className="divide-y divide-gray-100 py-2">
                {otherResult.map((item, index) => (
                  <Link to={`/sale-details/${item?.customer?.id}`} key={index} 
                    className="flex py-2 px-4 hover:bg-indigo-600 hover:text-white bg-indigo-100 my-1 rounded-md  ">
                   Other Services / {item?.name}
                  </Link>
                ))}
              </ul>
            }
            {expensesResult && expensesResult.length > 0 && <ul className="divide-y divide-gray-100 py-2">
                {expensesResult.map((item, index) => (
                  <Link to={`expense-details/${item.id}`}  key={index} 
                    className="flex py-2 px-4 bg-indigo-100 my-1 rounded-md hover:bg-indigo-600 hover:text-white ">
                    Expenses / {item?.name}
                  </Link>
                ))}
              </ul>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;
