"use strict";

const BACKGROUND_ID = "open-background";
const NEXTTO_ID = "open-next-to";

const STORAGE = browser.storage.sync;

function saveOptions(e) {
	STORAGE.set({
		background: document.getElementById(BACKGROUND_ID).checked,
		nextto: document.getElementById(NEXTTO_ID).checked
	});
}

function onError(err) {
	console.log("An error occurred: " + err);
}

function loadOptions() {
	var backgroundGet = STORAGE.get("background");
	backgroundGet.then((result) => {
		if (!("background" in result) || result.background) {
			document.getElementById(BACKGROUND_ID).checked = true;
		}
	}, onError);

	var nextToGet = STORAGE.get("nextto");
	nextToGet.then((result) => {
		if (!("nextto" in result) || result.nextto) {
			document.getElementById(NEXTTO_ID).checked = true;
		}
	}, onError);
}

var checkboxes = document.querySelectorAll("input[type='checkbox']");
for (var i = 0; i < checkboxes.length; i++) {
	checkboxes[i].addEventListener("change", saveOptions);
}

document.addEventListener("DOMContentLoaded", loadOptions);
