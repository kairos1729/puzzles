const assert = require("assert");
const util = require("util");
const {ContiguousCounts} = require("../src/ContiguousColours");

describe('TestContiguousColours', function() {
    function createSut(grid) {
        return new ContiguousCounts(grid);
    }

    describe('shouldFindColours', function () {

        const LOTS = 100;
        const manyRow = new Array(LOTS).fill(1);
        const manyGrid = new Array(LOTS).fill(manyRow);

        const tests = [
            {grid: [[]], expected: [], name: "empty"},
            {grid: [[1]], expected: [[1, 1]], name: "one"},
            {grid: [[3], [3],], expected: [[3, 2]], name: "two connected column"},
            {grid: [[4, 4],], expected: [[4, 2]], name: "two connected row"},
            {grid: [[10, 10], [10, 50]], expected: [[10, 3], [50, 1]], name: "three connected row/col"},
            {
                grid: [
                    [10, 10, 10],
                    [10, 50, 10],
                    [10, 10, 10],
                ], expected: [[10, 8], [50, 1]], name: "circle"
            },
            {
                grid: [
                    [10, 10, 10],
                    [50, 10, 50],
                    [10, 10, 10],
                ], expected: [[10, 7], [50, 1]], name: "I"
            },
            {
                grid: manyGrid, expected: [[1, 10000]], name: "Big"
            },
        ];
        tests.forEach(function (test) {
            it(test.name, function () {
                const expected = new Map(test.expected);
                const sut = createSut(test.grid);
                const actual = sut.getContiguousCounts();
                assert.deepStrictEqual(
                    actual,
                    expected,
                    test.name +
                    "\nactual:\n" + util.format(actual) +
                    "\nexpected:\n" + util.format(expected));
            });
        })
    });
});
