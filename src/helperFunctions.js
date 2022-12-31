export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}