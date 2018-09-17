import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios"
class App extends Component {
  _onChoose=(e)=>{
    this.props.setRoom(this.props.room.name);
  }
  _Chien=(e)=>{
    axios.put(`http://localhost:1998/api/music/${this.props.room._id}`,{status:"play"})
    .then(console.log("success"))
    .catch(err => console.error(err));

  }
  render() {
    return (
      <div>
        <img src="https://e2.365dm.com/football/badges/192/413.png" onClick={this._onChoose}></img>
        <span>{this.props.room.name} </span> 
        <span> {this.props.room.nameSong}</span><br></br>
        <Link to={`InRoom/${this.props.room.name}/User`}>
        <button>Xem</button>
        </Link>
        {this.props.room.status == "Wait" ? <Link to={`InRoom/${this.props.room.name}/MainUser2`}>
        <button onClick={this._Chien}>Chien</button>
        </Link>:''}
      </div>
    );
  }
}

export default App;