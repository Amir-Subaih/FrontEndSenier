import React, {  useContext, useEffect, useState } from 'react'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import WebLayout from './layout/WebLayout';
import Login from './components/web/login/Login';
import Register from './components/web/register/Register';
import Home from './components/web/home/Home';
import {UserContext} from './components/web/context/User';
import AddState from './components/web/addState/AddState';
import Profile from './components/web/profile/Profile';
import UserInfo from './components/web/profile/UserInfo';
import RecentEstate from './components/web/recentEstates/RecentEstate';
import MyEstate from './components/web/profile/MyEstate';
import DetalisEstate from './components/web/displayEstate/DetalisEstate';
import UpdateInfo from './components/web/profile/UpdateInfo';
import SeeAllHouse from './components/web/house/SeeAllHouse';
import SeeAllLand from './components/web/land/SellAllLand';
import ContactUs from './components/web/contact/ContactUs';
import ResultSearch from './components/web/searchResult/ResultSearch';
import SearchOnCity from './components/web/searchResult/SearchOnCity';
import SeeAllApartment from './components/web/apartment/SeeAllApartment';
import SeeAllStore from './components/web/store/SeeAllStore';
import SeeAllChalet from './components/web/chalet/SeeAllChalet';
import AddFeedback from './components/web/addFeedback/AddFeedback';
import Intersting from './components/web/profile/Interisting';
import Admin from './components/dashbord/admin/Admin';
import UserList from './components/dashbord/admin/UserList';
import AllEstate from './components/dashbord/admin/AllEstate';
import DashbordLayout from './layout/DashbordLayout';
import UpdateMyEstate from './components/web/profile/UpdateMyEstate';
import FormUpdateEstate from './components/web/formUpdateEstate/FormUpdateEstate';
import GridLoader from "react-spinners/ClipLoader";
import Auth from '../protectedRoute/Auth';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import style from '../src/App.module.css'

//Arabic
import WebLayoutArabic from './layout/WebLayoutArabic';
import LoginArabic from './components/web/login/LoginArabic';
import RegisterArabic from './components/web/register/RegisterArabic';
import HomeArabic from './components/web/home/HomeArabic';
import AddStateArabic from './components/web/addState/AddStateArabic';
import ProfileArabic from './components/web/profile/ProfileArabic';
import UserInfoArabic from './components/web/profile/UserInfoArabic';
import RecentEstateArabic from './components/web/recentEstates/RecentEstateArabic';
import MyEstateArabic from './components/web/profile/MyEstateArabic';
import DetalisEstateArabic from './components/web/displayEstate/DetalisEstateArabic';
import UpdateInfoArabic from './components/web/profile/UpdateInfoArabic';
import SeeAllHouseArabic from './components/web/house/SeeAllHouseArabic';
import SeeAllLandArabic from './components/web/land/SeeAllLandArabic';
import ContactUsArabic from './components/web/contact/ContactUsArabic';
import ResultSearchArabic from './components/web/searchResult/ResultSearchArabic';
import SearchOnCityArabic from './components/web/searchResult/SearchOnCityArabic';
import SeeAllApartmentArabic from './components/web/apartment/SeeAllApartmentArabic';
import SeeAllStoreArabic from './components/web/store/SeeAllStoreArabic';
import SeeAllChaletArabic from './components/web/chalet/SeeAllChaletArabic';
import AddFeedbackArabic from './components/web/addFeedback/AddFeedbackArabic';
import InterstingArabic from './components/web/profile/InteristingArabic';
import FormUpdateEstateArabic from './components/web/formUpdateEstate/FormUpdateEstateArabic';
import UpdateMyEstateArabic from './components/web/profile/UpdateMyEstateArabic';




export default function App() {
  let {setUserToken,setUserId}=useContext(UserContext);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },5000)
  },[])

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const storedUserId = localStorage.getItem("userId");

    // startLoading();
    if (storedToken && storedUserId) {
      setUserToken(storedToken);
      setUserId(storedUserId);
    }
  }, [setUserToken, setUserId]);

  
  const router = createBrowserRouter([
    {
      path:"/admin",
      element:<DashbordLayout/>,
      children:[
        {
          path:"/admin",
          element:<Admin/>,
          children:[
            {
              index:true,
              element:<UserInfo/>
            },
            {
              path:"updateInfo",
              element:<UpdateInfo/>
            },
            {
              path:"allEstate",
              element:<AllEstate/>,
            },
            {
              path:"ditalStateAdmin/:EstateId",
              element:<DetalisEstate/>
            },
            {
              path:"allUser",
              element:<UserList/>
            }
          ]
        },
        
      ]
    },
    {
      path: "/",
      element: <WebLayout/>,
      children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'login',
        element:
        <Auth>
        <Login/>
        </Auth>
      },
      {
        path:"register",
        element:<Register/>
      },
      {
        path:"addState",
        element:<AddState/>,
      },
      {
        path:"displayEstate",
        element:<RecentEstate/>
      },
      {
        path:"ditalState/:EstateId",
        element:<DetalisEstate/>
      },
      {
        path:"allHouse",
        element:<SeeAllHouse/>
      },
      {
        path:"allLands",
        element:<SeeAllLand/>
      },
      {
        path:"contact",
        element:<ContactUs/>
      },
      {
        path:"allApartments",
        element:<SeeAllApartment/>
      },
      {
        path:"allStores",
        element:<SeeAllStore/>
      },
      {
        path:"allChalets",
        element:<SeeAllChalet/>
      },
      {
        path:"searchResults",
        element:<ResultSearch/>
      },
      {
        path:"searchCity",
        element:<SearchOnCity/>
      },
      {
        path:"addFeedback",
        element:<AddFeedback/>
      },
      {
        path:"profile",
        element:
        <ProtectedRoute>
        <Profile/>,
        </ProtectedRoute>,
        children:[
          {
            index:true,
            element:<UserInfo/>
          },
          
          {
            path:"myEstate",
            element:<MyEstate/>,
            children:[
              {
                path:"ditalState/:EstateId",
                element:<DetalisEstate/>
              },
            ]
          },
          {
            path:"updateInfo",
            element:<UpdateInfo/>
          },
          {
            path:"interst",
            element:<Intersting/>
          },
          {
            path:"updateEstate",
            element:<UpdateMyEstate/>,
          },
        ]
      },
      {
        path:"/formUpdate/:EstateId",
        element:<FormUpdateEstate/>
      },
    ]
    },
    {
      path: "/ara",
      element: <WebLayoutArabic/>,
      children:[
      {
        path:'/ara',
        element:<HomeArabic/>
      },
      {
        path:'loginAra',
        element:
        <Auth>
        <LoginArabic/>
        </Auth>
      },
      {
        path:"registerAra",
        element:<RegisterArabic/>
      },
      {
        path:"addStateAra",
        element:<AddStateArabic/>,
      },
      {
        path:"displayEstateAra",
        element:<RecentEstateArabic/>
      },
      {
        path:"ditalStateAra/:EstateId",
        element:<DetalisEstateArabic/>
      },
      {
        path:"allHouseAra",
        element:<SeeAllHouseArabic/>
      },
      {
        path:"allLandsAra",
        element:<SeeAllLandArabic/>
      },
      {
        path:"contactAra",
        element:<ContactUsArabic/>
      },
      {
        path:"allApartmentsAra",
        element:<SeeAllApartmentArabic/>
      },
      {
        path:"allStoresAra",
        element:<SeeAllStoreArabic/>
      },
      {
        path:"allChaletsAra",
        element:<SeeAllChaletArabic/>
      },
      {
        path:"searchResultsAra",
        element:<ResultSearchArabic/>
      },
      {
        path:"searchCityAra",
        element:<SearchOnCityArabic/>
      },
      {
        path:"addFeedbackAra",
        element:<AddFeedbackArabic/>
      },
      {
        path:"profileAra",
        element:
        <ProtectedRoute>
        <ProfileArabic/>,
        </ProtectedRoute>,
        children:[
          {
            index:true,
            element:<UserInfoArabic/>
          },
          
          {
            path:"myEstateAra",
            element:<MyEstateArabic/>,
            children:[
              {
                path:"ditalStateAra/:EstateId",
                element:<DetalisEstateArabic/>
              },
            ]
          },
          {
            path:"updateInfoAra",
            element:<UpdateInfoArabic/>
          },
          {
            path:"interstAra",
            element:<InterstingArabic/>
          },
          {
            path:"updateEstateAra",
            element:<UpdateMyEstateArabic/>,
          },
        ]
      },
      {
        path:"formUpdateAra/:EstateId",
        element:<FormUpdateEstateArabic/>
      },
    ]
    },
  ]);
  const backgroundImageUrl = "../img/gaza.jpeg";
  return (
    <>
    {loading?
    <div className={`spiners`}>
          <GridLoader
            color={"#36d7b7"}
            loading={loading} 
            size={200}  
            aria-label="Loading Spinner" 
            data-testid="loader"/>
      </div>
      : 
      <RouterProvider router={router} />
    }
    </>
  )
}
