const urlTrades = "http://localhost:7777/api/trades";


const getTrades = async () => {
    const fetTrad = await fetch(urlTrades,{
        method: "GET",
        headers:{'Content-Type':'application/json',
        'x-api-token-jwt': localStorage.getItem("token")
    }
})

    const trades = await fetTrad.json();

    console.log(trades);

    showTrades(trades);
}


function showTrades(trades) {
    trades.forEach(trade => {
        const {amount,price,money,type,createdAt} = trade;

        if (type === false){
            tbBuy.innerHTML += `  <tr>
            <th >${createdAt}</th>
            <td>${price}</td>
            <td>${amount} </td>
            <td > BTC </td>
            <td > ${money} </td>
          </tr>`;
        } else {
            tbSell.innerHTML += `  <tr>
            <th >${createdAt}</th>
            <td>${price}</td>
            <td>${amount} </td>
            <td > BTC </td>
            <td > ${money} </td>
          </tr>`;

        }
    });
}

document.addEventListener('DOMContentLoaded', getTrades);