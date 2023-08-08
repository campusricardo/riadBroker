const log = console.log;

const chartProperties = {
    width: 600,
    height: 300,
    timeScale: {
        timeVisible: true,
        secondsVisible: false
    }
}

const domElement = document.getElementById('trading-chart');

const chart = LightweightCharts.createChart(domElement,chartProperties);
const candleSeries = chart.addCandlestickSeries();
// Static Chart

fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000`)
.then(res => res.json())
.then(data => {
    const cdata = data.map((d)=> {
        return {time:d[0]/1000, open: parseFloat(d[1]), high: parseFloat(d[2]), low: parseFloat(d[3]), close: parseFloat(d[4]) }
    });
    candleSeries.setData(cdata);
})
.catch(err => {
    console.log(err);
});


// Dinamic Chart


const socket = io.connect('http://127.0.0.1:4000/');

socket.on('KLINE', (pl)=>{
    log(pl);

    candleSeries.update(pl);
})