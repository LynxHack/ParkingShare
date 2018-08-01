import React from 'react';
require('./../../stylesheets/login.scss');
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {toggleClaas : true}

        this.changeForms = this.changeForms.bind(this);
        this.transition = this.transition.bind(this);
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

    render() {
        return (
            <div className="fulllogin">
              <div className={this.state.toggleClaas ? "cont" : "cont s--signup" }>
                <div className="form sign-in">
                  <h2>Welcome back,</h2>
                  <label>
                    <span>Email</span>
                    <input type="email" className="input1" />
                  </label>
                  <label>
                    <span>Password</span>
                    <input type="password" />
                  </label>
                  <p className="forgot-pass">Forgot password?</p>
                  <button type="button" className="submit">Sign In</button>
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
                      <span>Name</span>
                      <input type="text" />
                    </label>
                    <label>
                      <span>Email</span>
                      <input type="email" />
                    </label>
                    <label>
                      <span>Password</span>
                      <input type="password" />
                    </label>
                    <button type="button" className="submit">Sign Up</button>
                    <button type="button" className="fb-btn">Join with <span>facebook</span></button>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}
