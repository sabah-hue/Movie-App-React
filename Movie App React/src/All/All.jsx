import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function All() {
  const [gameArray , setData]=useState([]);

// ////////////////request Api
  async function getGames(){
    let {data}=await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games`,{
      headers : {
        'X-RapidAPI-Key':'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}
    })
    setData(data);
  }
// /////////////////
  useEffect(()=>{
    getGames();
  },[]);

  return (
    <>
    <div className="container py-5">
      <div className="row gy-4">
        {gameArray.map((e)=>{
          return <>
            <div className="col-md-4 " key={e.id}>
              <div className="bg-black shadow">
              <Link to={`/Gamedetails/${e.id}`}>
              <img src={e.thumbnail} alt=' ' className='w-100'/></Link>
             <div className="d-flex justify-content-between py-2">
             <h5 className='text-muted px-3'>{e.title}</h5>
             <button className='btn btn-primary mx-3'>free</button>
              </div>
              <p className='text-muted'>{e.short_description.slice(0,25)}...</p>
              <div className='d-flex justify-content-around'>
                <i className='fas fa-plus-square text-muted'></i>
                <p className='rounded-pill bg-secondary text-dark px-2'>{e.genre}</p>
                <i className='fab fa-windows text-muted'></i>
             </div>
             </div>
            </div>          </>
        })}
      </div>
    </div>
    

    </>
  )
}

