const COLOURS = [
    [1, 1, 2, 3],
    [1, 1, 2, 4],
    [2, 2, 1, 4]
];

const NCOL = COLOURS[0].length;
const NROW = COLOURS.length;
const SEEN = new Set();

colourCounts = getContiguousCounts(COLOURS);
console.log("seen: ");
console.log(SEEN);
console.log(Array.from(SEEN).sort((a, b) => a - b));
console.log("counts: ");
console.log(colourCounts);

function getContiguousCounts() {
    const counts = new Map();
    for (let col = 0; col < NCOL ; ++col) {
        for (let row = 0; row < NROW; ++ row) {
            if (!SEEN.has(coordinateKey(row, col))) {
                const colourCount = countContiguous(row, col);
                if (!counts.has(colourCount.colour) ||
                    counts.get(colourCount.colour) < colourCount.count) {
                    counts.set(colourCount.colour, colourCount.count);
                }
            }
        }
    }
    return counts;
}

function coordinateKey(row, col) {
    return col + row * NCOL;
}

function countContiguous(row, col) {
    const colourCount = {
        colour: COLOURS[row][col],
        count: 0
    };
    let working = [coord(row, col)];
    while (working.length > 0) {
        let current = working.pop();
        if (COLOURS[current.row][current.col] !== colourCount.colour
            || SEEN.has(coordinateKey(current.row, current.col))) {
            continue;
        }
        SEEN.add(coordinateKey(current.row, current.col));
        ++colourCount.count;
        working.push(...getAdjacentUnseen(current.row, current.col));
    }
    return colourCount;
}

function coord(row, col) {
    return {row: row, col: col};
}

function getAdjacentUnseen(row, col) {
    const coords = [
        coord(row - 1, col),
        coord(row + 1, col),
        coord(row, col - 1),
        coord(row, col + 1),
    ];

    return coords.filter(c =>
        c.row >= 0 &&
        c.row < NROW &&
        c.col >= 0 &&
        c.col < NCOL);
}
