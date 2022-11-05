
class DE5000LCD {
	constructor(svg, opts) {
		this.svg = svg;
		this.primaryDisplayStatus = 'normal';
		this.secondaryDisplayStatus = 'normal';

		console.log({svg});
		svg.style.width = "100%";
		svg.style.height = "auto";
		svg.style.padding = "10px";
		svg.style.background = "#7d8b5a";
		svg.style.borderRadius = "10px";
		svg.style.boxShadow = "inset 0px 0px 6px -1px rgb(0 0 0 / 80%)";
		svg.querySelectorAll('g[inkscape\\:label="digits"] > g').forEach((g) => {
			g.style.stroke = svg.style.background;
		});

		this.segments = {};
		this.segments.primary = {};
		this.segments.primary.quantity = {};
		this.segments.primary.quantity.Ls = this.findByLabels('primary quantity Ls');
		this.segments.primary.quantity.Lp = this.findByLabels('primary quantity Lp');
		this.segments.primary.quantity.Cs = this.findByLabels('primary quantity Cs');
		this.segments.primary.quantity.Cp = this.findByLabels('primary quantity Cp');
		this.segments.primary.quantity.Rs = this.findByLabels('primary quantity Rs');
		this.segments.primary.quantity.Rp = this.findByLabels('primary quantity Rp');
		this.segments.primary.quantity.DCR = this.findByLabels('primary quantity DCR');

		this.segments.primary.unit = {};
		this.segments.primary.unit.ohm = this.findByLabels('primary unit ohmunit ohm');
		this.segments.primary.unit.ohm_kilo = this.findByLabels('primary unit ohmunit kilo');
		this.segments.primary.unit.ohm_mega = this.findByLabels('primary unit ohmunit mega');

		this.segments.primary.unit.farad = this.findByLabels('primary unit faradunit F');
		this.segments.primary.unit.farad_pico = this.findByLabels('primary unit faradunit p');
		this.segments.primary.unit.farad_nano = this.findByLabels('primary unit faradunit nano');
		this.segments.primary.unit.farad_micro = this.findByLabels('primary unit faradunit micro');
		this.segments.primary.unit.farad_milli = this.findByLabels('primary unit faradunit milli');

		this.segments.primary.unit.henry = this.findByLabels('primary unit henryunit H');
		this.segments.primary.unit.henry_nano = this.findByLabels('primary unit henryunit nano');
		this.segments.primary.unit.henry_milli = this.findByLabels('primary unit henryunit milli');
		this.segments.primary.unit.henry_micro = this.findByLabels('primary unit henryunit micro');

		this.segments.primary.digits = this._collectDigits('primary digits');

		this.segments.secondary = {};
		this.segments.secondary.quantity = {};
		this.segments.secondary.quantity.theta = this.findByLabels('secondary quantity theta');
		this.segments.secondary.quantity.Q = this.findByLabels('secondary quantity Q');
		this.segments.secondary.quantity.D = this.findByLabels('secondary quantity D');
		this.segments.secondary.quantity.RP = this.findByLabels('secondary quantity RP');
		this.segments.secondary.quantity.ESR = this.findByLabels('secondary quantity ESR');

		this.segments.secondary.unit = {};

		this.segments.secondary.unit.degree = this.findByLabels('secondary unit degree');
		this.segments.secondary.unit.percent = this.findByLabels('secondary unit percent');

		this.segments.secondary.unit.ohm = this.findByLabels('secondary unit ohmunit ohm');
		this.segments.secondary.unit.ohm_kilo = this.findByLabels('secondary unit ohmunit kilo');
		this.segments.secondary.unit.ohm_mega = this.findByLabels('secondary unit ohmunit mega');

		this.segments.secondary.unit.farad = this.findByLabels('secondary unit faradunit F');
		this.segments.secondary.unit.farad_pico = this.findByLabels('secondary unit faradunit p');
		this.segments.secondary.unit.farad_nano = this.findByLabels('secondary unit faradunit nano');
		this.segments.secondary.unit.farad_micro = this.findByLabels('secondary unit faradunit micro');
		this.segments.secondary.unit.farad_milli = this.findByLabels('secondary unit faradunit milli');

		this.segments.secondary.unit.henry = this.findByLabels('secondary unit henryunit H');
		this.segments.secondary.unit.henry_nano = this.findByLabels('secondary unit henryunit nano');
		this.segments.secondary.unit.henry_milli = this.findByLabels('secondary unit henryunit milli');
		this.segments.secondary.unit.henry_micro = this.findByLabels('secondary unit henryunit micro');
		this.segments.secondary.digits = this._collectDigits('secondary digits');

		this.segments.testFrequency = {};
		this.segments.testFrequency.Hz = this.findByLabels('freq Hz');
		this.segments.testFrequency.k = this.findByLabels('freq k');
		this.segments.testFrequency.freq100 = this.findByLabels('freq f100');
		this.segments.testFrequency.freq10 = this.findByLabels('freq f10');
		this.segments.testFrequency.freq1 = this.findByLabels('freq f1');
		this.segments.testFrequency.freq120 = this.findByLabels('freq f120');

		this.segments.state = {};
		this.segments.state.HOLD = this.findByLabels('state HOLD');
		this.segments.state.Sorting = this.findByLabels('state Sorting');
		this.segments.state.Cal = this.findByLabels('state Cal');
		this.segments.state.APO = this.findByLabels('state APO');
		this.segments.state.delta = this.findByLabels('state delta');
		this.segments.state.Auto = this.findByLabels('state Auto');
		this.segments.state.Range = this.findByLabels('state range');
		this.segments.state.LCR = this.findByLabels('state LCR');

		console.log(this.segments);

		this.findByLabels('state tolerance').style.visibility = 'hidden';
		this.segments.state.APO.style.visibility = 'hidden';
	}

	setHoldState (state) {
		this.segments.state.HOLD.style.visibility = state ? 'visible' : 'hidden';
	}

	setSortingState (state) {
		this.segments.state.Sorting.style.visibility = state ? 'visible' : 'hidden';
	}

	setCalState (state) {
		this.segments.state.Cal.style.visibility = state ? 'visible' : 'hidden';
	}

	setRangeState (state) {
		this.segments.state.Range.style.visibility = state ? 'visible' : 'hidden';
	}

	setAutoState (state) {
		this.segments.state.Auto.style.visibility = state ? 'visible' : 'hidden';
	}

	setDeltaState (state) {
		this.segments.state.delta.style.visibility = state ? 'visible' : 'hidden';
	}

	setLCRState (state) {
		this.segments.state.LCR.style.visibility = state ? 'visible' : 'hidden';
	}

	setPrimaryDigit (v, range, multiplier) {
		if (this.primaryDisplayStatus !== 'normal') {
			return;
		}
		const chars = v.toFixed(range.dot !== undefined ? (5 - range.dot) : -multiplier).split('');
		while (chars.length < 5) chars.unshift('');
		const digits = [
			this.segments.primary.digits[5],
			this.segments.primary.digits[4],
			this.segments.primary.digits[3],
			this.segments.primary.digits[2],
			this.segments.primary.digits[1]
		];
		let p = 0;
		for (let c of chars) {
			if (p === 0 && c !== '1') {
				this._hideAll(digits[p]);
				p++;
			}

			if (c === '.') {
				digits[p-1].dot.style.visibility = 'visible';
			} else {
				this._hideAll(digits[p]);
				for (let s of this._encodeDigit(c)) {
					if (!digits[p][s]) continue;
					digits[p][s].style.visibility = 'visible';
				}
				p++;
			}

			if (p >= 5) break;
		}
	}

	setPrimaryDisplay (v) {
		this.primaryDisplayStatus = v;
		if (this.primaryDisplayStatus === 'normal') {
			return;
		}

		const digits = [
			this.segments.primary.digits[5],
			this.segments.primary.digits[4],
			this.segments.primary.digits[3],
			this.segments.primary.digits[2],
			this.segments.primary.digits[1]
		];

		for (let d of digits) {
			this._hideAll(d);
		}

		switch (v) {
			case 'blank':
				break;
			case 'lines':
				for (let s of this._encodeDigit('-')) {
					for (let d of digits) {
						if (!d[s]) continue;
						d[s].style.visibility = 'visible';
					}
				}
				break;
			case 'OL': // outside limits
				for (let s of this._encodeDigit('O')) {
					digits[2][s].style.visibility = 'visible';
				}
				for (let s of this._encodeDigit('L')) {
					digits[3][s].style.visibility = 'visible';
				}
				digits[3]['dot'].style.visibility = 'visible';
				break;
			case 'PASS':
			case 'FAIL':
			case 'OPEn':
			case 'Srt':
				// TODO
				break;
		}
	}

	setPrimaryQuantity (v) {
		this._hideAll(this.segments.primary.quantity);
		this.segments.primary.quantity[v].style.visibility = 'visible';
	}

	setPrimaryUnit (v) {
		this._hideAll(this.segments.primary.unit);
		switch (v) {
			case "Ohm":
				this.segments.primary.unit.ohm.style.visibility = 'visible';
				break;
			case "kOhm":
				this.segments.primary.unit.ohm.style.visibility = 'visible';
				this.segments.primary.unit.ohm_kilo.style.visibility = 'visible';
				break;
			case "MOhm":
				this.segments.primary.unit.ohm.style.visibility = 'visible';
				this.segments.primary.unit.ohm_mega.style.visibility = 'visible';
				break;
			case "?":
				break;
			case "uH":
				this.segments.primary.unit.henry.style.visibility = 'visible';
				this.segments.primary.unit.henry_micro.style.visibility = 'visible';
				break;
			case "mH":
				this.segments.primary.unit.henry.style.visibility = 'visible';
				this.segments.primary.unit.henry_milli.style.visibility = 'visible';
				break;
			case "H":
				this.segments.primary.unit.henry.style.visibility = 'visible';
				break;
			case "kH":
				this.segments.primary.unit.henry.style.visibility = 'visible';
				this.segments.primary.unit.ohm_kilo.style.visibility = 'visible';
				break;
			case "pF":
				this.segments.primary.unit.farad.style.visibility = 'visible';
				this.segments.primary.unit.farad_pico.style.visibility = 'visible';
				break;
			case "nF":
				this.segments.primary.unit.farad.style.visibility = 'visible';
				this.segments.primary.unit.farad_nano.style.visibility = 'visible';
				break;
			case "uF":
				this.segments.primary.unit.farad.style.visibility = 'visible';
				this.segments.primary.unit.farad_micro.style.visibility = 'visible';
				break;
			case "mF":
				this.segments.primary.unit.farad.style.visibility = 'visible';
				this.segments.primary.unit.farad_milli.style.visibility = 'visible';
				break;
		}
	}

	setSecondaryDigit (v, range, multiplier) {
		if (this.secondaryDisplayStatus !== 'normal') {
			return;
		}
		const chars = v.toFixed(range.dot !== undefined ? (4 - range.dot) : -multiplier).split('');
		console.log(v, chars);
		while (chars.length < 5) chars.unshift('');
		const digits = [
			this.segments.secondary.digits[4],
			this.segments.secondary.digits[3],
			this.segments.secondary.digits[2],
			this.segments.secondary.digits[1]
		];
		let p = 0;
		for (let c of chars) {
			if (c === '.') {
				digits[p-1].dot.style.visibility = 'visible';
			} else {
				this._hideAll(digits[p]);
				for (let s of this._encodeDigit(c)) {
					if (!digits[p][s]) continue;
					digits[p][s].style.visibility = 'visible';
				}
				p++;
			}

			if (p >= 4) break;
		}
	}

	setSecondaryDisplay (v) {
		this.secondaryDisplayStatus = v;
		if (this.secondaryDisplayStatus === 'normal') {
			return;
		}
		const digits = [
			this.segments.secondary.digits[4],
			this.segments.secondary.digits[3],
			this.segments.secondary.digits[2],
			this.segments.secondary.digits[1]
		];

		for (let d of digits) {
			this._hideAll(d);
		}

		switch (v) {
			case 'blank':
				break;
			case 'lines':
				for (let s of this._encodeDigit('-')) {
					for (let d of digits) {
						if (!d[s]) continue;
						d[s].style.visibility = 'visible';
					}
				}
				break;
			case 'OL': // outside limits
				for (let s of this._encodeDigit('O')) {
					digits[1][s].style.visibility = 'visible';
				}
				for (let s of this._encodeDigit('L')) {
					digits[2][s].style.visibility = 'visible';
				}
				digits[2]['dot'].style.visibility = 'visible';
				break;
			case 'PASS':
			case 'FAIL':
			case 'OPEn':
			case 'Srt':
				// TODO
				break;
		}
	}

	setSecondaryQuantity (v) {
		this._hideAll(this.segments.secondary.quantity);
		if (v === 'none') return;
		this.segments.secondary.quantity[v].style.visibility = 'visible';
	}

	setSecondaryUnit (v) {
		this._hideAll(this.segments.secondary.unit);
		switch (v) {
			case "degree":
				this.segments.secondary.unit.degree.style.visibility = 'visible';
				break;
			case "Ohm":
				this.segments.secondary.unit.ohm.style.visibility = 'visible';
				break;
			case "kOhm":
				this.segments.secondary.unit.ohm.style.visibility = 'visible';
				this.segments.secondary.unit.ohm_kilo.style.visibility = 'visible';
				break;
			case "MOhm":
				this.segments.secondary.unit.ohm.style.visibility = 'visible';
				this.segments.secondary.unit.ohm_mega.style.visibility = 'visible';
				break;
			case "?":
				break;
			case "uH":
				this.segments.secondary.unit.henry.style.visibility = 'visible';
				this.segments.secondary.unit.henry_micro.style.visibility = 'visible';
				break;
			case "mH":
				this.segments.secondary.unit.henry.style.visibility = 'visible';
				this.segments.secondary.unit.henry_milli.style.visibility = 'visible';
				break;
			case "H":
				this.segments.secondary.unit.henry.style.visibility = 'visible';
				break;
			case "kH":
				this.segments.secondary.unit.henry.style.visibility = 'visible';
				this.segments.secondary.unit.ohm_kilo.style.visibility = 'visible';
				break;
			case "pF":
				this.segments.secondary.unit.farad.style.visibility = 'visible';
				this.segments.secondary.unit.farad_pico.style.visibility = 'visible';
				break;
			case "nF":
				this.segments.secondary.unit.farad.style.visibility = 'visible';
				this.segments.secondary.unit.farad_nano.style.visibility = 'visible';
				break;
			case "uF":
				this.segments.secondary.unit.farad.style.visibility = 'visible';
				this.segments.secondary.unit.farad_micro.style.visibility = 'visible';
				break;
			case "mF":
				this.segments.secondary.unit.farad.style.visibility = 'visible';
				this.segments.secondary.unit.farad_milli.style.visibility = 'visible';
				break;
		}
	}

	setTestFrequency (v) {
		this._hideAll(this.segments.testFrequency);
		switch (v) {
			case "100 Hz":
				this.segments.testFrequency.Hz.style.visibility = 'visible';
				this.segments.testFrequency.freq100.style.visibility = 'visible';
				break;
			case "120 Hz":
				this.segments.testFrequency.Hz.style.visibility = 'visible';
				this.segments.testFrequency.freq120.style.visibility = 'visible';
				break;
			case "1 kHz":
				this.segments.testFrequency.Hz.style.visibility = 'visible';
				this.segments.testFrequency.k.style.visibility = 'visible';
				this.segments.testFrequency.freq1.style.visibility = 'visible';
				break;
			case "10 kHz":
				this.segments.testFrequency.Hz.style.visibility = 'visible';
				this.segments.testFrequency.k.style.visibility = 'visible';
				this.segments.testFrequency.freq10.style.visibility = 'visible';
				break;
			case "100 kHz":
				this.segments.testFrequency.Hz.style.visibility = 'visible';
				this.segments.testFrequency.k.style.visibility = 'visible';
				this.segments.testFrequency.freq100.style.visibility = 'visible';
				break;
			case "0":
				break;
		}
	}

	_hideAll(parent) {
		for (let key in parent) if (parent.hasOwnProperty(key)) {
			parent[key].style.visibility = 'hidden';
		}
	}

	_encodeDigit (d) {
		switch (d) {
			case '0': return ['a', 'b', 'c', 'd', 'e', 'f'];
			case '1': return ['b', 'c'];
			case '2': return ['a', 'b', 'd', 'e', 'g'];
			case '3': return ['a', 'b', 'c', 'd', 'g'];
			case '4': return ['b', 'c', 'f', 'g'];
			case '5': return ['a', 'c', 'd', 'f', 'g'];
			case '6': return ['a', 'c', 'd', 'e', 'f', 'g'];
			case '7': return ['a', 'b', 'c', 'f'];
			case '8': return ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
			case '9': return ['a', 'b', 'c', 'd', 'f', 'g'];

			case 'S': return ['a', 'c', 'd', 'f', 'g'];
			case 'r': return ['e', 'g'];
			case 't': return ['d', 'e', 'f', 'g'];
			case 'O': return ['a', 'b', 'c', 'd', 'e', 'f'];
			case 'P': return ['a', 'b', 'e', 'f', 'g'];
			case 'E': return ['a', 'd', 'e', 'f', 'g'];
			case 'n': return ['c', 'e', 'g'];
			case 'L': return ['d', 'e', 'f'];
			case '-': return ['g'];
			default: return [];
		}
	}

	_collectDigits (label) {
		const digits = {};
		const root = this.findByLabels(label);
		console.log({root});
		for (let seg of root.querySelectorAll(':scope path, :scope rect')) {
			const s = seg.getAttribute('inkscape:label');
			const d = seg.parentNode.getAttribute('inkscape:label');
			digits[d] ||= {};
			digits[d][s] = seg;
		}
		console.log(digits);
		return digits;
	}

	findByLabels(label) {
		const selector = label.split(/\s+/).map((l) => `[inkscape\\:label="${l}"]`).join(' ');
		return this.svg.querySelector(selector);
	}
}

function DE5000DecoderStream() {
	// https://github.com/4x1md/de5000_lcr_py
	function parsePacket(packet) {
		if (! (packet[0x00] === 0x00 && packet[0x01] === 0x0d) ) {
			throw "invalid packet header";
		}
		if (! (packet[0x0F] === 0x0d && packet[0x10] === 0x0a) ) {
			throw "invalid packet footer";
		}
		const flags = packet[0x02];
		const config = packet[0x03];
		const toleranceInSortingMode = packet[0x04];

		const primaryMeasuredQuantity = [null, "L", "C", "R", "DCR"][packet[0x05]];
		const primaryMeasurementMSB = packet[0x06];
		const primaryMeasurementLSB = packet[0x07];
		const primaryMeasurementInfoMultiplier = packet[0x08] & 0x07; 
		const primaryMeasurementInfoUnit = ["", "Ohm", "kOhm", "MOhm", "?", "uH", "mH", "H", "kH", "pF", "nF", "uF", "mF", "%", "degree"][packet[0x08] >> 3];
		const primaryMeasurementDisplayStatus = ["normal", "blank", "lines", "OL", "PASS", "FAIL", "OPEn", "Srt"][packet[0x09] & 0x07];

		const secondaryMeasuredQuantity = ["none", "D", "Q", "ESR/RP", "theta"][packet[0xA]];
		const secondaryMeasurementMSB = packet[0x0B];
		const secondaryMeasurementLSB = packet[0x0C];
		const secondaryMeasurementInfoMultiplier = packet[0x0D] & 0x07; 
		const secondaryMeasurementInfoUnit = ["", "Ohm", "kOhm", "MOhm", "?", "uH", "mH", "H", "kH", "pF", "nF", "uF", "mF", "%", "degree"][packet[0x0D] >> 3];
		const secondaryMeasurementDisplayStatus = ["normal", "blank", "lines", "OL", "PASS", "FAIL", "OPEn", "Srt"][packet[0x0E] & 0x07];

		let secondaryMeasurementValue = (secondaryMeasurementMSB * 0x100 + secondaryMeasurementLSB);
		if (secondaryMeasurementInfoUnit === '%' || secondaryMeasurementInfoUnit === 'degree') {
			if ((secondaryMeasurementValue & (1<<15)) !== 0) {
				secondaryMeasurementValue -= (1<<16);
			}
		}
		secondaryMeasurementValue *= Math.pow(10, -secondaryMeasurementInfoMultiplier);

		return {
			primary: {
				quantity: primaryMeasuredQuantity,
				value: (primaryMeasurementMSB * 0x100 + primaryMeasurementLSB) * Math.pow(10, -primaryMeasurementInfoMultiplier),
				multiplier: -primaryMeasurementInfoMultiplier,
				unit: primaryMeasurementInfoUnit,
				display: primaryMeasurementDisplayStatus,
			},
			secondary: {
				quantity: secondaryMeasuredQuantity,
				value: secondaryMeasurementValue,
				multiplier: -secondaryMeasurementInfoMultiplier,
				unit: secondaryMeasurementInfoUnit,
				display: secondaryMeasurementDisplayStatus,
			},
			flags: {
				holdEnabled: (flags & (1<<0)) !== 0,
				referenceValue: (flags & (1<<1)) !== 0,
				deltaMode: (flags & (1<<2)) !== 0,
				calibrationMode: (flags & (1<<3)) !== 0,
				sortingMode: (flags & (1<<4)) !== 0,
				LCRAutoMode: (flags & (1<<5)) !== 0,
				autoRangeMode: (flags & (1<<6)) !== 0,
				parallel: (flags & (1<<7)) !== 0,
			},
			testFrequency: ["100 Hz", "120 Hz", "1 kHz", "10 kHz", "100 kHz", "0"][config>>5],
		};
	}

	const PACKET_SIZE = 17;
	const array = new ArrayBuffer(PACKET_SIZE * 2);
	const buffer = new Uint8Array(array);
	let len = 0;

	return new TransformStream({
		transform: function (chunk, controller) {
			buffer.set(chunk, len);
			len += chunk.length;
			if (len < PACKET_SIZE) {
				return;
			}
			for (let i = PACKET_SIZE - 1; i < len; i++) {
				if (buffer[i] === 0x0d && buffer[i+1] === 0x0a) {
					// footer found
					const packet = new Uint8Array(array, i + 2 - PACKET_SIZE, PACKET_SIZE);
					controller.enqueue(parsePacket(packet));

					buffer.copyWithin(0, i + 2);
					len -= PACKET_SIZE;
				}
			}

		}
	});
}

new Vue({
	el: '#app',
	vuetify: new Vuetify(),
	data: {
		history: [
			{
				"primary": {
					"quantity": "R",
					"value": 0.005,
					"multiplier": -3,
					"unit": "Ohm",
					"display": "normal",
					"range": new DE5000Range( "20.000Ohm", "0.001Ohm", "-", "1.0%+3*", "1.0%+3*", "2.0%+3*" )
				},
				"secondary": {
					"quantity": "theta",
					"value": -1.2000000000000002,
					"multiplier": -1,
					"unit": "degree",
					"display": "normal",
					"range": {}
				},
				"flags": {
					"holdEnabled": false,
					"referenceValue": false,
					"deltaMode": false,
					"calibrationMode": false,
					"sortingMode": false,
					"LCRAutoMode": true,
					"autoRangeMode": true,
					"parallel": false
				},
				"testFrequency": "1 kHz"
			}
		]
	},

	created: function () {
	},

	mounted: async function () {
		const res = await fetch('./de-5000.svg');
		const root = this.$refs.lcd;
		root.innerHTML = (await res.text()).
			replace(/<\?[^>]+>/, ''); // remove xml processing instruction
		const svg = root.querySelector('svg');
		this.lcd = new DE5000LCD(svg);
		setTimeout(() => {
			this.setLcd(this.history[0]);
		}, 1000);
	},

	methods: {
		connect: async function () {
			const port = await navigator.serial.requestPort();
			console.log(port);

			await port.open({
				baudRate: 9600,
			});

			const de5000Decoder = DE5000DecoderStream();
			const decoderPipeClosed = port.readable.pipeTo(de5000Decoder.writable);

			this.reader = de5000Decoder.readable.getReader();
			while (true) {
				const { value, done } = await this.reader.read();
				if (done) {
					console.log('done');
					this.reader.releaseLock();
					break;
				}

				value.primary.range = this.getRangeOf(value.primary.quantity, value.primary.unit, value.primary.value, value.testFrequency) || {};
				value.secondary.range = this.getRangeOf(value.secondary.quantity, value.secondary.unit, value.secondary.value, value.testFrequency) || {};
				console.log(value);
				this.setLcd(value);
				this.history.unshift(value);
			}

			await decoderPipeClosed.catch( () =>{});
			await port.close();
			console.log('port closed');
		},

		disconnect: async function () {
			console.log(this.reader);
			this.reader.cancel();
		},

		setLcd: function (v) {
			this.lcd.setHoldState(v.flags.holdEnabled);
			this.lcd.setDeltaState(v.flags.deltaMode);
			this.lcd.setCalState(v.flags.calibrationMode);
			this.lcd.setSortingState(v.flags.sortingMode);
			this.lcd.setLCRState(v.flags.LCRAutoMode);
			this.lcd.setAutoState(v.flags.autoRangeMode);
			this.lcd.setTestFrequency(v.testFrequency);
			this.lcd.setRangeState(false); // ?

			this.lcd.setPrimaryDisplay(v.primary.display);
			if (v.primary.quantity === 'DCR') {
				this.lcd.setPrimaryQuantity(v.primary.quantity);
			} else {
				this.lcd.setPrimaryQuantity(v.primary.quantity + (v.flags.parallel ? "p" : "s"));
			}
			this.lcd.setPrimaryDigit(v.primary.value, v.primary.range, v.primary.multiplier);
			this.lcd.setPrimaryUnit(v.primary.unit);

			this.lcd.setSecondaryDisplay(v.secondary.display);
			if (v.secondary.quantity === 'ESR/RP') {
				this.lcd.setSecondaryQuantity(v.flags.parallel ? 'RP' : 'ESR');
			} else {
				this.lcd.setSecondaryQuantity(v.secondary.quantity);
			}
			this.lcd.setSecondaryDigit(v.secondary.value, v.secondary.range, v.secondary.multiplier);
			this.lcd.setSecondaryUnit(v.secondary.unit);
		},

		getRangeOf: function (quantity, unit, digit, freq) {
			if (quantity === 'ESR/RP') {
				quantity = 'R';
			}
			if (!DE5000Ranges.hasOwnProperty(quantity)) {
				return null;
			}
			for (let r of DE5000Ranges[quantity].filter((r) => r.accuracy(freq) !== '-')) {
				if (r.unit === unit) {
					const count = 2 * Math.pow(10, r.dot - 1);
					if (digit < count) {
						return r;
					}
				}
			}
			return null;
		},

		primaryQuantityOf: function (v) {
			switch (v.primary.quantity) {
				case "L": return "L" + (v.flags.parallel? "p" : "s");
				case "C": return "C" + (v.flags.parallel? "p" : "s");
				case "R": return "R" + (v.flags.parallel? "p" : "s");
				case "DCR": return "DCR";
				default : return "";
			}
		},

		formatValue: function (v) {
			const range = v.range;
			const multiplier = v.multiplier;
			const unit = v.unit;
			return v.value.toFixed(range.dot !== undefined ? (5 - range.dot) : -multiplier) + this.formatUnit(unit);
		},

		formatUnit: function (unit) {
			if (!unit) return '';
			return unit.
				replace(/\s*Ohm/, ' \u03a9').
				replace(/\s*degree/, ' \u00b0');
		}
	}
});
