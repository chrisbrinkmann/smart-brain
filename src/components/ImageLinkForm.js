import React from 'react';
import '../styles/ImageLinkForm.css'

// form for user to submit an image via URL for face detection
function ImageLinkForm( { onInputHandler, onSubmitHandler }) {
	return (
		<div>
			<p className='f3 center'>
				Upload an image to detect faces 
			</p>
			<div className='center'>
				<div className='pa4 br3 shadow-5 center form'>
          <input
            className='f3 pa2 w-70 center'
            type='text'
						onChange={onInputHandler} />
					<button
						className='w-30 grpw f4 link ph3 pv2 dib white bg-light-purple'
						onClick={onSubmitHandler}>
						Detect
					</button>
				</div>
			</div>
		</div>
		);
}

export default ImageLinkForm