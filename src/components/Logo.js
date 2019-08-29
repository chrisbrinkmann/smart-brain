import React from 'react';
import Tilt from 'react-tilt'
import '../styles/Logo.css';
import chip from '../img/chip.png'

// page logo
function Logo() {
	return (
		<div className='ma4 mt0'>
      <Tilt
        className="Tilt br2 shadow-3"
        options={{ max: 25 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner">
          <img
            src={chip}
            alt='logo'
          />
				</div>
			</Tilt>
		</div>
		);
}

export default Logo