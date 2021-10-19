function redo(cells, undoStorage) {
    if (undoStorage.length > 0) {
        cells.push(undoStorage.pop());
    }
    if (undoStorage.length === 0) {
        document.querySelector('.redo-btn').disabled = true;
    }
    document.querySelector('.undo-btn').disabled = false;
}

export {redo};