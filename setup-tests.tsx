import crypto from "node:crypto";
import "@testing-library/jest-dom";
import 'jest-localstorage-mock';

Object.defineProperty(global.self, "crypto", {
  value: {
    subtle: crypto.webcrypto.subtle,
  },
});
