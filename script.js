let timeSlotAmount;

let eventProperties = {
	event_name: "",
	data: ""
};
let eventPropertiesReturn;

function doctra_call(functionName, data) {
	switch (functionName) {
		case "update_cells":
			update_cells(data);
			break;
		default:
			break;
	}
}

const update_cells = (jsonString) => {
	let json = JSON.parse(jsonString);
	if (json.text_only) {
		showError(json.text_only);
	} else {
		if (json.type_week) {
			update_cells_week(json);
		} else {
			update_cells_month(json);
		}
	}
};

const showError = (text) => {
	document.body.innerHTML = "";

	let error = document.createElement("div");
	error.className = "error";
	document.body.appendChild(error);

	let errorText = document.createElement("h1");
	errorText.innerHTML = text;
	error.appendChild(errorText);
};

// week script start

const update_cells_week = (json) => {
	if (json.redraw) {
		prepareWeekDom(json);
		let grid = prepareWeekGrid(json);
		generateWeekCards(grid);
	} else {
		json.data.forEach((element) => {
			let modifiedElement = {
				Ид: element.ДатаНачала,
				...element,
			};
			addWeekCard(undefined, modifiedElement);
		});
	}
};

const generateWeekCards = (grid) => {
	let timeSlotNomer = 1;
	let bodyContentColumn;

	Object.entries(grid).forEach((entry) => {
		const [key, element] = entry;

		if (timeSlotNomer === 1) {
			bodyContentColumn = document.createElement("div");
			bodyContentColumn.classList.add("body-content-column");
			bodyContent.appendChild(bodyContentColumn);
		}

		// let weekBlock = document.createElement("div");
		// weekBlock.classList.add("week-block");
		// weekBlock.innerHTML = element["Ид"];
		// bodyContentColumn.appendChild(weekBlock);

		addWeekCard(bodyContentColumn, element);

		if (timeSlotNomer == timeSlotAmount) {
			timeSlotNomer = 1;
		} else {
			timeSlotNomer++;
		}

		// addWeekCard(element);
	});
};

const addWeekCard = (parent, element) => {
	
	let existingObject = document.getElementById("block_" + element["Ид"]);

	let weekBlock = document.createElement("div");
	weekBlock.classList.add("week-block");
	// weekBlock.innerHTML = "1";
	weekBlock.id = "block_" + element["Ид"];
	if (existingObject) {
		existingObject.parentElement.insertBefore(weekBlock, existingObject);
		existingObject.parentElement.removeChild(existingObject);
	} else {
		parent.appendChild(weekBlock);
	}

	//back
	let weekBlockBack = document.createElement("div");
	weekBlockBack.classList.add("week-block-height-100");
	weekBlock.appendChild(weekBlockBack);

	if (!element["Бригада"]) {
		weekBlockBack.classList.add("week-block-disabled");
		return;
	}

	let divHeight =
		element["ВодительЕстьГрафик"] && element["ФлеботомистЕстьГрафик"]
			? "50"
			: "100";
	if (element["ВодительЕстьГрафик"]) {
		let weekBlockBack1 = document.createElement("div");
		weekBlockBack1.classList.add("week-block-height-" + divHeight);
		weekBlockBack1.style.backgroundColor = element["ВодительЦветГрафика"];
		weekBlockBack.appendChild(weekBlockBack1);
	}

	if (element["ФлеботомистЕстьГрафик"]) {
		let weekBlockBack2 = document.createElement("div");
		weekBlockBack2.classList.add("week-block-height-" + divHeight);
		weekBlockBack2.style.backgroundColor = element["ФлеботомистЦветГрафика"];
		weekBlockBack.appendChild(weekBlockBack2);
	}

	if (
		element["Водитель"] ||
		element["Флеботомист1"] ||
		element["Флеботомист2"]
	) {
		//content
		let weekBlockContent = document.createElement("div");
		weekBlockContent.classList.add("week-block-content");
		weekBlock.appendChild(weekBlockContent);

		let weekBlockContentCard = document.createElement("div");
		weekBlockContentCard.classList.add("week-block-content-card");
		weekBlockContent.appendChild(weekBlockContentCard);

		if (element["Водитель"]) {
			// content row 1
			let weekBlockContentCardRow1 = document.createElement("div");
			weekBlockContentCardRow1.classList.add("week-block-content-card-row");
			weekBlockContentCard.appendChild(weekBlockContentCardRow1);

			let weekBlockContentCardRow1Span = document.createElement("span");
			weekBlockContentCardRow1Span.classList.add("week-block-content-card-img");
			weekBlockContentCardRow1.appendChild(weekBlockContentCardRow1Span);

			let weekBlockContentCardRow1SpanImg = document.createElement("img");
			weekBlockContentCardRow1SpanImg.src = "assets/driver.svg";
			weekBlockContentCardRow1Span.appendChild(weekBlockContentCardRow1SpanImg);

			let weekBlockContentCardRow1SpanText = document.createElement("span");
			weekBlockContentCardRow1SpanText.classList.add(
				"week-block-content-card-text"
			);
			weekBlockContentCardRow1SpanText.innerHTML = element["Водитель"];
			weekBlockContentCardRow1.appendChild(weekBlockContentCardRow1SpanText);
		}

		if (element["Флеботомист1"]) {
			// content row 1
			let weekBlockContentCardRow2 = document.createElement("div");
			weekBlockContentCardRow2.classList.add("week-block-content-card-row");
			weekBlockContentCard.appendChild(weekBlockContentCardRow2);

			let weekBlockContentCardRow2Span = document.createElement("span");
			weekBlockContentCardRow2Span.classList.add("week-block-content-card-img");
			weekBlockContentCardRow2.appendChild(weekBlockContentCardRow2Span);

			let weekBlockContentCardRow2SpanImg = document.createElement("img");
			weekBlockContentCardRow2SpanImg.src = "assets/doctor.svg";
			weekBlockContentCardRow2Span.appendChild(weekBlockContentCardRow2SpanImg);

			let weekBlockContentCardRow2SpanText = document.createElement("span");
			weekBlockContentCardRow2SpanText.classList.add(
				"week-block-content-card-text"
			);
			weekBlockContentCardRow2SpanText.innerHTML = element["Флеботомист1"];
			weekBlockContentCardRow2.appendChild(weekBlockContentCardRow2SpanText);
		}

		if (element["Флеботомист2"]) {
			// content row 1
			let weekBlockContentCardRow3 = document.createElement("div");
			weekBlockContentCardRow3.classList.add("week-block-content-card-row");
			weekBlockContentCard.appendChild(weekBlockContentCardRow3);

			let weekBlockContentCardRow3Span = document.createElement("span");
			weekBlockContentCardRow3Span.classList.add("week-block-content-card-img");
			weekBlockContentCardRow3.appendChild(weekBlockContentCardRow3Span);

			let weekBlockContentCardRow3SpanImg = document.createElement("img");
			weekBlockContentCardRow3SpanImg.src = "assets/doctor2.svg";
			weekBlockContentCardRow3Span.appendChild(weekBlockContentCardRow3SpanImg);

			let weekBlockContentCardRow3SpanText = document.createElement("span");
			weekBlockContentCardRow3SpanText.classList.add(
				"week-block-content-card-text"
			);
			weekBlockContentCardRow3SpanText.innerHTML = element["Флеботомист2"];
			weekBlockContentCardRow3.appendChild(weekBlockContentCardRow3SpanText);
		}
	}

	//back
	let weekBlockSelector = document.createElement("div");
	weekBlockSelector.id = element["Ид"];
	
	weekBlockSelector.classList.add("week-block-selector");
	if (element["Пометка"]){
		weekBlockSelector.classList.add("week-block-selector-selected");
		selection.select(weekBlockSelector);
	}
	weekBlockSelector.addEventListener("click", weekBlockOnClick);
	weekBlock.appendChild(weekBlockSelector);
};

const prepareWeekDom = (json) => {

	let innerHTML = '<div class="main-table">';
	innerHTML += '	<div class="main-table-row-head">';
	innerHTML += '		<div class="main-table-row-head-left"></div>';
	innerHTML += '		<div class="main-table-row-head-content">';
	innerHTML += '			<div class="main-table-row-head-content-flex" id="headContent"></div>';
	innerHTML += '		</div>';
	innerHTML += '	</div>';
	innerHTML += '	<div class="main-table-row-body">';
	innerHTML += '		<div class="main-table-row-body-left">';
	innerHTML += '			<div class="main-table-row-body-left-flex" id="bodyLeft"></div>';
	innerHTML += '		</div>';
	innerHTML += '		<div class="main-table-row-body-content">';
	innerHTML += '			<div class="body-content" id="bodyContent">';
	innerHTML += '			</div>';
	innerHTML += '		</div>';
	innerHTML += '	</div>';
	innerHTML += '</div><button id="clickButton" style="display: none"></button>';
	document.body.innerHTML = innerHTML;

	let date = new Date(json.start_date + "Z");
	let end_date = new Date(json.end_date + "Z");
	while (date <= end_date) {
		let headDate = document.createElement("div");
		headDate.classList.add("week-head-block");
		headDate.addEventListener('click', weekHeadBlockClick);
		headDate.innerHTML =
			date.getUTCDate() +
			" " +
			getMonthShortText(date.getUTCMonth()) +
			" " +
			date.getUTCFullYear() + 
			" " + 
			getDayShortText(date.getUTCDay());
		console.log(date.getUTCDay());
		headContent.appendChild(headDate);
		date = addDays(date, 1);
	}

	let time = new Date(json.start_time + "Z");
	let end_time = new Date(json.end_time + "Z");
	while (time <= end_time) {
		let headtime = document.createElement("div");
		headtime.classList.add("week-time-block");
		headtime.innerHTML =
			time.getUTCHours() +
			":" +
			(time.getUTCMinutes() < 10 ? "0" : "") +
			time.getUTCMinutes();
		bodyLeft.appendChild(headtime);
		time = addMinutes(time, 30);
	}
};

const prepareWeekGrid = (json) => {
	let grid = {};

	let date = new Date(json.start_date + "Z");
	let end_date = new Date(json.end_date + "Z");
	while (date <= end_date) {
		let time = new Date(json.start_time + "Z");
		let end_time = new Date(json.end_time + "Z");

		timeSlotAmount = 0;
		while (time <= end_time) {
			let id = getIDFormatDateTime(date, time);
			grid[id] = { Ид: id };

			time = addMinutes(time, 30);
			timeSlotAmount++;
		}
		date = addDays(date, 1);
	}

	json.data.forEach((element) => {
		grid[element["ДатаНачала"]] = {
			Ид: element["ДатаНачала"],
			...element,
		};
	});

	return grid;
};

const addMinutes = (date, minutes) => {
	return new Date(date.getTime() + minutes * 60000);
};

const getDayShortText = (text) => {
	switch (text) {
		case 1:
			return "ორ";
		case 2:
			return "სამ";
		case 3:
			return "ოთხ";
		case 4:
			return "ხუთ";
		case 5:
			return "პარ";
		case 6:
			return "შაბ";
		case 0:
			return "კვ";
	}
};

const getMonthShortText = (text) => {
	switch (text) {
		case 0:
			return "იან";
		case 1:
			return "თებ";
		case 2:
			return "მარ";
		case 3:
			return "აპრ";
		case 4:
			return "მაი";
		case 5:
			return "ივნ";
		case 6:
			return "ივლ";
		case 7:
			return "აგვ";
		case 8:
			return "სექ";
		case 9:
			return "ოქტ";
		case 10:
			return "ნოე";
		case 11:
			return "დეკ";
	}
};

const getMonthShortTextFromString = (text) => {
	switch (text) {
		case "01":
			return "იან";
		case "02":
			return "თებ";
		case "03":
			return "მარ";
		case "04":
			return "აპრ";
		case "05":
			return "მაი";
		case "06":
			return "ივნ";
		case "07":
			return "ივლ";
		case "08":
			return "აგვ";
		case "09":
			return "სექ";
		case "10":
			return "ოქტ";
		case "11":
			return "ნოე";
		case "12":
			return "დეკ";
	}
};

function getIDFormatDateTime(date, time) {
	return (
		String(date.getUTCFullYear()).substring(0, 4) +
		"-" +
		(date.getUTCMonth() + 1 < 10 ? "0" : "") +
		(date.getUTCMonth() + 1) +
		"-" +
		(date.getUTCDate() < 10 ? "0" : "") +
		date.getUTCDate() +
		"T" +
		(time.getUTCHours() < 10 ? "0" : "") +
		time.getUTCHours() +
		":" +
		(time.getUTCMinutes() < 10 ? "0" : "") +
		time.getUTCMinutes() +
		":" +
		(time.getUTCSeconds() < 10 ? "0" : "") +
		time.getUTCSeconds()
	);
}

const weekBlockOnClick = (event) => {
	// let eventName = "";
	// if (event.target.classList.contains("week-block-selector-selected")) {
	// 	event.target.classList.remove("week-block-selector-selected");
	// 	eventName = "unselect_cells";
	// } else {
	// 	event.target.classList.add("week-block-selector-selected");
	// 	eventName = "select_cells";
	// }

	// weekBlockSendEventClick(eventName, event.target.id);
};

const weekBlockSendEventClick = (eventName, idArray) => {
	let idText = '';
	idArray.forEach((el) => {
		idText += (idText==='' ? '' : ',') + '"' + el + '"';
	});

	eventProperties = {
		event_name: eventName,
		data: '[' + idText + ']',
	};
	clickButton.click();
};

const weekHeadBlockClick = (e) => {
	let idArray = [];

	let index = Array.from(e.target.parentElement.children).indexOf(e.target);
	Array.from(bodyContent.children[index].children).forEach(element => {
		let selectionBlock = element.lastChild;
		if (selectionBlock.classList.contains('week-block-selector')){
			selectionBlock.classList.add("week-block-selector-selected");
			selection.select(selectionBlock);
			idArray.push(selectionBlock.id);
		}
	});
	
	if (idArray.length != 0) {
		weekBlockSendEventClick("select_cells", idArray);
	}
}

// week script end

// month script start
const update_cells_month = (json) => {
	if (json.redraw) {
		prepareMonthDom();
		let grid = prepareMonthGrid(json);
		Object.entries(grid).forEach((entry) => {
			const [key, element] = entry;
			addMonthCard(element);
		});
	} else {
		json.data.forEach((element) => {
			let date = new Date(element.ДатаНачала + "Z");
			let modifiedElement = {
				Число: date.getUTCDate(),
				Ид: date.toJSON().substring(0, 19),
				...element,
			};
			addMonthCard(modifiedElement);
		});
	}
};

const addMonthCard = (element) => {
	let existingObject = document.getElementById("block_" + element["Ид"]);

	let monthBlock = document.createElement("div");
	monthBlock.classList.add("month-block");
	monthBlock.id = "block_" + element["Ид"];
	if (existingObject) {
		grid.insertBefore(monthBlock, existingObject);
		grid.removeChild(existingObject);
	} else {
		grid.appendChild(monthBlock);
	}

	//back
	let monthBlockBack = document.createElement("div");
	monthBlockBack.classList.add("month-block-height-100");
	monthBlock.appendChild(monthBlockBack);

	//date
	let monthBlockDate = document.createElement("div");
	monthBlockDate.classList.add("month-block-date");
	monthBlockDate.innerHTML = element["Число"];
	monthBlock.appendChild(monthBlockDate);

	if (!element["Бригада"]) {
		monthBlockBack.classList.add("month-block-disabled");
		return;
	}

	let divHeight =
		element["ВодительЕстьГрафик"] && element["ФлеботомистЕстьГрафик"]
			? "50"
			: "100";
	if (element["ВодительЕстьГрафик"]) {
		let monthBlockBack1 = document.createElement("div");
		monthBlockBack1.classList.add("month-block-height-" + divHeight);
		monthBlockBack1.style.backgroundColor = element["ВодительЦветГрафика"];
		monthBlockBack.appendChild(monthBlockBack1);
	}

	if (element["ФлеботомистЕстьГрафик"]) {
		let monthBlockBack2 = document.createElement("div");
		monthBlockBack2.classList.add("month-block-height-" + divHeight);
		monthBlockBack2.style.backgroundColor = element["ФлеботомистЦветГрафика"];
		monthBlockBack.appendChild(monthBlockBack2);
	}

	if (
		element["Водитель"] ||
		element["Флеботомист1"] ||
		element["Флеботомист2"]
	) {
		//content
		let monthBlockContent = document.createElement("div");
		monthBlockContent.classList.add("month-block-content");
		monthBlock.appendChild(monthBlockContent);

		let monthBlockContentCard = document.createElement("div");
		monthBlockContentCard.classList.add("month-block-content-card");
		monthBlockContent.appendChild(monthBlockContentCard);

		if (element["Водитель"]) {
			// content row 1
			let monthBlockContentCardRow1 = document.createElement("div");
			monthBlockContentCardRow1.classList.add("month-block-content-card-row");
			monthBlockContentCard.appendChild(monthBlockContentCardRow1);

			let monthBlockContentCardRow1Span = document.createElement("span");
			monthBlockContentCardRow1Span.classList.add(
				"month-block-content-card-img"
			);
			monthBlockContentCardRow1.appendChild(monthBlockContentCardRow1Span);

			let monthBlockContentCardRow1SpanImg = document.createElement("img");
			monthBlockContentCardRow1SpanImg.src = "assets/driver.svg";
			monthBlockContentCardRow1Span.appendChild(
				monthBlockContentCardRow1SpanImg
			);

			let monthBlockContentCardRow1SpanText = document.createElement("span");
			monthBlockContentCardRow1SpanText.classList.add(
				"month-block-content-card-text"
			);
			monthBlockContentCardRow1SpanText.innerHTML = element["Водитель"];
			monthBlockContentCardRow1.appendChild(monthBlockContentCardRow1SpanText);
		}

		if (element["Флеботомист1"]) {
			// content row 1
			let monthBlockContentCardRow2 = document.createElement("div");
			monthBlockContentCardRow2.classList.add("month-block-content-card-row");
			monthBlockContentCard.appendChild(monthBlockContentCardRow2);

			let monthBlockContentCardRow2Span = document.createElement("span");
			monthBlockContentCardRow2Span.classList.add(
				"month-block-content-card-img"
			);
			monthBlockContentCardRow2.appendChild(monthBlockContentCardRow2Span);

			let monthBlockContentCardRow2SpanImg = document.createElement("img");
			monthBlockContentCardRow2SpanImg.src = "assets/doctor.svg";
			monthBlockContentCardRow2Span.appendChild(
				monthBlockContentCardRow2SpanImg
			);

			let monthBlockContentCardRow2SpanText = document.createElement("span");
			monthBlockContentCardRow2SpanText.classList.add(
				"month-block-content-card-text"
			);
			monthBlockContentCardRow2SpanText.innerHTML = element["Флеботомист1"];
			monthBlockContentCardRow2.appendChild(monthBlockContentCardRow2SpanText);
		}

		if (element["Флеботомист2"]) {
			// content row 1
			let monthBlockContentCardRow3 = document.createElement("div");
			monthBlockContentCardRow3.classList.add("month-block-content-card-row");
			monthBlockContentCard.appendChild(monthBlockContentCardRow3);

			let monthBlockContentCardRow3Span = document.createElement("span");
			monthBlockContentCardRow3Span.classList.add(
				"month-block-content-card-img"
			);
			monthBlockContentCardRow3.appendChild(monthBlockContentCardRow3Span);

			let monthBlockContentCardRow3SpanImg = document.createElement("img");
			monthBlockContentCardRow3SpanImg.src = "assets/doctor2.svg";
			monthBlockContentCardRow3Span.appendChild(
				monthBlockContentCardRow3SpanImg
			);

			let monthBlockContentCardRow3SpanText = document.createElement("span");
			monthBlockContentCardRow3SpanText.classList.add(
				"month-block-content-card-text"
			);
			monthBlockContentCardRow3SpanText.innerHTML = element["Флеботомист2"];
			monthBlockContentCardRow3.appendChild(monthBlockContentCardRow3SpanText);
		}
	}

	//back
	let monthBlockSelector = document.createElement("div");
	monthBlockSelector.id = element["Ид"];
	monthBlockSelector.classList.add("month-block-selector");
	if (element["Пометка"]){
		monthBlockSelector.classList.add("month-block-selector-selected");
		selectionMonth.select(monthBlockSelector);
	}
	monthBlockSelector.addEventListener("click", monthBlockOnClick);
	monthBlock.appendChild(monthBlockSelector);
};

const prepareMonthDom = () => {
	document.body.innerHTML = "";

	let grid = document.createElement("div");
	grid.className = "month-grid";
	grid.id = "grid";
	document.body.appendChild(grid);

	let day1 = document.createElement("div");
	day1.className = "month-header";
	day1.innerHTML = "ორშაბათი";
	grid.appendChild(day1);

	let day2 = document.createElement("div");
	day2.className = "month-header";
	day2.innerHTML = "სამშაბათი";
	grid.appendChild(day2);

	let day3 = document.createElement("div");
	day3.className = "month-header";
	day3.innerHTML = "ოთხშაბათი";
	grid.appendChild(day3);

	let day4 = document.createElement("div");
	day4.className = "month-header";
	day4.innerHTML = "ხუთშაბათი";
	grid.appendChild(day4);

	let day5 = document.createElement("div");
	day5.className = "month-header";
	day5.innerHTML = "პარასკევი";
	grid.appendChild(day5);

	let day6 = document.createElement("div");
	day6.className = "month-header";
	day6.innerHTML = "შაბათი";
	grid.appendChild(day6);

	let day7 = document.createElement("div");
	day7.className = "month-header";
	day7.innerHTML = "კვირა";
	grid.appendChild(day7);

	let button = document.createElement("button");
	button.style.display = "none";
	button.id = "clickButton";
	document.body.appendChild(button);
};

const prepareMonthGrid = (json) => {
	let grid = {};

	let date = new Date(json.start_date + "Z");
	let end_date = new Date(json.end_date + "Z");
	while (date <= end_date) {
		grid[getDateFormat(date)] = {
			Число: date.getUTCDate(),
			Ид: date.toJSON().substring(0, 19),
		};
		date = addDays(date, 1);
	}

	json.data.forEach((element) => {
		let date = new Date(element.ДатаНачала + "Z");
		grid[getDateFormat(date)] = {
			Число: date.getUTCDate(),
			Ид: date.toJSON().substring(0, 19),
			...element,
		};
	});

	return grid;
};

const addDays = (date, days) => {
	return new Date(date.getTime() + days * 24 * 60 * 60000);
};

const getDateFormat = (date) => {
	return (
		String(date.getUTCFullYear()).substring(2, 4) +
		(date.getUTCMonth() + 1 < 10 ? "0" : "") +
		(date.getUTCMonth() + 1) +
		(date.getUTCDate() < 10 ? "0" : "") +
		date.getUTCDate()
	);
};

const monthBlockOnClick = (event) => {
	// let eventName = "";
	// if (event.target.classList.contains("month-block-selector-selected")) {
	// 	event.target.classList.remove("month-block-selector-selected");
	// 	eventName = "unselect_cells";
	// } else {
	// 	event.target.classList.add("month-block-selector-selected");
	// 	eventName = "select_cells";
	// }

	// monthBlockSendEventClick(eventName, event.target.id);
};

const monthBlockSendEventClick = (eventName, id) => {
	eventProperties = {
		event_name: eventName,
		data: '["' + id + '"]',
	};
	clickButton.click();
};

// month script end


function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	};
	rawFile.send(null);
}



function getEventProperties() {

	eventPropertiesReturn = eventProperties;
	eventProperties = {
		event_name: "",
		data: ""
	};

	return eventPropertiesReturn;
}