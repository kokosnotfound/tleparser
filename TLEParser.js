export default class TLEParser {
    /**
     * Create a new TLEParser instance
     * @param {String} TLEString
     * @class TLEParser
     * @tutorial
     const parser = new TLEParser(`ISS (ZARYA)             
     1 25544U 98067A   24090.85387774  .00026911  00000+0  48154-3 0  9997
     2 25544  51.6412 343.7480 0004304  23.3245  97.2192 15.49778798446391`)
     */
    constructor (TLEString) {
        this.TLEString = TLEString;
        this.lines = TLEString.trim().split('\n');

        if (this.lines.length % 3 !== 0) {
            throw new Error("Invalid TLE string");
        }
    }

    #parseEpoch(epochString) {
        const year = parseInt(epochString.substr(0, 2));
        const dayOfYear = parseFloat(epochString.substr(2));
        const date = new Date((year < 57 ? 2000 : 1900) + year, 0, dayOfYear);
        return date.toISOString();
    }

    /**
     * Parse the TLE string into an array of objects
     * @param  {Boolean} toJSON stringify result to JSON output
     * @returns {String} OBJECT_NAME Satellite name
     * @returns {Number} SATELLITE_CATALOG_NUMBER NORAD catalog number
     * @returns {String} EPOCH Date of the epoch
     * @returns {String} INTERNATIONAL_DESIGNATOR_YEAR Last two digits of the launch year
     * @returns {String} INTERNATIONAL_DESIGNATOR_LAUNCH_NUMBER Launch number of the year
     * @returns {String} INTERNATIONAL_DESIGNATOR_PIECE Piece of the launch
     * @returns {Number} MEAN_MOTION
     * @returns {Number} ECCENTRICITY
     * @returns {Number} INCLINATION
     * @returns {Number} RA_OF_ASC_NODE
     * @returns {Number} ARG_OF_PERICENTER
     * @returns {Number} MEAN_ANOMALY
     * @returns {String} CLASSIFICATION_TYPE U for unclassified and C for classified
     * @returns {Number} NORAD_CAT_ID
     * @returns {Number} ELEMENT_SET_NO
     * @returns {Number} REV_AT_EPOCH Revolution number at epoch
     * @returns {Number} BSTAR Radiation pressure coefficient
     * @returns {Number} MEAN_MOTION_DOT First time derivative of the mean motion
     * @returns {Number} MEAN_MOTION_DDOT Second time derivative of the mean motion
     * @returns {Number} CHECKSUM Modulo 10 checksum
     * @link https://en.wikipedia.org/wiki/Two-line_element_set
     */
    parse(toJSON = false) {
        const satellites = [];

        for (let i = 0; i < this.lines.length; i += 3) {
            const name = this.lines[i].trim();
            const line1 = this.lines[i + 1];
            const line2 = this.lines[i + 2];

            if (line1.length !== 69 || line2.length !== 69) {
                throw new Error("Invalid TLE string. Line 1 and Line 2 must be 69 characters long.");
            }

            const satellite = {
                OBJECT_NAME: name,
                SATELLITE_CATALOG_NUMBER: parseInt(line1.substr(2, 5)),
                EPOCH: this.#parseEpoch(line1.substr(18, 14)),
                INTERNATIONAL_DESIGNATOR_YEAR: line1.substr(9, 2),
                INTERNATIONAL_DESIGNATOR_LAUNCH_NUMBER: line1.substr(11, 3),
                INTERNATIONAL_DESIGNATOR_PIECE: line1.substr(14, 3),
                MEAN_MOTION: parseFloat(line2.substr(52, 11)),
                ECCENTRICITY: parseFloat("0." + line2.substr(26, 7)),
                INCLINATION: parseFloat(line2.substr(8, 8)),
                RA_OF_ASC_NODE: parseFloat(line2.substr(17, 8)),
                ARG_OF_PERICENTER: parseFloat(line2.substr(34, 8)),
                MEAN_ANOMALY: parseFloat(line2.substr(43, 8)),
                CLASSIFICATION_TYPE: line1.substr(7, 1),
                NORAD_CAT_ID: parseInt(line1.substr(2, 5)),
                ELEMENT_SET_NO: parseInt(line1.substr(65, 3)),
                REV_AT_EPOCH: parseInt(line2.substr(63, 5)),
                BSTAR: parseFloat(line1.substr(54, 7)) / Math.pow(10, Math.abs(parseInt(line1.substr(60, 1)) + 5)),
                MEAN_MOTION_DOT: parseFloat(line1.substr(33, 10)),
                MEAN_MOTION_DDOT: parseFloat(line1.substr(44, 8)),
                CHECKSUM: parseInt(line1.substr(68, 1))
            };

            satellites.push(satellite);
        }

        if (toJSON) {
            return JSON.stringify(satellites, null, 2);
        }

        return satellites;
    }
}