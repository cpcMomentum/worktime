import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/nn/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "mindre enn eitt sekund",
		other: "mindre enn {{count}} sekund"
	},
	xSeconds: {
		one: "eitt sekund",
		other: "{{count}} sekund"
	},
	halfAMinute: "eit halvt minutt",
	lessThanXMinutes: {
		one: "mindre enn eitt minutt",
		other: "mindre enn {{count}} minutt"
	},
	xMinutes: {
		one: "eitt minutt",
		other: "{{count}} minutt"
	},
	aboutXHours: {
		one: "omtrent ein time",
		other: "omtrent {{count}} timar"
	},
	xHours: {
		one: "ein time",
		other: "{{count}} timar"
	},
	xDays: {
		one: "ein dag",
		other: "{{count}} dagar"
	},
	aboutXWeeks: {
		one: "omtrent ei veke",
		other: "omtrent {{count}} veker"
	},
	xWeeks: {
		one: "ei veke",
		other: "{{count}} veker"
	},
	aboutXMonths: {
		one: "omtrent ein månad",
		other: "omtrent {{count}} månader"
	},
	xMonths: {
		one: "ein månad",
		other: "{{count}} månader"
	},
	aboutXYears: {
		one: "omtrent eitt år",
		other: "omtrent {{count}} år"
	},
	xYears: {
		one: "eitt år",
		other: "{{count}} år"
	},
	overXYears: {
		one: "over eitt år",
		other: "over {{count}} år"
	},
	almostXYears: {
		one: "nesten eitt år",
		other: "nesten {{count}} år"
	}
}, a = [
	"null",
	"ein",
	"to",
	"tre",
	"fire",
	"fem",
	"seks",
	"sju",
	"åtte",
	"ni",
	"ti",
	"elleve",
	"tolv"
], o = (e, t, n) => {
	let r, o = i[e];
	return r = typeof o == "string" ? o : t === 1 ? o.one : o.other.replace("{{count}}", t < 13 ? a[t] : String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "om " + r : r + " sidan" : r;
}, s = {
	date: e({
		formats: {
			full: "EEEE d. MMMM y",
			long: "d. MMMM y",
			medium: "d. MMM y",
			short: "dd.MM.y"
		},
		defaultWidth: "full"
	}),
	time: e({
		formats: {
			full: "'kl'. HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: e({
		formats: {
			full: "{{date}} 'kl.' {{time}}",
			long: "{{date}} 'kl.' {{time}}",
			medium: "{{date}} {{time}}",
			short: "{{date}} {{time}}"
		},
		defaultWidth: "full"
	})
}, c = {
	lastWeek: "'førre' eeee 'kl.' p",
	yesterday: "'i går kl.' p",
	today: "'i dag kl.' p",
	tomorrow: "'i morgon kl.' p",
	nextWeek: "EEEE 'kl.' p",
	other: "P"
}, l = {
	code: "nn",
	formatDistance: o,
	formatLong: s,
	formatRelative: (e, t, n, r) => c[e],
	localize: {
		ordinalNumber: (e, t) => Number(e) + ".",
		era: n({
			values: {
				narrow: ["f.Kr.", "e.Kr."],
				abbreviated: ["f.Kr.", "e.Kr."],
				wide: ["før Kristus", "etter Kristus"]
			},
			defaultWidth: "wide"
		}),
		quarter: n({
			values: {
				narrow: [
					"1",
					"2",
					"3",
					"4"
				],
				abbreviated: [
					"Q1",
					"Q2",
					"Q3",
					"Q4"
				],
				wide: [
					"1. kvartal",
					"2. kvartal",
					"3. kvartal",
					"4. kvartal"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: {
				narrow: [
					"J",
					"F",
					"M",
					"A",
					"M",
					"J",
					"J",
					"A",
					"S",
					"O",
					"N",
					"D"
				],
				abbreviated: [
					"jan.",
					"feb.",
					"mars",
					"apr.",
					"mai",
					"juni",
					"juli",
					"aug.",
					"sep.",
					"okt.",
					"nov.",
					"des."
				],
				wide: [
					"januar",
					"februar",
					"mars",
					"april",
					"mai",
					"juni",
					"juli",
					"august",
					"september",
					"oktober",
					"november",
					"desember"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"S",
					"M",
					"T",
					"O",
					"T",
					"F",
					"L"
				],
				short: [
					"su",
					"må",
					"ty",
					"on",
					"to",
					"fr",
					"lau"
				],
				abbreviated: [
					"sun",
					"mån",
					"tys",
					"ons",
					"tor",
					"fre",
					"laur"
				],
				wide: [
					"sundag",
					"måndag",
					"tysdag",
					"onsdag",
					"torsdag",
					"fredag",
					"laurdag"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "midnatt",
					noon: "middag",
					morning: "på morg.",
					afternoon: "på etterm.",
					evening: "på kvelden",
					night: "på natta"
				},
				abbreviated: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "midnatt",
					noon: "middag",
					morning: "på morg.",
					afternoon: "på etterm.",
					evening: "på kvelden",
					night: "på natta"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "midnatt",
					noon: "middag",
					morning: "på morgonen",
					afternoon: "på ettermiddagen",
					evening: "på kvelden",
					night: "på natta"
				}
			},
			defaultWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)\.?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^(f\.? ?Kr\.?|fvt\.?|e\.? ?Kr\.?|evt\.?)/i,
				abbreviated: /^(f\.? ?Kr\.?|fvt\.?|e\.? ?Kr\.?|evt\.?)/i,
				wide: /^(før Kristus|før vår tid|etter Kristus|vår tid)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^f/i, /^e/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](\.)? kvartal/i
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
		month: t({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mars?|apr|mai|juni?|juli?|aug|sep|okt|nov|des)\.?/i,
				wide: /^(januar|februar|mars|april|mai|juni|juli|august|september|oktober|november|desember)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^mai/i,
					/^jun/i,
					/^jul/i,
					/^aug/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^[smtofl]/i,
				short: /^(su|må|ty|on|to|fr|la)/i,
				abbreviated: /^(sun|mån|tys|ons|tor|fre|laur)/i,
				wide: /^(sundag|måndag|tysdag|onsdag|torsdag|fredag|laurdag)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/^s/i,
				/^m/i,
				/^ty/i,
				/^o/i,
				/^to/i,
				/^f/i,
				/^l/i
			] },
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(midnatt|middag|(på) (morgonen|ettermiddagen|kvelden|natta)|[ap])/i,
				any: /^([ap]\.?\s?m\.?|midnatt|middag|(på) (morgonen|ettermiddagen|kvelden|natta))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a(\.?\s?m\.?)?$/i,
				pm: /^p(\.?\s?m\.?)?$/i,
				midnight: /^midn/i,
				noon: /^midd/i,
				morning: /morgon/i,
				afternoon: /ettermiddag/i,
				evening: /kveld/i,
				night: /natt/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { l as default, l as nn };
