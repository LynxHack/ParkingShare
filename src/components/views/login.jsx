import React from 'react';
import axios from 'axios';
require('./../../stylesheets/login.scss');

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          toggleClaas : true,

          // registration : {
            reg_firstname: '',
            reg_lastname: '',
            reg_email: '',
            reg_password: '',
            reg_telephone: 0,
            reg_picture: '',
          // },

          email: '',
          password: ''
        }

        this.changeForms = this.changeForms.bind(this);
        this.transition = this.transition.bind(this);
        this.register = this.register.bind(this);
        this.editregistration =this.editregistration.bind(this);
    }

    changeForms() {
     if(this.state.toggleClaas)
     return '.cont'
        else
    return '.cont s--signup'
    }

    transition() {
      this.setState(prevState => ({
        toggleClaas: !prevState.toggleClaas
      }));
    }

    //todo send registration post request
    register(){
      const state = this.state;
      axios.post('/register', 
      {
        password: state.reg_password,
        firstname: state.reg_firstname,
        lastname: state.reg_lastname,
        email: state.reg_email,
        telephone: state.reg_telephone,
        picture: state.reg_picture
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    setloginform(e){
      const loginfield = e.target.getAttribute("type");
      this.setState({[loginfield]: e.target.value}); // set login fields
    }

    editregistration(e){
      const field = e.target.getAttribute("name");
      this.setState({[field]: e.target.value})
    }

    render() {
        return (
            <div className="fulllogin">
              <div className={this.state.toggleClaas ? "cont" : "cont s--signup" }>
                <div className="form sign-in">
                  <h2>Welcome back,</h2>
                  <label>
                    <span>Email</span>
                    <input type="email" className="input1" onChange={this.setloginform.bind(this)}/>
                  </label>
                  <label>
                    <span>Password</span>
                    <input type="password" onChange={this.setloginform.bind(this)}/>
                  </label>
                  <p className="forgot-pass">Forgot password?</p>
                  <button type="button" className="submit" onClick={this.props.attemptlogin.bind(null, this.state.email, this.state.password)}>
                    Sign In
                  </button>
                  <button type="button" className="fb-btn">Connect with <span>facebook</span></button>
                </div>
                <div className="sub-cont">
                  <div className="img">
                    <div className="img__text m--up">
                      <h2>New here?</h2>
                      <p>Sign up and discover great amount of new opportunities!</p>
                    </div>
                    <div className="img__text m--in">
                      <h2>One of us?</h2>
                      <p>If you already has an account, just sign in. We've missed you!</p>
                    </div>
                    <div className="img__btn" onClick={this.transition}>
                      <span className="m--up" >Sign Up</span>
                      <span className="m--in">Sign In</span>
                    </div>
                  </div>
                  <div className="form sign-up">
                    <h2>Time to feel like home,</h2>
                    <label>
                      <span>Firstname</span>
                      <input name="reg_firstname" type="text" onChange={this.editregistration}/>
                    </label>
                    <label>
                      <span>Lastname</span>
                      <input name="reg_lastname" type="text" onChange={this.editregistration}/>
                    </label>
                    <label>
                      <span>Email</span>
                      <input name="reg_email" type="email" onChange={this.editregistration}/>
                    </label>
                    <label>
                      <span>Password</span>
                      <input name="reg_password" type="password" onChange={this.editregistration}/>
                    </label>
                    <button type="button" className="submit" onClick={this.register}>Sign Up</button>
                    <button type="button" className="fb-btn">Join with <span>facebook</span></button>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}
