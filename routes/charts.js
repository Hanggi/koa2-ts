
const request = require('request');



let Arr = []
let coinArr = []

let coinPriceArr = []

function getPrice(coin, id_index) {

    function coinColor(str) {
        if (str == "BCH") {
            return chalk.yellow.bgBlue(str)
        }else if (str == "IOTA") {
            return chalk.white.bgMagenta(str)
        } else {
            return str
        }
    }

    request("https://api.coinone.co.kr/trades?currency=" + coin, (err, res, body) => {
        if (err) {
            console.log(err)
        }
        // console.log(body)
        let data = JSON.parse(body).completeOrders;
        let now = data[data.length - 1].timestamp;
        let limit = now - 60;
        let qty = 0;
        // console.log(now)
        for (let i = data.length - 1; i > 0; i--) {
            // console.log(typeof data)
            // console.log(i)
            if (Number(data[i].timestamp) < limit) {
                break;
            }
            qty += Number(data[i].qty);
        }
        qty = Math.round(qty)

        coinPriceArr[id_index] = {name: coin
                                 ,price: data[data.length - 1].price}
        // console.log(coinPriceArr)

        
        
    });
}

let scheduleCronstyle = () => {
// schedule.scheduleJob('1 * * * * *', function(){
    let time_interval = 2000
    setInterval(()=>{
        getPrice("btc", 0);
        getPrice("bch", 1);
        getPrice("eth", 2);
        getPrice("etc", 3);
        setTimeout(() => {
            getPrice("ltc", 4);
            getPrice("iota", 5);
            getPrice("xrp", 6);
            getPrice("qtum", 7);
        }, time_interval/2)

        if (coinPriceArr.length >= 8) {
            for (let i = 0; i < coinPriceArr.length; i++) {
            
                if (Arr.length <= i) {
                    Arr.push([])
                }
                for (let j = 0; j < coinPriceArr.length; j++) {
                    if (Arr[i].length >= j) {
                        // Arr[i].push([])

                        Arr[i][j] = coinPriceArr[i].price - coinPriceArr[j].price;
                    } else {
                        Arr[i].push = coinPriceArr[i].price - coinPriceArr[j].price;
                    }
                }
            }

            for (let i = 0; i < coinPriceArr.length; i++) {

                coinArr[i] = 5000000 / coinPriceArr[i].price
                // if (coinArr.length <= i) {
                //     coinArr.push([])
                // }
                // for (let j = 0; j < coinPriceArr.length; j++) {
                //     if (coinPriceArr[i].length >= j) {

                //     }
                // }
            }
            console.log(Arr)
            console.log(coinArr)
        }
       
    }, time_interval);
}
    
// scheduleCronstyle();

function getArr() {
    if (coinArr.length >= 8) {
        return {Arr: Arr, coinArr: coinArr}
    } else {
        return false
    }
}

async function charts (ctx, next) {

    let obj = getArr();

    if (obj) {
        await ctx.render('charts', {
            title: 'wow',
            Arr: Arr,
            coinArr: coinArr,
            coinPriceArr: coinPriceArr
        })
    } else {
        await ctx.render('charts', {
            title: 'wow',
            Arr: null,
            coinArr: null
        })
    }

    
}

exports = module.exports = charts;