import React from 'react';

const Delete = ({ id, setChroniques, chroniques }) => {
	const handleClick = () => {
		fetch(`http://localhost:3333/chroniques/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => {
			setChroniques(chroniques.filter((chronique) => chronique.id !== id));
		});
	};
	return (
		<button className="btn btn-danger" onClick={handleClick}>
			Delete
		</button>
	);
};

export default Delete;
