import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';



const Order = () => {
    const [cart,setCart]=useState([]);
    const [orderPlaced,setOrderPlaced]=useState(false);

    const history=useHistory()
    const handleProceedCheckout=()=>{

        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        history.push('/shipment')
    }
      let thankyou;
      if(orderPlaced){
         thankyou=<img src={happyImage}></img>
      }

    useEffect(() => {
     const savedCart=getDatabaseCart();
     const productKeys=Object.keys(savedCart);
     const cartProducts=productKeys.map(key =>{
         const products=fakeData.find(pd=>pd.key===key);
         products.quantity=savedCart[key];
         return products;
     }) ; setCart(cartProducts);
    },[])

    
    const removeProducts =(key)=>{

     console.log("removed",key);
     const items=cart.filter(item=>item.key!==key);
     setCart(items);
     

    }
   
    return (<div style={{display:'flex',justifyContent:'space-evenly',flexDirection:'row'}}>
        <div style={{borderRight:'1px solid black',float:'left',width:'50%',paddingRight:'10px'
        
        }}>
            <h3>Review your Order Here</h3>
    <h3>Total Item: {cart.length}</h3>

    { 
    
    cart.map(pd=><ReviewItems product={pd} removeProducts={removeProducts}></ReviewItems>)
    
    }   

    {
        thankyou
    }
        </div>

        <div style={{float: 'right',textAlign: 'center',width: '30%',top: '0'}}> 


<Cart cart={cart}>
    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
</Cart>
</div>


</div>




      
    );
};

export default Order;