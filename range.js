//#!node

"use strict";

class DE5000Range {
	static translate(definition) {
		const ret = {};
		for (let key in definition) if (definition.hasOwnProperty(key)) {
			ret[key] = definition[key].map( (r) => new DE5000Range(...r) );
		}
		return ret;
	}

	constructor(range, resolution, freq100or120, freq1k, freq10k, freq100k) {
		this.range = range;
		this.resolution = resolution;
		this.freq100or120 = freq100or120;
		this.freq1k = freq1k || freq100or120;
		this.freq10k = freq10k || freq100or120;
		this.freq100k = freq100k || freq100or120;

		const r = range.match(/\(?(\d+)(?:[.](\d+))?([a-zA-Z]+)\)?/);
		this.dot = r[1].length;
		this.unit = r[3];
	}

	freq (f) {
		switch (f) {
			case "100 Hz":
			case "120 Hz":
			case "0":
				return this.freq100or120;
			case "1 kHz":
				return this.freq1k;
			case "10 kHz":
				return this.freq10k;
			case "100 kHz":
				return this.freq100k;
		}
	}
}

const DE5000Ranges = Object.freeze(DE5000Range.translate({
	R: [
		/* range    , resolution , 100/120Hz , 1kHz      , 10kHz     , 100kHz*/
		["20.000Ohm"   , "0.001Ohm"    , "-"       , "1.0%+3*" , "1.0%+3*" , "2.0%+3*"] , 
		["200.00Ohm"   , "0.01Ohm"     , "1.0%+3"  , "0.3%+2"  , "0.3%+2"  , "0.6%+3"]  , 
		["2.0000kOhm"  , "0.0001kOhm"  , "0.3%+2"  , "0.3%+2"  , "0.3%+2"  , "0.6%+3"]  , 
		["20.000kOhm"  , "0.001kOhm"   , "0.3%+2"  , "0.3%+2"  , "0.3%+2"  , "0.6%+3"]  , 
		["200.00kOhm"  , "0.01kOhm"    , "0.5%+2"  , "0.5%+2"  , "0.5%+2"  , "1.0%+3"]  , 
		["2.0000MOhm"  , "0.0001MOhm"  , "1.0%+3"  , "1.0%+3"  , "1.0%+3"  , "-"]       , 
		["(2.000MOhm)" , "0.001MOhm"   , "-"       , "-"       , "-"       , "2.0%+3*"] , 
		["20.000MOhm"  , "0.001MOhm"   , "2.0%+3*" , "2.0%+3*" , "-"       , "-"]       , 
		["(20.00MOhm)" , "0.01MOhm"    , "-"       , "-"       , "2.0%+3*" , "-"]       , 
		["200.0MOhm"   , "0.1MOhm"     , "2.0%+3*" , "2.0%+3*" , "-"       , "-"]       , 
	],
	C: [
		/* range     , resolution , 100/120Hz , 1kHz      , 10kHz                , 100kHz*/
		["200.00pF"  , "0.01pF"   , "-"       , "-"       , "1.2%+5*"            , "2.0%+5*"]           , 
		["2000.0pF"  , "0.1pF"    , "-"       , "2.0%+3*" , "0.3%+2"             , "0.6%+3"]            , 
		["20.000nF"  , "0.001nF"  , "2.0%+3*" , "0.3%+2"  , "0.3%+2"             , "0.6%+3"]            , 
		["200.00nF"  , "0.01nF"   , "0.3%+2"  , "0.3%+2"  , "0.3%+2"             , "0.6%+3"]            , 
		["2000.0nF"  , "0.1nF"    , "0.3%+2"  , "0.3%+2"  , "0.6%+2"             , "2.0%+5*"]           , 
		["20.000uF"  , "0.001uF"  , "0.3%+2"  , "0.6%+2"  , "1.2%+5*"            , "-"]                 , 
		["(20.00uF)" , "0.01uF"   , "-"       , "-"       , "-"                  , "3.0%+5(10uFmax.)*"] , 
		["200.00uF"  , "0.01uF"   , "0.6%+2"  , "1.0%+3*" , "-"                  , "-"]                 , 
		["(200.0uF)" , "0.1uF"    , "-"       , "-"       , "3.0%+5(100uFmax.)*" , "-"]                 , 
		["2000.0uF"  , "0.1uF"    , "1.0%+3*" , "-"       , "-"                  , "-"]                 , 
		["(2000uF)"  , "1uF"      , "-"       , "1.2%+3*" , "-"                  , "-"]                 , 
		["20.00mF"   , "0.01mF"   , "1.2%+3*" , "-"       , "-"                  , "-"]                 , 
	],
	L: [
		/* range    , resolution , 100/120Hz , 1kHz      , 10kHz     , 100kHz*/
		["20.000uH" , "0.001uH"  , "-"       , "-"       , "-"       , "2.5%+5*"] , 
		["200.00uH" , "0.01uH"   , "-"       , "-"       , "1.2%+5*" , "0.6%+3"]  , 
		["2000.0uH" , "0.1uH"    , "-"       , "2.0%+5*" , "0.6%+3"  , "0.6%+3"]  , 
		["20.000mH" , "0.001mH"  , "1.2%+5*" , "1.0%+5"  , "0.3%+2"  , "0.6%+3"]  , 
		["200.00mH" , "0.01mH"   , "0.3%+2"  , "0.6%+3"  , "0.3%+2"  , "1.2%+5*"] , 
		["2000.0mH" , "0.1mH"    , "0.3%+2"  , "0.3%+2"  , "0.6%+3"  , "-"]       , 
		["20.000H"  , "0.001H"   , "0.3%+2"  , "0.6%+3"  , "1.2%+5*" , "-"]       , 
		["200.0H"   , "0.1H"     , "0.6%+3"  , "1.2%+5*" , "-"       , "-"]       , 
		["2.000kH"  , "0.001kH"  , "1.2%+5*" , "-"       , "-"       , "-"]       , 
	]           , 
	DCR: [
		/* range   , resolution , - */
		["200.00Ohm"  , "0.01Ohm"     , "1.0%+3*"] , 
		["2.0000kOhm" , "0.0001kOhm"  , "0.2%+2"]  , 
		["20.000kOhm" , "0.001kOhm"   , "0.2%+2"]  , 
		["200.00kOhm" , "0.01kOhm"    , "0.5%+2"]  , 
		["2.0000MOhm" , "0.0001MOhm"  , "1.0%+3"]  , 
		["20.000MOhm" , "0.001MOhm"   , "2.0%+3*"] , 
		["200.0MOhm"  , "0.1MOhm"     , "2.0%+3*"]
	]
}));

/*
const q = 'C';
const unit = 'uF';
const digit = 1999;

for (let r of DE5000Ranges[q].filter((r) => r.freq1k !== '-')) {
	if (r.unit === unit) {
		const count = 2 * Math.pow(10, r.dot - 1);
		if (digit < count) {
			console.log(r, digit, r.dot);
			break;
		}
	}
}
*/
