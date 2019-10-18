import React from "react";
import Axios from "axios";
import {Redirect,Link} from "react-router-dom"
import "../Style/Login.css"


class Login extends React.Component{
   constructor(){
       super()
       this.state={ 
            name:"",
            password:"",
            // usernameErr:"",
            passwordErr:"",
            token :"",
            user: ""
        }
        
   }
   handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
   validate = () => {
    // const { usernameErr } = this.state;
    const { passwordErr } = this.state;
    if (!this.state.passwordErr) {
      this.setState({ passwordErr: "password failed" });
    }
    //   this.setState({ usernameErr: "username failed" });
    // }
    if (( passwordErr)) {
          // if (!this.state.username) {
      this.setState({ passwordErr: passwordErr });
      return false;
    }
    return true;
  };
   signIn = (i) => {
    // const {
    //   name,
    // password,
    // passwordErr,
    // token,
    // user} = this.state

    i.preventDefault();
       const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
    }
    const dataInput = {
      name: this.state.name,
      password: this.state.password
    };
    this.setState({
      isLoading: true
    });

    Axios.post(
      "https://aqueous-hollows-28311.herokuapp.com/login",
      dataInput
    )
      .then(res => {
        console.log("dataUsernya" ,res.data.login);
        localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("user", JSON.stringify(res.data.login));
        this.setState({
          // token: res.data.access_token,
          // user:res.data.user,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        alert("gagal login");
      });
  };


    render(){
        const {isLoading}=this.state;
        if(localStorage.getItem("token","user")){
            return <Redirect to="/chat"/>
        }
        else if(isLoading){
            return(
               <div id="div">
  <span id="span" ></span>
  <span id="span" ></span>
  <span id="span" ></span>
  <span id="span" ></span>
  <span id="span" ></span>
</div>
            )

        }
        return(
            <div id="container" className="container-fluid" >
              <div id="row" className="row">
                <div className="col-md-10 offset=md-1">
                  <div className="row">
                    <div className="col-md-5 login-left">
                      <img src="https://imagizer.imageshack.com/img922/629/ujl8Wz.png"/>
                      <h3>Join us</h3>
                      <p>Buruan Daftar Sekarang !</p>
                      <Link to="/register">
                      <button type="button" className="btn btn-primary">Daftar</button>
                      </Link>
                    </div>
                    <div className="col-md-5 login-right">
                    <h2>Sign In</h2>
                      <div className="login-form">
                         <form onSubmit={this.signIn} logOut={this.signOut}>
                        <div className="form-group">
                        <div className="icon">
                         <input 
                            id="input-1"
                            className="form-control"
                            type="text"
                            name="name" 
                            placeholder="Username"
                            value={this.state.name}
                            onChange={this.handleChange}
                            required
                          />
                          <i class="fas fa-user-alt fa-lg fa-fw" aria-hidden="true"></i>
                          </div>
                            {/* <div style={{ fontSize: 12, color: "red" }}>
                {this.state.usernameErr}
              </div>  
*/}
                            <div className="icon">
                         <input 
                            id="input-2"
                            className="form-control"
                            type="password"
                            name="password" 
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                          />
                          <i class="fas fa-key fa-lg fa-fw" aria-hidden="true"></i>
                          </div>

                {/*
                          <div className="icon">
                          <input 
                            id="input-2"
                            className="form-control"
                            type="password" 
                            name="password" 
                            placeholder="password.."
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                          />
                             <i class="fas fa-key fa-lg fa-fw" aria-hidden="true"></i>
                          </div>*/}

              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.passwordErr}
              </div>

                        </div>
                          <button className="btn btn-primary" type="submit">Login</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default Login;