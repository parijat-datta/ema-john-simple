import React, { useState, useContext } from 'react';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from './firebase-config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);
function Login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [newUser,setNewUser]=useState(false)
  const history=useHistory();
  const location=useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [user,setUser]=useState({
   isSignedIn:false,
   name:'',
   email:'',
   photoURL:''

  })

  const[loggedInUser,setLoggedInUser]=useContext(UserContext);
  const handleButton=()=>{
    firebase.auth().signInWithPopup(provider)
    .then(res=> {
      const {displayName,photoURL,email} = res.user;
      const signedInUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        photoURL:photoURL
      }
      setUser(signedInUser);
      const newUserInfo ={...user};
      newUserInfo.error='';
      newUserInfo.success=true;
      setUser(newUserInfo);
      
      setLoggedInUser(newUserInfo);
       history.replace(from);
      
      console.log(displayName,photoURL,email);
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // // The signed-in user info.
      // var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

const handleSignOut=()=>{
  firebase.auth().signOut()
  .then(res =>{

   const signOutUser={
    isSignedIn:false,
    name:'',
    email:'',
    photoURL:'',
    error:'',
    success:false,
    newUser:false

   }
   setUser(signOutUser)


  })
  .catch(err => console.log(err))
}


const handleChange=(e) => {
  let isFormValid=true;
  if (e.target.name === 'email'){
  isFormValid=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value);
  
  }
  if(e.target.name === 'password'){
    const isPasswordValid =e.target.value.length>8;
    const passwordHasOneDigit=/\d{1}/.test(e.target.value)
   isFormValid=isPasswordValid && passwordHasOneDigit

  }

  if(isFormValid){
   const newUser={...user};
   newUser[e.target.name]=e.target.value;
   setUser(newUser)
  }
}
const handleSubmit=(e) => {
  if(newUser&&user.email&&user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res=>{
      console.log(res)
      const newUserInfo ={...user};
      newUserInfo.name=res.displayName;
      newUserInfo.error='';
      newUserInfo.success=true;
      setUser(newUserInfo);
      updateUserName(user.name);
      setLoggedInUser(user);
      history.replace(from);
    })
    .catch(error=> {
      // Handle Errors here.
      const newUserInfo={...user};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
     
      // ...
    });
  }
  if(!newUser&&user.email&&user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
      
      const newUserInfo ={...user};
      newUserInfo.error='';
      newUserInfo.success=true;
      
     
      setLoggedInUser(newUserInfo);
       history.replace(from);

      console.log('sign is user info',res.user)
      

    })
    .catch(function(error) {
      // Handle Errors here.
      const newUserInfo={...user};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      setUser(newUserInfo)
      // ...
    });
  }


  e.preventDefault()
 
  
  }

  const updateUserName = name =>{

    const user= firebase.auth().currentUser;

        user.updateProfile({
          displayName: name
         
        }).then(function() {
          console.log('User name updated successfully')
          // Update successful.
        }).catch(function(error) {
          // An error happened.
          console.log(error)
        });
      }
  return (
    <div style={{textAlign:'center'}}>
      { user.isSignedIn ?<button onClick={handleSignOut}>SIGN OUT</button>
        :<button onClick={handleButton}>SIGN IN</button>}

      {

      user.isSignedIn&&<div>
        <p>Welcome, {user.name}</p>
      <p>Email: {user.email}</p>
      <img style={{width:'20%'}} src={user.photoURL} alt="" />
      </div>

     
      
      }

      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""></input>
      <label htmlFor="newUser">New User Signup</label>
      <form onSubmit={handleSubmit}> 
        {newUser &&<input type="text" name="name" onBlur={handleChange} placeholder="Your Name"></input>}<br></br>
         <input onBlur={handleChange} type="text" name="email" placeholder="Email address"></input>
         <br></br>
         <input onBlur={handleChange} type="password" name="password" placeholder="Password"></input><br>
         </br>
         <input type="submit" value={newUser ? "Sign up" : "Sign in"}/> 
      </form>
    <p style={{color:"red"}}>{user.error}</p>
    {user.success && <p style={{color:"green"}}>User {newUser ? 'Creation' : 'Logged in'} Successful</p>}
    <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
    </div>
  );
}

export default Login;
