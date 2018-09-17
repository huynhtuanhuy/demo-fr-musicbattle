import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Peer from 'peerjs';
import openSocket from 'socket.io-client';
class App extends Component {
    state = {
        UserInfor: {
            UserName: this.props.UserName,
            PeerId: "",
            Room: this.props.Room,
            Role: ""
        },
        Comment: []
    }
    _openStream() {

        const config = { audio: true, video: false };
        return navigator.mediaDevices.getUserMedia(config);
    }
    _playstream(idVideoTag, stream) {
        const video = document.getElementById(idVideoTag)
        video.srcObject = stream;
        video.play();
    }
    _onStartLiveStream = (e) => {
        this._openStream()
            .then(stream => {
                this._playstream('localStream2', stream);
                this.setState({
                    stream: stream
                })
            })
    }
    _onInputChange = (event) => {
        console.log("change" + event.target.value)
        this.setState({
            ChatValue: event.target.value
        })
    }
    _onSendChatText = (event) => {
        console.log("send :" + this.state.ChatValue);
        this.state.socket.emit("Send-Chat-Content", this.state.ChatValue);

    }
    componentDidMount() {
        var i = 1;
        this.setState({
            peer: new Peer({ key: 'tkv5g2acaree9udi' })
        })
        this.setState({
            socket: openSocket('localhost:1998')
        })
        setTimeout(() => {
            this.state.peer.on('open', id => {
                var PreUserData = this.state.UserInfor;
                PreUserData.PeerId = id
                PreUserData.Role = "user"
                this.setState({
                    UserInfor: PreUserData
                })
                console.log(PreUserData);
                this.state.socket.emit('User-Info', PreUserData);
            })

            this.state.peer.on('call', call => {
                console.log("i: " + i);
                if (i === 1) {
                    this._openStream()
                        .then(stream => {
                            call.answer(stream);
                            call.on('stream', remoteStream => this._playstream('localStream1', remoteStream));
                            i++;
                        })
                }
                else {
                    this._openStream()
                        .then(stream => {
                            call.answer(stream);
                            call.on('stream', remoteStream => this._playstream('localStream2', remoteStream));
                        })
                }
            })
            this.state.socket.on("Sever-send-chat-data", (data) => {
                var PreComment = this.state.Comment;
                PreComment.push(data);
                this.setState({
                    Comment: PreComment
                })
                // console.log(this.state.Comment);
            });
        })
    }
    renderChat = () => {
        var arr1 = []
        for (let i = 0; i < this.state.Comment.length; i++) {
            if (this.state.Comment[i].UserName === this.props.UserName) {
                arr1[i] = <h6 style={{ color: "blue" }}>{this.state.Comment[i].UserName}:{this.state.Comment[i].content}</h6>
            }
            else {
                arr1[i] = <h6 >{this.state.Comment[i].UserName}:{this.state.Comment[i].content}</h6>
            }
        }
        return arr1;
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="video-area">
                    {/* <p id="test">{this.state.peerid}</p> */}
                    <video id="localStream1" height="300px" width="450px" controls></video><br></br>
                    <video id="localStream2" height="300px" width="450px" controls></video><br></br>
                    <button onClick={this._onStartLiveStream}>startLiveStream</button>
                </div>
                <div className="chat">
                    <div className="chat-content">
                        {this.renderChat()}
                    </div>
                    <div className="chat-area">
                        <input type="text" onChange={this._onInputChange} />
                        <button onClick={this._onSendChatText} >Send</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;