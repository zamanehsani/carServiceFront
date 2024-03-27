import {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';


export default function UpdatePermissions(){
    const {id} = useParams();
    const [value, setValue] = useState('');

   

    return (
        <div className='m-10 p-10'>
            here the permissions are udpated.. user id: {id} 
            <p>value: {value}</p>
            <input
                type="tel"
                value={value}
                onChange={console.log()}
                placeholder="Enter English numerics"
                />
        </div>
    )
}