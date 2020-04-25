import { HTTP } from '../http.js';

let http = new HTTP();
let notesOutput = document.querySelector('#fumetsu');
let md = window.markdownit();
let keystring = '';

http.get('fumetsu.md').then(function(notes) {
	notesOutput.innerHTML = md.render(notes);
});

let tabs = document.querySelector('.tabs');

tabs.addEventListener('click', function(e) {
	let target = e.target;
	let href = target.href ? target.href.split('#')[1] : false;

	if (href) {
		let current = tabs.querySelector('.selected');
		let currentHref = current.href ? current.href.split('#')[1] : false;
		let toShow = document.querySelector('#' + href);
		let toHide = currentHref ? document.querySelector('#' + currentHref) : false;

		if (toHide) {
			toHide.classList.add('hide');
		}

		if (toShow) {
			current.classList.remove('selected');
			target.classList.add('selected');
			toShow.classList.remove('hide');
		}
	}

	e.preventDefault();
	return false;
});