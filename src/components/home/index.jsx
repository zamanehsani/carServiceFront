import { useSelector, useDispatch } from "react-redux"
import DealTable from "./dealtable"


export default function Home(){
    const count = useSelector((state)=>state.counter.value)
    const dispatch = useDispatch();
    return(
        <>
        <DealTable/>
        <br  className="my-5"/>

        </>


    )
}