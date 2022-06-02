import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Slider = () => {
	return (
		<Carousel>
			<div>
				<img src="https://via.placeholder.com/2024x860" alt="image1" />
				<p className="legend">Legend 1</p>
			</div>
			<div>
				<img src="https://via.placeholder.com/2024x860" alt="image2" />
				<p className="legend">Legend 2</p>
			</div>
			<div>
				<img src="https://via.placeholder.com/2024x860" alt="image3" />
				<p className="legend">Legend 3</p>
			</div>
		</Carousel>
	);
};

export default Slider;
