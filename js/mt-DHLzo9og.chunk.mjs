import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/mt/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "inqas minn sekonda",
		other: "inqas minn {{count}} sekondi"
	},
	xSeconds: {
		one: "sekonda",
		other: "{{count}} sekondi"
	},
	halfAMinute: "nofs minuta",
	lessThanXMinutes: {
		one: "inqas minn minuta",
		other: "inqas minn {{count}} minuti"
	},
	xMinutes: {
		one: "minuta",
		other: "{{count}} minuti"
	},
	aboutXHours: {
		one: "madwar siegħa",
		other: "madwar {{count}} siegħat"
	},
	xHours: {
		one: "siegħa",
		other: "{{count}} siegħat"
	},
	xDays: {
		one: "ġurnata",
		other: "{{count}} ġranet"
	},
	aboutXWeeks: {
		one: "madwar ġimgħa",
		other: "madwar {{count}} ġimgħat"
	},
	xWeeks: {
		one: "ġimgħa",
		other: "{{count}} ġimgħat"
	},
	aboutXMonths: {
		one: "madwar xahar",
		other: "madwar {{count}} xhur"
	},
	xMonths: {
		one: "xahar",
		other: "{{count}} xhur"
	},
	aboutXYears: {
		one: "madwar sena",
		two: "madwar sentejn",
		other: "madwar {{count}} snin"
	},
	xYears: {
		one: "sena",
		two: "sentejn",
		other: "{{count}} snin"
	},
	overXYears: {
		one: "aktar minn sena",
		two: "aktar minn sentejn",
		other: "aktar minn {{count}} snin"
	},
	almostXYears: {
		one: "kważi sena",
		two: "kważi sentejn",
		other: "kważi {{count}} snin"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : t === 2 && a.two ? a.two : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "f'" + r : r + " ilu" : r;
}, o = {
	date: e({
		formats: {
			full: "EEEE, d MMMM yyyy",
			long: "d MMMM yyyy",
			medium: "d MMM yyyy",
			short: "dd/MM/yyyy"
		},
		defaultWidth: "full"
	}),
	time: e({
		formats: {
			full: "HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: e({
		formats: {
			full: "{{date}} {{time}}",
			long: "{{date}} {{time}}",
			medium: "{{date}} {{time}}",
			short: "{{date}} {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "eeee 'li għadda' 'fil-'p",
	yesterday: "'Il-bieraħ fil-'p",
	today: "'Illum fil-'p",
	tomorrow: "'Għada fil-'p",
	nextWeek: "eeee 'fil-'p",
	other: "P"
}, c = {
	code: "mt",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => s[e],
	localize: {
		ordinalNumber: (e, t) => Number(e) + "º",
		era: n({
			values: {
				narrow: ["Q", "W"],
				abbreviated: ["QK", "WK"],
				wide: ["qabel Kristu", "wara Kristu"]
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
					"K1",
					"K2",
					"K3",
					"K4"
				],
				wide: [
					"1. kwart",
					"2. kwart",
					"3. kwart",
					"4. kwart"
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
					"Ġ",
					"L",
					"A",
					"S",
					"O",
					"N",
					"D"
				],
				abbreviated: [
					"Jan",
					"Fra",
					"Mar",
					"Apr",
					"Mej",
					"Ġun",
					"Lul",
					"Aww",
					"Set",
					"Ott",
					"Nov",
					"Diċ"
				],
				wide: [
					"Jannar",
					"Frar",
					"Marzu",
					"April",
					"Mejju",
					"Ġunju",
					"Lulju",
					"Awwissu",
					"Settembru",
					"Ottubru",
					"Novembru",
					"Diċembru"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"Ħ",
					"T",
					"T",
					"E",
					"Ħ",
					"Ġ",
					"S"
				],
				short: [
					"Ħa",
					"Tn",
					"Tl",
					"Er",
					"Ħa",
					"Ġi",
					"Si"
				],
				abbreviated: [
					"Ħad",
					"Tne",
					"Tli",
					"Erb",
					"Ħam",
					"Ġim",
					"Sib"
				],
				wide: [
					"Il-Ħadd",
					"It-Tnejn",
					"It-Tlieta",
					"L-Erbgħa",
					"Il-Ħamis",
					"Il-Ġimgħa",
					"Is-Sibt"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "nofsillejl",
					noon: "nofsinhar",
					morning: "għodwa",
					afternoon: "wara nofsinhar",
					evening: "filgħaxija",
					night: "lejl"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "nofsillejl",
					noon: "nofsinhar",
					morning: "għodwa",
					afternoon: "wara nofsinhar",
					evening: "filgħaxija",
					night: "lejl"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "nofsillejl",
					noon: "nofsinhar",
					morning: "għodwa",
					afternoon: "wara nofsinhar",
					evening: "filgħaxija",
					night: "lejl"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "f'nofsillejl",
					noon: "f'nofsinhar",
					morning: "filgħodu",
					afternoon: "wara nofsinhar",
					evening: "filgħaxija",
					night: "billejl"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "f'nofsillejl",
					noon: "f'nofsinhar",
					morning: "filgħodu",
					afternoon: "wara nofsinhar",
					evening: "filgħaxija",
					night: "billejl"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "f'nofsillejl",
					noon: "f'nofsinhar",
					morning: "filgħodu",
					afternoon: "wara nofsinhar",
					evening: "filgħaxija",
					night: "billejl"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(º)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^(q|w)/i,
				abbreviated: /^(q\.?\s?k\.?|b\.?\s?c\.?\s?e\.?|w\.?\s?k\.?)/i,
				wide: /^(qabel kristu|before common era|wara kristu|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^(q|b)/i, /^(w|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^k[1234]/i,
				wide: /^[1234](\.)? kwart/i
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
				narrow: /^[jfmaglsond]/i,
				abbreviated: /^(jan|fra|mar|apr|mej|ġun|lul|aww|set|ott|nov|diċ)/i,
				wide: /^(jannar|frar|marzu|april|mejju|ġunju|lulju|awwissu|settembru|ottubru|novembru|diċembru)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^ġ/i,
					/^l/i,
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
					/^mej/i,
					/^ġ/i,
					/^l/i,
					/^aw/i,
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
				narrow: /^[ħteġs]/i,
				short: /^(ħa|tn|tl|er|ħa|ġi|si)/i,
				abbreviated: /^(ħad|tne|tli|erb|ħam|ġim|sib)/i,
				wide: /^(il-ħadd|it-tnejn|it-tlieta|l-erbgħa|il-ħamis|il-ġimgħa|is-sibt)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^ħ/i,
					/^t/i,
					/^t/i,
					/^e/i,
					/^ħ/i,
					/^ġ/i,
					/^s/i
				],
				any: [
					/^(il-)?ħad/i,
					/^(it-)?tn/i,
					/^(it-)?tl/i,
					/^(l-)?er/i,
					/^(il-)?ham/i,
					/^(il-)?ġi/i,
					/^(is-)?si/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(a|p|f'nofsillejl|f'nofsinhar|(ta') (għodwa|wara nofsinhar|filgħaxija|lejl))/i,
				any: /^([ap]\.?\s?m\.?|f'nofsillejl|f'nofsinhar|(ta') (għodwa|wara nofsinhar|filgħaxija|lejl))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^f'nofsillejl/i,
				noon: /^f'nofsinhar/i,
				morning: /għodwa/i,
				afternoon: /wara(\s.*)nofsinhar/i,
				evening: /filgħaxija/i,
				night: /lejl/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { c as default, c as mt };
