import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useContext } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import SimpleCardForm from '../ProcessPayment/SimpleCardForm';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import SplitCard from '../ProcessPayment/SplitCard';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) =>{ 
    console.log(data)
    const savedCart = getDatabaseCart();
    const orderDetails={...loggedInUser,products: savedCart,shipment:data, orderTime: new Date()};
    fetch('http://localhost:5000/addOrder',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(orderDetails)
    })
    .then(res =>res.json())
    .then(data =>{
      if(data){
        processOrder();
        alert('Your order Placed Successfully');
      }
    })
  
  };

  console.log(watch("example")); // watch input value by passing the name of it
  const [loggedInUser,setLoggedInUser]=useContext(UserContext);
  console.log(loggedInUser)

  return (
   
   <div className="row">
     <div className="col-md-6">
     <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
    
      
     
    <input name="name" defaultValue={loggedInUser.name} placeholder="Your Name" ref={register({ required: true })} />
    {errors.name && <span className="error">Name is required</span>}
    
    
    <input name="email" defaultValue={loggedInUser.email} placeholder="Your Email" ref={register({ required: true })} />
    {errors.email && <span className="error">Email is required</span>}

    
    <input name="address" placeholder="Your Address" ref={register({ required: true })} />
    {errors.address && <span className="error">Address is required</span>}
    
    <input name="phone" placeholder="Your Phone" ref={register({ required: true })} />
    {errors.phone && <span className="error">Phone is required</span>}
    
    
    <input type="submit" />
  </form>
     </div>
     <div className="col-md-6">
       <SplitCard></SplitCard>
     </div>
   </div>
  );
};

export default Shipment;