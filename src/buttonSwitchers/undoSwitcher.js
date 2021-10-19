function undoSwitcher(counter) {
    if (counter > 0) {
        document.querySelector('.undo-btn').disabled = false;
    } else {
        document.querySelector('.undo-btn').disabled = true;
    }
}

export { undoSwitcher };