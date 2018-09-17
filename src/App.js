import React, { Component } from 'react';
import Stream from './components/Stream'
import Stream2 from './components/Stream2'
import Stream3 from './components/Stream3'
import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'
import CreateRoom from './components/CreateRoom';
import Main from './components/Main';
import Player2 from './components/Player2'
import HomePage from './components/HomePage'
import { BrowserRouter, Route } from "react-router-dom";
class App extends Component {
  state = {
    Room:'',
    UserName:''
  }
  _setName = (data) => {
    this.setState({
      UserName:data
    })
    
  }
  _setRoom = (data) => {
    this.setState({
      Room:data
    })
    console.log(this.state);
  }
  render() {
    return (
      <BrowserRouter >
        <div className="App">
          <Route exact path="/login" render={(props)=>{
            return <Login setName={this._setName} {...props}/>
          }}/>
          <Route exact path="/" render={(props)=>{
            return <HomePage setName={this._setName} {...props}/>
          }}/>

          <Route exact path="/Player2" render={(props)=>{
            return <Player2 setRoom={this._setRoom} {...props}/>
          }}/>
          <Route exact path="/create-room" render={(props)=>{
            return <CreateRoom setRoom={this._setRoom} {...props}/>
          }}/>
          <Route exact path="/mainpage-battle" render={(props)=>{
            return <Main setRoom={this._setRoom} {...props} />
          }}/>
          <Route exact path="/InRoom/:Room/MainUser1" render={(props)=>{
            return <Stream UserName={this.state.UserName} Room={this.state.Room}/>
          }}/>
          <Route exact path="/InRoom/:Room/MainUser2" render={(props)=>{
            return <Stream3  UserName={this.state.UserName} Room={this.state.Room}/>
          }}/>
          <Route exact path="/InRoom/:Room/User" render={(props)=>{
            return <Stream2 UserName={this.state.UserName} Room={this.state.Room}/>
          }}/>

      <Route exact path='/user/logout' component={Logout}/>
      <Route exact path='/register' render={(props)=>{
        return <Register {...props} />
      }}/>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
