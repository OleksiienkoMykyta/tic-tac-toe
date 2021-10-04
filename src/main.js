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
        let cellsArr = [document.querySelector('#c-0'), document.querySelector('#c-1'), document.querySelector('#c-2'), document.querySelector('#c-3'), document.querySelector('#c-4'), document.querySelector('#c-5'), document.querySelector('#c-6'), document.querySelector('#c-7'), document.querySelector('#c-8')];
        let textNodeCh = document.createTextNode('Crosses won!');
        let textNodeR = document.createTextNode('Toes won!');
        let textNodeDraw = document.createTextNode('It\'s a draw!');

        if (document.querySelector('.won-message').childNodes[0] instanceof Text) {
            document.querySelector('.won-message').childNodes[0].remove();
            document.querySelector('.won-title').classList.add('hidden');
        }
// ==========================================================================================================================================
        // horizontal cross
        if (cellsArr[0].classList.contains('ch') && cellsArr[1].classList.contains('ch') && cellsArr[2].classList.contains('ch')) {
            getWinStatus(0, 1, 2, 'horizontal', 'Crosses won!');
            return;
        }
        if (cellsArr[3].classList.contains('ch') && cellsArr[4].classList.contains('ch') && cellsArr[5].classList.contains('ch')) {
            getWinStatus(3, 4, 5, 'horizontal', 'Crosses won!');
            return;
        }
        if (cellsArr[6].classList.contains('ch') && cellsArr[7].classList.contains('ch') && cellsArr[8].classList.contains('ch')) {
            getWinStatus(6, 7, 9, 'horizontal', 'Crosses won!');
            return;
        }
// ==========================================================================================================================================
        // diagonal cross
        if (cellsArr[0].classList.contains('ch') && cellsArr[4].classList.contains('ch') && cellsArr[8].classList.contains('ch')) {
            getWinStatus(0, 4, 8, 'diagonal-right', 'Crosses won!');
            return;
        }
        if (cellsArr[6].classList.contains('ch') && cellsArr[4].classList.contains('ch') && cellsArr[2].classList.contains('ch')) {
            getWinStatus(6, 4, 2, 'diagonal-left', 'Crosses won!');
            return;
        }

// ==========================================================================================================================================
        // vertical cross
        if (cellsArr[0].classList.contains('ch') && cellsArr[3].classList.contains('ch') && cellsArr[6].classList.contains('ch')) {
            getWinStatus(0, 3, 6, 'vertical', 'Crosses won!');
            return;
        }
        if (cellsArr[1].classList.contains('ch') && cellsArr[4].classList.contains('ch') && cellsArr[7].classList.contains('ch')) {
            getWinStatus(1, 4, 7, 'vertical', 'Crosses won!');
            return;
        }
        if (cellsArr[2].classList.contains('ch') && cellsArr[5].classList.contains('ch') && cellsArr[8].classList.contains('ch')) {
            getWinStatus(2, 5, 8, 'vertical', 'Crosses won!');
            return;
        }

// ==========================================================================================================================================
        // horizontal toes
        if (cellsArr[0].classList.contains('r') && cellsArr[1].classList.contains('r') && cellsArr[2].classList.contains('r')) {
            getWinStatus(0, 1, 2, 'horizontal', 'Toes won!');
            return;
        }
        if (cellsArr[3].classList.contains('r') && cellsArr[4].classList.contains('r') && cellsArr[5].classList.contains('r')) {
            getWinStatus(3, 4, 5, 'horizontal', 'Toes won!');
        }
        if (cellsArr[6].classList.contains('r') && cellsArr[7].classList.contains('r') && cellsArr[8].classList.contains('r')) {
            getWinStatus(6, 7, 8, 'horizontal', 'Toes won!');
        }
// ==========================================================================================================================================
        // vertical toes
        if (cellsArr[0].classList.contains('r') && cellsArr[3].classList.contains('r') && cellsArr[6].classList.contains('r')) {
            getWinStatus(0, 3, 6, 'vertical', 'Toes won!');
            return;
        }
        if (cellsArr[1].classList.contains('r') && cellsArr[4].classList.contains('r') && cellsArr[7].classList.contains('r')) {
            getWinStatus(1, 4, 7, 'vertical', 'Toes won!');
            return;
        }
        if (cellsArr[2].classList.contains('r') && cellsArr[5].classList.contains('r') && cellsArr[8].classList.contains('r')) {
            getWinStatus(2, 5, 8, 'vertical', 'Toes won!');
            return;
        }
// =========================================================================================================================================
        // diagonal toes
        if (cellsArr[0].classList.contains('r') && cellsArr[4].classList.contains('r') && cellsArr[8].classList.contains('r')) {
            getWinStatus(0, 4, 8, 'diagonal-right', 'Toes won!');
            return;
        }
        if (cellsArr[6].classList.contains('r') && cellsArr[4].classList.contains('r') && cellsArr[2].classList.contains('r')) {
            getWinStatus(6, 4, 2, 'diagonal-left', 'Toes won!');
            return;
        }

// ============================================================================================================================================
        // A draw
        if (cellsArr[0].classList.length === 2 && cellsArr[1].classList.length === 2 && cellsArr[2].classList.length === 2 && cellsArr[3].classList.length === 2 && cellsArr[4].classList.length === 2 && cellsArr[5].classList.length === 2 && cellsArr[6].classList.length === 2 && cellsArr[7].classList.length === 2 && cellsArr[8].classList.length === 2) {
            document.querySelector('.won-title').classList = 'won-title';
            document.querySelector('.won-message').appendChild(textNodeDraw);
            cellsDisable();
        }
    }

    win();

    function setStorage() {
        const str = JSON.stringify(cells);
        localStorage.setItem('cells', str);
    }

    function getStorage() {
        const getStr = localStorage.getItem('cells');
        cells = JSON.parse(getStr);
        builder(cells);
        undoSwitcher(cells.length);
    }

    function cellsAdder(eventTarg, cellVal) {
        cells.push({
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

        if (cells.length !== null) {
            for (let i = 0; i < cells.length; i += 1) {
                if (cells[i].idVal === '') {
                    cells.pop();
                }
            }
            for (let i = 0; i < cells.length; i += 1) {
                document.querySelector(`#${cells[i].idVal}`).classList.add(`${cells[i].fieldVal}`);
            }
            localStorage.clear();
            setStorage();
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
                cellsAdder(e.target, 'ch')
            } else {
                cellsAdder(e.target, 'r')
            }
        }
        builder(cells, e.target.id);
        undoSwitcher(cells.length);
        win();
    });

    document.querySelector('.undo-btn').addEventListener('click', () => {
        undoSwitcher(cells.length);
        undo(cells);
        builder(cells);
    })

    document.querySelector('.redo-btn').addEventListener('click', () => {
        redoSwitcher(undoStorage.length);
        redo(undoStorage);
        builder(cells);
        win();
    })

    document.querySelector('.restart-btn').addEventListener('click', () => {
        restart();
    })

    window.addEventListener('storage', () => {
        getStorage();
        builder(cells);
        win();
    })


}

document.addEventListener('DOMContentLoaded', () => {
    app();
});

//function app() {
//     let cells = [];
//     let undoStorage = [];
//     if (localStorage.getItem('cells') !== null) {
//         getStorage();
//     }
//
//     function cellsDisable() {
//         field.style.pointerEvents = 'none';
//
//     }
//
//     function getWinStatus(num1, num2, num3, winClass, textNode) {
//         let inputNode = document.createTextNode(textNode);
//         document.querySelector('.won-title').classList = 'won-title';
//         document.querySelector('.won-message').appendChild(inputNode);
//         document.querySelector(`#c-${num1}`).classList.add('win', `${winClass}`);
//         document.querySelector(`#c-${num2}`).classList.add('win', `${winClass}`);
//         document.querySelector(`#c-${num3}`).classList.add('win', `${winClass}`);
//         document.createTextNode(textNode);
//         cellsDisable();
//     }
//
// // ========================================================
//     function win() {
//         let cellsArr = document.querySelectorAll('.cell');
//         cellsArr = Array.from(cellsArr);
//         cellsArr.sort((a, b) => {
//             return cellsId(a) - cellsId(b);
//         });
//
//         function horizontalWin(cellsArr) {
//             let rowLength = Math.sqrt(cellsArr.length);
//             let horizontalWinner = true;
//             for (let i = 0; i < cellsArr.length; i += rowLength) {
//                 let firstCellType = cellsType(cellsArr[i]);
//                 if (!firstCellType) {
//                     continue;
//                 }
//                 for (let j = i; j < i + rowLength; j += 1) {
//                     if (firstCellType !== cellsArr[i]) {
//                         horizontalWinner = false;
//                         break;
//                     }
//                 }
//                 if (horizontalWinner) {
//                     return true;
//                 }
//             }
//         }
//
//         horizontalWin(cellsArr);
//
//         function cellsId(node) {
//             let id = node.id.split('-')[1];
//             return Number.parseInt(id);
//         }
//
//         function cellsType(cellsArr) {
//             if (cellsArr.classList.contains('ch')) {
//                 return 'ch';
//             }
//             if (cellsArr.classList.contains('r')) {
//                 return 'r';
//             }
//             return  null;
//         }
//
//
//     }
//
// // ========================================================
//     win();
//
//     function setStorage() {
//         const str = JSON.stringify(cells);
//         localStorage.setItem('cells', str);
//     }
//
//     function getStorage() {
//         const getStr = localStorage.getItem('cells');
//         cells = JSON.parse(getStr);
//         builder(cells);
//         undoSwitcher(cells.length);
//     }
//
//     function cellsAdder(eventTarg, cellVal) {
//         cells.push({
//             idVal: eventTarg.id,
//             fieldVal: cellVal,
//         });
//     }
//
//     function restart() {
//         localStorage.clear();
//         dump();
//         cells = [];
//         undoStorage = [];
//         if (document.querySelector('.won-message').childNodes[0] instanceof Text) {
//             document.querySelector('.won-message').childNodes[0].remove();
//             document.querySelector('.won-title').classList.add('hidden');
//         }
//         document.querySelector('.undo-btn').disabled = true;
//         document.querySelector('.redo-btn').disabled = true;
//         field.style.pointerEvents = 'auto';
//     }
//
//     function dump() {
//         for (let i = 0; i < 9; i += 1) {
//             document.querySelector(`#c-${[i]}`).className = 'cell';
//         }
//     }
//
//     function builder() {
//         dump();
//
//         if (cells.length !== null) {
//             for (let i = 0; i < cells.length; i += 1) {
//                 if (cells[i].idVal === '') {
//                     cells.pop();
//                 }
//             }
//             for (let i = 0; i < cells.length; i += 1) {
//                 document.querySelector(`#${cells[i].idVal}`).classList.add(`${cells[i].fieldVal}`);
//             }
//             localStorage.clear();
//             setStorage();
//         }
//     }
//
//     function undo(cells) {
//         if (cells.length > 0) {
//             undoStorage.push(cells.pop());
//         }
//         if (document.querySelector('.won-message').childNodes[0] instanceof Text) {
//             document.querySelector('.won-message').childNodes[0].remove();
//             document.querySelector('.won-title').classList.add('hidden');
//         }
//         if (cells.length === 0) {
//             document.querySelector('.undo-btn').disabled = true;
//         }
//         document.querySelector('.redo-btn').disabled = false;
//         field.style.pointerEvents = 'auto';
//     }
//
//     function redo(undoStorage) {
//         if (undoStorage.length > 0) {
//             cells.push(undoStorage.pop());
//         }
//         if (undoStorage.length === 0) {
//             document.querySelector('.redo-btn').disabled = true;
//         }
//         document.querySelector('.undo-btn').disabled = false;
//     }
//
//     function undoSwitcher(counter) {
//         if (counter > 0) {
//             document.querySelector('.undo-btn').disabled = false;
//         } else {
//             document.querySelector('.undo-btn').disabled = true;
//         }
//     }
//
//     function redoSwitcher(counter) {
//         if (counter > 0) {
//             document.querySelector('.redo-btn').disabled = false;
//         } else {
//             document.querySelector('.redo-btn').disabled = true;
//         }
//     }
//
//     field.addEventListener('click', (e) => {
//         if (e.target.classList.contains('r') === false && e.target.classList.contains('ch') === false) {
//             if (cells.length % 2 === 0) {
//                 cellsAdder(e.target, 'ch')
//             } else {
//                 cellsAdder(e.target, 'r')
//             }
//         }
//         builder(cells, e.target.id);
//         undoSwitcher(cells.length);
//         win();
//     });
//
//     document.querySelector('.undo-btn').addEventListener('click', () => {
//         undoSwitcher(cells.length);
//         undo(cells);
//         builder(cells);
//     })
//
//     document.querySelector('.redo-btn').addEventListener('click', () => {
//         redoSwitcher(undoStorage.length);
//         redo(undoStorage);
//         builder(cells);
//         win();
//     })
//
//     document.querySelector('.restart-btn').addEventListener('click', () => {
//         restart();
//     })
//
//     window.addEventListener('storage', () => {
//         getStorage();
//         builder(cells);
//         win();
//     })
//
//
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//     app();
// });
