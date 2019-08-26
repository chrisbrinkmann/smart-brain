import React from 'react'

const Register = ({ onRouteChange }) => {
  return (
    <div className="pa4 b--black-10 br3 ba mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <div className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Register</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
          </div>
        </fieldset>
        <div className="">
          <input
            // notice we use an arrow function to callback the handler to onClick
            // this prevents the handler from being triggered on render rather than onClick
            onClick={() => onRouteChange('home')}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Register"
          />
        </div>
      </div>
    </div>
  )
}

export default Register