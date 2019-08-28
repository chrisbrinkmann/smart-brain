import React from 'react';
import '../styles/FaceRecognition.css'

function FaceRecognition( {imageUrl, boxes}) {
	return (
		<div className='pa3 center'>
			<div className='absolute mt2'>
				<img id='inputImage' src={imageUrl} alt='' width='600px' max-width='99%' height='auto' />
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