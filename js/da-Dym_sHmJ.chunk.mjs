import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/da/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "mindre end ét sekund",
		other: "mindre end {{count}} sekunder"
	},
	xSeconds: {
		one: "1 sekund",
		other: "{{count}} sekunder"
	},
	halfAMinute: "ét halvt minut",
	lessThanXMinutes: {
		one: "mindre end ét minut",
		other: "mindre end {{count}} minutter"
	},
	xMinutes: {
		one: "1 minut",
		other: "{{count}} minutter"
	},
	aboutXHours: {
		one: "cirka 1 time",
		other: "cirka {{count}} timer"
	},
	xHours: {
		one: "1 time",
		other: "{{count}} timer"
	},
	xDays: {
		one: "1 dag",
		other: "{{count}} dage"
	},
	aboutXWeeks: {
		one: "cirka 1 uge",
		other: "cirka {{count}} uger"
	},
	xWeeks: {
		one: "1 uge",
		other: "{{count}} uger"
	},
	aboutXMonths: {
		one: "cirka 1 måned",
		other: "cirka {{count}} måneder"
	},
	xMonths: {
		one: "1 måned",
		other: "{{count}} måneder"
	},
	aboutXYears: {
		one: "cirka 1 år",
		other: "cirka {{count}} år"
	},
	xYears: {
		one: "1 år",
		other: "{{count}} år"
	},
	overXYears: {
		one: "over 1 år",
		other: "over {{count}} år"
	},
	almostXYears: {
		one: "næsten 1 år",
		other: "næsten {{count}} år"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "om " + r : r + " siden" : r;
}, o = {
	date: e({
		formats: {
			full: "EEEE 'den' d. MMMM y",
			long: "d. MMMM y",
			medium: "d. MMM y",
			short: "dd/MM/y"
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
			full: "{{date}} 'kl'. {{time}}",
			long: "{{date}} 'kl'. {{time}}",
			medium: "{{date}} {{time}}",
			short: "{{date}} {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "'sidste' eeee 'kl.' p",
	yesterday: "'i går kl.' p",
	today: "'i dag kl.' p",
	tomorrow: "'i morgen kl.' p",
	nextWeek: "'på' eeee 'kl.' p",
	other: "P"
}, c = {
	code: "da",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => s[e],
	localize: {
		ordinalNumber: (e, t) => Number(e) + ".",
		era: n({
			values: {
				narrow: ["fvt", "vt"],
				abbreviated: ["f.v.t.", "v.t."],
				wide: ["før vesterlandsk tidsregning", "vesterlandsk tidsregning"]
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
					"1. kvt.",
					"2. kvt.",
					"3. kvt.",
					"4. kvt."
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
					"mar.",
					"apr.",
					"maj",
					"jun.",
					"jul.",
					"aug.",
					"sep.",
					"okt.",
					"nov.",
					"dec."
				],
				wide: [
					"januar",
					"februar",
					"marts",
					"april",
					"maj",
					"juni",
					"juli",
					"august",
					"september",
					"oktober",
					"november",
					"december"
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
					"søn.",
					"man.",
					"tir.",
					"ons.",
					"tor.",
					"fre.",
					"lør."
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
					midnight: "midnat",
					noon: "middag",
					morning: "morgen",
					afternoon: "eftermiddag",
					evening: "aften",
					night: "nat"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "midnat",
					noon: "middag",
					morning: "morgen",
					afternoon: "eftermiddag",
					evening: "aften",
					night: "nat"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "midnat",
					noon: "middag",
					morning: "morgen",
					afternoon: "eftermiddag",
					evening: "aften",
					night: "nat"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "midnat",
					noon: "middag",
					morning: "om morgenen",
					afternoon: "om eftermiddagen",
					evening: "om aftenen",
					night: "om natten"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "midnat",
					noon: "middag",
					morning: "om morgenen",
					afternoon: "om eftermiddagen",
					evening: "om aftenen",
					night: "om natten"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "midnat",
					noon: "middag",
					morning: "om morgenen",
					afternoon: "om eftermiddagen",
					evening: "om aftenen",
					night: "om natten"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(\.)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^(fKr|fvt|eKr|vt)/i,
				abbreviated: /^(f\.Kr\.?|f\.v\.t\.?|e\.Kr\.?|v\.t\.)/i,
				wide: /^(f.Kr.|før vesterlandsk tidsregning|e.Kr.|vesterlandsk tidsregning)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^f/i, /^(v|e)/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^[1234]. kvt\./i,
				wide: /^[1234]\.? kvartal/i
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
				abbreviated: /^(jan.|feb.|mar.|apr.|maj|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,
				wide: /^(januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)/i
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
					/^maj/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
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
				short: /^(søn.|man.|tir.|ons.|tor.|fre.|lør.)/i,
				abbreviated: /^(søn|man|tir|ons|tor|fre|lør)/i,
				wide: /^(søndag|mandag|tirsdag|onsdag|torsdag|fredag|lørdag)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^o/i,
					/^t/i,
					/^f/i,
					/^l/i
				],
				any: [
					/^s/i,
					/^m/i,
					/^ti/i,
					/^o/i,
					/^to/i,
					/^f/i,
					/^l/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(a|p|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i,
				any: /^([ap]\.?\s?m\.?|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /midnat/i,
				noon: /middag/i,
				morning: /morgen/i,
				afternoon: /eftermiddag/i,
				evening: /aften/i,
				night: /nat/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { c as da, c as default };
