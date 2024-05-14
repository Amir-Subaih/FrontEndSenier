import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext=createContext({});
export function UserContextProvider({children})
{
    let [userToken,setUserToken]=useState(null);
    let [userData,setUserData]=useState(null);
    let [userId,setUserId]=useState(null);
    let [loading,setLoading]=useState(true);
    
    // console.log(userId);

    const getUserData=async ()=>{
        if(userToken)
        {    const {data}=await axios.get(`https://estatetest.onrender.com/api/users/${userId}`,
            {headers:{token:userToken}});
            // console.log(data);
            setUserData(data);
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(userToken)
        {
            getUserData();
        }
    },[userToken]);
    return <UserContext.Provider value={{userToken,setUserToken,userData,setUserData,loading,setLoading,setUserId}}>
        {children}
    </UserContext.Provider>
}

