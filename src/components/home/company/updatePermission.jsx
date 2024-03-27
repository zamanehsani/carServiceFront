import {useStat,useEffect} from 'react';
import { useParams } from 'react-router-dom';


export default function UpdatePermissions(){
    const {id} = useParams();
    return (
        <div className='m-10 p-10'>here the permissions are udpated.. user id: {id} </div>
    )
}