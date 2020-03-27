export class HTTP {
	async get(url) {
		return new Promise(function(resolve, reject) {
			let xhr = new XMLHttpRequest();
			xhr.addEventListener('load', function() {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve(xhr.responseText);
				} else {
					reject(xhr);
				}
			});
			xhr.open('GET', url);
			xhr.send();
		});
	}
}