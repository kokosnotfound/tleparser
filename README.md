# TLE Parser

A Node.js package for parsing Two-Line Element (TLE).

## What is TLE?

TLE, also known as **two line element set** is a data format encoding a list of orbital elements of an Earth-orbiting object for a given point in time, the epoch. Using a suitable prediction formula, the state (position and velocity) at any point in the past or future can be estimated to some accuracy.

Example TLE data:

```txt
ISS (ZARYA)
1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927
2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537
```

## Installation

You can install the TLE Parser package via npm:

```bash
npm install tle-parser
```

## Usage

```javascript
const TLEParser = require('tleparser');

const parser = new TLEParser(`ISS (ZARYA)
1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927
2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537`);

const tle = parser.parse(); // toJSON false
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE.txt) file for details.