import React from 'react';
import logo from '../../images/logo.png';
import './TopHeader.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';





const TopHeader = () => {
   const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    return (
        <div className="header" >
           <img src={logo} alt=""></img>
           <nav>
               <Link to="/shop">Shop</Link>
               <Link to="/order">Order-Review</Link>
               <Link to="/manage">Manage Inventory</Link>
               <button onClick={() =>setLoggedInUser({})}>Sign out</button>
              
                   
           </nav>




        </div>

       
    );
};

export default TopHeader;