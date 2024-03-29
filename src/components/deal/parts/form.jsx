import axios from 'axios'; // Import axios
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import OilChange from './oilChange';
import Tinting from './tinting';
import Tyre from './tyre';
import Battery from './battery';
import OtherService from './otherService';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fixNumbers } from '../../../utils';

export default function DealForm({setSuccess,  error, setError}){
  const auth = useSelector((state)=>state.auth)
  const lng = useSelector((state)=>state.lng);

  const [t] = useTranslation('global');
  // customer details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentOption, setPaymentOption] = useState('Cash');
  const [photo, setPhoto] = useState(null);
  const [note, setNote] = useState('');
  const [total, setTotal] = useState(0);
  // car details
  const [plateSource, setPlateSource] = useState('Abu Dhabi');
  const [plateNumber, setPlateNumber] = useState('');
  const [plateNumber1, setPlateNumber1] = useState(null);
  const [model, setModel] = useState('');

  // customer address details 
  const [country, setCountry] = useState('United Arab Emirates');
  const [state, setState] = useState('Al Ain');
  const [address, setAddress] = useState('');
  
  // this is the other services total amount
  const [otherTotal, setOtherTotal] = useState(0);
  
  const [dragging, setDragging] = useState(false);
  const handleDragOver = (e) => {e.preventDefault(); setDragging(true);};
  const handleDragEnter = (e) => { e.preventDefault();  setDragging(true);};
  const handleDragLeave = () => {setDragging(false);};

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) { setPhoto(file);}
  };


  // oilchange states:
  const [oil, setOil] = useState(5000);
  const [currentMilage, setCurrentMilage] = useState(0);
  const [nextMilage, setNextMilage] = useState(0);
  const [oilAmount, setOilAmount] = useState(0);
  useEffect(()=>{setNextMilage(currentMilage+oil);},[oil,currentMilage])
  
  // tint states
  const [tintAmount, setTintAmount]=useState(0);
  const [tintType,setTintType] = useState('');
  const [windows, setWindows] = useState(); 
  const [tintPercentage, setTintPercentage] = useState();

  // Tyre states
  const [tyreType, setTyreType] = useState(); 
  const [tyreQuantity, setTyreQuantity] = useState(4); 
  const [tyreAmount, setTyreAmount] = useState(0); 
  const [tyreNumber, setTyreNumber] = useState('');

  // battery states:
  const [warranty,setWarranty]=useState(new Date().toISOString().split('T')[0]);
  const [batteryAmount,setBatteryAmount] = useState(0);
  const [batteryName, setBatteryName] = useState('');
  const [batterySize, setBatterySize] = useState(20);


  // other States
  // make an array of objects with id, name and amount properties
    const [otherItems, setOtherItems] = useState([]);
    
    // Function to change the name of an item
    const changeName = (id, newName) => {
      const updatedItems = [...otherItems];
      updatedItems[id].name = newName;
      setOtherItems(updatedItems);
    };
  
    // Function to change the amount of an item
    const changeAmount = (id, newAmount) => {
      if(isNaN(newAmount)){ newAmount = 0 }
      const updatedItems = [...otherItems];
      updatedItems[id].amount = newAmount;
      setOtherItems(updatedItems);
    };
  
    // Function to remove an item from the list
    const removeItem = (id) => {setOtherItems(otherItems.filter((item) => item.id !== id))};

    // Function to add another item to the list
    const addItem = () => { setOtherItems([...otherItems, {id:otherItems.length, name: ``, amount: 0 }]);};

    const [oilChangeService, setOilChangeService] = useState(false);
    const [tintService, setTintService] = useState(false);
    const [tyreService, setTyreService] = useState(false);
    const [batteryService, setBatteryService] = useState(false);
    const [otherService, setOtherService] = useState(false);

    const [customersList, setCustomersList] = useState([]);

    // on phone number changes get the customer with address, car details and customer details to fill the form quicker
    // useEffect(()=>{
    //   if(phone?.length > 3){
    //     SearchCustomer(phone)
    //   }
    // },[phone])

    // suggest customer based on plate number
    useEffect(()=>{
      if(plateNumber?.length > 2){
        SearchCustomer(plateNumber)
      }
      setPlateNumber1(null)
      setCustomersList([]);
    },[plateNumber])


    // the function that search the customer model and return a list and sets the sugguested customerList
  function SearchCustomer(term){
    axios.get(process.env.REACT_APP_API_URL + '/api/customers/', {params:{search:term}})
    .then((response)=>{
      // if the response status is create clear all the states.
      // filter the customers with duplicate phone or plate
      filterDuplicateCustomers(response?.data?.results);
      
    }).catch((err)=>{ setError("Something went wrong submitting!")})
  }

  // this function filters the suggested customers fetched just not to show duplicates and sets the liststate
  const filterDuplicateCustomers = (arr) => {
    const uniqueEntries = {};
    const filteredArray = [];
    arr.forEach(obj => {
        const key = obj.car_plate_number + obj.phone;
        if (!uniqueEntries[key]) {
            uniqueEntries[key] = true;
            filteredArray.push(obj);
        }
    });
    setCustomersList(filteredArray);
};



  useEffect(()=>{
      setTotal(oilAmount +tintAmount+tyreAmount+batteryAmount+otherTotal)
  },[oilAmount+tintAmount+tyreAmount+batteryAmount,otherTotal])

  useEffect(()=>{
    // map through otherItems and sum up the amount. 
    const sum = otherItems.reduce((acc, item) => acc + item.amount, 0);
    setOtherTotal(sum)
  },[otherItems])

  const handleSubmit=(e)=>{
    e.preventDefault();
    try{
      const formData = new FormData();
      // Customer data
      name && formData.append("name", name);
      phone && formData.append("phone", phone);
      paymentOption && formData.append("paymentOption", paymentOption);
      note && formData.append("description", note);
      total && formData.append("total", total); // the service total amount
      photo && formData.append("photo", photo);
      address && formData.append("address", `${address} - ${state} - ${country}`);
      // Car data
      plateSource && formData.append("car_plate_source", plateSource);
      plateNumber && formData.append("car_plate_number", plateNumber);
      model && formData.append("car_model", model);
      // plate number 1 is the plate number that holds the value of plate the came from databse as 
      // suggested customer
      plateNumber1 && formData.append("car_plate_number", plateNumber1);
      
      // append the oilChange 
      oilChangeService && formData.append("oilChangeService", oilChangeService);
      oil && formData.append("oil", oil);
      currentMilage && formData.append("currentMilage", currentMilage);
      nextMilage && formData.append("nextMilage", nextMilage);
      oilAmount && formData.append("oilAmount", oilAmount);
      // append the tint servie
      tintService && formData.append("tintService", tintService);
      tintAmount && formData.append("tintAmount", tintAmount);
      tintType && formData.append("tintType", tintType);
      windows && formData.append("tintedWindows", windows);
      tintPercentage && formData.append("tintPercentage", tintPercentage);
      // append the tyre service
      tyreService && formData.append("tyreService", tyreService);
      tyreType && formData.append("tyreType", tyreType);
      tyreQuantity && formData.append("tyreQuantity", tyreQuantity);
      tyreAmount && formData.append("tyreAmount", tyreAmount);
      tyreNumber && formData.append("tyreNumber", tyreNumber);
      // append the battery service
      batteryService && formData.append("batteryService", batteryService);
      warranty && formData.append("warranty", warranty);
      batteryAmount && formData.append("batteryAmount", batteryAmount);
      batteryName && formData.append("batteryName", batteryName);
      batterySize && formData.append("batterySize", batterySize);

      // append the other service
      otherService && formData.append("otherService", otherService);
      otherTotal && formData.append(`otherTotal`, otherTotal);
      otherTotal && formData.append("otherItems", JSON.stringify(otherItems));  // the otherServices total amount.
      // append the company id and user id to the form
      // now I have set it manually. change it to actual id
      formData.append('company_id', auth.company.id);
      formData.append('user_id', auth.user.id);

      sendform(formData);

    }catch (formErr){
      setError("something went wrong creating form data.");
    }
  }

  const  sendform = async(formData)=>{
    await axios.post(process.env.REACT_APP_API_URL + '/api/customers/', formData,{
        headers: { 'Content-Type': 'multipart/form-data'}
    }).then((response)=>{
      // if the response status is create clear all the states.
      if(response.status === 201){
        // clear all the states
        setName('');
        setPhone('');
        setPaymentOption('Cash');
        setPhoto(null);
        setNote('');
        setTotal(0);
        // car details
        setPlateSource('Abu Dhabi');
        setPlateNumber('');
        setModel(null);
        // customer address details
        setCountry('United Arab Emirates');
        setState('Al Ain');
        setAddress(null);
        // oilchange states:
        setOil(5000);
        setCurrentMilage(0);
        setNextMilage(0);
        setOilAmount(0);
        // tint states
        setTintAmount(0);
        setTintType('');
        setWindows();
        setTintPercentage();
        // Tyre states
        setTyreType();
        setTyreQuantity(4);
        setTyreAmount(0);
        setTyreNumber('');
        // battery states:
        setSuccess(true);
      }
    }).catch((err)=>{ setError("Something went wrong submitting!")})
  }

  // on leaving the page, reset all the states as well.
  useEffect(()=>{
    return ()=>{
      setName('');
      setPhone('');
      setPaymentOption('Cash');
      setPhoto(null);
      setNote('');
      setTotal(0);
      // car details
      setPlateSource('Abu Dhabi');
      setPlateNumber('');
      setModel('');
      // customer address details
      setCountry('United Arab Emirates');
      setState('Al Ain');
      setAddress('');
      // oilchange states:
      setOil(5000);
      setCurrentMilage(0);
      setNextMilage(0);
      setOilAmount(0);
      // tint states
      setTintAmount(0);
      setTintType('');
      setWindows();
      setTintPercentage();
      // Tyre states
      setTyreType();
      setTyreQuantity(4);
      setTyreAmount(0);
      setTyreNumber('');
      // battery states:
    }
  },[])

  const handleSuggestedCustomer =(customer)=>{
    // set customer address, car, name 
    try{
      const addArr = customer.address.split("-");
      setAddress(addArr[0])
      addArr[1] && setState(addArr[1])
      addArr[2] && setCountry(addArr[2])

    }catch(err){console.log("something went wrong while setting the address.")}
    setName(customer.name)
    setPhone(customer.phone)
    setPlateNumber1(customer.car_plate_number)
    setPlateSource(customer.car_plate_source)
    setModel(customer.car_model)
    setCustomersList([]);
  }
  return (
    <div className='w-full md:w-1/2 lg:w-1/2 rounded-lg'>
      <div className="flex my-4 ml-5 overflow-x-auto" >
          <Link to={'/'} className="flex"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            <span className="text-indigo-600 mx-3">/</span></Link> 
          <span className="text-indigo-900">{t("dash.sales.add-sale")}</span> 
      </div>
      <form className='px-4 py-6 bg-white rounded-lg shadow-md' 
        onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="border-b border-gray-900/10 ">
            <div className="border-b border-gray-900/10 pb-2">
              <h2 className="text-base font-semibold leading-7 text-gray-900">{t("dash.sales.customer-information")}</h2>

              {/* customer info  */}
              <div className=" grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                {/* name */}
                <div className="sm:col-span-full">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("dash.sales.name")}</label>
                  <input type="text" name="name" id="name" onChange={(e)=>setName(fixNumbers(e.target.value))}
                    autoComplete="given-name" placeholder={t("dash.sales.name-placeholder")} value={name+''}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                {/* phone  */}
                <div className="sm:col-span-full">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("dash.sales.phone")} </label>
                  <input id="phone" value={phone+''}
                  onChange={(e)=>setPhone(fixNumbers(e.target.value))} 
                  style={{direction:lng?.direction}} name="phone" type="tel" autoComplete="phone" 
                  placeholder={t("dash.sales.phone-placeholder")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {/* suggested list of customers */}
                  <div className='mt-5'>
                    {(customersList?.length > 0) && 
                    <div className=''>
                      <label>{t("dash.sales.suggested-customers")}:</label>
                      {customersList?.map((customer, index)=>{
                      return <div key={index} onClick={()=>handleSuggestedCustomer(customer)}
                          className='my-2 rounded-lg shadow-sm p-2 px-4 bg-indigo-50 cursor-pointer'>
                        <h1 className='font-bold'>{customer?.name} - {customer?.phone}</h1>
                        <p><span className='font-bold'>{t("dash.sales.car")}:</span> {customer.car_plate_source} - {customer?.car_plate_number}</p>
                        <p><span className='font-bold'>{t("dash.sales.address")}:</span> {customer?.address}</p>
                      </div>
                      })}
                   
                    </div>
                    }
                  </div>
                </div>

              </div>
            </div>

            {/* car info */}
            <div className="border-b border-gray-900/10 py-2">
              <h2 className='text-base font-semibold leading-6 text-gray-900'>{t("dash.sales.car-information")}</h2>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
                <div className="">
                  <label htmlFor="plate-source" className="block text-sm font-medium leading-6 text-gray-900"> {t("dash.sales.plate-source")} </label>
                  <select value={plateSource}
                  onChange={(e)=>setPlateSource(e.target.value)} id="plate-source" name="plate-source" 
                  autoComplete="plate-source" 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" >
                    <option value={"Abu Dhabi"} >Abu Dhabi</option>
                    <option value={"Dubai"} >Dubai</option>
                    <option value={"Al Ain"} >Al Ain</option>
                    <option value={"Sharjah"} >Sharjah</option>
                    <option value={"Ajman"} > Ajman</option>
                    <option value={"Ras Al Khaimah"} > Ras Al Khaimah</option>
                    <option value={"Other"} > Other</option>
                  </select>
                </div>
          
                <div className="">
                  <label htmlFor="plate-number" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("dash.sales.plate-number")} <span className='text-red-500'>*</span> </label>
                  <input required={true}  type="text"  value={plateNumber+''}
                  onChange={(e)=>setPlateNumber(fixNumbers(e.target.value))} name="plate-number" 
                  id="plate-number" autoComplete="plate-number"
                    placeholder='Y21320'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

              </div>

              <div className='mt-2  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4'>        
                  <div className="">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                      {t("dash.sales.car-model")} <span className='text-red-500'>*</span></label>
                    <div className="">
                      <input required={true} value={model+''}
                      onChange={(e)=>setModel(fixNumbers(e.target.value))} type="text" 
                      placeholder={t("dash.sales.car-model-placeholder")}  
                      name="street-address" id="street-address" autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
              </div>
            </div>

              {/* service info */}
            <div className=" border-gray-900/10 py-2">
                <h2 className="text-base font-bold leading-7 text-gray-900">{t("dash.sales.services")}</h2>
                
              <div className=" grid grid-cols-6 sm:grid-cols-6 lg:grid-cols-6 gap-2">
                {/* oil change */}
                <div className="px-5">
                  <input id="oil-change"  name="oil-change" type="radio" value={'oilchange'}
                    checked={oilChangeService === true} onChange={()=>{}}
                    onClick={(e)=>{setOilChangeService(!oilChangeService)}}
                    className="h-10 w-10 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                    <br />
                  <label htmlFor="oilChange" className="font-medium text-gray-900"> {t("dash.sales.oil")} </label>
                </div>
                  {/* tinting */}
                <div className="px-5">
                    <input id="tint" name="tint" type="radio" 
                      checked={tintService === true} onChange={()=>{}}
                      onClick={(e)=>{setTintService(!tintService)}}
                      className="h-10 w-10 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                    <br />
                    <label htmlFor="tint" className="font-medium text-gray-900">{t("dash.sales.tint")} </label>
                </div>
                  {/* tyre service */}
                <div className="px-5">
                    <input id="tyre" name="tyrService" type="radio" value={'tyre'}
                    checked={tyreService === true} onChange={()=>{}}
                    onClick={(e)=>{setTyreService(!tyreService)}}
                      className="h-10 w-10 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                      <br />
                    <label htmlFor="tyre" className="font-medium text-gray-900">  {t("dash.sales.tyre")}  </label>
                </div>
                  {/* battery service */}
                <div className="px-5">
                      <input id="battery" name="batteyService"  type="radio" value={'battery'}
                        checked={batteryService === true} onChange={()=>{}}
                        onClick={(e)=>{setBatteryService(!batteryService)}}
                        className="h-10 w-10 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                        <br />
                      <label htmlFor="bettary" className="font-medium text-gray-900">  {t("dash.sales.battery")}  </label>
                </div>
                {/* other service */}
                <div className="px-5">
                      <input id="other" name="otherService"  type="radio" value={'other'}
                        checked={otherService === true} onChange={()=>{}}
                        onClick={(e)=>{setOtherService(!otherService);}}
                        className="h-10 w-10 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                        <br />
                      <label htmlFor="other" className="font-medium text-gray-900">  {t("dash.sales.other")}  </label>
                </div>
              </div>
              
              <div>
                {/* the service details */}
                {oilChangeService && <OilChange
                  currentMilage={currentMilage}
                  setCurrentMilage={setCurrentMilage}
                  setOil={setOil}
                  nextMilage={nextMilage}
                  oilAmount={setOilAmount}
                  setOilAmount={setOilAmount}
                />} 
                {tintService && <Tinting
                  tintAmount={tintAmount}
                  setTintAmount={setTintAmount}
                  tintType={tintType}
                  setTintType={setTintType}
                  windows={windows}
                  setWindows={setWindows}
                  tintPercentage={tintPercentage}
                  setTintPercentage={setTintPercentage}
                />}
                {tyreService && <Tyre 
                  tyreType={tyreType}
                  setTyreType={setTyreType} 
                  tyreQuantity={tyreQuantity}
                  setTyreQuantity={setTyreQuantity}
                  tyreAmount={tyreAmount} 
                  setTyreAmount={setTyreAmount} 
                  tyreNumber={tyreNumber}
                  setTyreNumber={setTyreNumber}
                  />}
                {batteryService && <Battery 
                    warranty={warranty}
                    setWarranty={setWarranty}
                    batteryAmount={batteryAmount}
                    setBatteryAmount={setBatteryAmount}
                    batteryName={setBatteryName}
                    setBatteryName={setBatteryName}
                    batterySize={setBatterySize}
                    setBatterySize={setBatterySize}
                />}
                {otherService && <OtherService
                  otherItems= {otherItems}
                  changeName={changeName}
                  changeAmount={changeAmount}
                  removeItem={removeItem}
                  addItem={addItem}
                />}

              </div>

              <div className="border-b border-gray-900/10" >
                <div className="my-3 bg-indigo-100 p-4 rounded-lg shadow-md">
                  {/* <div className="flex justify-between mb-2">
                    <span>Subtotal Amount</span>
                    <span className='text-indigo-900'> {subtotal? "AED "+subtotal.toFixed(2) : ''}</span>
                  </div> */}
                  {/* <div className="flex justify-between mb-2">
                    <span>VAT</span>
                    <span className='text-indigo-900'> {0}</span>
                  </div> */}
                  <div className="flex justify-between font-bold">
                    <span>{t("dash.sales.total-amount")}</span>
                    <span className='text-indigo-900'> {total? "AED "+((total).toFixed(2)) :""}</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">{t("dash.sales.payment-methods")}:</h2>
        
                  <div className="flex flex-row">
                    <div className='px-3'>
                      <label> 
                        <input  checked={(paymentOption==='Cash') === true} onChange={(e)=>setPaymentOption('Cash')} type="radio" name="paymentMethod" value="cash"
                        className="h-6 w-6 mx-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                        {t("dash.sales.cash")}
                      </label>
                    </div>
                    <div className='px-3'>
                      <label> <input checked={(paymentOption==='Card') === true} onChange={(e)=>setPaymentOption('Card')} type="radio" name="paymentMethod" value="cash" 
                        className="h-6 w-6 mx-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                        {t("dash.sales.card")}
                      </label>
                    </div>
                    <div className='px-3'>
                      <label> <input checked={(paymentOption==='Transfer') === true} onChange={(e)=>setPaymentOption('Transfer')} type="radio" name="paymentMethod" value="cash" 
                        className="h-6 w-6 mx-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                        {t("dash.sales.transfer")}
                      </label>
                    </div>
                    
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                {/* photo */}
                <div className="col-span-full mt-3">
                    {photo ? <>
                      <div className="mt-4 relative">
                        <div className='shadow-md rounded-lg p-1'>
                          <img src={photo && URL.createObjectURL(photo)} alt="Uploaded" className="max-w-full h-auto rounded-md bg-slate-300" />
                        </div>
                        <span onClick={()=>setPhoto(null)} className="absolute shadow-md top-0 right-0 mt-2 mr-2 bg-indigo-600 rounded-full p-1 hover:bg-indigo-400" >
                          <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" >
                            <path fillRule="evenodd"
                              d="M5.293 5.293a1 1 0 0 1 1.414 1.414L10 11.414l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 12l3.293 3.293a1 1 0 0 1-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 12 5.293 8.707a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"/>
                          </svg>
                        </span>
                      </div>
                    </>:<>
                      <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                        {t("dash.sales.photo")} </label> 
                        <div 
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`flex justify-center rounded-lg ${dragging ? 'bg-indigo-200 shadow-md' : 'border border-dashed border-gray-900/25'} px-6 py-4`}>
                          <div className="text-center">
                            <PhotoIcon className="mx-auto h-8 w-8 text-gray-300" aria-hidden="true" />
                            <div className=" flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>{t("dash.sales.upload-a-photo")}</span>
                                <input onChange={(e)=>{setPhoto(e.target.files[0])}} id="file-upload" name="file-upload"  type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">{t("dash.sales.or-drag-and-drop")}</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">{t("dash.sales.PNG-JPG-GIF-up-to-5MB")}</p>
                          </div>
                        </div>
                    </>}
                </div>

                {/* Note */}
                <div className="col-span-full">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("dash.sales.note")} </label>
                    <textarea onChange={(e)=>{setNote(e.target.value)}}
                      id="description"
                      name="description"
                      placeholder={t("dash.sales.note-placeholder")}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  <p className="px-1 text-sm leading-6 text-gray-600">{t("dash.sales.note-desc")}</p>
                </div>
              </div>

              {/* address  */}
              <div className="border-b border-gray-900/10 py-6 ">
                <h2 className="text-base font-semibold leading-7 text-gray-900">{t("dash.sales.address-details")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  <div className="">
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900"> {t("dash.sales.country")} </label>
                    <select onChange={(e)=>setCountry(e.target.value)} id="country" 
                    name="country" autoComplete="country-name" value={country}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" >
                      <option value={"United Arab Emirates"}>United Arab Emirates</option>
                      <option value={"Qatar"}>Qatar</option>
                      <option value={"Oman"}>Oman</option>
                      <option value={"Bahrian"}>Bahrian</option>
                      <option value={"Saudi Arabia"}>Saudi Arabia</option>
                    </select>
                  </div>
                  <div className="">
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900"> {t("dash.sales.emirates")} </label>
                    <select onChange={(e)=>setState(e.target.value)} id="country" 
                    name="country" autoComplete="country-name" value={state}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" >
                      <option value={"Al Ain"} >Al Ain</option>
                      <option value={"Abu Dhabi"}>Abu Dhabi </option>
                      <option value={"Dubai"} >Dubai</option>
                      <option value={"Sharjah"} >Sharjah </option>
                      <option value={"Ajman"} >Ajman</option>
                      <option value={"Ras Al Khaimah"}>Ras Al Khaimah</option>
                      <option value={"Other"} >Other</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3">
                  <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("dash.sales.address")} </label>
                    <input  onChange={(e)=>setAddress(fixNumbers(e.target.value))} value={address+''}
                    type="text"  name="street-address" id="street-address" autoComplete="street-address"
                      placeholder={t("dash.sales.address-placeholder")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className='space-y-6'>
          {error && <div className="my-2 rounded-md bg-red-50 p-4">
                <p className='text-red-800'>Something went wrong!</p>
            </div>}
        </div>
            
        <div className="grid">     
          <button type="submit"
            className="rounded-md bg-indigo-600 px-6 py-2 text-lg font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {t("dash.sales.submit")} </button>

          <br /> 
          <Link to={`/`}
              className="grid-cols-1 rounded-md mx-auto text-lg font-bold bg-slate-200 py-2 px-20 leading-6 text-gray-900">
              {t("dash.sales.cancel")} </Link>
          <br />
        </div>
      </form>
    </div>
  )
}