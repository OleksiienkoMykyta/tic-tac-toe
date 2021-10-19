import {builder} from "../cells/cellsFiller";
import {undoSwitcher} from "../buttonSwitchers/undoSwitcher";
import {DEFAULT_ROWS_COUNT} from "../field/generateField";

function getStorage(cells) {
    const getStr = localStorage.getItem('cells');
    console.log(localStorage.getItem('cells'), 'STR');
    cells = JSON.parse(getStr);
    builder(cells, Math.pow(DEFAULT_ROWS_COUNT, 2));
    if (cells !== null) {
        undoSwitcher(cells.length);
    }
}

export {getStorage};
