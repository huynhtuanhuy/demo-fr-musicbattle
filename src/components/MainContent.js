import React, { Component } from 'react';
import DetailRoom from './DetailRoom';
class App extends Component {

  render() {
    
    const allRoom = this.props.Rooms.map(room=>(
        <div>
            <DetailRoom room={room} setRoom={this.props.setRoom} {...this.props} />
        </div>
    ))
    return (
      <div>
        
         { allRoom }
         
      </div>
      
    );
  }
}

export default App;