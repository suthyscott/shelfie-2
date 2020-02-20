import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(){
    super()

    this.state = { 
      inventory: [],
      selectedProduct: null
    }
  }

  componentDidMount(){
    this.handleGetInventory()
  }

  handleGetInventory = () => {
    axios.get(`/api/inventory`).then(res => {
      console.log(res.data)
          this.setState({
            inventory: res.data,
            selectedProduct: null
          })
        })
  }

  handleSelectProduct = id => {
    this.state.inventory.map(e => {
      if(e.product_id === id){
        console.log(e)
        this.setState({
          selectedProduct: e
        })
      }
    })
  }
 
  render(){
    return (
      <div className="App">
        <Header />
        <div className='app'>
          <Dashboard
          inventory={this.state.inventory}
          handleGetInventory={this.handleGetInventory}
          handleSelectProduct={this.handleSelectProduct}/>
          <Form 
          handleGetInventory={this.handleGetInventory}
          selectedProduct={this.state.selectedProduct}/>
        </div>
        
      </div>
    );
  }
}

export default App;
