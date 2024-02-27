import { useEffect } from "react";
import Item from "./OtherItem";
export default function OtherService({otherItems, addItem, changeName, changeAmount, removeItem}){
    // add a first empty item object in the item list.
    // if the item list has element, do not add.
    useEffect(()=>{
        if(otherItems.length === 0){addItem()}
    },[])

    return (
        <div className="grid grid-cols-1 gap-x-1 gap-y-1 bg-indigo-100 my-2 rounded-lg p-3"> 
            <h2 className="text-base font-bold leading-7 text-gray-900 mx-4 pt-1"> Other Service Details</h2>

            {otherItems && otherItems.map((item)=>{return <Item  
                item={item} 
                key={item.id} 
                changeAmount={changeAmount} 
                changeName={changeName} 
                removeItem={removeItem} 
                /> })}
            
            <p onClick={()=>{addItem()}}
                className="rounded-md mx-2 bg-indigo-600 px-3 py-2 font-extrabold text-white shadow-sm hover:bg-indigo-500 
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Add Another</p>
        </div>
    )
}