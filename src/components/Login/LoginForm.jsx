import React from 'react';
import { useState, useEffect } from 'react';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	// useEffect(() => {
	// 	console.log(localStorage.getItem('user'));
	// 	if (localStorage.getItem('user') !== null) {
	// 		window.location.href = '/profile';
	// 	}
	// }, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		fetch('http://localhost:3333/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				} else {
					setError('mot de passe ou email incorrect');
					return null;
				}
			})
			.then((data) => {
				data && localStorage.setItem('user', JSON.stringify(data));
				window.location.href = '/profile';
			});
	};
	return (
		<form onSubmit={handleSubmit}>
			{error && <p className="text-danger">{error}</p>}
			<div className="form-group">
				<label htmlFor="email">Email address</label>
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
				<label htmlFor="password">Password</label>
				<input
					type="password"
					className="form-control"
					id="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Connexion
			</button>
		</form>
	);
};

export default LoginForm;
