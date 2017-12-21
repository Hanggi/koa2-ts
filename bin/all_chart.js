
const request = require('request');

let scheduleCronstyle = () => {
    // schedule.scheduleJob('1 * * * * *', function(){
        let time_interval = 2000
        setInterval(()=>{
            getPrice("bch", 0);
            getPrice("iota", 1);
            getPrice("xrp", 2);
            setTimeout(() => {
                getPrice("ltc", 3);
                getPrice("eth", 4);
                getPrice("etc", 5);
                getPrice("btc", 6);
            }, time_interval/2)
        }, time_interval);
    }
    
scheduleCronstyle();


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

        console.log(data)
        
    });
}
