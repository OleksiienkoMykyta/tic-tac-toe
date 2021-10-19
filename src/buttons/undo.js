function undo(cells, field, undoStorage) {
    if (cells.length > 0) {
        undoStorage.push(cells.pop());
    }
    console.log(cells);
    console.log(undoStorage);
    if (document.querySelector('.won-message').childNodes[0] instanceof Text) {
        document.querySelector('.won-message').childNodes[0].remove();
        document.querySelector('.won-title').classList.add('hidden');
    }
    if (cells.length === 0) {
        document.querySelector('.undo-btn').disabled = true;
    }
    document.querySelector('.redo-btn').disabled = false;
    field.style.pointerEvents = 'auto';
}

export {undo};