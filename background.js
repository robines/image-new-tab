browser.contextMenus.create({
	id: "image-new-tab",
	title: "Open Image in New Tab",
	contexts: ["image"]
});

const STORAGE = browser.storage.sync;

browser.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "image-new-tab") {
		var background, nextto;

		var optionsGet = STORAGE.get(["background", "nextto"]);
		optionsGet.then((result) => {
			background = result.background;
			nextto = result.nextto;

			var params = {
				url: info.srcUrl,
				active: !background
			};
			if (nextto) {
				params["index"] = tab.index + 1;
			}
			var creating = browser.tabs.create(params);
		});
	}
});
