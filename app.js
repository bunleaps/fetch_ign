const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const url = "https://www.ign.com/games/";
const app = express();
const PORT = 5000;

async function fetchData(url) {

	const fetch_data = [];

	await axios(url).then((res) => {
		const html = res.data;
		const $ = cheerio.load(html);

		//fetch data to variable
		const name = $('.display-title').text();
		const poster = $('.image').attr('src')
;		const dev = $('.developers-info a').map((i, e) => $(e).text()).get();
		const pub = $('.publishers-info a').map((i, e) => $(e).text()).get();
		const fran = $('.franchises-info a').map((i, e) => $(e).text()).get();
		const init_release = $('.initial-release-info div').text().slice(15);
		const devices = $('.platforms-info a').map((i, e) => $(e).attr('title')).get();

		const data = {
			name: name,
			poster: poster,
			developer: dev,
			publisher: pub,
			franchises: fran,
			initial_release: init_release,
			platforms: devices
		}

		fetch_data.push(data)
	});

	return fetch_data
}


app.get("/api/:id", async (req, res) => {
	const full_data = await fetchData(url + req.params.id);
	return res.status(200).json(full_data);
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`));