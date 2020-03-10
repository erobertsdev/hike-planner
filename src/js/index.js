const navButton = document.getElementById('nav-arrow');
const navMenu = document.querySelector('.nav');

navButton.addEventListener('click', (e) => {
	navButton.classList.toggle('rotate');
	navMenu.classList.toggle('grow');
});
