function app() {
    let cells = [];
    let undoStorage = [];
    if (localStorage.getItem('cells') !== null) {
        getStorage();
    }

    function cellsDisable() {
        field.style.pointerEvents = 'none';

    }

    function getWinStatus(num1, num2, num3, winClass, textNode) {
        let inputNode = document.createTextNode(textNode);
        document.querySelector('.won-title').classList = 'won-title';
        document.querySelector('.won-message').appendChild(inputNode);
        document.querySelector(`#c-${num1}`).classList.add('win', `${winClass}`);
        document.querySelector(`#c-${num2}`).classList.add('win', `${winClass}`);
        document.querySelector(`#c-${num3}`).classList.add('win', `${winClass}`);
        document.createTextNode(textNode);
        cellsDisable();
    }

    function win() {
        let cellsArr = document.querySelectorAll('.cell');
        cellsArr = Array.from(cellsArr);
        cellsArr.sort((a, b) => {
            return cellsId(a) - cellsId(b);
        });
        let rowLength = Math.sqrt(cellsArr.length);

        function horizontalWin(cellsArr) {
            let horizontalWinner = true;
            for (let i = 0; i < cellsArr.length; i += rowLength) {
                let firstCellType = cellsType(cellsArr[i]); // Определяем доп. класс яцейки (сh - крестик, r - нолик, null - пусто)
                if (!firstCellType) { // Если первая ячейка ряда при вызове на ней функции cellsType будет равна null, то код дальше выполняться не будет, мы перейдем к следующей итерации цикла
                    continue;
                }
                for (let j = i; j < i + rowLength; j += 1) {
                    if (cellsType(cellsArr[j]) !== firstCellType) { // если доп. класс j ячейчи не соответствует классу первой ячейки в ряду, то прерываем выполнение вложеного цикла
                        horizontalWinner = false;
                        break;
                    }
                    if (j === i + rowLength - 1) {
                        for (let k = j; k >= i; k += - 1) {
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
                     }
                }
                if (horizontalWinner === true) {
                    return true;
                }
            }
        }
        // function verticalWin(cellsArr) {
        //     let verticalWinner = true;
        //     for (let i = 0; i < cellsArr.length; i += rowLength) {
        //         let firstCellType = cellsType(cellsArr[i]); // Определяем доп. класс яцейки (сh - крестик, r - нолик, null - пусто)
        //         if (!firstCellType) { // Если первая ячейка ряда при вызове на ней функции cellsType будет равна null, то код дальше выполняться не будет, мы перейдем к следующей итерации цикла
        //             continue;
        //         }
        //         for (let j = i; j < i + rowLength; j += 1) {
        //             if (cellsType(cellsArr[j]) !== firstCellType) { // если доп. класс j ячейчи не соответствует классу первой ячейки в ряду, то прерываем выполнение вложеного цикла
        //                 verticalWinner = false;
        //                 break;
        //             }
        //             if (j === i + rowLength - 1) {
        //                 for (let k = j; k >= i; k += - 1) {
        //                     document.querySelector(`#c-${[k]}`).classList.add(`${firstCellType}`, 'horizontal', 'win');
        //                     if (document.querySelector('.won-message').childNodes[0] instanceof Text) {
        //                         document.querySelector('.won-message').childNodes[0].remove();
        //                         document.querySelector('.won-title').classList.add('hidden');
        //                     }
        //                     if (firstCellType === 'ch') {
        //                         document.querySelector('.won-title').classList = 'won-title';
        //                         let textNodeCh = document.createTextNode('Crosses won!');
        //                         document.querySelector('.won-message').appendChild(textNodeCh);
        //                     }
        //                     if (firstCellType === 'r') {
        //                         document.querySelector('.won-title').classList = 'won-title';
        //                         let textNodeR = document.createTextNode('Toes won!');
        //                         document.querySelector('.won-message').appendChild(textNodeR);
        //                     }
        //                 }
        //              }
        //         }
        //         if (verticalWinner === true) {
        //             return true;
        //         }
        //     }
        // }
        //
        // verticalWin(cellsArr)

        horizontalWin(cellsArr);

        function cellsId(node) {
            let id = node.id.split('-')[1];
            return Number.parseInt(id);
        }

        function cellsType(cellsArr) {
            if (cellsArr.classList.contains('ch')) {
                return 'ch';
            }
            if (cellsArr.classList.contains('r')) {
                return 'r';
            }
            return  null;
        }

    }
    win();

    function setStorage() {
        localStorage.clear();
        const str = JSON.stringify(cells);
        localStorage.setItem('cells', str);
    }

    function getStorage() {
        const getStr = localStorage.getItem('cells');
        cells = JSON.parse(getStr);
        builder(cells);
        if (cells !== null) {
            undoSwitcher(cells.length);
        }
    }

    function cellsAdder(arr, eventTarg, cellVal) {
        arr.push({
            idVal: eventTarg.id,
            fieldVal: cellVal,
        });
    }

    function restart() {
        localStorage.clear();
        dump();
        cells = [];
        undoStorage = [];
        if (document.querySelector('.won-message').childNodes[0] instanceof Text) {
            document.querySelector('.won-message').childNodes[0].remove();
            document.querySelector('.won-title').classList.add('hidden');
        }
        document.querySelector('.undo-btn').disabled = true;
        document.querySelector('.redo-btn').disabled = true;
        field.style.pointerEvents = 'auto';
    }

    function dump() {
        for (let i = 0; i < 9; i += 1) {
            document.querySelector(`#c-${[i]}`).className = 'cell';
        }
    }

    function builder() {
        dump();

        if (cells !== null) {
            for (let i = 0; i < cells.length; i += 1) {
                if (cells[i].idVal === '') {
                    cells.pop();
                }
            }
            for (let i = 0; i < cells.length; i += 1) {
                document.querySelector(`#${cells[i].idVal}`).classList.add(`${cells[i].fieldVal}`);
            }
        }
    }

    function undo(cells) {
        if (cells.length > 0) {
            undoStorage.push(cells.pop());
        }
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

    function redo(undoStorage) {
        if (undoStorage.length > 0) {
            cells.push(undoStorage.pop());
        }
        if (undoStorage.length === 0) {
            document.querySelector('.redo-btn').disabled = true;
        }
        document.querySelector('.undo-btn').disabled = false;
    }

    function undoSwitcher(counter) {
        if (counter > 0) {
            document.querySelector('.undo-btn').disabled = false;
        } else {
            document.querySelector('.undo-btn').disabled = true;
        }
    }

    function redoSwitcher(counter) {
        if (counter > 0) {
            document.querySelector('.redo-btn').disabled = false;
        } else {
            document.querySelector('.redo-btn').disabled = true;
        }
    }

    field.addEventListener('click', (e) => {
        if (e.target.classList.contains('r') === false && e.target.classList.contains('ch') === false) {
            if (cells.length % 2 === 0) {
                cellsAdder(cells, e.target, 'ch')
            } else {
                cellsAdder(cells, e.target, 'r')
            }
        }
        builder(cells, e.target.id);
        setStorage();
        undoSwitcher(cells.length);
        win();
    });

    document.querySelector('.undo-btn').addEventListener('click', () => {
        undoSwitcher(cells.length);
        undo(cells);
        builder(cells);
        setStorage();
    })

    document.querySelector('.redo-btn').addEventListener('click', () => {
        redoSwitcher(undoStorage.length);
        redo(undoStorage);
        builder(cells);
        setStorage();
        win();
    })

    document.querySelector('.restart-btn').addEventListener('click', () => {
        restart();
    })

    window.addEventListener('storage', () => {
        getStorage();
        win();
    })
}

document.addEventListener('DOMContentLoaded', () => {
    app();
});
