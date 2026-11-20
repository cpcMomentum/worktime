import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/fy/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "minder as 1 sekonde",
		other: "minder as {{count}} sekonden"
	},
	xSeconds: {
		one: "1 sekonde",
		other: "{{count}} sekonden"
	},
	halfAMinute: "oardel minút",
	lessThanXMinutes: {
		one: "minder as 1 minút",
		other: "minder as {{count}} minuten"
	},
	xMinutes: {
		one: "1 minút",
		other: "{{count}} minuten"
	},
	aboutXHours: {
		one: "sawat 1 oere",
		other: "sawat {{count}} oere"
	},
	xHours: {
		one: "1 oere",
		other: "{{count}} oere"
	},
	xDays: {
		one: "1 dei",
		other: "{{count}} dagen"
	},
	aboutXWeeks: {
		one: "sawat 1 wike",
		other: "sawat {{count}} wiken"
	},
	xWeeks: {
		one: "1 wike",
		other: "{{count}} wiken"
	},
	aboutXMonths: {
		one: "sawat 1 moanne",
		other: "sawat {{count}} moannen"
	},
	xMonths: {
		one: "1 moanne",
		other: "{{count}} moannen"
	},
	aboutXYears: {
		one: "sawat 1 jier",
		other: "sawat {{count}} jier"
	},
	xYears: {
		one: "1 jier",
		other: "{{count}} jier"
	},
	overXYears: {
		one: "mear as 1 jier",
		other: "mear as {{count}}s jier"
	},
	almostXYears: {
		one: "hast 1 jier",
		other: "hast {{count}} jier"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "oer " + r : r + " lyn" : r;
}, o = {
	date: e({
		formats: {
			full: "EEEE d MMMM y",
			long: "d MMMM y",
			medium: "d MMM y",
			short: "dd-MM-y"
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
			full: "{{date}} 'om' {{time}}",
			long: "{{date}} 'om' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "'ôfrûne' eeee 'om' p",
	yesterday: "'juster om' p",
	today: "'hjoed om' p",
	tomorrow: "'moarn om' p",
	nextWeek: "eeee 'om' p",
	other: "P"
}, c = {
	code: "fy",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => s[e],
	localize: {
		ordinalNumber: (e, t) => Number(e) + "e",
		era: n({
			values: {
				narrow: ["f.K.", "n.K."],
				abbreviated: ["f.Kr.", "n.Kr."],
				wide: ["foar Kristus", "nei Kristus"]
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
					"1e fearnsjier",
					"2e fearnsjier",
					"3e fearnsjier",
					"4e fearnsjier"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: {
				narrow: [
					"j",
					"f",
					"m",
					"a",
					"m",
					"j",
					"j",
					"a",
					"s",
					"o",
					"n",
					"d"
				],
				abbreviated: [
					"jan.",
					"feb.",
					"mrt.",
					"apr.",
					"mai.",
					"jun.",
					"jul.",
					"aug.",
					"sep.",
					"okt.",
					"nov.",
					"des."
				],
				wide: [
					"jannewaris",
					"febrewaris",
					"maart",
					"april",
					"maaie",
					"juny",
					"july",
					"augustus",
					"septimber",
					"oktober",
					"novimber",
					"desimber"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"s",
					"m",
					"t",
					"w",
					"t",
					"f",
					"s"
				],
				short: [
					"si",
					"mo",
					"ti",
					"wo",
					"to",
					"fr",
					"so"
				],
				abbreviated: [
					"snein",
					"moa",
					"tii",
					"woa",
					"ton",
					"fre",
					"sneon"
				],
				wide: [
					"snein",
					"moandei",
					"tiisdei",
					"woansdei",
					"tongersdei",
					"freed",
					"sneon"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "AM",
					pm: "PM",
					midnight: "middernacht",
					noon: "middei",
					morning: "moarns",
					afternoon: "middeis",
					evening: "jûns",
					night: "nachts"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "middernacht",
					noon: "middei",
					morning: "moarns",
					afternoon: "middeis",
					evening: "jûns",
					night: "nachts"
				},
				wide: {
					am: "AM",
					pm: "PM",
					midnight: "middernacht",
					noon: "middei",
					morning: "moarns",
					afternoon: "middeis",
					evening: "jûns",
					night: "nachts"
				}
			},
			defaultWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)e?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^([fn]\.? ?K\.?)/,
				abbreviated: /^([fn]\. ?Kr\.?)/,
				wide: /^((foar|nei) Kristus)/
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^f/, /^n/] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^K[1234]/i,
				wide: /^[1234]e fearnsjier/i
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
				abbreviated: /^(jan.|feb.|mrt.|apr.|mai.|jun.|jul.|aug.|sep.|okt.|nov.|des.)/i,
				wide: /^(jannewaris|febrewaris|maart|april|maaie|juny|july|augustus|septimber|oktober|novimber|desimber)/i
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
					/^jan/i,
					/^feb/i,
					/^m(r|a)/i,
					/^apr/i,
					/^mai/i,
					/^jun/i,
					/^jul/i,
					/^aug/i,
					/^sep/i,
					/^okt/i,
					/^nov/i,
					/^des/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(si|mo|ti|wo|to|fr|so)/i,
				abbreviated: /^(snein|moa|tii|woa|ton|fre|sneon)/i,
				wide: /^(snein|moandei|tiisdei|woansdei|tongersdei|freed|sneon)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^sn/i,
					/^mo/i,
					/^ti/i,
					/^wo/i,
					/^to/i,
					/^fr/i,
					/^sn/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: { any: /^(am|pm|middernacht|middeis|moarns|middei|jûns|nachts)/i },
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^am/i,
				pm: /^pm/i,
				midnight: /^middernacht/i,
				noon: /^middei/i,
				morning: /moarns/i,
				afternoon: /^middeis/i,
				evening: /jûns/i,
				night: /nachts/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { c as default, c as fy };
