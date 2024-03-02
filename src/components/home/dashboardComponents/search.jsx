import React, { useState, useRef, useEffect } from 'react';

const SearchView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);
  const [data] = useState([
    'oil','Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'tyre',
    'tint',
    'ahmad',
    'mohammad',
    'dxb',
    'zaman',
    'Item 8',
    'Item 9',
    'Item 10',
    // Add more items as needed
  ]);


  const filteredData = data.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

//   if the search input is empty, hide the results
  useEffect(()=>{if(searchTerm.length === 0){ setShowResults(false) }
  },[searchTerm])


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

  const [showResults, setShowResults] = useState(false);

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
    setShowResults(true);
  };

  return (
    <div className="max-w-6xl mx-auto" ref={searchRef}>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {showResults && (
          <div className="absolute top-full mt-2 w-full max-h-80 overflow-y-auto bg-white border-indigo-300 rounded-md shadow-2xl">
            {filteredData.length === 0 ? (
              <p className="p-3 text-gray-700 py-5">No results found</p>
            ) : (
              <ul className="divide-y divide-gray-100 py-2">
                {filteredData.map((item, index) => (
                  <li key={index} className="py-2 px-4">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;
