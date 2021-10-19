function calculateWinner(cellsArr, field) {
    let rowLength = Math.sqrt(cellsArr.length);

    draw(cellsArr);

    leftDiagonalWin(cellsArr, field, rowLength);

    rightDiagonalWin(cellsArr, field, rowLength);

    verticalWin(cellsArr, field, rowLength);

    horizontalWin(cellsArr, field, rowLength);

}

function horizontalWin(cellsArr,field, rowLength) {
    for (let i = 0; i < cellsArr.length; i += rowLength) {
        let horizontalWinner = true;
        let firstCellType = cellsType(cellsArr[i]); // Определяем доп. класс яцейки (сh - крестик, r - нолик, null - пусто)
        if (!firstCellType) { // Если первая ячейка ряда при вызове на ней функции cellsType будет равна null, то код дальше выполняться не будет, мы перейдем к следующей итерации цикла
            continue;
        }
        for (let j = i; j < i + rowLength; j += 1) {
            if (cellsType(cellsArr[j]) !== firstCellType) { // если доп. класс j ячейчи не соответствует классу первой ячейки в ряду, то прерываем выполнение вложеного цикла
                horizontalWinner = false;
                break;
            }
        }
        if (horizontalWinner === true) {
            for (let k = i; k < i + rowLength; k += 1) {
                document.querySelector(`#c-${[k]}`).classList.add(`${firstCellType}`, 'horizontal', 'win');
                if (document.querySelector('.won-message').childNodes[0] instanceof Text) {
                    document.querySelector('.won-message').childNodes[0].remove();
                    document.querySelector('.won-title').classList.add('hidden');
                }
                if (firstCellType === 'ch') {
                    document.querySelector('.won-title').classList = 'won-title';
                    let textNodeCh = document.createTextNode('Crosses won!');
                    document.querySelector('.won-message').appendChild(textNodeCh);
                }
                if (firstCellType === 'r') {
                    document.querySelector('.won-title').classList = 'won-title';
                    let textNodeR = document.createTextNode('Toes won!');
                    document.querySelector('.won-message').appendChild(textNodeR);
                }
            }
            field.style.pointerEvents = 'none';
        }

        if (horizontalWinner === true) {
            return true;
        }
    }
}

function verticalWin(cellsArr, field, rowLength) {
    for (let i = 0; i < rowLength; i += 1) {
        let verticalWinner = true;
        let firstCellType = cellsType(cellsArr[i]); // Определяем доп. класс яцейки (сh - крестик, r - нолик, null - пусто)
        if (!firstCellType) { // Если первая ячейка ряда при вызове на ней функции cellsType будет равна null, то код дальше выполняться не будет, мы перейдем к следующей итерации цикла
            continue;
        }
        for (let j = i; j < cellsArr.length; j += rowLength) {
            if (firstCellType !== cellsType(cellsArr[j])) { // если доп. класс j ячейчи не соответствует классу первой ячейки в ряду, то прерываем выполнение вложеного цикла
                verticalWinner = false;
                break;
            }
        }

        if (verticalWinner === true) {
            for (let k = i; k < cellsArr.length; k += rowLength) {
                document.querySelector(`#c-${[k]}`).classList.add(`${firstCellType}`, 'vertical', 'win');
                if (document.querySelector('.won-message').childNodes[0] instanceof Text) {
                    document.querySelector('.won-message').childNodes[0].remove();
                    document.querySelector('.won-title').classList.add('hidden');
                }
                if (firstCellType === 'ch') {
                    document.querySelector('.won-title').classList = 'won-title';
                    let textNodeCh = document.createTextNode('Crosses won!');
                    document.querySelector('.won-message').appendChild(textNodeCh);
                }
                if (firstCellType === 'r') {
                    document.querySelector('.won-title').classList = 'won-title';
                    let textNodeR = document.createTextNode('Toes won!');
                    document.querySelector('.won-message').appendChild(textNodeR);
                }
            }
            field.style.pointerEvents = 'none';
        }
        if (verticalWinner === true) {
            return true;
        }
    }
}

function rightDiagonalWin(cellsArr, field, rowLength) {
    let rightDiagonalWinner = true;
    let firstCellType = cellsType(cellsArr[0]);
    for (let i = 0; i < cellsArr.length; i += rowLength + 1) {
        if (!firstCellType) {
            continue;
        }
        if (firstCellType !== cellsType(cellsArr[i])) { // если доп. класс j ячейчи не соответствует классу первой ячейки в ряду, то прерываем выполнение вложеного цикла
            rightDiagonalWinner = false;
            break;
        }
        if (i === cellsArr.length - 1) {
            for (let j = 0; j < cellsArr.length; j += rowLength + 1) {
                document.querySelector(`#c-${[j]}`).classList.add(`${firstCellType}`, 'diagonal-right', 'win');
                if (document.querySelector('.won-message').childNodes[0] instanceof Text) {
                    document.querySelector('.won-message').childNodes[0].remove();
                    document.querySelector('.won-title').classList.add('hidden');
                }
                if (firstCellType === 'ch') {
                    document.querySelector('.won-title').classList = 'won-title';
                    let textNodeCh = document.createTextNode('Crosses won!');
                    document.querySelector('.won-message').appendChild(textNodeCh);
                }
                if (firstCellType === 'r') {
                    document.querySelector('.won-title').classList = 'won-title';
                    let textNodeR = document.createTextNode('Toes won!');
                    document.querySelector('.won-message').appendChild(textNodeR);
                }
            }
            field.style.pointerEvents = 'none';
        }
    }
    if (rightDiagonalWinner === true) {
        return true;
    }
}

function leftDiagonalWin(cellsArr, field, rowLength) {
    let leftDiagonalWinner = true;
    let firstCellType = cellsType(cellsArr[rowLength - 1]);
    for (let i = rowLength - 1; i < cellsArr.length - 1; i += rowLength - 1) {
        if (!firstCellType) {
            continue;
        }
        if (firstCellType !== cellsType(cellsArr[i])) { // если доп. класс j ячейчи не соответствует классу первой ячейки в ряду, то прерываем выполнение вложеного цикла
            leftDiagonalWinner = false;
            break;
        }
        if (i === cellsArr.length - rowLength) {
            for (let j = rowLength - 1; j < cellsArr.length - 1; j += rowLength - 1) {
                document.querySelector(`#c-${[j]}`).classList.add(`${firstCellType}`, 'diagonal-left', 'win');
                if (document.querySelector('.won-message').childNodes[0] instanceof Text) {
                    document.querySelector('.won-message').childNodes[0].remove();
                    document.querySelector('.won-title').classList.add('hidden');
                }
                if (firstCellType === 'ch') {
                    document.querySelector('.won-title').classList = 'won-title';
                    let textNodeCh = document.createTextNode('Crosses won!');
                    document.querySelector('.won-message').appendChild(textNodeCh);
                }
                if (firstCellType === 'r') {
                    document.querySelector('.won-title').classList = 'won-title';
                    let textNodeR = document.createTextNode('Toes won!');
                    document.querySelector('.won-message').appendChild(textNodeR);
                }
            }
            field.style.pointerEvents = 'none';
        }
    }
    if (leftDiagonalWinner === true) {
        return true;
    }
}

function draw(cellsArr) {
    for (let i = 0; i < cellsArr.length; i += 1) {
        if (!cellsType(cellsArr[i]) || !cellsType(cellsArr[i])) {
            break;
        }
        if (i === cellsArr.length - 1) {
            if (document.querySelector('.won-message').childNodes[0] instanceof Text) {
                document.querySelector('.won-message').childNodes[0].remove();
                document.querySelector('.won-title').classList.add('hidden');
            }
            document.querySelector('.won-title').classList = 'won-title';
            let textNodeR = document.createTextNode('It\'s a draw!');
            document.querySelector('.won-message').appendChild(textNodeR);
        }

    }
}

function cellsType(cellsArr) {
    if (cellsArr.classList.contains('ch')) {
        return 'ch';
    }
    if (cellsArr.classList.contains('r')) {
        return 'r';
    }
    return null;
}

export { calculateWinner };