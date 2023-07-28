import React  , {useState}from 'react'
// import { useEffect } from 'react';
import Joi from 'joi';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/gaming.jpg'

export default function Register() {

  const [user , setUser]=useState(
    {
      first_name:'',
      last_name:'',
      age:'',
      email:'',
      password:''
    }
  );

  let myUser = {...user};
// ///////////////////////////////
const [errorDetails , setErrors]=useState([]);

function validateUserData(){
  const rules = Joi.object({
    first_name: Joi.string().alphanum().min(3).max(30).required(),
    last_name: Joi.string().alphanum().min(3).max(20).required(),
    age: Joi.number().min(16).max(60).required(),

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,20}")),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  let validatRes = rules.validate(user,{abortEarly:false});
  console.log(validatRes);

  if(validatRes.error !== undefined){
    setErrors(validatRes.error.details);
    return false
  }
  else {
    setErrors([]);
    return true};
}
// ///////////////////////////////////////////////
function showErr(inputName){
  let x =errorDetails.filter((e)=>{return e.message.includes(inputName)});
  console.log(x);
  if(x[0]!==undefined){
    return <p className='text-danger'>{x[0].message}</p>
  }
  else {
    return '';
  }
}
// ///////////////////////////////
const [apiMsg , setApiMsg] = useState('');
let navigateTo=useNavigate();

async function register(){

  if(validateUserData()){
    let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signup',user);
    console.log(data.message);
    setApiMsg(data.message);
    if(data.message==='success'){
      navigateTo('/login');
    }
  }
 else {

 }
}
// /////////////////////////////////////////////////
  return (
    <>
  <div className="container">
    <div className="row bg-dark shadow-lg">
      <div className="col-md-6 bg-black stander">
          <img src={logo} className='img-fluid w-100' alt=''/>
      </div>
      <div className="col-md-6">
        <h3 className='text-muted text-center my-3'> create My account!</h3>
      <form onSubmit={(e)=>{
      e.preventDefault();
      register();
    }}>
      {/* {errorDetails.map((error)=>{
        if(error.message.includes('pattern')){
          error.message='password should be 8 character';
        }
        return <p className='text-danger '>{error.message}</p>
      })} */}
      <div className="d-flex">
      <input type='text' placeholder='First Name' onChange={(e)=>{myUser.first_name=e.target.value;setUser(myUser);}} className='form-control me-3 bg-black text-muted first '/>
      <input type='text' placeholder='Last Name' onChange={(e)=>{myUser.last_name=e.target.value;setUser(myUser);}} className='form-control  bg-black text-muted last '/>
      </div>
      <div className="d-flex">
      { errorDetails.length>0 ? showErr('first_name'):''}
      { errorDetails.length>0 ? showErr('last_name'):''}
      </div>
      <input type='text' placeholder='Email address' onChange={(e)=>{myUser.email=e.target.value;setUser(myUser);}} className='form-control  bg-black text-muted my-3'/>
      { errorDetails.length>0 ? showErr('email'):''}

      <input type='text' placeholder='Age' onChange={(e)=>{myUser.age=e.target.value;setUser(myUser);}} className='form-control bg-black text-muted my-3'/>
      { errorDetails.length>0 ? showErr('age'):''}

      <input type='text' placeholder='password' onChange={(e)=>{myUser.password=e.target.value;setUser(myUser);}} className='form-control bg-black text-muted my-3'/>
      { errorDetails.length>0 ? showErr('password'):''}

      <button className='btn btn-secondary  px-3 py-2 mt-2 form-control' >create acount</button>
      <p className='text-danger'>{ apiMsg}</p>
       </form>
      <p className='text-muted text-center'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
      <hr className='w-100 text-muted'/>
      <p className='text-muted text-center'>Already a member? <Link to={'login'}>Log In</Link></p>
      </div>
    </div>
  </div>
    </>
  )
}
