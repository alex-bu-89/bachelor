var expect = require("chai").expect;

var fibonacci = function(num){ var a = 1, b = 0, temp; while (num >= 0){ temp = a; a = a + b; b = temp; num--; } return b;};
describe("Fibonacci", function () { it("shoud return fibonacci number", function () { expect(fibonacci(0)).to.equal(1);expect(fibonacci(1)).to.equal(1);expect(fibonacci(2)).to.equal(2);expect(fibonacci(6)).to.equal(13);expect(fibonacci(8)).to.equal(34);});});