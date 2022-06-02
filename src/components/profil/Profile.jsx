import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ChroniqueCard from '../chroniques/ChroniqueCard';
import Chroniques from '../chroniques/Chroniques';
const Profile = () => {
	const [showAll, setShowAll] = useState(false);
	const user = JSON.parse(localStorage.getItem('user')).user;
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		fetch('http://localhost:3333/chroniques?author=' + user.id)
			.then((response) => response.json())
			.then((data) => {
				setPosts(data.reverse());
			});
	}, []);
	return (
		<div className="container">
			<h1>Profile</h1>
			{user ? (
				<section className="h-100 gradient-custom-2">
					<div className="container py-5 h-100">
						<div className="row d-flex justify-content-center align-items-center h-100">
							<div className="col col-lg-9 col-xl-7">
								<div className="card">
									<div
										className="rounded-top text-white d-flex flex-row"
										style={{ backgroundColor: '#000', height: '200px' }}
									>
										<div
											className="ms-4 mt-5 d-flex flex-column"
											style={{ width: '150px' }}
										>
											<img
												src="https://via.placeholder.com/650x650"
												alt="Generic placeholder image"
												className="img-fluid img-thumbnail mt-4 mb-2"
												style={{ width: '150px', zIndex: '1' }}
											/>
											{/* <button
												type="button"
												className="btn btn-outline-dark"
												style={{ zIndex: '1' }}
											>
												Edit profile
											</button> */}
										</div>
										<div className="ms-3" style={{ marginTop: '130px' }}>
											<h5>
												{user.firstName} {user.lastName}
											</h5>
											{user.username && <p>@{user.username}</p>}
										</div>
									</div>
									<div className="card-body p-4 text-black">
										<div className="d-flex justify-content-between align-items-center mb-4">
											<p className="lead fw-normal mb-0">Chroniques récentes</p>
											<p className="mb-0">
												{posts.length > 4 ? (
													<button
														className="text-muted btn btn-link"
														onClick={() => setShowAll(!showAll)}
													>
														{showAll ? 'Voir moins' : 'Voir plus'}
													</button>
												) : null}
											</p>
										</div>
										<Chroniques chroniques={posts} limit={showAll ? null : 4} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			) : (
				<h3 className="display-3">
					Vous devez être connecté pour voir cette page :'(
				</h3>
			)}
		</div>
	);
};

export default Profile;
