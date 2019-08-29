import React from 'react';
import '../styles/FaceRecognition.css'

// renders the user submitted image and the boxes around faces detected in the image
function FaceRecognition( {imageUrl, boxes}) {
	return (
		<div className='pa3 center'>
			<div className='absolute mt2'>
        <img
          id='inputImage'
          src={imageUrl}
          alt=''
          width='600px'
          max-width='99%'
          height='auto' />
        
        {/* render boxes for any faces detected in the image */}
				{boxes.map((box, index) => {
					return <div
						  key={index}
						  className='bounding-box'
						  style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
						</div>
				})}
			</div>
		</div>
		);
}

export default FaceRecognition