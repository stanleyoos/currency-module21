import { convertPLNToUSD } from "../convertPLNToUSD";

describe("ConvertPLNtoUSD", () => {
  it("should return proper value when good input", () => {
    expect(convertPLNToUSD(1)).toBe("$0.29");
    expect(convertPLNToUSD(2)).toBe("$0.57");
    expect(convertPLNToUSD(20)).toBe("$5.71");
    expect(convertPLNToUSD(12)).toBe("$3.43");
  });
  it("Should return NaN when when input is text", () => {
    expect(convertPLNToUSD("4")).toBeNaN();
    expect(convertPLNToUSD("text")).toBeNaN();
    expect(convertPLNToUSD("-1231234")).toBeNaN();
  });
  it("Should check if value is passed to the function", () => {
    expect(convertPLNToUSD()).toBeNaN();
  });
  it("Should return Error if argument is not text or string", () => {
    expect(convertPLNToUSD([12, 13, 14])).toBe("Error");
    expect(convertPLNToUSD(true)).toBe("Error");
    expect(convertPLNToUSD(false)).toBe("Error");
    expect(convertPLNToUSD({ name: "John" })).toBe("Error");
  });
  it("Should return $0.00 if passed value is negative number", () => {
    expect(convertPLNToUSD(-125)).toBe("$0.00");
    expect(convertPLNToUSD(-11)).toBe("$0.00");
  });
});
