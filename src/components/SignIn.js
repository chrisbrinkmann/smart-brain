import React from 'react'

// sign in form to access main website
class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signInEmail: '',
      signInPassword: '',
    }
  }
  
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  // send email/pw to server for validation
  onSubmitHandler = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(resp => resp.json())
      .then(user => {
        // if server resp with valid user,
        // then pass the user object to loaduser and render 'home' route
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home')
        }
      })
  }
  
  render() {
    const { onRouteChange } = this.props
    return(
      <div className="pa4 b--black-10 br3 ba mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <div className="measure">
          <fieldset
            id="sign_up"
            className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
              <label
                className="db fw6 lh-copy f6"
                htmlFor="email-address">Email</label>
              <input
                onChange={this.onEmailChange}
                type="email"
                name="email-address"
                id="email-address"
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" />
              </div>
              <div className="mv3">
              <label
                className="db fw6 lh-copy f6"
                htmlFor="password">Password
              </label>
              <input
                onChange={this.onPasswordChange}
                type="password"
                name="password"
                id="password"
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" />
              </div>
          </fieldset>
          <div className="">
            <input
              onClick={this.onSubmitHandler}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange('register')}
                className="f6 link dim black db pointer">Register
              </p>
            </div>
        </div>
      </div>
    )
  }
}
                    
export default SignIn