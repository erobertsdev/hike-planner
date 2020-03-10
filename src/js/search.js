import { key } from './key.js';

const currentLocationBtn = document.getElementById('location-current');

const renderTrails = (data, domLocation) => {
	const trailList = data.trails;

	for (let trail of trailList) {
		let dom = document.getElementById(`${domLocation}`);
		let name = trail.name;
		let type = trail.type;
		let summary = trail.summary;
		let difficulty = trail.difficulty;
		let rating = trail.stars;
		let location = trail.location;
		let thumb = trail.imgMedium;

		const trailContainer = document.createElement('div');
		trailContainer.classList.add('trail');
		trailContainer.innerHTML = `
        <a href="#">
                <h5 class="trail-name">${name}</h5>
                <h6 class="trail-location">${location}</h6>
                <img class="trail-thumb" src="${thumb}" />
                <p class="trail-summary">${summary}</p>
                <p class="trail-type">Type: ${type}</p>
                <p class="trail-difficulty">Difficulty: ${difficulty}</p>
                <p class="trail-rating">Rating: ${rating}</p>
            </a>
    `;

		dom.appendChild(trailContainer);
	}
};

currentLocationBtn.addEventListener('click', () => {
	const search = async (lat, lon) => {
		try {
			const response = await axios.get('https://www.hikingproject.com/data/get-trails?', {
				params: {
					key: key,
					lat: lat,
					lon: lon
				}
			});
			currentLocationBtn.style.display = 'none';
			renderTrails(response.data, 'current');
		} catch (error) {
			console.log(error);
			return;
		}
	};

	navigator.geolocation.getCurrentPosition(async function success(pos) {
		const coords = pos.coords;
		const lat = coords.latitude;
		const lon = coords.longitude;

		search(lat, lon);
	});
});
