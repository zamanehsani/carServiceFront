import { useSelector, useDispatch } from "react-redux"
import DealTable from "./dealtable"
import { increment, decrement, 
    decrementByAmount, incrementByAmount,reset,
    incrementByAsync, decrementByAsync, incrementByAmountAsync
} from "../redux/counterSlice";


export default function Home(){
    const count = useSelector((state)=>state.counter.value)
    const dispatch = useDispatch();
    return(
        <>
        <DealTable/>
        <br  className="my-5"/>
        <div>  counter: {count} </div>

        <div className="flex ">
            <button className="mx-3 px-5 py-3 bg-indigo-600 text-white rounded-md " 
                onClick={()=>dispatch(increment())}>Increment</button>

            <button className="mx-3 px-5 py-3 bg-indigo-600 text-white rounded-md " 
                onClick={()=>dispatch(decrement())}>Decrement</button>

            <button className="mx-3 px-5 py-3 bg-indigo-600 text-white rounded-md " 
                onClick={()=>dispatch(reset())}>Reset</button>

            <button className="mx-3 px-5 py-3 bg-indigo-600 text-white rounded-md " 
                onClick={()=>dispatch(incrementByAmount(10))}>Increment by 10</button>

            <button className="mx-3 px-5 py-3 bg-indigo-600 text-white rounded-md " 
                onClick={()=>dispatch(decrementByAmount(10))}>Decrement by 10</button>

                <br />
            <button className="mx-3 px-5 py-3 bg-indigo-600 text-white rounded-md " 
                onClick={()=>dispatch(incrementByAsync())}>Increment By Async</button>

            <button className="mx-3 px-5 py-3 bg-indigo-600 text-white rounded-md " 
                onClick={()=>dispatch(decrementByAsync())}>Increment By Async</button>
        
            <button className="mx-3 px-5 py-3 bg-indigo-600 text-white rounded-md " 
                onClick={()=>dispatch(incrementByAmountAsync(10))} >Amount By 10 Async</button>
        </div>
      
        </>


    )
}