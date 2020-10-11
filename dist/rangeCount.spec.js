"use strict";
exports.__esModule = true;
var rangeCount_1 = require("./rangeCount");
describe('RangeCount', function () {
    var rc = new rangeCount_1.RangeCount();
    var smallSortedArray = [1, 2, 3, 3, 4, 4, 4, 4, 7, 20];
    describe('linear count', function () {
        it('returns count of target value in small sorted array', function () {
            expect(rc.linearCount(smallSortedArray, 1)).toEqual(1);
            expect(rc.linearCount(smallSortedArray, 3)).toEqual(2);
            expect(rc.linearCount(smallSortedArray, 4)).toEqual(4);
        });
        it('does not fail on empty array', function () {
            expect(rc.linearCount([], 3)).toEqual(0);
        });
        it('does not fail on no instances of value', function () {
            expect(rc.linearCount(smallSortedArray, 8)).toEqual(0);
        });
    });
    describe('generateSortedArray', function () {
        it('creates sorted array of passed size', function () {
            var size = 1000;
            var sortedArray = rc.generateSortedArray(size);
            expect(sortedArray.length).toEqual(size);
            sortedArray.forEach(function (value, i) {
                if (i == 0)
                    return;
                expect(value).toBeGreaterThanOrEqual(sortedArray[i - 1]);
                expect(Number.isInteger(value)).toEqual(true);
                expect(value).toBeLessThanOrEqual(size);
            });
        });
    });
    describe('binaryCount', function () {
        it('returns count of target value in small sorted array', function () {
            expect(rc.binaryCount(smallSortedArray, 1)).toEqual(1);
            expect(rc.binaryCount(smallSortedArray, 3)).toEqual(2);
            expect(rc.binaryCount(smallSortedArray, 4)).toEqual(4);
        });
        it('does not fail on empty array', function () {
            expect(rc.binaryCount([], 3)).toEqual(0);
        });
        it('does not fail on no instances of value', function () {
            expect(rc.binaryCount(smallSortedArray, 8)).toEqual(0);
        });
    });
    describe('benchmark', function () {
        it('runs benchmark', function () {
            rc.benchmark();
        });
    });
});
