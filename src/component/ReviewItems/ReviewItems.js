import React from 'react';

const ReviewItems = (props) => {
    console.log(props)
    const{name,quantity,key,price}=props.product;
    console.log('quantity', quantity)
    return (
        <div style={{


            borderBottom:"1px solid lightgray", 
            marginBottom:"5px",
            paddingBottom:"5px",
            marginLeft:"200px"
        }}>
            <h4 style={{color:"black",
            fontSize:'20px'
            
            }}>Name: {name}</h4>
    <h3>Quantity: {quantity}</h3>
        <h5>Price: {price}</h5>
    <button className="main-button" onClick={()=>props.removeProducts(key)}>Remove Item</button>
        </div>
    );
};

export default ReviewItems;