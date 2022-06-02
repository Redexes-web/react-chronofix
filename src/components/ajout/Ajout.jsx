import React from 'react';
import { useState, useEffect } from 'react';

const Ajout = () => {
	const genreOptions = [
		{
			label: 'Aventure',
			value: 'adventure',
		},
		{
			label: 'Romance',
			value: 'romance',
		},
		{
			label: 'Policier',
			value: 'detective',
		},
	];
	const [title, setTitle] = useState('');
	const [genre, setGenre] = useState(genreOptions[0].value);
	const [content, setContent] = useState('');
	const [user, setUser] = useState({});
	useEffect(() => {
		if (localStorage.getItem('user')) {
			setUser(JSON.parse(localStorage.getItem('user')).user);
		} else {
			window.location.href = '/login';
		}
	}, []);
	useEffect(() => {
		if (!user) {
		}
	}, [user]);
	const handleSubmit = (e) => {
		e.preventDefault();

		if (title.length < 2 || content.length < 2) {
			alert('Veuillez remplir tous les champs avec au moins deux caractères');
		}
		fetch('http://localhost:3333/chroniques', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: title,
				author: user.id,
				genre: genre,
				content: content,
				createdAt:
					new Date().getDay() +
					'/' +
					new Date().getMonth() +
					'/' +
					new Date().getFullYear(),
			}),
		}).then((response) => {
			if (response.status === 201) {
				setTitle('');
				setContent('');
				setGenre(genreOptions[0].value);
				alert('Chronique ajoutée avec succès');
			} else {
				alert('Une erreur est survenue');
			}
		});
	};
	return (
		<div className="divform">
			<h2 className="display-2">Ajout de Chroniques</h2>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="form-group mt-3">
					<label htmlFor="title">Titre de la chronique</label>
					<input
						className="form-control"
						type="text"
						placeholder="Titre"
						id="title"
						required
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>
				</div>
				<div className="form-group mt-3">
					<label htmlFor="genre">Genre</label>
					<select
						name="genre"
						id="genre"
						className="form-control"
						onChange={(e) => setGenre(e.target.value)}
					>
						{genreOptions.map((option, index) => (
							<option key={index} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
				<div className="form-group mt-3">
					<label htmlFor="content">Contenu de la chronique</label>
					<textarea
						className="form-control"
						name="content"
						id="content"
						cols="30"
						rows="10"
						onChange={(e) => setContent(e.target.value)}
						value={content}
					></textarea>
				</div>
				<div className="d-grid gap-2 col-6 mx-auto">
					<button className="btn btn-primary btn-lg mt-3" type="submit">
						Publier
					</button>
				</div>
			</form>
		</div>
	);
};

export default Ajout;
