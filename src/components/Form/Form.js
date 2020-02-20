import React from 'react';
import './Form.css'
import axios from 'axios';

class Form extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            image: 'https://amerikicklanghorne.com/wp-content/uploads/2017/04/default-image.jpg',
            name: '',
            price: '',
            editingId: null
        }
    }

    componentDidUpdate(prevProps){
        // console.log(prevProps)
        // console.log(this.props)
        // console.log(this.state)
        if(this.props.selectedProduct && prevProps.selectedProduct !== this.props.selectedProduct && !this.state.editingId){
            console.log('passed update condition')
            const {product_id, product_url, product_name, product_price} = this.props.selectedProduct
            this.setState({
                image: product_url,
                name: product_name,
                price: product_price,
                editingId: product_id
            })
        }
    }

    handleUpdateimage = val => {
        this.setState({
            image: val
        })
    }
    handleUpdatename = val => {
        this.setState({
            name: val
        })
    }
    handleUpdateprice = val => {
        this.setState({
            price: val
        })
    }

    handleClearInputs = () => {
        this.setState({
            image: 'https://amerikicklanghorne.com/wp-content/uploads/2017/04/default-image.jpg',
            name: '',
            price: '',
            editingId: null
        })
    }

    handleAddProduct = (image, name, price) => {
        axios.post(`/api/inventory`, {image, name, price}).then(res => {
            console.log(res.data)
            this.props.handleGetInventory()        
        })
        .catch(err => console.log(err))
        this.handleClearInputs()
    }

    handleUpdateProduct = () => {
        const {editingId, image, name, price} = this.state
        axios.put(`/api/inventory/${editingId}`, {image, name, price}).then(res => {
            console.log(res)
            this.props.handleGetInventory()
        }).catch(err => console.log(err))
        this.handleClearInputs()

    }
    
    render(){
        console.log(this.state)
        console.log(this.props)
        const {image, name, price, editingId} = this.state
        return(
            <div className='form'>

                <img src={this.state.image} alt='Product Image Here' className='form-image'/>

                <div className='inputs'>
                    {editingId ? 
                    <div>
                        <input
                        value={image}
                        placeholder='Paste Image URL Here!'
                        onChange={e => this.handleUpdateimage(e.target.value)}/>
                        editing
                    </div>
                        
                    :
                    <div>
                        <input
                        placeholder='Paste Image URL Here!'
                        onChange={e => this.handleUpdateimage(e.target.value)}/>
                        not editing
                    </div>
                    }
                    <input 
                    value={this.state.name}
                    placeholder='Type Product Name Here'
                    onChange={e => this.handleUpdatename(e.target.value)}/>
                    <input                
                    value={this.state.price}
                    placeholder='Type Product Price Here'
                    onChange={e => this.handleUpdateprice(e.target.value)}
                    type='number'/>
                </div>
                
                

                <div>
                    <button onClick={() => this.handleClearInputs()}>Cancel</button>
                    {editingId ? <button onClick={() => this.handleUpdateProduct()}>Update</button>
                    :
                    <button onClick={() => this.handleAddProduct(image, name, price)}>Add To Inventory</button>
                    }
                    
                </div>
            </div>
        )
    }
}

export default Form