import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { img, price, name, seller, stock,key } = props.product;
    
    

    return (
        <div className="show-product">
            <div className="product-image">
                <img src={img} alt="" />
            </div>
            <div className="product-info">
                <h4 className="productTitle"><Link to={'/product/'+key}>{name}</Link></h4>
                <p>by {seller}</p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - Order Soon</small></p>
               {props.showButton && <button className="main-button"
                onClick={()=>props.handleAddProducts(props.product)}>
                    
                    <FontAwesomeIcon icon={faShoppingCart} /> 
                    add to cart</button>}

            </div>

        </div>
    );
};

export default Product;