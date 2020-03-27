import { key } from './key.js';

const currentLocationBtn = document.getElementById('location-current');

const search = async (lat, lon) => {
	try {
		const response = await axios.get('https://www.hikingproject.com/data/get-trails?', {
			// https://www.hikingproject.com/data - URL for params
			params: {
				key: key,
				lat: lat,
				lon: lon,
				maxDistance: 30,
				maxResults: 12,
				// Can also be 'quality'
				sort: 'quality'
			}
		});

		console.log(response.data);
		renderTrails(response.data, 'current');
	} catch (error) {
		console.log(error);
		return;
	}
};

const renderTrails = (data, domLocation) => {
	const trailList = data.trails;

	for (let trail of trailList) {
		let dom = document.getElementById(`${domLocation}`);
		let url = trail.url;
		let name = trail.name;
		let summary = trail.summary;
		let difficulty = trail.difficulty;
		let rating = trail.stars;
		let location = trail.location;
		let thumb = trail.imgMedium; // !== '' ? trail.imgMedium : 'NO IMAGE AVAILABLE';

		const trailContainer = document.createElement('div');
		trailContainer.classList.add('trail');
		trailContainer.innerHTML = `
        <a href="${url}" target="_blank">
                <h5 class="trail-name">${name}</h5>
                <h6 class="trail-location">${location}</h6>
                <img class="trail-thumb" src="${thumb}" />
                <p class="trail-summary">${summary}</p>
                <p class="trail-difficulty">Difficulty: ${difficulty}</p>
                <p class="trail-rating">Rating: ${rating}</p>
            </a>
    `;

		dom.appendChild(trailContainer);
	}
};

currentLocationBtn.addEventListener('click', () => {
	currentLocationBtn.style.display = 'none';
	navigator.geolocation.getCurrentPosition(async function success(pos) {
		const coords = pos.coords;
		const lat = coords.latitude;
		const lon = coords.longitude;

		search(lat, lon);
	});
});
