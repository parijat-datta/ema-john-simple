import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Cart = (props) => {
    const cart=props.cart;
    console.log(cart)
  
    let productTotal=0;
    for (let i=0;i<cart.length;i++) {
        const product=cart[i];
        productTotal=productTotal+product.price*product.quantity
    }
    let shipping=0;
    if (productTotal>35){
        shipping=0;
    }
    else if(productTotal>15){
        shipping=4.99;
    }
    else if (productTotal>0){
        shipping=12.99;
    }

const tax=productTotal/10;

    function format(num){
const precision=num.toFixed(2);
return(precision);
    }
    const grandTotal=tax+shipping+productTotal;

    return (
        <div>
            
           
        <h5>Items Ordered -{cart.length}</h5>
    <h5>Products Price: {format(productTotal)}</h5>
    <h5>Shipping Cost: {shipping}</h5>
    <h5>Tax+Vat: {format(tax)}</h5>
    <h4>Total Price: {format(grandTotal)}</h4>
  {
      props.children
  }
        </div>
    );
};

export default Cart;