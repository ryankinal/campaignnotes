import { HTTP } from '../http.js';

let http = new HTTP();
let notesOutput = document.querySelector('#notes');
let listsOutput = document.querySelector('#lists');
let gmOutput = document.querySelector('#gm');
let md = window.markdownit();
let keystring = '';

http.get('notes.md').then(function(notes) {
	notesOutput.innerHTML = md.render(notes);

	let h2s = notesOutput.querySelectorAll('h2');
	let options = [];
	let header = document.querySelector('header');
	let select = document.createElement('select');
	let firstOption = document.createElement('option');
	firstOption.value = '';
	firstOption.appendChild(document.createTextNode('Select session'));

	select.appendChild(firstOption);

	h2s.forEach(function(h2) {
		let option = document.createElement('option');
		let id = h2.innerHTML.replace(/[^\w]/g, ''); 
		h2.id = id;

		option.appendChild(document.createTextNode(h2.innerHTML));
		option.value = id;

		select.appendChild(option);
		options.push(option);
	});

	select.addEventListener('change', function() {
		if (select.value && select.value !== '') {
			window.location.hash = select.value;
			select.value = '';	
		}
	});

	header.appendChild(select);
});

http.get('lists.md').then(function(lists) {
	listsOutput.innerHTML = md.render(lists);
});

if (gmOutput) {
	http.get('gm.md').then(function(gm) {
		gmOutput.innerHTML = md.render(gm);
	});
}

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

document.addEventListener('keypress', function(e) {
	if (e.key.match(/\w/)) {
		keystring += e.key;
	}

	if (keystring && keystring === 'gamemaster') {
		gmOutput.style.display = 'block';
	}
});