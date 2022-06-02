import React from 'react';
import ChroniqueCard from './ChroniqueCard';

const Chroniques = ({ chroniques, limit = null }) => {
	return (
		<div className="row">
			{chroniques.map((chronique, i) => {
				if (limit && i >= limit) {
					return null;
				}
				return <ChroniqueCard key={chronique.id} chronique={chronique} />;
			})}
		</div>
	);
};

export default Chroniques;
