import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import Delete from '../delete/Delete';

const AllChroniques = () => {
	const [chroniques, setChroniques] = useState([]);
	useEffect(() => {
		// Simple GET request using fetch
		fetch('http://localhost:3333/chroniques')
			.then((response) => response.json())
			.then((data) => {
				setChroniques(data);
			});
	}, []);
	return (
		<div className="container">
			<h1>Chroniques</h1>
			<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
				{chroniques.map((chronique, index) => (
					<div className="col mb-4" key={index}>
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">{chronique.title}</h5>
								<p className="card-text">
									{chronique.content
										.split('\n')
										.map((item, index) =>
											item === '' ? <br /> : <p key={index}>{item}</p>
										)}
								</p>
								<p className="card-text">
									<small className="text-muted">{chronique.author}</small>
								</p>
								<div className="d-flex justify-content-between align-items-center">
									<small className="text-muted">
										Publié le {chronique.createdAt}
									</small>
								</div>
								<Delete
									setChroniques={setChroniques}
									chroniques={chroniques}
									id={chronique.id}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AllChroniques;
