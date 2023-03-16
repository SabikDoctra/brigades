const selection = new SelectionArea({
	selectables: [".body-content .week-block-selector"],
	boundaries: [".body-content"],
});

selection
	.on("beforestart", (evt) => {
		const allowedButtons = [1];
		if (
			!evt.store.selected.includes(evt.event.target) &&
			!evt.store.selected.includes(evt.event.target.parentElement)
		) {
			allowedButtons.push(2);
		}

		return allowedButtons.includes(evt.event.buttons);
	})
	.on("start", (evt) => {
		if (
			!evt.event.ctrlKey &&
			!evt.event.metaKey &&
			(evt.event.button != 2 ||
				(evt.event.button == 2 && evt.store.selected.length == 1))
		) {
			let idArray = [];
			for (const el of evt.store.stored) {
				el.classList.remove("week-block-selector-selected");
				idArray.push(el.id);
			}
			selection.clearSelection();

			weekBlockSendEventClick("unselect_cells", idArray);
		}
	})
	.on("move", (evt) => {
		let idArray = [];
		for (const el of evt.store.changed.added) {
			idArray.push(el.id);
			el.classList.add("week-block-selector-selected");
		}
		if (idArray.length != 0) {
			weekBlockSendEventClick("select_cells", idArray);
		}

		idArray = [];
		for (const el of evt.store.changed.removed) {
			idArray.push(el.id);
			el.classList.remove("week-block-selector-selected");
		}
		if (idArray.length != 0) {
			weekBlockSendEventClick("unselect_cells", idArray);
		}
	});

const selectionMonth = new SelectionArea({
	selectables: [".month-grid .month-block-selector"],
	boundaries: [".month-grid"],
});

selectionMonth
	.on("beforestart", (evt) => {
		const allowedButtons = [1];
		if (
			!evt.store.selected.includes(evt.event.target) &&
			!evt.store.selected.includes(evt.event.target.parentElement)
		) {
			allowedButtons.push(2);
		}

		return allowedButtons.includes(evt.event.buttons);
	})
	.on("start", (evt) => {
		if (
			!evt.event.ctrlKey &&
			!evt.event.metaKey &&
			(evt.event.button != 2 ||
				(evt.event.button == 2 && evt.store.selected.length == 1))
		) {
			let idArray = [];
			for (const el of evt.store.stored) {
				el.classList.remove("month-block-selector-selected");
				idArray.push(el.id);
			}
			selectionMonth.clearSelection();

			weekBlockSendEventClick("unselect_cells", idArray);
		}
	})
	.on("move", (evt) => {
		let idArray = [];
		for (const el of evt.store.changed.added) {
			idArray.push(el.id);
			el.classList.add("month-block-selector-selected");
		}
		if (idArray.length != 0) {
			weekBlockSendEventClick("select_cells", idArray);
		}

		idArray = [];
		for (const el of evt.store.changed.removed) {
			idArray.push(el.id);
			el.classList.remove("month-block-selector-selected");
		}
		if (idArray.length != 0) {
			weekBlockSendEventClick("unselect_cells", idArray);
		}
	});

