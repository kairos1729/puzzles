const COLOURS = [
    [1, 1, 2, 3],
    [1, 1, 2, 4],
    [2, 2, 1, 4]
];

const NCOL = COLOURS[0].length;
const NROW = COLOURS.length;
const SEEN = new Set();

console.log(COLOURS[0][0]);
colourCounts = getContiguousCounts(COLOURS);
console.log(colourCounts);

function coordinateKey(row, col) {
    return col + row * NCOL;
}

function getContiguousCounts() {
    const counts = new Map();

    for (let col = 0; col < NCOL ; ++col) {
        for (let row = 0; row < NROW; ++ row) {
            const colourCount = countContiguous(row, col);
            if (!SEEN.has(coordinateKey(row, col)) &&
                counts[colourCount.colour] < colourCount.count) {
                counts[colourCount.colour] = colourCount.count;
            }
        }
    }

    return counts;
}

function coord(row, col) {
    return {row: row, col: col};
}

function countContiguous(row, col) {
    console.log(row, col);

    const colourCount = {
        colour: COLOURS[row][col],
        count: 0
    };

    let working = [coord(row, col)];

    while (working.length > 0) {
        let current = working.pop();

        console.log(current);

        if (COLOURS[current.row][current.col] !== colourCount.colour) {
            continue;
        }

        SEEN.add(coordinateKey(current.row, current.col));

        ++colourCount.count;

        const newSquares = getAdjacent(current.row, current.col);

        console.log("new: ");
        console.log(newSquares);

        working.push(...newSquares);

        console.log("working: ");
        console.log(working);
    }

    console.log(colourCount);
    return colourCount;
}

function getAdjacent(row, col) {
    const coords = [
        coord(row - 1, col),
        coord(row + 1, col),
        coord(row, col - 1),
        coord(row, col + 1),
    ];

    console.log("coords: ");
    console.log(coords);

    const filtered = coords.filter(c =>
        c.row >= 0 &&
        c.row < NROW &&
        c.col >= 0 &&
        c.col < NCOL &&
        !SEEN.has(coordinateKey(c.row, c.col)));

    console.log("filtered: ");
    console.log(filtered);

    return filtered;
}
