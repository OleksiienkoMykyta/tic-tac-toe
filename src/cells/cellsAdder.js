function cellsAdder(arr, eventTarg, cellVal) {
    arr.push({
        idVal: eventTarg.id,
        fieldVal: cellVal,
    });
}

export {cellsAdder};