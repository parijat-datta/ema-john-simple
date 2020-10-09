import React, { useState, useEffect } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Products/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart} from '../../utilities/databaseManager'
import {getDatabaseCart} from '../../utilities/databaseManager'
import { Link } from 'react-router-dom';


const Shop = () => {
   const firstTen=fakeData.slice(0,10);
   
   const [products,setProducts]=useState([]);
   const [cart,setCart]=useState([]);
  
   useEffect(() => {

   fetch('http://localhost:5000/products')
   .then(res => res.json())
   .then(data =>setProducts(data))


   },[])

  

  useEffect(()=>{
  const savedCart=getDatabaseCart();
  const productKeys=Object.keys(savedCart);
  if(products.length>0){
   const previousCart=productKeys.map(existingKey=>{
      const product=products.find(pd=>pd.key===existingKey)
      product.quantity=savedCart[existingKey];
      return product;
      
    
    
    
      })
    
    setCart(previousCart);
  }


  },[products])

   const handleAddProducts=(productPara)=>{
      
    //    console.log("Product Added",productPara);
      const toBeAdded=productPara.key;
      const sameProducts=cart.find(pd=>pd.key===toBeAdded);
      let count=1;
      let newCart;
      if(sameProducts){
         count=sameProducts.quantity+1;
         sameProducts.quantity=count;
         const others=cart.filter(pd=>pd.key!==toBeAdded);
         newCart=[...others,sameProducts];

      }
      else{
         productPara.quantity=1;
         newCart=[...cart,productPara]
      }
      
       setCart(newCart);
      
      addToDatabaseCart(productPara.key,count)
         

   }
   
    return (
        <div className="shop-container">
        
         <div className="product-container">
         { 
         
         products.map(pd=>
         <Product
         showButton={true}
            handleAddProducts={handleAddProducts}
            product={pd}>

            </Product>
            

           )
         
         }
        

       
    
         </div>
         <div className="cart-container">
            <Cart cart={cart}>
            <Link to="/order"> <button  className="main-button">Review Order</button></Link>
            </Cart>
         </div>
        </div>
    );
};

export default Shop;