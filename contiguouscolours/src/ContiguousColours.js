class ContiguousCounts {
    constructor(colours) {
        this.nRows = colours.length;
        this.nCols = colours[0].length;

        this.colourGrid = [];
        for (let row = 0; row < this.nRows; ++row) {
            const r = colours[row];
            for (let col = 0; col < this.nCols; ++col) {
                this.colourGrid.push(
                    new ColourEntry(r[col], false, false));
            }
        }

        //console.log(this.colourGrid);

        this.counts = new Map();
    }

    getContiguousCounts() {
        for (let index = 0; index < this.colourGrid.length; ++index) {
            const entry = this.getEntry(index);
            if (!entry.visited) {
                this.addColourCount(this.countContiguous(index, entry));
            }
        }
        return this.counts;
    }

    getEntry(index) {
        return this.colourGrid[index];
    }

    countContiguous(index, entry) {
        const colourCount = {
            colour: entry.colour,
            count: 0
        };
        let working = [index];
        while (working.length > 0) {
            let current = working.pop();
            const currentEntry = this.getEntry(current);
            currentEntry.visited = true;
            ++colourCount.count;
           //console.log("l: " + working.length);
            working.push(...this.getAdjacent(current, colourCount.colour));
        }
        return colourCount;
    }

    flatten(row, col) {
        return col + row * this.nCols;
    }

    rowFrom(index) {
        return Math.floor(index / this.nCols);
    }

    colFrom(index) {
        return index % this.nCols;
    }

    getAdjacent(index, colour) {
        const row = this.rowFrom(index);
        const col = this.colFrom(index);
        const coords = [
            ContiguousCounts.gridSquare(row + 1, col),
            ContiguousCounts.gridSquare(row - 1, col),
            ContiguousCounts.gridSquare(row, col - 1),
            ContiguousCounts.gridSquare(row, col + 1),
        ];

        const map = coords.filter(c => {
            const ok = c.row >= 0 &&
                c.row < this.nRows &&
                c.col >= 0 &&
                c.col < this.nCols;

            if (ok) {
                const entry = this.getEntry(this.flatten(c.row, c.col));
                if (entry.pending || entry.visited || entry.colour !== colour) {
                    return false;
                }
                entry.pending = true;
                return true;
            }
            return false;
        }).map(c => this.flatten(c.row, c.col));
        return map;
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
