import "../component/header-image.js";
import "../component/singgle-data.js";
import "../component/daily-summary.js";
import "../component/data-tables.js";
import "../component/app-footer.js";
import moment from "moment";
import DataSource from '../data/data-source.js';

const main = _ => {
	headerImage();
	worldData();
	singgleData();
	dailySummary();
};


const headerImage = _ => {
	const searchElement = document.querySelector("header-image");

	const onButtonSearchClicked = _ => {
		singgleData(searchElement.value);
		dailySummary(searchElement.value);
	};

	const onButtonRefreshClicked = _ => {
		searchElement.refresh = "";
	}

	searchElement.clickEvent = onButtonSearchClicked;
	searchElement.refreshInput = onButtonRefreshClicked;
}


const worldData = _ => {
	const headerImage = document.querySelector("header-image");

	const getWorldData = async _ => {
		try {
			const result = await DataSource.worldData();
			renderResult(result);
		} catch (message) {
			fallbackResult(message)
		}
	};

	const getAllCountryName = async _ => {
		try {
			const result = await DataSource.getAllCountryName();
			renderResultAllCountry(result);
		} catch (message) {
			fallbackResult(message)
		}
	};

	const renderResult = results => {
		headerImage.data = results;
	};

	const renderResultAllCountry = results => {
		headerImage.allCountry = results;
	};

	const fallbackResult = message => {
		headerImage.renderError(message);
	};

	getWorldData();
	getAllCountryName();
}


const singgleData = (country = "Indonesia") => {
	const singgleData = document.querySelector("singgle-data");

	const getCountry = async _ => {
		try {
			const result = await DataSource.searchCountry(country);
			result.country = country;
			renderResult(result);
		} catch (message) {
			fallbackResult(message)
		}
	};

	const renderResult = results => {
		results.active = results.confirmed.value - results.recovered.value - results.deaths.value;
		results.percentageActive = results.active / results.confirmed.value * 100;
		results.percentageRecovered = results.recovered.value / results.confirmed.value * 100;
		results.percentageDeaths = results.deaths.value / results.confirmed.value * 100;
		singgleData.data = results;
	};

	const fallbackResult = message => {
		singgleData.renderError(message);
	};

	getCountry();
}


const dailySummary = (country = "Indonesia") => {
	const getDates = (startDate, stopDate) => {
		var dateArray = [];
		var currentDate = moment(startDate, "MM-DD-YYYY");
		var stopDate = moment(stopDate, "MM-DD-YYYY");
		while (currentDate <= stopDate) {
			dateArray.push(moment(currentDate).format('MM-DD-YYYY'))
			currentDate = moment(currentDate).add(1, 'days');
		}
		return dateArray;
	}

	const compare = (a, b) => {
		if (a.lastUpdate < b.lastUpdate) {
			return -1;
		}
		if (a.lastUpdate > b.lastUpdate) {
			return 1;
		}
		return 0;
	}

	const getAllCountryByDate = async _ => {
		let arrCountryByDate = [];

		try {
			const resultName = await DataSource.getAllCountryName();
			await Promise.all(rangeDate.map(async (date) => {
				const resultByDate = await DataSource.getAllCountryByDate(date);
				arrCountryByDate.push(resultByDate);
			}));
			renderResult(resultName, arrCountryByDate);
		} catch (message) {
			fallbackResult(message);
		}
	};

	const makeLineChart = (resultName, arrCountryByDate) => {
		const selectedCountry = {
			countryRegion: null,
			confirmed: [],
			recovered: [],
			deaths: [],
			lastUpdate: []
		}

		let arrResultName = [];
		resultName.countries.forEach(function (resultName) {
			arrResultName.push(resultName.name);
		});

		let temp = [];
		arrCountryByDate.forEach(function (arrCountryByDate) {
			let tempSelectedCountry = arrCountryByDate.find(o => o.countryRegion === country);
			temp.push(tempSelectedCountry);
		})

		let sortedSelectedCountry = temp.sort(compare);
		sortedSelectedCountry.forEach(function (eachDay) {
			if (eachDay !== undefined) {
				selectedCountry.countryRegion = eachDay.countryRegion;
				selectedCountry.confirmed.push(eachDay.confirmed);
				selectedCountry.recovered.push(eachDay.recovered);
				selectedCountry.deaths.push(eachDay.deaths);
				selectedCountry.lastUpdate.push(moment(eachDay.lastUpdate.slice(0, 10), 'YYYY-MM-DD').format('DD MMMM'));
			}
		});

		let allCountry = [];
		arrResultName.forEach(function (resultName) {
			let temp = [];
			arrCountryByDate.forEach(function (arrCountryByDate) {
				let tempAllCountry = arrCountryByDate.find(o => o.countryRegion === resultName);
				temp.push(tempAllCountry);
			});
			let sortedAllCountry = temp.sort(compare);
			allCountry.push(sortedAllCountry);
		});

		dailySummaryElement.data = selectedCountry;
	}

	const renderResult = (resultsByDate, resultsName) => {
		makeLineChart(resultsByDate, resultsName);
	};

	const fallbackResult = results => {
		console.log(results)
	};

	const dailySummaryElement = document.querySelector("daily-summary");

	const fromDate = moment().add(-30, 'days').format("MM-DD-YYYY");
	const toDate = moment().format("MM-DD-YYYY");
	const rangeDate = getDates(fromDate, toDate);

	getAllCountryByDate();
}

export default main;