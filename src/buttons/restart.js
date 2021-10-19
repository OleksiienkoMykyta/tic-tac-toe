function restart(cells, undoStorage, field, quantityOfCells) {
    localStorage.clear();
    for (let i = 0; i < quantityOfCells; i += 1) {
        document.querySelector(`#c-${[i]}`).className = 'cell';
    }
    if (document.querySelector('.won-message').childNodes[0] instanceof Text) {
        document.querySelector('.won-message').childNodes[0].remove();
        document.querySelector('.won-title').classList.add('hidden');
    }
    document.querySelector('.undo-btn').disabled = true;
    document.querySelector('.redo-btn').disabled = true;
}

export {restart};