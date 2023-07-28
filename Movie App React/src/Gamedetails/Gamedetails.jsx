import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'

export default function Gamedetails() {
   let {gameId}= useParams();
   let [gameDetail , setDetail]=useState({});

   async function getData(){
    let {data}=await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/game',{
      params:{'id':`${gameId}`},
      headers : {
        'X-RapidAPI-Key':'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}
    })
    setDetail(data);
    console.log(data);
  }
/////////// run function
useEffect(()=>{
  getData();
},[gameId])
  return (
    <>
    {/* <p className='text-muted'>{gameId}</p> */}
    <div className="container py-5">
        <div className="row">
            <div className="col-md-6">
                <img src={gameDetail.thumbnail} alt='' className='w-100'/>
            </div>
            <div className="col-md-6">
            <h1 className='text-muted'>{gameDetail.title}</h1>
            <h4 className='text-muted'>{gameDetail.title}</h4>
            <p className='text-muted'>{gameDetail.description}</p>
            <h4 className='text-secondary'>Minimum System Requirements</h4>
            {/* <p className='text-muted'>graphics:{gameDetail.minimum_system_requirements.graphics==undefined? '':<span>{gameDetail.minimum_system_requirements.graphics}</span>}</p> */}
            {/* <p className='text-muted'><span>memory:</span>{gameDetail.minimum_system_requirements.memory}</p> */}
            {/* <p className='text-muted'><span>os:</span>{gameDetail.minimum_system_requirements.os}</p> */}
            {/* <p className='text-muted'><span>processor:</span>{gameDetail.minimum_system_requirements.processor}</p> */}
            {/* <p className='text-muted'><span>storage:</span>{gameDetail.minimum_system_requirements.storage}</p> */}
            </div>
        </div>
     </div>
    </>
  )
}


