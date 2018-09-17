import React, { Component } from 'react';


class App extends Component {

    state={
        room:""
    }
    _onChangeInput=(e)=>{
        this.setState({
            room:e.target.value
        })
        this.props.setRoom(e.target.value);
    }
    _onSubmit = (e)=>{
        this.props.history.push("InRoom/"+this.state.room+'/MainUser1');
    }
    render() {

        return (
            <div>
                <input className="room-name" type="text" onChange={this._onChangeInput}></input>
                
                <button onClick={this._onSubmit}>Create Room</button>
            </div>
        );
    }
}

export default App;
