import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  const [gameArray , setData]=useState([]);

// ////////////////request Api
  async function getGames(){
    let {data}=await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games`,{
      params:{'sort-by':'popularity'},
      headers : {
        'X-RapidAPI-Key':'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}
    })
    setData(data);
    // console.log(data);
  }
// /////////////////
  useEffect(()=>{
    getGames();
  },[]);
  // console.log(gameArray);

  return (
    <>
    <div className="text-center py-5 gameHead border border-1 border-dark">
            <h1 className='text-muted'>Find & track the best <span className='text-primary'>free-to-play</span> games!</h1>
            <h3 className='text-muted'>Track what you've played and search for what to play next! Plus get free premium loot!</h3>
            <button className='btn btn-secondary bg-transparent text-muted'>Browse Games</button>
    </div>
    <div className="container py-5">
      <div className="row gy-4">
        <h3 className='text-secondary'><i className='fas fa-robot mr-2'></i>Personalized Recommendations</h3>
        {gameArray.slice(0,3).map((e)=>{
          return <>
            <div className="col-md-4 " key={e.id}>
              <div className="bg-black shadow">
              <Link to={`/Gamedetails/${e.id}`}>
              <img src={e.thumbnail} alt=' ' className='w-100'/></Link>
             <div className="d-flex justify-content-between py-2">
             <h5 className='text-muted px-3'>{e.title}</h5>
             <button className='btn btn-primary mx-3'>free</button>
              </div>
             </div>
            </div>          </>
        })}
      </div>
    </div>
    
    </>
  )
}
