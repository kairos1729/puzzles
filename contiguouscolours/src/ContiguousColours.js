class ContiguousCounts {
    constructor(colours) {
        this.colourGrid = colours.map(
            row => row.map(
                colour => new ColourEntry(
                    colour,
                    false,
                    false)));

        console.log(this.colourGrid);

        this.nRows = colours.length;
        this.nCols = colours[0].length;
        this.counts = new Map();
    }

    getContiguousCounts() {
        for (let col = 0; col < this.nCols; ++col) {
            for (let row = 0; row < this.nRows; ++row) {
                if (!this.getEntry(row, col).visited) {
                    this.addColourCount(this.countContiguous(row, col));
                }
            }
        }
        return this.counts;
    }

    getEntry(row, col) {
        return this.colourGrid[row][col];
    }

    countContiguous(row, col) {
        const colourCount = {
            colour: this.colourGrid[row][col].colour,
            count: 0
        };
        let working = [ContiguousCounts.gridSquare(row, col)];
        while (working.length > 0) {
            let current = working.pop();
            const entry = this.getEntry(current.row, current.col);
            entry.visited = true;
            ++colourCount.count;
            console.log(colourCount.count);
            console.log("l: " + working.length);
            working.push(...this.getAdjacent(current.row, current.col, colourCount.colour));
        }
        return colourCount;
    }

    addColourCount(colourCount) {
        if (!this.counts.has(colourCount.colour) ||
            this.counts.get(colourCount.colour) < colourCount.count) {
            this.counts.set(colourCount.colour, colourCount.count);
        }
    }

    static gridSquare(row, col) {
        return {row: row, col: col};
    }

    getAdjacent(row, col, colour) {
        const coords = [
            ContiguousCounts.gridSquare(row + 1, col),
            ContiguousCounts.gridSquare(row - 1, col),
            ContiguousCounts.gridSquare(row, col - 1),
            ContiguousCounts.gridSquare(row, col + 1),
        ];

        return coords.filter(c => {
            if (c.row >= 0 &&
                c.row < this.nRows &&
                c.col >= 0 &&
                c.col < this.nCols) {
                const entry = this.getEntry(c.row, c.col);
                if (entry.pending || entry.visited || entry.colour !== colour) {
                    return false;
                }
                entry.pending = true;
                return true;
            }
            return false;
        });
    }
}

class ColourEntry {
    constructor(colour, visited, pending) {
        this.colour = colour;
        this.visited = visited;
        this.pending = pending;
    }
}

exports.ContiguousCounts = ContiguousCounts;

// const COLOURS1 = [
//     [1, 1, 2, 3],
//     [1, 1, 2, 4],
//     [2, 2, 1, 4]
// ];
//
// const COLOURS2 = [
//     [0,0,1,0,0,0,0,1,0,0,0,0,0],
//     [0,0,0,0,0,0,0,1,1,1,0,0,0],
//     [0,1,1,0,1,0,0,0,0,0,0,0,0],
//     [0,1,0,0,1,1,0,0,1,0,1,0,0],
//     [0,1,0,0,1,1,0,0,1,1,1,0,0],
//     [0,0,0,0,0,0,0,0,0,0,1,0,0],
//     [0,0,0,0,0,0,0,1,1,1,0,0,0],
//     [0,0,0,0,0,0,0,1,1,0,0,0,0]
// ];
//
// const COLOURS3 = [
//     [1, 1, 2, 3],
//     [1, 2, 3, 2],
//     [3, 2, 2, 2]
// ];
//
//
//
// const sut = new ContiguousCounts(COLOURS3);
// colourCounts = sut.getContiguousCounts();
// console.log("seen: ");
// console.log(sut.seen);
// console.log(Array.from(sut.seen).sort((a, b) => a - b));
// console.log("counts: ");
// console.log(colourCounts);
