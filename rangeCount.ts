import * as microseconds from 'microseconds';

export enum Extent {
    right,
    left
}

export class RangeCount {
    public linearCount(sortedArray: Array<number>, valueToCount: number): number {
        let count = 0;
        sortedArray.forEach(value => {
            if (value == valueToCount) count++;
        })
        return count;
    }

    public generateSortedArray(size: number): Array<number> {
        let sortedArray = [];
        for (let i = 0; i < size; i++) {
            let randomValue = Math.floor(Math.random() * size)
            sortedArray.push(randomValue);
        }
        sortedArray.sort((a, b) => {
            let order;
            if (a < b) order = -1;
            else if (a == 0) order = 0;
            else order = 1
            return order
        });
        return sortedArray;
    }


    public binarySearchExtent(sortedArray: Array<number>, targetValue: number, extent: Extent, leftGuess: number, rightGuess: number): number {
        let midpoint = Math.floor((rightGuess - leftGuess) / 2) + leftGuess;
        if (sortedArray[midpoint] == targetValue) {
            if (extent == Extent.right) {
                if (!sortedArray[midpoint + 1] || sortedArray[midpoint + 1] != targetValue) {
                    return midpoint;
                } else {
                    return this.binarySearchExtent(sortedArray, targetValue, extent, midpoint + 1, rightGuess)
                }
            } else if (extent == Extent.left) {
                if (!sortedArray[midpoint - 1] || sortedArray[midpoint - 1] != targetValue) {
                    return midpoint;
                } else {
                    return this.binarySearchExtent(sortedArray, targetValue, extent, leftGuess, midpoint - 1);
                }
            }
        } else if (midpoint == leftGuess || midpoint == rightGuess) {
            return -1;
        } else if (sortedArray[midpoint] > targetValue) {
            return this.binarySearchExtent(sortedArray, targetValue, extent, leftGuess, midpoint - 1);
        } else if (sortedArray[midpoint] < targetValue) {
            return this.binarySearchExtent(sortedArray, targetValue, extent, midpoint + 1, rightGuess);
        }
    }

    public binaryCount(sortedArray: Array<number>, valueToCount: number) {
        if (sortedArray.length == 0) return 0;
        let leftExtent = this.binarySearchExtent(sortedArray, valueToCount, Extent.left, 0, sortedArray.length - 1);
        let rightExtent = this.binarySearchExtent(sortedArray, valueToCount, Extent.right, 0, sortedArray.length - 1);
        if (leftExtent == -1 && rightExtent == -1) return 0;
        return rightExtent - leftExtent + 1;
    }

    public benchmark() {
        let sizes = [ 10, 100, 1000, 10000, 100000, 1000000, 10000000 ]
        sizes.forEach(size => {
            let sortedArray = this.generateSortedArray(size);
            let valueToCount = Math.floor(Math.random() * size);
            let linearStartTime = microseconds.now();
            let linearCountResult = this.linearCount(sortedArray, valueToCount);
            let linearEndTime = microseconds.now();
            let binaryStartTime = microseconds.now();
            let binaryCountResult = this.binaryCount(sortedArray, valueToCount); 
            let binaryEndTime = microseconds.now();
            let linearTime = linearEndTime - linearStartTime;
            let binaryTime = binaryEndTime - binaryStartTime;
            console.log(`size: ${size}, linearTime: ${linearTime}ms, linearCountResult: ${linearCountResult} binaryTime: ${binaryTime}ms, binaryCountResults: ${binaryCountResult}`)
        })
    }
}