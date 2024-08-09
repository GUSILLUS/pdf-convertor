import crypto from "node:crypto";
import "@testing-library/jest-dom";

Object.defineProperty(global.self, "crypto", {
  value: {
    subtle: crypto.webcrypto.subtle,
  },
});
