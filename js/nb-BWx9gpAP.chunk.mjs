import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/nb/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "mindre enn ett sekund",
		other: "mindre enn {{count}} sekunder"
	},
	xSeconds: {
		one: "ett sekund",
		other: "{{count}} sekunder"
	},
	halfAMinute: "et halvt minutt",
	lessThanXMinutes: {
		one: "mindre enn ett minutt",
		other: "mindre enn {{count}} minutter"
	},
	xMinutes: {
		one: "ett minutt",
		other: "{{count}} minutter"
	},
	aboutXHours: {
		one: "omtrent en time",
		other: "omtrent {{count}} timer"
	},
	xHours: {
		one: "en time",
		other: "{{count}} timer"
	},
	xDays: {
		one: "en dag",
		other: "{{count}} dager"
	},
	aboutXWeeks: {
		one: "omtrent en uke",
		other: "omtrent {{count}} uker"
	},
	xWeeks: {
		one: "en uke",
		other: "{{count}} uker"
	},
	aboutXMonths: {
		one: "omtrent en måned",
		other: "omtrent {{count}} måneder"
	},
	xMonths: {
		one: "en måned",
		other: "{{count}} måneder"
	},
	aboutXYears: {
		one: "omtrent ett år",
		other: "omtrent {{count}} år"
	},
	xYears: {
		one: "ett år",
		other: "{{count}} år"
	},
	overXYears: {
		one: "over ett år",
		other: "over {{count}} år"
	},
	almostXYears: {
		one: "nesten ett år",
		other: "nesten {{count}} år"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "om " + r : r + " siden" : r;
}, o = {
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
}, s = {
	lastWeek: "'forrige' eeee 'kl.' p",
	yesterday: "'i går kl.' p",
	today: "'i dag kl.' p",
	tomorrow: "'i morgen kl.' p",
	nextWeek: "EEEE 'kl.' p",
	other: "P"
}, c = {
	code: "nb",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => s[e],
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
					"sø",
					"ma",
					"ti",
					"on",
					"to",
					"fr",
					"lø"
				],
				abbreviated: [
					"søn",
					"man",
					"tir",
					"ons",
					"tor",
					"fre",
					"lør"
				],
				wide: [
					"søndag",
					"mandag",
					"tirsdag",
					"onsdag",
					"torsdag",
					"fredag",
					"lørdag"
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
					night: "på natten"
				},
				abbreviated: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "midnatt",
					noon: "middag",
					morning: "på morg.",
					afternoon: "på etterm.",
					evening: "på kvelden",
					night: "på natten"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "midnatt",
					noon: "middag",
					morning: "på morgenen",
					afternoon: "på ettermiddagen",
					evening: "på kvelden",
					night: "på natten"
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
				short: /^(sø|ma|ti|on|to|fr|lø)/i,
				abbreviated: /^(søn|man|tir|ons|tor|fre|lør)/i,
				wide: /^(søndag|mandag|tirsdag|onsdag|torsdag|fredag|lørdag)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/^s/i,
				/^m/i,
				/^ti/i,
				/^o/i,
				/^to/i,
				/^f/i,
				/^l/i
			] },
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(midnatt|middag|(på) (morgenen|ettermiddagen|kvelden|natten)|[ap])/i,
				any: /^([ap]\.?\s?m\.?|midnatt|middag|(på) (morgenen|ettermiddagen|kvelden|natten))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a(\.?\s?m\.?)?$/i,
				pm: /^p(\.?\s?m\.?)?$/i,
				midnight: /^midn/i,
				noon: /^midd/i,
				morning: /morgen/i,
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
export { c as default, c as nb };
