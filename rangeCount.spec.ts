import { RangeCount } from './rangeCount'

describe('RangeCount', () => {
    let rc = new RangeCount();
    let smallSortedArray = [1, 2, 3, 3, 4, 4, 4, 4, 7, 20];

    describe('linear count', () => {
        it('returns count of target value in small sorted array', () => {
            expect(rc.linearCount(smallSortedArray, 1)).toEqual(1);
            expect(rc.linearCount(smallSortedArray, 3)).toEqual(2);
            expect(rc.linearCount(smallSortedArray, 4)).toEqual(4);
        });
        it('does not fail on empty array', () => {
            expect(rc.linearCount([], 3)).toEqual(0);
        })
        it('does not fail on no instances of value', () => {
            expect(rc.linearCount(smallSortedArray, 8)).toEqual(0);
        })
    })

    describe('generateSortedArray', () => {
        it('creates sorted array of passed size', () => {
            let size = 1000;
            let sortedArray = rc.generateSortedArray(size);
            expect(sortedArray.length).toEqual(size);
            sortedArray.forEach((value, i) => {
                if (i == 0) return;
                expect(value).toBeGreaterThanOrEqual(sortedArray[i - 1]);
                expect(Number.isInteger(value)).toEqual(true);
                expect(value).toBeLessThanOrEqual(size)
            })
        })
    })

    describe('binaryCount', () => {
        it('returns count of target value in small sorted array', () => {
            expect(rc.binaryCount(smallSortedArray, 1)).toEqual(1);
            expect(rc.binaryCount(smallSortedArray, 3)).toEqual(2);
            expect(rc.binaryCount(smallSortedArray, 4)).toEqual(4);
        });
        it('does not fail on empty array', () => {
            expect(rc.binaryCount([], 3)).toEqual(0);
        })
        it('does not fail on no instances of value', () => {
            expect(rc.binaryCount(smallSortedArray, 8)).toEqual(0);
        })
    })

    describe('benchmark', () => {
        it('runs benchmark', () => {
            rc.benchmark();
        })
    })
})