const urlBTCPrice = 'http://localhost:7777/api/assets';
const sellBTCx = 'http://localhost:7777/api/sell';
const buyBTCx = 'http://localhost:7777/api/buy';
const url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD';

const getUserAssets = async() => {

    const fetBTCData = await fetch(urlBTCPrice,{
        method: "GET",
        headers:{'Content-Type':'application/json',
        'x-api-token-jwt': localStorage.getItem("token")
    }
})

    const fullData = await fetBTCData.json();
    console.log(fullData);
    const {usd, BTC} = fullData;
    buy.placeholder = usd;
    sell.placeholder = BTC;
    buy.max = usd;
    sell.max = BTC;
    buy.min = 0;
    sell.min = 0;
}

getUserAssets();


const buyBTC = async () => {

    getBTC();

   


}

const sellBTC = async () => {
 sellBitcoin();
}

const getBTC = async() => {
    
    const fetBTCData = await fetch(urlBTCPrice,{
        method: "GET",
        headers:{'Content-Type':'application/json',
        'x-api-token-jwt': localStorage.getItem("token")
    }
})

    const fullData = await fetBTCData.json();
    const {usd, BTC} = fullData;
    if (Number(buy.value) <= usd && Number(buy.value) > 0){
        const moneytoBuy = Number(buy.value);
    getDataPriceForBuy(moneytoBuy, usd,BTC);

    } else {
        alert('insufficient funds OR Negative Number');
        window.location.reload();

    }

}

const getDataPriceForBuy = async (moneytoBuy, usd, BTC) => {
    const moneyxd = moneytoBuy;
    const fet = await fetch(url);
    const result = await fet.json();
    const priceBTC = result['RAW']['BTC']['USD'].PRICE;
    const amountBTC = moneyxd / priceBTC;
    BuyBTCApi(amountBTC, moneyxd,priceBTC, usd, BTC);
}


const BuyBTCApi = async(amountBTC,moneyxd, priceBTC,usd, BTC) => {
    console.log(amountBTC);
    console.log(moneyxd);
    console.log(priceBTC);
    console.log(usd);
    console.log(BTC);
    const data = {
        amount: BTC + amountBTC,
        money: usd - Number(buy.value),
        price: priceBTC,
        type: true
    }
    console.log(data);
    const fetchBuyBTC = await fetch(buyBTCx,{
        method: "POST",
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json',
        'x-api-token-jwt': localStorage.getItem("token")
        }
    });

    const datatoUpload = await fetchBuyBTC.json();
    
}



const sellBitcoin = async() => {
    
    const fetBTCData = await fetch(urlBTCPrice,{
        method: "GET",
        headers:{'Content-Type':'application/json',
        'x-api-token-jwt': localStorage.getItem("token")
    }
})

    const fullData = await fetBTCData.json();
    const {usd, BTC} = fullData;
    if (Number(sell.value) <= BTC &&  Number(sell.value) > 0){
        const btcToSell = Number(sell.value)
    getDataPriceForSell(btcToSell,usd, BTC);

    } else {
        alert('insufficient funds OR Negative Number');
        window.location.reload();
    }

}

const getDataPriceForSell = async (btcToSell,usd, BTC) => {
    const fet = await fetch(url);
    const result = await fet.json();
    const priceBTC = result['RAW']['BTC']['USD'].PRICE;
    const amountUSD = btcToSell * priceBTC;
    SellBTCApi(btcToSell, usd, BTC, amountUSD, priceBTC);
}


const SellBTCApi = async(btcToSell, usd, BTC, amountUSD, priceBTC) => {
    console.log(btcToSell);
    console.log(usd);
    console.log(BTC);
    console.log(amountUSD);
    console.log(priceBTC);
    const data = {
        amount: BTC - btcToSell,
        money: usd + amountUSD,
        price: priceBTC,
        type: false
    }
    console.log(data);
    const fetchSellBTC = await fetch(buyBTCx,{
        method: "POST",
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json',
        'x-api-token-jwt': localStorage.getItem("token")
        }
    });

    const datatoUpload = await fetchSellBTC.json();

}