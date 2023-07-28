import './App.css';
import  Home  from './Home/Home';
import  Login  from './Login/Login';
import  Register  from './Register/Register';
import  Sortby  from './Sortby/Sortby';
import  All  from './All/All';
import  Platform  from './Platform/platform';
import  Notfound  from './Notfound/Notfound';
import Gamedetails from './Gamedetails/Gamedetails';
import Layout from './Layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Category from './Category/Category';
import { useEffect, useState } from 'react'
import Protected from './Protected/Protected';


function App() {
  let [isLogin,setIsLogin]=useState(false);

const Routs=createBrowserRouter([
  {path:'/',element:<Layout isLogin={isLogin} setIsLogin={setIsLogin}/>,children:[
    {index:true,element:<Register/>},
    {path:'home',element:<Protected><Home/></Protected>},
    {path:'Gamedetails/:gameId',element:<Protected><Gamedetails/></Protected>},
    {path:'login',element:<Login setIsLogin={setIsLogin}/>},
    {path:'all',element:<Protected><All/></Protected>},
    {path:'platform/:platName',element:<Protected><Platform/></Protected>},
    {path:'sortby/:sorted',element:<Protected><Sortby/></Protected>},
    {path:'Categories/:cate',element:<Protected><Category/></Protected>},
    {path:'*',element:<Notfound/>}
  ]}
])

useEffect(()=>{
  if(localStorage.getItem('token')){
    setIsLogin(true);
  }
},[isLogin])
  return (
    <>
        <RouterProvider router={Routs}/>
    </>
  );
}
export default App;
