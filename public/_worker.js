console.log("[UDAAN _worker] module evaluating");
console.log("[UDAAN _worker] loaded");
export { default } from "../src/index.js";
console.log("[UDAAN _worker] handler:", typeof (await import("../src/index.js")).default);