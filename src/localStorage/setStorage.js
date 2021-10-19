function setStorage(cells) {
    localStorage.clear();
    const str = JSON.stringify(cells);
    localStorage.setItem('cells', str);
}

export {setStorage};