import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
	const handleLogout = () => {
		localStorage.removeItem('user');
		window.location.href = '/';
	};
	const user = localStorage.getItem('user');
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					Chroflix
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<Link className="nav-link" to="/chroniques">
							Chroniques
						</Link>
						<Link className="nav-link" to="/about">
							A propos
						</Link>
						{user ? (
							<>
								<Link className="nav-link" to="/add">
									Ajouer
								</Link>
								<Link className="nav-link" to="/profile">
									Profil
								</Link>
								<a className="nav-link" href="#" onClick={handleLogout}>
									Déconnexion
								</a>
							</>
						) : (
							<>
								<Link className="nav-link" to="/login">
									Connexion
								</Link>
								<Link className="nav-link" to="/register">
									Inscription
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
