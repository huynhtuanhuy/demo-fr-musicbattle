import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios"
import MainContent from './MainContent'
class App extends Component {
    state = {
        Rooms:[]
    }
    _onChangeInput=(e)=>{
        this.setState({
            room:e.target.value
        })
        this.props.setRoom(e.target.value);
    }
    componentDidMount(){
        axios.get("http://localhost:1998/api/music")
        .then(res=>{
            this.setState({
                Rooms:res.data.battles
            })
        })
    }
    render() {
        return (
            <div>
                <h1>Cac Room Hien Co</h1>
                <Link to={`/CreateRoom`} >
                    <button >
                        CreateRoom 
                    </button>
                </Link>
                <Link to={`/Player2`} >
                    <button >
                        Let Battle
                    </button> 
                </Link>
                
                {/* <MainContent Rooms={this.state.Rooms} setRoom={this.props.setRoom} {...this.props} /> */}
            </div>
        );
    }
}

export default App;