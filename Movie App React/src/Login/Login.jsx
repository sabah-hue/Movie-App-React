import React  , {useState}from 'react'
import Joi from 'joi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../img/gaming.jpg';
import gameLogo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

  const [user , setUser]=useState(
    {
      email:'',
      password:''
    }
  );

  let myUser = {...user};
// ///////////////////////////////
const [errorDetails , setErrors]=useState([]);

function validateUserData(){
  const rules = Joi.object({
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}")),
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

async function login(){

  if(validateUserData()){
    let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signin',user);
    console.log(data.message);
    setApiMsg(data.message);
    if(data.message==='success'){
      localStorage.setItem('token',data.token);
      props.setIsLogin(true);
      navigateTo('/home');
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
      <div className="col-md-6 text-center">
      <img src={gameLogo} className='w-25' alt=''/>
        <h3 className='text-muted text-center my-3'>Log in to GameOver</h3>
      <form onSubmit={(e)=>{
      e.preventDefault();
      login();
    }}>
      
      <input type='text' placeholder='Email address' onChange={(e)=>{myUser.email=e.target.value;setUser(myUser);}} className='form-control  bg-black text-muted my-3'/>
      { errorDetails.length>0 ? showErr('email'):''}

      <input type='text' placeholder='password' onChange={(e)=>{myUser.password=e.target.value;setUser(myUser);}} className='form-control bg-black text-muted my-3'/>
      { errorDetails.length>0 ? showErr('password'):''}

      <button className='btn btn-secondary  px-3 py-2 mt-2 form-control' >Login</button>
      <p className='text-danger'>{ apiMsg}</p>
       </form>
      <hr className='w-100 text-muted'/>
      <p className='text-muted text-center'><Link to={''}>Forgot Password?</Link></p>
      <p className='text-muted text-center'>Not a member yet? <Link to={''}>Create account</Link></p>
      </div>
    </div>
  </div>
      </>  )
}
