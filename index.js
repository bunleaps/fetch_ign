const axios = require('axios');
const cheerio = require("cheerio");
const url = "https://www.ign.com/games/children-of-silentown";

fetchData(url).then((res) => {
	const html = res.data;
	const $ = cheerio.load(html);

	//fetch data to variable
	const name = $('.display-title').text();
	const poster = $('.image').attr('src');
	const dev = $('.developers-info a').map((i, e) => $(e).text()).get();
	const pub = $('.publishers-info a').map((i, e) => $(e).text()).get();
	const fran = $('.franchises-info a').map((i, e) => $(e).text()).get();
	const release = $('.initial-release-info div').text();
	const init_release = release.slice(15)
	const devices = $('.platforms-info a').map((i, e) => $(e).attr('title')).get();

	const data = [{
		name: name,
		poster: poster,
		developer: dev,
		publisher: pub,
		franchises: fran,
		initial_release: init_release,
		platforms: devices
	}]

	// console.log data
	final_data = data;
});

async function fetchData(url){
    console.log("Crawling data...")
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));

    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}