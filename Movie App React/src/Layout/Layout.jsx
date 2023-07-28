import React from 'react'
import { Outlet } from 'react-router-dom'
import  Navbar  from '../Navbar/Navbar'
 
 export default function Layout(props) {
   return (
    <>
    <Navbar isLogin={props.isLogin} setIsLogin={props.setIsLogin}/>
    <Outlet/>
    </>   )
 }
 
