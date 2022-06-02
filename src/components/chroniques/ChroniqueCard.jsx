import React from 'react';
import { useState, useEffect } from 'react';

const ChroniqueCard = ({ chronique }) => {
	return (
		<div className="col-6 mb-2">
			<div className="card mb-3">
				<div className="card-body">
					<h5 className="card-title">{chronique.title}</h5>
					<p className="card-text">
						{chronique.content.substring(0, 250)}
						{chronique.content.length > 375 ? '...' : ''}
					</p>
				</div>
				<a href={'/chronique/' + chronique.id} className="btn btn-primary">
					Voir Plus
				</a>
			</div>
		</div>
	);
};

export default ChroniqueCard;
