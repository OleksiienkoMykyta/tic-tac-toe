import {generateField, DEFAULT_ROWS_COUNT, DEFAULT_COLS_COUNT} from "./field/generateField";
import css from "./style.css";
import {calculateWinner} from "./winner";
import {undoSwitcher} from "./buttonSwitchers/undoSwitcher";
import {redoSwitcher} from "./buttonSwitchers/redoSwitcher";
import {builder} from "./cells/cellsFiller";
import {setStorage} from "./localStorage/setStorage";
import {getStorage} from "./localStorage/getStorage";
import {cellsAdder} from "./cells/cellsAdder";
import {undo} from "./buttons/undo";
import {redo} from "./buttons/redo";
import {restart} from "./buttons/restart";


function Init() {
    let rows = generateField(DEFAULT_ROWS_COUNT, DEFAULT_COLS_COUNT);
    const field = document.querySelector('.field');
    rows.forEach((row) => field.appendChild(row));

}

document.addEventListener('DOMContentLoaded', () => {
    Init();
    app();
});


function app() {
    document.querySelector('.field').addEventListener('click', (e) => {
        let etcl = e.target;
        if (etcl.classList.contains('r') || etcl.classList.contains('ch')) {
            return false;
        }
        if (cells.length % 2 === 0) {
            cellsAdder(cells, etcl, 'ch');
        } else {
            cellsAdder(cells, etcl, 'r');
        }
        builder(cells, Math.pow(DEFAULT_ROWS_COUNT, 2));
        setStorage(cells);
        undoSwitcher(cells.length);
        calculateWinner(cellsArr, field);
    });

    document.querySelector('.undo-btn').addEventListener('click', () => {
        undoSwitcher(cells.length);
        undo(cells, field, undoStorage);
        builder(cells, Math.pow(DEFAULT_ROWS_COUNT, 2));
        setStorage(cells);
    })

    document.querySelector('.redo-btn').addEventListener('click', () => {
        getStorage(cells);
        redoSwitcher(undoStorage.length);
        redo(cells, undoStorage);
        builder(cells, Math.pow(DEFAULT_ROWS_COUNT, 2));
        setStorage(cells);
        calculateWinner(cellsArr, field);
    })

    document.querySelector('.restart-btn').addEventListener('click', () => {
        restart(field, Math.pow(DEFAULT_ROWS_COUNT, 2));
        field.style.pointerEvents = 'auto';
        cells = [];
        undoStorage = [];
        builder(cells, Math.pow(DEFAULT_ROWS_COUNT, 2));
    })

    window.addEventListener('storage', () => {
        getStorage(cells);
        calculateWinner(cellsArr, field);
    })

    const field = document.querySelector('.field');
    let cells = [];
    let undoStorage = [];
    if (localStorage.getItem('cells')) {
        console.log(localStorage.getItem('cells'), 'IN IF');
        getStorage(cells);
    }

    let cellsArr = document.querySelectorAll('.cell');
    cellsArr = Array.from(cellsArr);
    cellsArr.sort((a, b) => {
        return cellsId(a) - cellsId(b);
    });

    calculateWinner(cellsArr, field);

    function cellsId(node) {
        let id = node.id.split('-')[1];
        return Number.parseInt(id);
    }

}
