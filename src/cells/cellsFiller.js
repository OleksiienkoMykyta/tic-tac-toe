function builder(cells, num) {
    for (let i = 0; i < num; i += 1) {
        document.querySelector(`#c-${[i]}`).className = 'cell';
    }

    if (!cells) {
        return false;
    }
    for (let i = 0; i < cells.length; i += 1) {
        if (cells[i].idVal === '') {
            cells.pop();
        }
    }
    for (let i = 0; i < cells.length; i += 1) {
        document.querySelector(`#${cells[i].idVal}`).classList.add(`${cells[i].fieldVal}`);
    }
}

export {builder};