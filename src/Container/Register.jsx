import React from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
import "../Style/Regis.css"

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      email: "",
      telp:"",
      nameErr:"",
      emailErr:"",
      err:"",
      // avatar:"",
      registered: false
    };
  }

    
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
validate = () =>{
  const {nameErr} = this.state;
  const {emailErr}= this.state;

  if(!this.state.nameErr){
    this.setState({nameErr: "username telah digunakan"})
  }
  if(!this.state.emailErr){
    this.setState({emailErr:"email telah digunakan"})
  }
  if((nameErr, emailErr)){
    this.setState({nameErr:nameErr,emailErr:emailErr});
    return false
  }
  return true
}
   handleSave = e => {
    e.preventDefault();
      const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
    }
    const regis = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      telp: this.state.telp,
      // avatar: this.state.avatar
    };
    this.setState({
      isLoading: true
    });

      Axios.post("https://aqueous-hollows-28311.herokuapp.com/register", regis).then(
      res => {
        this.setState({
          name: "",
          password: "",
          email: "",
          telp:"",
          // avatar:"",
          isLoading: false,
          registered: true    
        });
        if(res.data.status === 400){
          alert("username atau email telah terpakai")
        }else{
          alert("data tersimpan");
        console.log(res);
        return <Redirect to="/login" />;
        }
        
      }

    )
    // .catch(errs =>{
    //   localStorage.setItem("err",errs.data.errors)
    //     this.setState({
    //       err:errs.data.errors,
    //       name: "",
    //       password: "",
    //       email: "",
    //       telp:"",
    //       isLoading:false
    //     })
    //    alert("tidak masuk")
    // })
  };
  render() {
    const { registered, isLoading} = this.state;

    if (registered) {
      return <Redirect to="/login" />;
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
    return (
      <div id="container" className="container-fluid" >
              <div id="row" className="row">
                <div className="col-md-10 offset=md-1">
                  <div className="row">
                    <div className="col-md-5 register-left">
                      <img src="https://imagizer.imageshack.com/img922/629/ujl8Wz.png"/>
                      <h3>Masuk</h3>
                      <p>Sudah Punya Akun?</p>
                      <Link to="/login">
                      <button type="button" className="btn btn-primary">Sign In</button>
                      </Link>
                    </div>
                    <div className="col-md-5 register-right" id="register-right">
                    <h2>DAFTAR</h2>
                      <div className="register-form">
                         <form onSubmit={this.handleSave}>
          
                <div className="icon">  
                <input
                  id="inputs-1"
                  className="form-control"
                  placeholder="Username"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                  autocomplete="none"
                />
                   <i class="fas fa-user-alt fa-lg fa-fw" aria-hidden="true"></i>
                </div>
                 <div style={{ fontSize: 12, color: "red" }}>
                {this.state.nameErr}
              </div>  
           
              
                  <div className="icon">  
                <input
                  id="inputs-1"
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                  autocomplete="none"
                />
                   <i class="fas fa-at fa-lg fa-fw"></i>
                </div>
                 <div style={{ fontSize: 12, color: "red" }}>
                {this.state.emailErr}
              </div>  

                <div className="icon">
                <input
                id="inputs-1"
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                  
                />
                 <i class="fas fa-key fa-lg fa-fw" aria-hidden="true"></i>
                </div>
              
                <div className="icon">
                <input
                id="inputs-1"
                  className="form-control"
                  placeholder="Nomor Telepon"
                  type="number"
                  name="telp"
                  value={this.state.telp}
                  onChange={this.handleChange}
                  required
                  autocomplete="none"
                />  
                <i className="fas fa-phone-alt fa-lg fa-lw" aria-hidden="true"></i>
                </div>
              
                          <button className="btn btn-primary" id="btn-register" type="submit">Register</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    );
  }
}

export default Register;
