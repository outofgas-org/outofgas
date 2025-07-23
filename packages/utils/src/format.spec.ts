import { ellipseAddress, formatPrice, formatPriceSubscript } from "./format";

describe("ellipseAddress", () => {
  it("should return an empty string for null or undefined address", () => {
    expect(ellipseAddress(null)).toBe("");
    expect(ellipseAddress(undefined)).toBe("");
  });

  it("should return the full address when width is -1", () => {
    const address = "0x1234567890abcdef1234567890abcdef12345678";
    expect(ellipseAddress(address, -1)).toBe(address);
  });

  it("should ellipse the address with default width of 6", () => {
    const address = "0x1234567890abcdef1234567890abcdef12345678";
    expect(ellipseAddress(address)).toBe("0x1234...345678");
  });

  it("should ellipse the address with custom width", () => {
    const address = "0x1234567890abcdef1234567890abcdef12345678";
    expect(ellipseAddress(address, 4)).toBe("0x12...5678");
  });
});

describe("formatPrice", () => {
  it('should return "0.00" for null, undefined, or 0', () => {
    expect(formatPrice(undefined)).toBe("0.00");
    expect(formatPrice(null)).toBe("0.00");
    expect(formatPrice(0)).toBe("0.00");
  });

  it("should format price >= 10000 with no decimal places", () => {
    expect(formatPrice(10000)).toBe("10,000");
    expect(formatPrice(12345)).toBe("12,345");
    expect(formatPrice(9999999)).toBe("9,999,999");
  });

  it("should format price >= 1 and < 10000 with 2 decimal places", () => {
    expect(formatPrice(1)).toBe("1.00");
    expect(formatPrice(9.99)).toBe("9.99");
    expect(formatPrice(123.456)).toBe("123.46");
    expect(formatPrice(1000)).toBe("1,000.00");
    expect(formatPrice(9999.99)).toBe("9,999.99");
  });

  it("should format price >= 0.1 and < 1 with 4 decimal places", () => {
    expect(formatPrice(0.999)).toBe("0.9990");
    expect(formatPrice(0.1)).toBe("0.1000");
    expect(formatPrice(0.12345)).toBe("0.1235");
  });

  it("should format price >= 0.01 and < 0.1 with 5 decimal places", () => {
    expect(formatPrice(0.09)).toBe("0.09000");
    expect(formatPrice(0.01)).toBe("0.01000");
    expect(formatPrice(0.05678)).toBe("0.05678");
  });

  it("should format price >= 0.001 and < 0.01 with 6 decimal places", () => {
    expect(formatPrice(0.009)).toBe("0.009000");
    expect(formatPrice(0.001)).toBe("0.001000");
    expect(formatPrice(0.00456)).toBe("0.004560");
  });

  it("should use formatPriceSubscript for price < 0.001", () => {
    // This test depends on formatPriceSubscript implementation
    expect(formatPrice(0.0009)).toEqual(formatPriceSubscript(0.0009));
    expect(formatPrice(0.0001)).toEqual(formatPriceSubscript(0.0001));
    expect(formatPrice(0.00001)).toEqual(formatPriceSubscript(0.00001));
    expect(formatPrice(0.000000001)).toEqual(formatPriceSubscript(0.000000001));
  });
});

describe("formatPriceSubscript", () => {
  it("should return the string as is if it does not include a decimal point", () => {
    expect(formatPriceSubscript("123")).toBe("123");
  });

  it("should format numbers with leading zeros after decimal point using subscript", () => {
    // 0.00001 should be formatted as 0.0₄1
    expect(formatPriceSubscript(0.00001)).toBe("0.0₄1");

    // 0.0000123 should be formatted as 0.0₄123
    expect(formatPriceSubscript(0.0000123)).toBe("0.0₄123");
  });

  it("should handle string inputs correctly", () => {
    expect(formatPriceSubscript("0.00001")).toBe("0.0₄1");
  });

  it("should handle maxDecimals correctly", () => {
    expect(formatPriceSubscript("0.0000189898797987979")).toBe("0.0₄189898");
  });

  it("e", () => {
    expect(formatPrice(1.44444e-7)).toBe("0.0₆144444");
  });
});
