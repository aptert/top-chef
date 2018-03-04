import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TableRestaurant from './components/TableRestaurant'
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <TableRestaurant/>
      </div>
    );
  }
}

export default App;
