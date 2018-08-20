import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Web3 from 'web3';
// import Eth from 'ethjs';
// import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props)
    // var eth = new Eth(TestRPC.provider());
    this.state = {
      apiVersion : "0",
      log : "",
      accounts:''
    }
  }
  componentDidMount(){
    if (typeof window.web3 !== 'undefined') {
      
          // Use Mist/MetaMask's provider
          // var web3js = new Web3(window.web3.currentProvider);
          var web3 = window.web3
          this.setState( { apiVersion : web3.version.api })
          web3.version.getNetwork((err, netId) => {
            switch (netId) {
                case "1":
                    this.setState({log : "This is mainnet"})
                    console.log('This is mainnet')
                    break
                case "2":
                this.setState({log : "This is the deprecated Morden test network."})
                    console.log('This is the deprecated Morden test network.')
                    break
                case "3":
                this.setState({log : "This is the ropsten test network."})
                    console.log('This is the ropsten test network.')
                    break
                case "4":
                this.setState({log : "This is the Rinkeby test network."})
                    console.log('This is the Rinkeby test network.')
                    break
                case "42":
                this.setState({log : "This is the Kovan test network."})
                    console.log('This is the Kovan test network.')
                    break
                default:
                    console.log('This is an unknown network.')
            }
          })
          web3.eth.getAccounts((err , results) => {
              this.setState({accounts : results})

              results.forEach(account => {
                web3.eth.getBalance(account , (err , balance )=> {
                  this.setState({balance : web3.fromWei( balance.toString(10) , "ether") })
                })
              });
              
            }
          )
  } else {
          console.log('No web3? You should consider trying MetaMask!')
  }   
  }
  buttonClick = () => {
    
  }
  render() {
    var buttonStyle = {
      orderWidth : "0.5px",
      backgroundColor : "rgba(ee,0,0,0.5)",
      height : "100px",
      width : "100px"
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* <button style={buttonStyle} onClick={this.buttonClick}></button> */}
        
        <p>api version : {this.state.apiVersion}</p>
        <p>network : {this.state.log}</p>
        <p>account : {this.state.accounts}</p> 
        <p>balance : {this.state.balance}</p> 
        
      </div>
    );
  }
}

export default App;
