import React from 'react';
import Product from '../Product/Product';
import './Dashboard';
import axios from 'axios';

class Dashboard extends React.Component {
    handleDeleteProduct = id => {
        axios.delete(`/api/inventory/${id}`).then(res => {
            console.log(res)
            this.props.handleGetInventory()
        }).catch(err => console.log(err))
    }

    render(){
        let products = this.props.inventory.map((e,i) => {
            return <Product key={i} product={e} handleDeleteProduct={this.handleDeleteProduct} handleSelectProduct={this.props.handleSelectProduct}/>
        })
        return(
            <div className='dashboard'>
                {products}
            </div>
        )
    }
}

export default Dashboard