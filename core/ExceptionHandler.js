#!/usr/bin/env node

"use static";
let use = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
module.exports = use;