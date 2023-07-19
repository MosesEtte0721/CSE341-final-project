const sum = require("../routes/sum.js");

describe("It should return sum of a number", ()=> {
    test("This multiply by this", () =>{
        expect(sum(23, 2)).toBe(529);
    })
})