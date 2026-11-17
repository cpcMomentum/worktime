import { n as e, r as t, t as n } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
import { t as r } from "./isSameWeek-IUVRx6Bb.chunk.mjs";
// node_modules/date-fns/locale/it/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "meno di un secondo",
		other: "meno di {{count}} secondi"
	},
	xSeconds: {
		one: "un secondo",
		other: "{{count}} secondi"
	},
	halfAMinute: "alcuni secondi",
	lessThanXMinutes: {
		one: "meno di un minuto",
		other: "meno di {{count}} minuti"
	},
	xMinutes: {
		one: "un minuto",
		other: "{{count}} minuti"
	},
	aboutXHours: {
		one: "circa un'ora",
		other: "circa {{count}} ore"
	},
	xHours: {
		one: "un'ora",
		other: "{{count}} ore"
	},
	xDays: {
		one: "un giorno",
		other: "{{count}} giorni"
	},
	aboutXWeeks: {
		one: "circa una settimana",
		other: "circa {{count}} settimane"
	},
	xWeeks: {
		one: "una settimana",
		other: "{{count}} settimane"
	},
	aboutXMonths: {
		one: "circa un mese",
		other: "circa {{count}} mesi"
	},
	xMonths: {
		one: "un mese",
		other: "{{count}} mesi"
	},
	aboutXYears: {
		one: "circa un anno",
		other: "circa {{count}} anni"
	},
	xYears: {
		one: "un anno",
		other: "{{count}} anni"
	},
	overXYears: {
		one: "più di un anno",
		other: "più di {{count}} anni"
	},
	almostXYears: {
		one: "quasi un anno",
		other: "quasi {{count}} anni"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : a.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "tra " + r : r + " fa" : r;
}, o = [
	"domenica",
	"lunedì",
	"martedì",
	"mercoledì",
	"giovedì",
	"venerdì",
	"sabato"
];
function s(e) {
	switch (e) {
		case 0: return "'domenica scorsa alle' p";
		default: return "'" + o[e] + " scorso alle' p";
	}
}
function c(e) {
	return "'" + o[e] + " alle' p";
}
function l(e) {
	switch (e) {
		case 0: return "'domenica prossima alle' p";
		default: return "'" + o[e] + " prossimo alle' p";
	}
}
var u = {
	lastWeek: (e, t, n) => {
		let i = e.getDay();
		return r(e, t, n) ? c(i) : s(i);
	},
	yesterday: "'ieri alle' p",
	today: "'oggi alle' p",
	tomorrow: "'domani alle' p",
	nextWeek: (e, t, n) => {
		let i = e.getDay();
		return r(e, t, n) ? c(i) : l(i);
	},
	other: "P"
}, d = (e, t, n, r) => {
	let i = u[e];
	return typeof i == "function" ? i(t, n, r) : i;
}, f = {
	ordinalNumber: (e, t) => {
		let n = Number(e);
		return String(n);
	},
	era: t({
		values: {
			narrow: ["aC", "dC"],
			abbreviated: ["a.C.", "d.C."],
			wide: ["avanti Cristo", "dopo Cristo"]
		},
		defaultWidth: "wide"
	}),
	quarter: t({
		values: {
			narrow: [
				"1",
				"2",
				"3",
				"4"
			],
			abbreviated: [
				"T1",
				"T2",
				"T3",
				"T4"
			],
			wide: [
				"1º trimestre",
				"2º trimestre",
				"3º trimestre",
				"4º trimestre"
			]
		},
		defaultWidth: "wide",
		argumentCallback: (e) => e - 1
	}),
	month: t({
		values: {
			narrow: [
				"G",
				"F",
				"M",
				"A",
				"M",
				"G",
				"L",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			abbreviated: [
				"gen",
				"feb",
				"mar",
				"apr",
				"mag",
				"giu",
				"lug",
				"ago",
				"set",
				"ott",
				"nov",
				"dic"
			],
			wide: [
				"gennaio",
				"febbraio",
				"marzo",
				"aprile",
				"maggio",
				"giugno",
				"luglio",
				"agosto",
				"settembre",
				"ottobre",
				"novembre",
				"dicembre"
			]
		},
		defaultWidth: "wide"
	}),
	day: t({
		values: {
			narrow: [
				"D",
				"L",
				"M",
				"M",
				"G",
				"V",
				"S"
			],
			short: [
				"dom",
				"lun",
				"mar",
				"mer",
				"gio",
				"ven",
				"sab"
			],
			abbreviated: [
				"dom",
				"lun",
				"mar",
				"mer",
				"gio",
				"ven",
				"sab"
			],
			wide: [
				"domenica",
				"lunedì",
				"martedì",
				"mercoledì",
				"giovedì",
				"venerdì",
				"sabato"
			]
		},
		defaultWidth: "wide"
	}),
	dayPeriod: t({
		values: {
			narrow: {
				am: "m.",
				pm: "p.",
				midnight: "mezzanotte",
				noon: "mezzogiorno",
				morning: "mattina",
				afternoon: "pomeriggio",
				evening: "sera",
				night: "notte"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "mezzanotte",
				noon: "mezzogiorno",
				morning: "mattina",
				afternoon: "pomeriggio",
				evening: "sera",
				night: "notte"
			},
			wide: {
				am: "AM",
				pm: "PM",
				midnight: "mezzanotte",
				noon: "mezzogiorno",
				morning: "mattina",
				afternoon: "pomeriggio",
				evening: "sera",
				night: "notte"
			}
		},
		defaultWidth: "wide",
		formattingValues: {
			narrow: {
				am: "m.",
				pm: "p.",
				midnight: "mezzanotte",
				noon: "mezzogiorno",
				morning: "di mattina",
				afternoon: "del pomeriggio",
				evening: "di sera",
				night: "di notte"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "mezzanotte",
				noon: "mezzogiorno",
				morning: "di mattina",
				afternoon: "del pomeriggio",
				evening: "di sera",
				night: "di notte"
			},
			wide: {
				am: "AM",
				pm: "PM",
				midnight: "mezzanotte",
				noon: "mezzogiorno",
				morning: "di mattina",
				afternoon: "del pomeriggio",
				evening: "di sera",
				night: "di notte"
			}
		},
		defaultFormattingWidth: "wide"
	})
}, p = {
	ordinalNumber: n({
		matchPattern: /^(\d+)(º)?/i,
		parsePattern: /\d+/i,
		valueCallback: (e) => parseInt(e, 10)
	}),
	era: e({
		matchPatterns: {
			narrow: /^(aC|dC)/i,
			abbreviated: /^(a\.?\s?C\.?|a\.?\s?e\.?\s?v\.?|d\.?\s?C\.?|e\.?\s?v\.?)/i,
			wide: /^(avanti Cristo|avanti Era Volgare|dopo Cristo|Era Volgare)/i
		},
		defaultMatchWidth: "wide",
		parsePatterns: { any: [/^a/i, /^(d|e)/i] },
		defaultParseWidth: "any"
	}),
	quarter: e({
		matchPatterns: {
			narrow: /^[1234]/i,
			abbreviated: /^t[1234]/i,
			wide: /^[1234](º)? trimestre/i
		},
		defaultMatchWidth: "wide",
		parsePatterns: { any: [
			/1/i,
			/2/i,
			/3/i,
			/4/i
		] },
		defaultParseWidth: "any",
		valueCallback: (e) => e + 1
	}),
	month: e({
		matchPatterns: {
			narrow: /^[gfmalsond]/i,
			abbreviated: /^(gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic)/i,
			wide: /^(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)/i
		},
		defaultMatchWidth: "wide",
		parsePatterns: {
			narrow: [
				/^g/i,
				/^f/i,
				/^m/i,
				/^a/i,
				/^m/i,
				/^g/i,
				/^l/i,
				/^a/i,
				/^s/i,
				/^o/i,
				/^n/i,
				/^d/i
			],
			any: [
				/^ge/i,
				/^f/i,
				/^mar/i,
				/^ap/i,
				/^mag/i,
				/^gi/i,
				/^l/i,
				/^ag/i,
				/^s/i,
				/^o/i,
				/^n/i,
				/^d/i
			]
		},
		defaultParseWidth: "any"
	}),
	day: e({
		matchPatterns: {
			narrow: /^[dlmgvs]/i,
			short: /^(do|lu|ma|me|gi|ve|sa)/i,
			abbreviated: /^(dom|lun|mar|mer|gio|ven|sab)/i,
			wide: /^(domenica|luned[i|ì]|marted[i|ì]|mercoled[i|ì]|gioved[i|ì]|venerd[i|ì]|sabato)/i
		},
		defaultMatchWidth: "wide",
		parsePatterns: {
			narrow: [
				/^d/i,
				/^l/i,
				/^m/i,
				/^m/i,
				/^g/i,
				/^v/i,
				/^s/i
			],
			any: [
				/^d/i,
				/^l/i,
				/^ma/i,
				/^me/i,
				/^g/i,
				/^v/i,
				/^s/i
			]
		},
		defaultParseWidth: "any"
	}),
	dayPeriod: e({
		matchPatterns: {
			narrow: /^(a|m\.|p|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i,
			any: /^([ap]\.?\s?m\.?|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i
		},
		defaultMatchWidth: "any",
		parsePatterns: { any: {
			am: /^a/i,
			pm: /^p/i,
			midnight: /^mezza/i,
			noon: /^mezzo/i,
			morning: /mattina/i,
			afternoon: /pomeriggio/i,
			evening: /sera/i,
			night: /notte/i
		} },
		defaultParseWidth: "any"
	})
};
export { a as i, f as n, d as r, p as t };
