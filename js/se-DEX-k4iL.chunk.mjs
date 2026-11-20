import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/se/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "unnit go ovtta sekundda",
		other: "unnit go {{count}} sekundda"
	},
	xSeconds: {
		one: "sekundda",
		other: "{{count}} sekundda"
	},
	halfAMinute: "bealle minuhta",
	lessThanXMinutes: {
		one: "unnit go bealle minuhta",
		other: "unnit go {{count}} minuhta"
	},
	xMinutes: {
		one: "minuhta",
		other: "{{count}} minuhta"
	},
	aboutXHours: {
		one: "sullii ovtta diimmu",
		other: "sullii {{count}} diimmu"
	},
	xHours: {
		one: "diimmu",
		other: "{{count}} diimmu"
	},
	xDays: {
		one: "beaivvi",
		other: "{{count}} beaivvi"
	},
	aboutXWeeks: {
		one: "sullii ovtta vahku",
		other: "sullii {{count}} vahku"
	},
	xWeeks: {
		one: "vahku",
		other: "{{count}} vahku"
	},
	aboutXMonths: {
		one: "sullii ovtta mánu",
		other: "sullii {{count}} mánu"
	},
	xMonths: {
		one: "mánu",
		other: "{{count}} mánu"
	},
	aboutXYears: {
		one: "sullii ovtta jagi",
		other: "sullii {{count}} jagi"
	},
	xYears: {
		one: "jagi",
		other: "{{count}} jagi"
	},
	overXYears: {
		one: "guhkit go jagi",
		other: "guhkit go {{count}} jagi"
	},
	almostXYears: {
		one: "measta jagi",
		other: "measta {{count}} jagi"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "geahčen " + r : r + " áigi" : r;
}, o = {
	date: e({
		formats: {
			full: "EEEE MMMM d. 'b.' y",
			long: "MMMM d. 'b.' y",
			medium: "MMM d. 'b.' y",
			short: "dd.MM.y"
		},
		defaultWidth: "full"
	}),
	time: e({
		formats: {
			full: "'dii.' HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: e({
		formats: {
			full: "{{date}} 'dii.' {{time}}",
			long: "{{date}} 'dii.' {{time}}",
			medium: "{{date}} {{time}}",
			short: "{{date}} {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "'ovddit' eeee 'dii.' p",
	yesterday: "'ikte dii.' p",
	today: "'odne dii.' p",
	tomorrow: "'ihtin dii.' p",
	nextWeek: "EEEE 'dii.' p",
	other: "P"
}, c = {
	code: "se",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => s[e],
	localize: {
		ordinalNumber: (e, t) => Number(e) + ".",
		era: n({
			values: {
				narrow: ["o.Kr.", "m.Kr."],
				abbreviated: ["o.Kr.", "m.Kr."],
				wide: ["ovdal Kristusa", "maŋŋel Kristusa"]
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
					"1. kvartála",
					"2. kvartála",
					"3. kvartála",
					"4. kvartála"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: {
				narrow: [
					"O",
					"G",
					"N",
					"C",
					"M",
					"G",
					"S",
					"B",
					"Č",
					"G",
					"S",
					"J"
				],
				abbreviated: [
					"ođđa",
					"guov",
					"njuk",
					"cuo",
					"mies",
					"geas",
					"suoi",
					"borg",
					"čakč",
					"golg",
					"skáb",
					"juov"
				],
				wide: [
					"ođđajagemánnu",
					"guovvamánnu",
					"njukčamánnu",
					"cuoŋománnu",
					"miessemánnu",
					"geassemánnu",
					"suoidnemánnu",
					"borgemánnu",
					"čakčamánnu",
					"golggotmánnu",
					"skábmamánnu",
					"juovlamánnu"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"S",
					"V",
					"M",
					"G",
					"D",
					"B",
					"L"
				],
				short: [
					"sotn",
					"vuos",
					"maŋ",
					"gask",
					"duor",
					"bear",
					"láv"
				],
				abbreviated: [
					"sotn",
					"vuos",
					"maŋ",
					"gask",
					"duor",
					"bear",
					"láv"
				],
				wide: [
					"sotnabeaivi",
					"vuossárga",
					"maŋŋebárga",
					"gaskavahkku",
					"duorastat",
					"bearjadat",
					"lávvardat"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "gaskaidja",
					noon: "gaskabeaivi",
					morning: "iđđes",
					afternoon: "maŋŋel gaska.",
					evening: "eahkes",
					night: "ihkku"
				},
				abbreviated: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "gaskaidja",
					noon: "gaskabeaivvi",
					morning: "iđđes",
					afternoon: "maŋŋel gaskabea.",
					evening: "eahkes",
					night: "ihkku"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "gaskaidja",
					noon: "gaskabeavvi",
					morning: "iđđes",
					afternoon: "maŋŋel gaskabeaivvi",
					evening: "eahkes",
					night: "ihkku"
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
				narrow: /^(o\.? ?Kr\.?|m\.? ?Kr\.?)/i,
				abbreviated: /^(o\.? ?Kr\.?|m\.? ?Kr\.?)/i,
				wide: /^(ovdal Kristusa|ovdal min áiggi|maŋŋel Kristusa|min áigi)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^o/i, /^m/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](\.)? kvartála/i
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
				narrow: /^[ogncmsbčj]/i,
				abbreviated: /^(ođđa|guov|njuk|cuo|mies|geas|suoi|borg|čakč|golg|skáb|juov)\.?/i,
				wide: /^(ođđajagemánnu|guovvamánnu|njukčamánnu|cuoŋománnu|miessemánnu|geassemánnu|suoidnemánnu|borgemánnu|čakčamánnu|golggotmánnu|skábmamánnu|juovlamánnu)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^o/i,
					/^g/i,
					/^n/i,
					/^c/i,
					/^m/i,
					/^g/i,
					/^s/i,
					/^b/i,
					/^č/i,
					/^g/i,
					/^s/i,
					/^j/i
				],
				any: [
					/^o/i,
					/^gu/i,
					/^n/i,
					/^c/i,
					/^m/i,
					/^ge/i,
					/^su/i,
					/^b/i,
					/^č/i,
					/^go/i,
					/^sk/i,
					/^j/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^[svmgdbl]/i,
				short: /^(sotn|vuos|maŋ|gask|duor|bear|láv)/i,
				abbreviated: /^(sotn|vuos|maŋ|gask|duor|bear|láv)/i,
				wide: /^(sotnabeaivi|vuossárga|maŋŋebárga|gaskavahkku|duorastat|bearjadat|lávvardat)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/^s/i,
				/^v/i,
				/^m/i,
				/^g/i,
				/^d/i,
				/^b/i,
				/^l/i
			] },
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(gaskaidja|gaskabeaivvi|(på) (iđđes|maŋŋel gaskabeaivvi|eahkes|ihkku)|[ap])/i,
				any: /^([ap]\.?\s?m\.?|gaskaidja|gaskabeaivvi|(på) (iđđes|maŋŋel gaskabeaivvi|eahkes|ihkku))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a(\.?\s?m\.?)?$/i,
				pm: /^p(\.?\s?m\.?)?$/i,
				midnight: /^gaskai/i,
				noon: /^gaskab/i,
				morning: /iđđes/i,
				afternoon: /maŋŋel gaskabeaivvi/i,
				evening: /eahkes/i,
				night: /ihkku/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { c as default, c as se };
