# Sunlit

Write tests that are friendly to newer programmers.

## Goals

* Easy(ish) to read.
* Inlined into main application code, not put in separate files.
* Errors include only the most useful information.

## Usage

```js
const test = require("sunlit");

test(_ => _("Expect", returnTrue(), "to equal", true));
// Prints:
// ✅ "Expect", returnTrue(), "to equal", true

test(_ => _("Expect", throws(), "to equal", true));
// Prints:
// ❌ "Expect", throws(), "to equal", true
//    but get error `Boom`
//    on line 17

function returnTrue() {
  return true;
};

function throws() {
  throw new Error("Boom");
};
```

## Install

```
$ npm install sunlit
```
