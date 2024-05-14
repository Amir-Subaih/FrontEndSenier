import React, { useContext, useEffect } from 'react'; // Modified: Added semicolon
import {createBrowserRouter,RouterProvider} from "react-router-dom"; // Modified: Removed extra comma

// Importing English components
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
import AddFeedback from './components/web/addFeedback/AddFeedback';

// Importing Arabic components
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
import SeeAllLandArabic from './components/web/land/SellAllLandArabic';
import ContactUsArabic from './components/web/contact/ContactUsArabic';
import AddFeedbackArabic from './components/web/addFeedback/AddFeedbackArabic';


export default function App() {
  let {setUserToken,setUserId}=useContext(UserContext);

  useEffect(()=>{
    const storedToken = localStorage.getItem("userToken");
    const storedUserId = localStorage.getItem("userId");
    if(storedToken)
    {
      setUserToken(storedToken);
      setUserId(storedUserId);
      // localStorage.removeItem("userToken");
      // localStorage.removeItem("userId");
    }
  },[]);

  const router = createBrowserRouter([
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
        element:<Login/>
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
        path:"addFeedback",
        element:<AddFeedback/>,
      },
      {
        path:"displayEstate",
        element:<RecentEstate/>
      },
      // {
      //   path:"displayHouse",
      //   element:<DisplayHouse/>
      // },
      {
        path:"ditalState/:EstateId",
        element:<DetalisEstate/>
      },
      {
        path:"allHouse",
        element:<SeeAllHouse/>
      },
      {
        path:"allLand",
        element:<SeeAllLand/>
      },
      {
        path:"contact",
        element:<ContactUs/>
      },
      {
        path:"profile",
        element:<Profile/>,
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
          }
        ]
      }
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
        path:'loginArabic',
        element:<LoginArabic/>
      },
      {
        path:"registerArabic",
        element:<RegisterArabic/>
      },
      {
        path:"addStateArabic",
        element:<AddStateArabic/>,
      },
      {
        path:"addFeedbackArabic",
        element:<AddFeedbackArabic/>,
      },
      {
        path:"displayEstateArabic",
        element:<RecentEstateArabic/>
      },
      // {
      //   path:"displayHouse",
      //   element:<DisplayHouse/>
      // },
      {
        path:"ditalStateArabic/:EstateId",
        element:<DetalisEstateArabic/>
      },
      {
        path:"allHouseArabic",
        element:<SeeAllHouseArabic/>
      },
      {
        path:"allLandArabic",
        element:<SeeAllLandArabic/>
      },
      {
        path:"contactArabic",
        element:<ContactUsArabic/>
      },
      {
        path:"profileArabic",
        element:<ProfileArabic/>,
        children:[
          {
            index:true,
            element:<UserInfoArabic/>
          },
          
          {
            path:"myEstateArabic",
            element:<MyEstateArabic/>,
            children:[
              {
                path:"ditalStateArabic/:EstateId",
                element:<DetalisEstateArabic/>
              },
            ]
          },
          {
            path:"updateInfoArabic",
            element:<UpdateInfoArabic/>
          }
        ]
      }
    ]
    },
  ]);
  return (
    // <UserContextProvider>
    <RouterProvider router={router} />
    // </UserContextProvider>
  )
}

//the pase code
/*
import React, {  useContext, useEffect } from 'react'
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

Arabic
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
import SeeAllLandArabic from './components/web/land/SellAllLandArabic';
import ContactUsArabic from './components/web/contact/ContactUsArabic';

export default function App() {
  let {setUserToken,setUserId}=useContext(UserContext);

  useEffect(()=>{
    const storedToken = localStorage.getItem("userToken");
    const storedUserId = localStorage.getItem("userId");
    if(storedToken)
    {
      setUserToken(storedToken);
      setUserId(storedUserId);
      // localStorage.removeItem("userToken");
      // localStorage.removeItem("userId");
    }
  },[]);

  const router = createBrowserRouter([
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
        element:<Login/>
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
      // {
      //   path:"displayHouse",
      //   element:<DisplayHouse/>
      // },
      {
        path:"ditalState/:EstateId",
        element:<DetalisEstate/>
      },
      {
        path:"allHouse",
        element:<SeeAllHouse/>
      },
      {
        path:"allLand",
        element:<SeeAllLand/>
      },
      {
        path:"contact",
        element:<ContactUs/>
      },
      {
        path:"profile",
        element:<Profile/>,
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
          }
        ]
      }
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
        path:'loginArabic',
        element:<LoginArabic/>
      },
      {
        path:"registerArabic",
        element:<RegisterArabic/>
      },
      {
        path:"addStateArabic",
        element:<AddStateArabic/>,
      },
      {
        path:"displayEstateArabic",
        element:<RecentEstateArabic/>
      },
      // {
      //   path:"displayHouse",
      //   element:<DisplayHouse/>
      // },
      {
        path:"ditalStateArabic/:EstateId",
        element:<DetalisEstateArabic/>
      },
      {
        path:"allHouseArabic",
        element:<SeeAllHouseArabic/>
      },
      {
        path:"allLandArabic",
        element:<SeeAllLandArabic/>
      },
      {
        path:"contactArabic",
        element:<ContactUsArabic/>
      },
      {
        path:"profileArabic",
        element:<ProfileArabic/>,
        children:[
          {
            index:true,
            element:<UserInfoArabic/>
          },
          
          {
            path:"myEstateArabic",
            element:<MyEstateArabic/>,
            children:[
              {
                path:"ditalStateArabic/:EstateId",
                element:<DetalisEstateArabic/>
              },
            ]
          },
          {
            path:"updateInfoArabic",
            element:<UpdateInfoArabic/>
          }
        ]
      }
    ]
    },
  ]);
  return (
    // <UserContextProvider>
    <RouterProvider router={router} />
    // </UserContextProvider>
  )
}

*/