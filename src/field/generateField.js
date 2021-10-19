const DEFAULT_ROWS_COUNT = 3;
const DEFAULT_COLS_COUNT = 3;

function generateCols(row, colsCount, rowId) {
  for (let i = 0; i < colsCount; i++) {
    const id = rowId * 3 + i;
    const col = document.createElement('div');
    col.id = `c-${id}`;
    col.dataset.id = id.toString();
    col.className = 'cell';
    row.appendChild(col);
  }
}

function generateRows(rowsCount, colsCount) {
  let rows = [];
  for (let i = 0; i < rowsCount; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    generateCols(row, colsCount, i);
    rows.push(row);
  }

  return rows;
}

export {generateRows as generateField, DEFAULT_ROWS_COUNT, DEFAULT_COLS_COUNT};
