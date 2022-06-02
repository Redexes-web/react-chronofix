import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import { Fragment } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import ChroniquesPage from './pages/ChroniquesPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/navbar/NavBar';
import AjoutPage from './pages/AjoutPage';
import LoginPage from './pages/LoginPage';
import RegisterForm from './components/Register/RegisterForm';
import { useState } from 'react';
import ChroniquePage from './pages/ChroniquePage';

function App() {
	return (
		<div className="App">
			<Router>
				<NavBar />

				<div className="container">
					<Routes>
						<Fragment>
							<Route path="/" element={<HomePage />} />
							<Route path="/chroniques" element={<ChroniquesPage />} />
							<Route path="/add" element={<AjoutPage />} />
							<Route path="/about" element={<AboutPage />} />
							<Route path="/profile" element={<ProfilePage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/register" element={<RegisterForm />} />
							<Route
								path="/chronique/:chroniqueId"
								element={<ChroniquePage />}
							/>
						</Fragment>
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;
