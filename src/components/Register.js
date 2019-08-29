import React from 'react'

// register new user form
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onEmailChange = event => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onNameChange = event => {
    this.setState({name: event.target.value})
  }

  // send signin info to server for validation
  onSubmitHandler = () => {
    fetch('https://enigmatic-depths-30939.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
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
    return (
      <div className="pa4 b--black-10 br3 ba mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <div className="measure">
          <fieldset
            id="sign_up"
            className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label
                className="db fw6 lh-copy f6"
                htmlFor="email-address">Name
              </label>
              <input
                onChange={this.onNameChange}
                type="text"
                name="name"
                id="name"
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6"
                htmlFor="email-address">Email
              </label>
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
              value="Register"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Register