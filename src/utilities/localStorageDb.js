const getStoredItem = () => {
    let storageCoin;

    const getCoin = localStorage.getItem('selected-coin');
    if (getCoin) {
        storageCoin = JSON.parse(getCoin);
    }
    else {
        storageCoin = {};
    }
    return storageCoin;
}

const addToLocalStorage = (id) => {
    let storageCoin = getStoredItem()

    let count = storageCoin[id];
    if (count) {
        storageCoin[id] = count + 1;
    }
    else {
        storageCoin[id] = 1;
    }

    localStorage.setItem('selected-coin', JSON.stringify(storageCoin))
}

const removeItem = (id) => {
    let storageCoin = getStoredItem();
    delete storageCoin[id];
    localStorage.setItem('selected-coin', JSON.stringify(storageCoin))
}

const minusItem = (id) => {
    let storageCoin = getStoredItem();
    let count = storageCoin[id];
    if (count) {
        storageCoin[id] = count - 1;
    }
    localStorage.setItem('selected-coin', JSON.stringify(storageCoin))
}

const deleteCart = () => {
    localStorage.removeItem('selected-coin')
}

export {
    getStoredItem,
    addToLocalStorage,
    removeItem,
    deleteCart,
    minusItem
}