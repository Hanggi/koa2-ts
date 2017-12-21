const
	request = require('request');

const
	chalk = require("chalk");



let
	Arr = []

var
	lastArr = null

var
	pulsArr = []

let
	coinArr = []

let
	coinPriceArr = []

let
	money = 5000000;

let
	profit = 0;

let
	coinhold;



function
getPrice(coin,
	id_index) {



	request("https://api.coinone.co.kr/trades?currency=" +
		coin, (err,
			res,
			body) => {

			if (err) {

				console.log(err)

			}

			// console.log(body)

			let
				data = JSON.parse(body).completeOrders;

			let
				now = data[data.length -
					1].timestamp;

			let
				limit = now -
				60;

			let
				qty = 0;

			// console.log(now)

			// for (let i = data.length - 1; i > 0; i--) {

			// // console.log(typeof data)

			// // console.log(i)

			// if (Number(data[i].timestamp) < limit) {

			// break;

			// }

			// qty += Number(data[i].qty);

			// }

			// qty = Math.round(qty)

			if (!coinArr[id_index]) {

				coinPriceArr[id_index] = {
					price: data[data.length - 1].price,
					name: coin
				};

				coinArr[id_index] =
					money /
					data[data.length -
						1].price;

				coinPriceArr[id_index].qty =
					coinArr[id_index]

				coinPriceArr[id_index].p =
					coinArr[id_index] *
					coinPriceArr[id_index].price;



				coinPriceArr[id_index].max =
					data[data.length - 1].price;

				coinPriceArr[id_index].min =
					data[data.length - 1].price;

			}



			coinPriceArr[id_index].price =
				data[data.length - 1].price

			coinPriceArr[id_index].max =
				Math.max(data[data.length - 1].price,
					coinPriceArr[id_index].max)

			coinPriceArr[id_index].min =
				Math.min(data[data.length - 1].price,
					coinPriceArr[id_index].min)

			coinPriceArr[id_index].puls = (coinPriceArr[id_index].max -
					coinPriceArr[id_index].min) *
				coinArr[id_index]


			pulsArr[id_index] = {
				puls: coinPriceArr[id_index].puls,
				name: coin
			};

			coinPriceArr[id_index].p =
				Math.round(coinArr[id_index] *
					coinPriceArr[id_index].price);





		});

}



let
	scheduleCronstyle = () => {

		// schedule.scheduleJob('1 * * * * *', function(){

		let
			time_interval = 2000

		setInterval(() => {

			getPrice("btc",
				0);

			getPrice("bch",
				1);

			getPrice("eth",
				2);

			getPrice("etc",
				3);

			setTimeout(() => {

				getPrice("ltc",
					4);

				getPrice("iota",
					5);

				getPrice("xrp",
					6);

				getPrice("qtum",
					7);

			}, time_interval / 2)







			// console.log(coinPriceArr)


			if (coinPriceArr.length >=
				8) {

				let
					tmpLast;

				if (lastArr) {

					tmpLast =
						lastArr

					console.log(lastArr[0][1])

				}

				pulsArr.sort((a, b) => b.puls -
					a.puls)

				console.log(pulsArr)



				for (let
						i =
						0; i <
					coinPriceArr.length; i++) {


					if (Arr.length <=
						i) {

						Arr.push([])

					}



					let
						title = " | ";

					if (i ==
						0) {

						for (let
								x =
								0; x <
							coinPriceArr.length; x++) {

							let
								len = coinPriceArr[x].name.length

							for (let
									k =
									0; k <
								9 - len; k++) {

								// console.log(k)

								title +=
									"_";

							}

							title +=
								chalk.yellow(coinPriceArr[x].name) +
								" | ";

						}

						console.log(title)

					}



					for (let
							j =
							0; j <
						coinPriceArr.length; j++) {

						if (Arr[i].length <=
							j) {

							Arr[i].push([])

						}



						Arr[i][j] =
							coinPriceArr[i].p -
							coinPriceArr[j].p

						Arr[i][j] =
							Arr[i][j] +
							"";

						if (Arr[i][j].length <
							9) {

							// console.log(typeof Arr[i][j])

							// console.log(Arr[i][j].length)

							// console.log(9 - Arr[i][j].length)

							let
								len = Arr[i][j].length

							for (let
									k =
									0; k <
								9 - len; k++) {

								// console.log(k)

								Arr[i][j] =
									" " +
									Arr[i][j];

							}

						}

					}



					// console.log(Arr[i])

					// for (let a = 0; a < coinPriceArr.length; a++) {

					// console.log(Arr)

					let
						str = coinPriceArr[i].name;

					let
						nLen = str.length

					for (let
							k =
							0; k <
						6 - nLen; k++) {

						// console.log(k)

						str =
							" " + str;

					}



					str =
						chalk.yellowBright(str.toUpperCase()) +
						" | "

					for (let
							b =
							0; b <
						coinPriceArr.length; b++) {

						// if (tmpLast) {



						// console.log(Number(Arr[i][b]))

						// console.log(Number(tmpLast[i][b]))

						// }

						if (tmpLast &&
							Number(tmpLast[i][b]) <
							Number(Arr[i][b])) {

							// consolesß.log("111")

							str +=
								chalk.greenBright(Arr[i][b]) +
								" | ";

						} else
						if (tmpLast &&
							Number(tmpLast[i][b]) >
							Number(Arr[i][b])) {

							str +=
								chalk.red(Arr[i][b]) +
								" | ";

						} else {

							str +=
								chalk.white(Arr[i][b]) +
								" | ";

						}

					}

					console.log(str)

					// }

				}


				lastArr =
					Arr;

				Arr = [];


				// console.log(coinArr)

				console.log("\n")

			}



		}, time_interval);

	};





scheduleCronstyle();