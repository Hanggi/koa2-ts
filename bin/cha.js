var request = require('request');
var chalk = require("chalk");
let Arr = []
var lastArr = null
var pulsArr = []
let coinPriceArr = []
var wt = 0;

let money = 5000000;
var Money = 5000000;
var current = {name: "", price: 0, qty: 0}
// let profit = 0;

// let holdcoin, transcoin;

var highlight = {
    top: {price: 0},
    bottom: {price: 0} 
}
var maxArr = [];


var buyCount = 0;

function transfer() {
    ///////找到max_diff(sort coinpricearr 的一行)
    ///////当max_diff变小，换乘到比持有coin价格低&差价最大的coin
    ///////profit += max_diff
}

function buy(coin) {
    buyCount++;
    if (current.qty > 0) {
        Money = (coinPriceArr[current.index].price * current.qty) * 0.999
    }
    for (let i = 0; i < coinPriceArr.length; i++) {
        // console.log(coinPriceArr[i])
        if (coin == coinPriceArr[i].name) {
            current.name = coin;
            current.price = coinPriceArr[i].price;
            current.qty = Money / current.price;
            current.index = i;
        }
    }
    // initCoin()
    wt = 0;
}

function initCoin(coin, id, currentCoinPrice) {
    if (!coinPriceArr[id]) {
        coinPriceArr[id] = {
            price: currentCoinPrice,
            name: coin
        }

        coinPriceArr[id].qty = money / currentCoinPrice;
        coinPriceArr[id].money = coinPriceArr[id].qty * coinPriceArr[id].price;
        coinPriceArr[id].max = currentCoinPrice;
        coinPriceArr[id].min = currentCoinPrice;
    }
}

function updateCoin(coin, id, currentCoinPrice) {
    coinPriceArr[id].price = currentCoinPrice;
    coinPriceArr[id].max = Math.max(currentCoinPrice, coinPriceArr[id].max);
    coinPriceArr[id].min = Math.min(currentCoinPrice, coinPriceArr[id].min);
    coinPriceArr[id].puls = (coinPriceArr[id].max - coinPriceArr[id].min) * coinPriceArr[id].qty;

    coinPriceArr[id].money = Math.round(coinPriceArr[id].qty * coinPriceArr[id].price);
}

function getPrice(coin, id_index) {
    // 发送请求
    request("https://api.coinone.co.kr/trades?currency=" + coin, (err, res, body) => {
        if (err) {
            console.log(err)
        }

        let data;
        try {
            data = JSON.parse(body).completeOrders;
        } catch (e) {
            console.log(e)
            return;
        }
        let currentCoinPrice = data[data.length - 1].price;

        initCoin(coin, id_index, currentCoinPrice);

        // 每次请求更新价格数据
        updateCoin(coin, id_index, currentCoinPrice)

        pulsArr[id_index] = {
            puls: coinPriceArr[id_index].puls,
            name: coin,
            timestamp: coinPriceArr[id_index].timestamp
        };

        coinPriceArr[id_index].p = Math.round(coinPriceArr[id_index].qty * coinPriceArr[id_index].price);

    });

}

let scheduleCronstyle = () => {
    let time_interval = 1000

    setInterval(() => {
            // 循环
            getPrice("btc", 0);
            getPrice("bch", 1);
            getPrice("eth", 2);
            getPrice("etc", 3);
            getPrice("ltc", 4);
            getPrice("iota", 5);
            getPrice("xrp", 6);
            getPrice("qtum", 7);

            // 如果 初始化完毕，开始处理
            ready()

        },
        time_interval);

};
let initt = true;
function ready() {
    
    if (coinPriceArr.length >= 8) {
        let tmpLast;

        

        if (initt) {
            buy("btc")
            initt = false;
        }

        if (lastArr) {
            tmpLast = lastArr
        }

        // pulsArr.sort((a, b) => b.puls - a.puls)


        console.log(Date() + "\n")
        console.log(`| Coin     | ${chalk.yellowBright(current.name)} `)
        console.log(`| Qty      | ${current.qty} `)
        console.log(`| Price    | ${current.price} `)
        console.log(`| Index    | ${current.index} `)
        // console.log(current)
        console.log(`| Money    | ${chalk.yellowBright(Math.round(current.qty * coinPriceArr[current.index].price))}`)
        console.log(`| exchange | ${buyCount} \n`)

        for (let i = 0; i < coinPriceArr.length; i++) {
            // console.log("| " + coinPriceArr[i].name + ": " + Math.round(coinPriceArr[i].price * coinPriceArr[i].qty) + ", qty: " + coinPriceArr[i].qty)
        }

        // 循环输出数据
        for (let i = 0; i < coinPriceArr.length; i++) {
            if (Arr.length <= i) {
                Arr.push([])
            }

            // 第一行标题
            let title = "       | ";
            if (i == 0) {
                for (let x = 0; x < coinPriceArr.length; x++) {
                    let len = coinPriceArr[x].name.length
                    for (let k = 0; k < 9 - len; k++) {
                        // console.log(k)
                        title += "_";
                    }
                    title += chalk.yellow(coinPriceArr[x].name) + " | ";
                }
                console.log(title)
            }

            // 数据部分
            for (let j = 0; j < coinPriceArr.length; j++) {
                if (Arr[i].length <= j) {
                    Arr[i].push([])
                }

                Arr[i][j] = coinPriceArr[i].p - coinPriceArr[j].p;
                dealHighlight({price: Arr[i][j], x: i, y: j});
                Arr[i][j] = Arr[i][j] + "";
                if (Arr[i][j].length < 9) {

                    let len = Arr[i][j].length
                    for (let k = 0; k < 9 - len; k++) {
                        Arr[i][j] = " " + Arr[i][j];
                    }
                }
            }

            // Max 部分
            let aarr = [];
            for (let x = 0; x < coinPriceArr.length; x++) {
                aarr.push(Number(Arr[i][x].trim()))
            }
            
            maxArr[i] = Math.max.apply(null, aarr);

            // 数据 名字部分，加空格
            let str = coinPriceArr[i].name;
            let nLen = str.length
            for (let k = 0; k < 6 - nLen; k++) {
                str = " " + str;
            }
            str = chalk.yellowBright(str.toUpperCase()) + " | "

            // 显示高亮，价格上涨和下跌
            for (let b = 0; b < coinPriceArr.length; b++) {
                
                if (tmpLast && Number(tmpLast[i][b]) < Number(Arr[i][b])) {
                    // consolesß.log("111")
                    if (current.index == i && maxArr[i] == Number(Arr[i][b].trim())) {
                        wt = 0;
                    }
                    str += hh(i, chalk.greenBright, Arr[i][b], null);
                } else if (tmpLast && Number(tmpLast[i][b]) > Number(Arr[i][b])) {
                    if (current.index == i && maxArr[i] == Number(Arr[i][b].trim())) {
                        wt = 0;
                    }
                    str += hh(i, chalk.red, Arr[i][b], b);
                } else {
                    // console.log(current.index)
                    // console.log(Number(Arr[i][b].trim()))
                    // console.log( current.index)
                    // console.log( i)
                    // console.log((current.index == b) + " - " + Number(Arr[i][b].trim()))
                    if ( maxArr[i] == Number(Arr[i][b].trim()) && current.index == i && maxArr[i] > 0) {
                        wt++;
                        // console.log(wt)
                    }
                    str += hh(i, chalk.white, Arr[i][b], b);
                }

                
            }
            str += " " + Math.round(coinPriceArr[i].price * coinPriceArr[i].qty) + " (" + pulsArr[i].puls + ")"
            console.log(str)
        }

        lastArr = Arr;
        Arr = [];

        // console.log("\n")
        console.log(`  --- wt: ${wt}`)
        console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■")
    }
}

function hh(x, color, str, y) {
    // 高亮最高价
    if (maxArr[x] == Number(str.trim())) {
        // if (y && x == current.index) {
        if (y && x == current.index) {
            console.log(Number(str.trim()))
            if ((Number(str.trim()) > 0 && wt > 5) || (Number(str.trim()) > 0 && wt == 0)) {
                buy(coinPriceArr[y].name)
            }
        }
        // }
        return color(str) + chalk.yellowBright("*") + "| "
        // console.log(pulsArr)
    } else {
        return color(str) + " | "
    }
}

function dealHighlight(obj) {
    if (obj.price > highlight.top.price) {
        highlight.top = obj;
        return;
    } else if (obj.price < highlight.bottom.price) {
        highlight.bottom = obj;
        return;
    }
}

scheduleCronstyle();