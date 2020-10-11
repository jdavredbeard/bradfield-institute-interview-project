"use strict";
exports.__esModule = true;
exports.RangeCount = exports.Extent = void 0;
var microseconds = require("microseconds");
var Extent;
(function (Extent) {
    Extent[Extent["right"] = 0] = "right";
    Extent[Extent["left"] = 1] = "left";
})(Extent = exports.Extent || (exports.Extent = {}));
var RangeCount = /** @class */ (function () {
    function RangeCount() {
    }
    RangeCount.prototype.linearCount = function (sortedArray, valueToCount) {
        var count = 0;
        sortedArray.forEach(function (value) {
            if (value == valueToCount)
                count++;
        });
        return count;
    };
    RangeCount.prototype.generateSortedArray = function (size) {
        var sortedArray = [];
        for (var i = 0; i < size; i++) {
            var randomValue = Math.floor(Math.random() * size);
            sortedArray.push(randomValue);
        }
        sortedArray.sort(function (a, b) {
            var order;
            if (a < b)
                order = -1;
            else if (a == 0)
                order = 0;
            else
                order = 1;
            return order;
        });
        return sortedArray;
    };
    RangeCount.prototype.binarySearchExtent = function (sortedArray, targetValue, extent, leftGuess, rightGuess) {
        var midpoint = Math.floor((rightGuess - leftGuess) / 2) + leftGuess;
        if (sortedArray[midpoint] == targetValue) {
            if (extent == Extent.right) {
                if (!sortedArray[midpoint + 1] || sortedArray[midpoint + 1] != targetValue) {
                    return midpoint;
                }
                else {
                    return this.binarySearchExtent(sortedArray, targetValue, extent, midpoint + 1, rightGuess);
                }
            }
            else if (extent == Extent.left) {
                if (!sortedArray[midpoint - 1] || sortedArray[midpoint - 1] != targetValue) {
                    return midpoint;
                }
                else {
                    return this.binarySearchExtent(sortedArray, targetValue, extent, leftGuess, midpoint - 1);
                }
            }
        }
        else if (midpoint == leftGuess || midpoint == rightGuess) {
            return -1;
        }
        else if (sortedArray[midpoint] > targetValue) {
            return this.binarySearchExtent(sortedArray, targetValue, extent, leftGuess, midpoint - 1);
        }
        else if (sortedArray[midpoint] < targetValue) {
            return this.binarySearchExtent(sortedArray, targetValue, extent, midpoint + 1, rightGuess);
        }
    };
    RangeCount.prototype.binaryCount = function (sortedArray, valueToCount) {
        if (sortedArray.length == 0)
            return 0;
        var leftExtent = this.binarySearchExtent(sortedArray, valueToCount, Extent.left, 0, sortedArray.length - 1);
        var rightExtent = this.binarySearchExtent(sortedArray, valueToCount, Extent.right, 0, sortedArray.length - 1);
        if (leftExtent == -1 && rightExtent == -1)
            return 0;
        return rightExtent - leftExtent + 1;
    };
    RangeCount.prototype.benchmark = function () {
        var _this = this;
        var sizes = [10, 100, 1000, 10000, 100000, 1000000, 10000000];
        sizes.forEach(function (size) {
            var sortedArray = _this.generateSortedArray(size);
            var valueToCount = Math.floor(Math.random() * size);
            var linearStartTime = microseconds.now();
            var linearCountResult = _this.linearCount(sortedArray, valueToCount);
            var linearEndTime = microseconds.now();
            var binaryStartTime = microseconds.now();
            var binaryCountResult = _this.binaryCount(sortedArray, valueToCount);
            var binaryEndTime = microseconds.now();
            var linearTime = linearEndTime - linearStartTime;
            var binaryTime = binaryEndTime - binaryStartTime;
            console.log("size: " + size + ", linearTime: " + linearTime + "ms, linearCountResult: " + linearCountResult + " binaryTime: " + binaryTime + "ms, binaryCountResults: " + binaryCountResult);
        });
    };
    return RangeCount;
}());
exports.RangeCount = RangeCount;
