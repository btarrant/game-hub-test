import "@testing-library/jest-dom";

Object.defineProperty(global.Element.prototype, "scrollTo", {
  value: jest.fn(),
  writable: true,
});

if (typeof global.structuredClone === "undefined") {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}
