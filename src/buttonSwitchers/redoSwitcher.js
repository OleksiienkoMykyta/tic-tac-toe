function redoSwitcher(counter) {
    if (counter > 0) {
        document.querySelector('.redo-btn').disabled = false;
    } else {
        document.querySelector('.redo-btn').disabled = true;
    }
}

export { redoSwitcher };