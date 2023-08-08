
const urlAssets = "http://localhost:7777/api/assets";
const url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD';

const getDataPrice = async () => {
    const fet = await fetch(url);
    const result = await fet.json();
    const priceBTC = result['RAW']['BTC']['USD'].PRICE;
    const change24h = result['RAW']['BTC']['USD'].CHANGEPCTDAY.toFixed(2);
    getDataWallet(priceBTC);
}

const getDataWallet = async(priceBTC) => {
  console.log(priceBTC);
  const fetData = await fetch(urlAssets,{
    method: "GET",
    headers:{'Content-Type':'application/json',
    'x-api-token-jwt': localStorage.getItem("token")
}
});
  const result = await fetData.json();
  const {usd, BTC} = result;
  const datas = [
  {value: usd, name: 'US DOLLARS'},
  {value: BTC*priceBTC, name: 'Bitcoin'}
]
  showPie(datas)
}

const showPie = async(datas) => {
console.log(datas);
var dom = document.getElementById('pie-chart');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
title: {
text: 'Portafolio',
subtext: 'Distribution of your portafolio',
left: 'center',
color: 'white'
},

tooltip: {
trigger: 'item'
},
legend: {
orient: 'vertical',
left: 'left'
},
series: [
{
  name: 'Total',
  type: 'pie',
  radius: '50%',
  data: datas,
  emphasis: {
    itemStyle: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
  }
}
]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);
}

document.addEventListener('DOMContentLoaded', getDataPrice)