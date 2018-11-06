const apiKey = 'a33184651f2844f3b8b1289d0b85f10f';
const main = document.querySelector('main');
const defaultSource = 'the-verge';
const sourceSelector = document.querySelector('#sourceSelector')

window.addEventListener('load', async e => {
	updateNews();
	await updateSources();
	sourceSelector.value = defaultSource;

	sourceSelector.addEventListener('change', e => {
		updateNews(e.target.value);
	});

	if('serviceWorker' in navigator){
		try{
			navigator.serviceWorker.register('sw.js');
			console.log('Service Worker registered!');
		}catch(error){
			console.log('Service Worker register failed!');
		}
	}
});

async function updateSources(){
	const res = await fetch(`https://newsapi.org/v1/sources`);
	const json = await res.json();

	sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n');
}

async function updateNews(source = defaultSource){
	const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
	const json = await res.json();

	main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article){
	return `<div class="article"><a href="${article.url}"><h2>${article.title}</h2><img src="${article.urlToImage}"><p>${article.description}</p></a></div>`;
}