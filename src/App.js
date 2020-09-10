import React, { createContext } from 'react';

import './App.css';
import TopHeader from './component/Header/TopHeader';
import Order from './component/Order/Order';
import Shop from './component/Shop/Shop';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inventory from './component/Inventory/Inventory';
import NotFound from './component/Not Found/NotFound';
import ProductDetail from './component/Product Detail/ProductDetail';
import Shipment from './component/Shipment/Shipment';
import Login from './component/Login/Login';
import { useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
export const UserContext=createContext();






function App() {
   const [loggedInUser,setLoggedInUser]=useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
    
    
    

    
    <Router>
  <p>Email: {loggedInUser.email}</p>
    <TopHeader></TopHeader>
    <Switch>

      

      <Route path="/shop">
<Shop></Shop>
      </Route>
      <Route path="/order">
<Order></Order>
      </Route>

      <PrivateRoute path="/manage">
        <Inventory></Inventory>
      </PrivateRoute>

      <Route exact path="/">
        <Shop></Shop>
      </Route>

      <PrivateRoute path='/shipment'>
<Shipment></Shipment>
     </PrivateRoute>
     <Route path='/login'>
<Login></Login>
     </Route>
     <Route path='/product/:productKey'>
<ProductDetail></ProductDetail>
     </Route>

      <Route path="*">
        <NotFound></NotFound>
      </Route>
    </Switch>

    </Router>
        
    </UserContext.Provider>
  );
}

export default App;
