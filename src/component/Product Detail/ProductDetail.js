import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Products/Product';

const ProductDetail = () => {
    const {productKey}=useParams();
    
    const productMain=fakeData.find(pd=>
    pd.key===productKey);
    return (
        <div>
            <Product showButton={false} product={productMain}></Product>
        </div>
    );
};

export default ProductDetail;