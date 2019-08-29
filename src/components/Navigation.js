import React from 'react';

// nav links for signin/register/signout
function Navigation({ onRouteChange, route }) {
  return (
      route === 'home'
      ? <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p
            onClick={() => onRouteChange('signout')}
            className='f3 link dim black underline pa3 pointer'>Sign Out
          </p>
        </nav>
      : <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p
            onClick={() => onRouteChange('signin')}
            className='f3 link dim black underline pa3 pointer'>Sign In
          </p>
          <p
          onClick={() => onRouteChange('register')}
          className='f3 link dim black underline pa3 pointer'>Register
          </p>
        </nav>
		);

}

export default Navigation