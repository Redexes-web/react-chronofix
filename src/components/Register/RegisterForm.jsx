import React from 'react';
import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

const RegisterForm = () => {
	const [firstName, setfirstName] = useState('');
	const [lastName, setlastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [chroniques, setChroniques] = useState([]);
	const [users, setUsers] = useState([]);
	useEffect(() => {
		fetch('http://localhost:3333/users')
			.then((response) => response.json())
			.then((data) => {
				setUsers(data);
			});
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		for (let index = 0; index < users.length; index++) {
			const user = users[index];
			if (user.email === email) {
				setError('Cet email est déjà utilisé');
				return false;
			}
		}
		if (password !== confirmPassword) {
			setError('Les mots de passe ne correspondent pas');
			return false;
		}
		fetch('http://localhost:3333/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
			}),
		}).then((response) => {
			if (response.status === 201) {
				setfirstName('');
				setlastName('');
				setEmail('');
				setPassword('');
				setConfirmPassword('');
				alert('Inscription réussie');
			} else {
				alert('Une erreur est survenue');
			}
		});
	};
	return (
		<div className="container">
			<h1 className="display-1">Inscription</h1>
			<p>{error}</p>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="firstName">Prénom</label>
					<input
						className="form-control"
						type="text"
						id="firstName"
						onChange={(e) => setfirstName(e.target.value)}
						value={firstName}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="lastName">Nom</label>
					<input
						className="form-control"
						type="text"
						id="lastName"
						onChange={(e) => setlastName(e.target.value)}
						value={lastName}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						className="form-control"
						id="email"
						aria-describedby="emailHelp"
						placeholder="Enter email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<small id="emailHelp" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="password">Mot de passe</label>
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="Mot de passe"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="confirmPassword">Confirmer le mot de passe</label>
					<input
						type="password"
						className="form-control"
						id="confirmPassword"
						placeholder="Confirmez le mot de passe"
						onChange={(e) => setConfirmPassword(e.target.value)}
						value={confirmPassword}
					/>
				</div>
				<div className="d-grid gap-2 col-6 mx-auto mt-3">
					<button className="btn btn-primary btn-lg" type="submit">
						S'inscrire
					</button>
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;
