import React from 'react';
import AllChroniques from '../components/chroniques/AllChroniques';
import Chroniques from '../components/chroniques/Chroniques';
import { useState, useEffect } from 'react';

const ChroniquesPage = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		fetch('http://localhost:3333/chroniques')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setPosts(data.reverse());
			});
	}, []);
	return <Chroniques chroniques={posts} />;
};

export default ChroniquesPage;
