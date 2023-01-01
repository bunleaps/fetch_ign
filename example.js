async function cryptopriceScraper() {
  const url = "https://coinmarketcap.com/";
  const coinArray = [];
  await axios(url).then((response) => {
    const html_data = response.data;
    const $ = cheerio.load(html_data);

    const selectedElem =
      "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr";
    const keys = [
      "No.",
      "Coin",
      "Price",
      "24h",
      "7d",
      "Marketcap",
      "Volume",
      "CirculatingSupply",
    ];

    $(selectedElem).each((parentIndex, parentElem) => {
      let keyIndex = 0;
      const coinDetails = {};
      if (parentIndex <= 9) {
        $(parentElem)
          .children()
          .each((childId, childElem) => {
            const value = $(childElem).text();
            if (value) {
              coinDetails[keys[keyIndex]] = value;
              keyIndex++;
            }
          });
        coinArray.push(coinDetails);
      }
    });
  });
  return coinArray;
}