import { useSelector } from "react-redux";
import {useState} from "react";
import OilChangeEdit from "./oilChangeEdit";
import RemoveItemModal from "./oilRemove";
import { useTranslation } from "react-i18next";
export default function OilChangeService({instance}){
    const auth = useSelector(state => state.auth);
    const [editMode, setEditMode] = useState(false);
    const [t] = useTranslation('global');
    function hasPermission(permissionName) {return auth.user.user_permissions.some(permission => permission.codename === permissionName);}

    return (
        <div className="rounded-md w-full bg-white p-4 mx-auto">
            <div className="flex items-center">
                <h1 className="font-bold leading-10 text-2xl text-indigo-600">{t("dash.sales.oil-change")} </h1>
                {hasPermission('change_oilchange') &&
                    <svg onClick={(e)=>setEditMode(!editMode)} style={{display: editMode ? "none" :null}} xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                        className="text-indigo-500 w-8 h-8  mx-2">
                        <path strokeLinecap="round" strokeLinejoin="round" 
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    }
                    {hasPermission('delete_oilchange') && <RemoveItemModal instance={instance} />}
            </div>
            {editMode ? <OilChangeEdit instance={instance} setEditMode={setEditMode} /> : <>
                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">{t("dash.sales.oil-type")}: </span> {instance?.oil}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">{t("dash.sales.car-milage")}: </span> {instance?.currentMilage}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">{t("dash.sales.next-oil-mhange-milage")}: </span> {parseFloat((instance?.oil))+parseFloat((instance?.currentMilage))}</p>
                <p className="text-gray-600"><span className="font-semibold mx-2 text-indigo-600">{t("dash.sales.service-amount")}: </span>AED {instance?.amount}</p>
            </>
                }
        </div>

    )
}