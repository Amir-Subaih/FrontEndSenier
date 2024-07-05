import axios from "axios";
import { createContext } from "react";

export const DisplayContext=createContext(null);
export function DisplayContextProvider({children})
{
    const displayRecentEstate = async () => {
        const { data } = await axios.get("https://estatetest.onrender.com/api/estate/all?pageNumber=1 ");
        // console.log(data);
        return data;
    }

    const displayHouse = async () => {
        const { data } = await axios.get("https://estatetest.onrender.com/api/estate/all?typeEatateS=House&pageNumber=1");
        // console.log(data);
        return data;
    }

    const displayLand = async () => {
        const { data } = await axios.get("https://estatetest.onrender.com/api/estate/all?typeEatateS=Land&pageNumber=1");
        // console.log(data);
        return data;
    }

    const displayApartment = async () => {
        const { data } = await axios.get("https://estatetest.onrender.com/api/estate/all?typeEatateS=Apartment&pageNumber=1");
        // console.log(data);
        return data;
    }

    const displayStore = async () => {
        const { data } = await axios.get("https://estatetest.onrender.com/api/estate/all?typeEatateS=Store&pageNumber=1");
        // console.log(data);
        return data;
    }

    const displayChalet = async () => {
        const { data } = await axios.get("https://estatetest.onrender.com/api/estate/all?typeEatateS=Chalet&pageNumber=1");
        // console.log(data);
        return data;
    }

    const displayFeedback = async () => {
        const { data } = await axios.get("https://estatetest.onrender.com/api/feedback/all?pageNum=1");
        return data;
    };

    const displayEstateByLocation = async (location,typeEstateLikeIt) => {
        const { data } = await axios.get(`https://estatetest.onrender.com/api/estate/all?cityName=${location}&typeEatateS=${typeEstateLikeIt}`);
        // console.log("Filtered Data:", data);
        return data;
    }
    return <DisplayContext.Provider value={{displayRecentEstate,displayHouse,displayLand,displayApartment,displayStore,displayChalet,displayFeedback,displayEstateByLocation}}>
        {children}
    </DisplayContext.Provider>
}