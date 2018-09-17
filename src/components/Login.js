import React, { Component } from 'react';
import axios from 'axios';
import video from '../video/login.mp4'
import '../CSS/style.css'
class Login extends Component {
    state = {
        username: '',
        password: ''
    }
    handleChangeUserName = (event) => {
       this.setState({username:event.target.value});
    }

    handlePassWord = (event) => {
        this.setState({password:event.target.value});
    }
    
    

    _onChangeInput=(e)=>{
        this.setState({
            user:e.target.value
        })
    }
    _onSubmit=(e)=>{
        e.preventDefault();
        console.log('da submit: '+this.state)
        axios.post("http://localhost:1998/api/auth/login",this.state)
          .then(res=> this.props.history.push('Mainpage'))
          .catch(err=> alert("fail"));
        
    }
    _onChangeInput1=(e)=>{
        this.props.setName(e.target.value)
    }
    render() {
        return (
           
            <div className="container">
            <div className="row">
                <div className="wrap-video">
                    <video id="background-video" loop autoPlay muted>
                        <source src={video} type="video/mp4" />
                        <source src={video} type="video/ogg" />
                    </video>
                </div>

                {/* <div className="backgroundimg">
                <img src="https://s3.envato.com/files/166459326/register-login-add-on.png" className="img-login"> */}

                <div className="bg_img col-lg-12">
                    <form onSubmit={this.handleLogin} className="form-input">
                        <h3 className="header-login">Log In</h3>
                        <div className="form-group">

                            <input  onChange={this.handleChangeUserName} type="text" name="0" className="form-control" id="username-login" placeholder="Enter your user name" />
                        </div>
                        <div className="form-group">
                            <input onChange={this.handlePassWord} type="password" name="1" className="form-control" id="password-login" placeholder="Password" />
                        </div>
                        <div className="form-check">

                        </div>
                        <div>
                            <a href="">
                                <button type="button" onClick={this._onSubmit}  className="btn btn-primary">Log In</button>
                            </a>

                            <a href="/register">
                                <button type="button" className="btn btn-success">Register</button>
                            </a>

                            <br />
                            
                            <br />
                            <br />
                            <div>

                                {/* <Button color="primary" className="login-fb">Login With Facebook</Button>{' '} */}
                            </div>
                        </div>

                    </form>

                </div>


            </div>
        </div>
        );
    }
}

export default Login;
