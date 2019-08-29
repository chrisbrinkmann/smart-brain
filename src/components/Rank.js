import React from 'react';

// shows user's 'score' (amount of images submitted)
function Rank( { user } ){
	return (
		<div>
			<div className='white f3'>
				{user.name}, your current score is...
			</div>
			<div className='white f1'>
				{user.entries}
			</div>
		</div>
	)
}

export default Rank;