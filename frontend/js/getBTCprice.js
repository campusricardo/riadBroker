const url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD';

const getDataPrice = async () => {
    const fet = await fetch(url);
    const result = await fet.json();
    price.textContent = result['RAW']['BTC']['USD'].PRICE;
    change.textContent = result['RAW']['BTC']['USD'].CHANGEPCTDAY.toFixed(2);
}

getDataPrice();

