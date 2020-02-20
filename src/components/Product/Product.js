import React from 'react';
import './Product.css'

class Product extends React.Component {

    render(){
        const {product_url, product_name, product_price, product_id} = this.props.product
        return(
            <div className='product'>
                <img src={product_url} alt='cool fox' className='image'/>
                {product_name}
                {product_price}
                <button onClick={() => this.props.handleDeleteProduct(product_id)}>Delete</button>
                <button onClick={() => this.props.handleSelectProduct(product_id)}>Edit</button>
            </div>

        )
    }
}

export default Product