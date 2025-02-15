import "@testing-library/jest-dom";

Object.defineProperty(global.Element.prototype, "scrollTo", {
  value: jest.fn(),
  writable: true,
});
