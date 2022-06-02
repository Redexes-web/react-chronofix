import React from 'react';
import { useParams } from 'react-router-dom';
import EditForm from '../components/Edit/EditForm';
import { useState, useEffect } from 'react';

const ChroniquePage = () => {
	const { chroniqueId } = useParams();
	const [author, setAuthor] = useState({});
	const [chronique, setChronique] = useState({});
	const [user, setUser] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [isOwner, setisOwner] = useState(false);
	useEffect(() => {
		if (JSON.parse(localStorage.getItem('user'))) {
			setUser(JSON.parse(localStorage.getItem('user')).user);
		}
		fetch(`http://localhost:3333/chroniques/${chroniqueId}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.id) {
					setChronique(data);
				} else {
					window.location.href = '/profile';
				}
			});
	}, []);
	useEffect(() => {
		if (chronique.author) {
			fetch(`http://localhost:3333/users/${chronique.author}`)
				.then((response) => response.json())
				.then((data) => {
					setAuthor(data);
				});
		}
	}, [chronique]);
	useEffect(() => {
		if (user && chronique.author === user.id) {
			setisOwner(true);
		}
	}, [author]);

	const handleDelete = () => {
		fetch(`http://127.0.0.1:3333/chroniques/${chronique.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => {
			if (response.status === 200) {
				window.location.reload();
			}
		});
	};
	const handleEditButton = () => {
		setEditMode(true);
	};
	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					{editMode ? (
						<>
							<EditForm chronique={chronique} />
							<div className="d-grid gap-2 col-6 mx-auto">
								<button
									className="btn btn-danger btn-lg mt-2"
									onClick={() => {
										setEditMode(!editMode);
									}}
								>
									Annuler
								</button>
							</div>
						</>
					) : (
						<>
							<h1 className="display-1">{chronique.title}</h1>
							<div>
								{chronique.content &&
									chronique.content
										.split('\n')
										.map((item, index) =>
											item === '' ? <br /> : <p key={index}>{item}</p>
										)}
							</div>
						</>
					)}

					<small>
						{author.firstName} {author.lastName}
					</small>
					<br />
					<small>pubilé le {chronique.createdAt}</small>
					{isOwner && !editMode && (
						<div className="row">
							<button
								onClick={() => handleEditButton()}
								className="btn btn-info mt-2"
							>
								Modifier
							</button>
							<button
								className="btn btn-danger mt-2"
								onClick={() => handleDelete()}
							>
								Supprimer
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChroniquePage;
