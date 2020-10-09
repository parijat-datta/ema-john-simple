import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Products/Product';

const ProductDetail = () => {
    const {productKey}=useParams();
    const [product,setProduct]=useState({});
    useEffect(() =>{
    fetch('http://localhost:5000/products/'+productKey)
    .then(res => res.json())
    .then (data =>setProduct(data))
    })
    
    // const productMain=fakeData.find(pd=>
    // pd.key===productKey);
    return (
        <div>
            <Product showButton={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;