import React from 'react';
import { useState, useEffect } from 'react';

const EditForm = ({ chronique }) => {
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
	const [title, setTitle] = useState(chronique.title);
	const [genre, setGenre] = useState(chronique.genre);
	const [content, setContent] = useState(chronique.content);
	const [author, setAuthor] = useState(chronique.author);
	const user = JSON.parse(localStorage.getItem('user')).user;
	useEffect(() => {
		if (!user) {
			window.location.reload();
		}
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();

		if (title.length < 2 || content.length < 2) {
			alert('Veuillez remplir tous les champs avec au moins deux caractères');
		}
		fetch('http://localhost:3333/chroniques/' + chronique.id, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: title,
				author: chronique.author,
				genre: genre,
				content: content,
				createdAt: chronique.createdAt,
			}),
		}).then((response) => {
			if (response.status === 200) {
				setAuthor('');
				setTitle('');
				setContent('');
				setGenre(genreOptions[0].value);
				window.location.href = '/chronique/' + chronique.id;
			} else {
				alert('Une erreur est survenue');
			}
		});
	};
	return (
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
					modifier
				</button>
			</div>
		</form>
	);
};

export default EditForm;
