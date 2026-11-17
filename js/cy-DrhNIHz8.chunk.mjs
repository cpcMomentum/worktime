import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/cy/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "llai na eiliad",
		other: "llai na {{count}} eiliad"
	},
	xSeconds: {
		one: "1 eiliad",
		other: "{{count}} eiliad"
	},
	halfAMinute: "hanner munud",
	lessThanXMinutes: {
		one: "llai na munud",
		two: "llai na 2 funud",
		other: "llai na {{count}} munud"
	},
	xMinutes: {
		one: "1 munud",
		two: "2 funud",
		other: "{{count}} munud"
	},
	aboutXHours: {
		one: "tua 1 awr",
		other: "tua {{count}} awr"
	},
	xHours: {
		one: "1 awr",
		other: "{{count}} awr"
	},
	xDays: {
		one: "1 diwrnod",
		two: "2 ddiwrnod",
		other: "{{count}} diwrnod"
	},
	aboutXWeeks: {
		one: "tua 1 wythnos",
		two: "tua pythefnos",
		other: "tua {{count}} wythnos"
	},
	xWeeks: {
		one: "1 wythnos",
		two: "pythefnos",
		other: "{{count}} wythnos"
	},
	aboutXMonths: {
		one: "tua 1 mis",
		two: "tua 2 fis",
		other: "tua {{count}} mis"
	},
	xMonths: {
		one: "1 mis",
		two: "2 fis",
		other: "{{count}} mis"
	},
	aboutXYears: {
		one: "tua 1 flwyddyn",
		two: "tua 2 flynedd",
		other: "tua {{count}} mlynedd"
	},
	xYears: {
		one: "1 flwyddyn",
		two: "2 flynedd",
		other: "{{count}} mlynedd"
	},
	overXYears: {
		one: "dros 1 flwyddyn",
		two: "dros 2 flynedd",
		other: "dros {{count}} mlynedd"
	},
	almostXYears: {
		one: "bron 1 flwyddyn",
		two: "bron 2 flynedd",
		other: "bron {{count}} mlynedd"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : t === 2 && a.two ? a.two : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "mewn " + r : r + " yn ôl" : r;
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
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: e({
		formats: {
			full: "{{date}} 'am' {{time}}",
			long: "{{date}} 'am' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "eeee 'diwethaf am' p",
	yesterday: "'ddoe am' p",
	today: "'heddiw am' p",
	tomorrow: "'yfory am' p",
	nextWeek: "eeee 'am' p",
	other: "P"
}, c = {
	code: "cy",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => s[e],
	localize: {
		ordinalNumber: (e, t) => {
			let n = Number(e);
			if (n < 20) switch (n) {
				case 0: return n + "fed";
				case 1: return n + "af";
				case 2: return n + "ail";
				case 3:
				case 4: return n + "ydd";
				case 5:
				case 6: return n + "ed";
				case 7:
				case 8:
				case 9:
				case 10:
				case 12:
				case 15:
				case 18: return n + "fed";
				case 11:
				case 13:
				case 14:
				case 16:
				case 17:
				case 19: return n + "eg";
			}
			else if (n >= 50 && n <= 60 || n === 80 || n >= 100) return n + "fed";
			return n + "ain";
		},
		era: n({
			values: {
				narrow: ["C", "O"],
				abbreviated: ["CC", "OC"],
				wide: ["Cyn Crist", "Ar ôl Crist"]
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
					"Ch1",
					"Ch2",
					"Ch3",
					"Ch4"
				],
				wide: [
					"Chwarter 1af",
					"2ail chwarter",
					"3ydd chwarter",
					"4ydd chwarter"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: {
				narrow: [
					"I",
					"Ch",
					"Ma",
					"E",
					"Mi",
					"Me",
					"G",
					"A",
					"Md",
					"H",
					"T",
					"Rh"
				],
				abbreviated: [
					"Ion",
					"Chwe",
					"Maw",
					"Ebr",
					"Mai",
					"Meh",
					"Gor",
					"Aws",
					"Med",
					"Hyd",
					"Tach",
					"Rhag"
				],
				wide: [
					"Ionawr",
					"Chwefror",
					"Mawrth",
					"Ebrill",
					"Mai",
					"Mehefin",
					"Gorffennaf",
					"Awst",
					"Medi",
					"Hydref",
					"Tachwedd",
					"Rhagfyr"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"S",
					"Ll",
					"M",
					"M",
					"I",
					"G",
					"S"
				],
				short: [
					"Su",
					"Ll",
					"Ma",
					"Me",
					"Ia",
					"Gw",
					"Sa"
				],
				abbreviated: [
					"Sul",
					"Llun",
					"Maw",
					"Mer",
					"Iau",
					"Gwe",
					"Sad"
				],
				wide: [
					"dydd Sul",
					"dydd Llun",
					"dydd Mawrth",
					"dydd Mercher",
					"dydd Iau",
					"dydd Gwener",
					"dydd Sadwrn"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "b",
					pm: "h",
					midnight: "hn",
					noon: "hd",
					morning: "bore",
					afternoon: "prynhawn",
					evening: "gyda'r nos",
					night: "nos"
				},
				abbreviated: {
					am: "yb",
					pm: "yh",
					midnight: "hanner nos",
					noon: "hanner dydd",
					morning: "bore",
					afternoon: "prynhawn",
					evening: "gyda'r nos",
					night: "nos"
				},
				wide: {
					am: "y.b.",
					pm: "y.h.",
					midnight: "hanner nos",
					noon: "hanner dydd",
					morning: "bore",
					afternoon: "prynhawn",
					evening: "gyda'r nos",
					night: "nos"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "b",
					pm: "h",
					midnight: "hn",
					noon: "hd",
					morning: "yn y bore",
					afternoon: "yn y prynhawn",
					evening: "gyda'r nos",
					night: "yn y nos"
				},
				abbreviated: {
					am: "yb",
					pm: "yh",
					midnight: "hanner nos",
					noon: "hanner dydd",
					morning: "yn y bore",
					afternoon: "yn y prynhawn",
					evening: "gyda'r nos",
					night: "yn y nos"
				},
				wide: {
					am: "y.b.",
					pm: "y.h.",
					midnight: "hanner nos",
					noon: "hanner dydd",
					morning: "yn y bore",
					afternoon: "yn y prynhawn",
					evening: "gyda'r nos",
					night: "yn y nos"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(af|ail|ydd|ed|fed|eg|ain)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^(c|o)/i,
				abbreviated: /^(c\.?\s?c\.?|o\.?\s?c\.?)/i,
				wide: /^(cyn christ|ar ôl crist|ar ol crist)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				wide: [/^c/i, /^(ar ôl crist|ar ol crist)/i],
				any: [/^c/i, /^o/i]
			},
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^ch[1234]/i,
				wide: /^(chwarter 1af)|([234](ail|ydd)? chwarter)/i
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
				narrow: /^(i|ch|m|e|g|a|h|t|rh)/i,
				abbreviated: /^(ion|chwe|maw|ebr|mai|meh|gor|aws|med|hyd|tach|rhag)/i,
				wide: /^(ionawr|chwefror|mawrth|ebrill|mai|mehefin|gorffennaf|awst|medi|hydref|tachwedd|rhagfyr)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^i/i,
					/^ch/i,
					/^m/i,
					/^e/i,
					/^m/i,
					/^m/i,
					/^g/i,
					/^a/i,
					/^m/i,
					/^h/i,
					/^t/i,
					/^rh/i
				],
				any: [
					/^io/i,
					/^ch/i,
					/^maw/i,
					/^e/i,
					/^mai/i,
					/^meh/i,
					/^g/i,
					/^a/i,
					/^med/i,
					/^h/i,
					/^t/i,
					/^rh/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^(s|ll|m|i|g)/i,
				short: /^(su|ll|ma|me|ia|gw|sa)/i,
				abbreviated: /^(sul|llun|maw|mer|iau|gwe|sad)/i,
				wide: /^dydd (sul|llun|mawrth|mercher|iau|gwener|sadwrn)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^ll/i,
					/^m/i,
					/^m/i,
					/^i/i,
					/^g/i,
					/^s/i
				],
				wide: [
					/^dydd su/i,
					/^dydd ll/i,
					/^dydd ma/i,
					/^dydd me/i,
					/^dydd i/i,
					/^dydd g/i,
					/^dydd sa/i
				],
				any: [
					/^su/i,
					/^ll/i,
					/^ma/i,
					/^me/i,
					/^i/i,
					/^g/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(b|h|hn|hd|(yn y|y|yr|gyda'r) (bore|prynhawn|nos|hwyr))/i,
				any: /^(y\.?\s?[bh]\.?|hanner nos|hanner dydd|(yn y|y|yr|gyda'r) (bore|prynhawn|nos|hwyr))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^b|(y\.?\s?b\.?)/i,
				pm: /^h|(y\.?\s?h\.?)|(yr hwyr)/i,
				midnight: /^hn|hanner nos/i,
				noon: /^hd|hanner dydd/i,
				morning: /bore/i,
				afternoon: /prynhawn/i,
				evening: /^gyda'r nos$/i,
				night: /blah/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
export { c as cy, c as default };
