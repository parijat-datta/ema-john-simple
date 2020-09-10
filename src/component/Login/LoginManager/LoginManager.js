
import firebase from 'firebase'
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from './firebase-config';


export const initializeLoginFramework=()=>{

    firebase.initializeApp(firebaseConfig);
}

export const handleGoogleSignIn=()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res=> {
      const {displayName,photoURL,email} = res.user;
      const signedInUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        photoURL:photoURL
      }
      return signedInUser;
     
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

export const handleSignOut=()=>{
   return firebase.auth().signOut()
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
    return signOutUser
  
  
    })
    .catch(err => console.log(err))
  }
  

//   export const createUserWithEmailAndPassword =()=>{
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//     .then(res=>{
//       console.log(res)
//       const newUserInfo ={...user};
//       newUserInfo.error='';
//       newUserInfo.success=true;
//       setUser(newUserInfo);
//       updateUserName(user.name)
//     })
//     .catch(error=> {
//       // Handle Errors here.
//       const newUserInfo={...user};
//       newUserInfo.error=error.message;
//       newUserInfo.success=false;
//       setUser(newUserInfo)
//       // ...
//     });

//   }

//   export const signInWithEmailAndPassword=()=>{

//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//       console.log(res)
//       const newUserInfo ={...user};
//       newUserInfo.error='';
//       newUserInfo.success=true;
//       setUser(newUserInfo);
//       setLoggedInUser(newUserInfo);
//       history.replace(from);

//       console.log('sign is user info',res.user)
      

//     })
//     .catch(function(error) {
//       // Handle Errors here.
//       const newUserInfo={...user};
//       newUserInfo.error=error.message;
//       newUserInfo.success=false;
//       setUser(newUserInfo)
//       // ...
//     });
//   }

//   const updateUserName = (name)=>{

//     const user= firebase.auth().currentUser;

//         user.updateProfile({
//           displayName: name,
         
//         }).then(function() {
//           console.log('User name updated successfully')
//           // Update successful.
//         }).catch(function(error) {
//           // An error happened.
//           console.log(error)
//         });
//       }

