import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/af/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "minder as 'n sekonde",
		other: "minder as {{count}} sekondes"
	},
	xSeconds: {
		one: "1 sekonde",
		other: "{{count}} sekondes"
	},
	halfAMinute: "'n halwe minuut",
	lessThanXMinutes: {
		one: "minder as 'n minuut",
		other: "minder as {{count}} minute"
	},
	xMinutes: {
		one: "'n minuut",
		other: "{{count}} minute"
	},
	aboutXHours: {
		one: "ongeveer 1 uur",
		other: "ongeveer {{count}} ure"
	},
	xHours: {
		one: "1 uur",
		other: "{{count}} ure"
	},
	xDays: {
		one: "1 dag",
		other: "{{count}} dae"
	},
	aboutXWeeks: {
		one: "ongeveer 1 week",
		other: "ongeveer {{count}} weke"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weke"
	},
	aboutXMonths: {
		one: "ongeveer 1 maand",
		other: "ongeveer {{count}} maande"
	},
	xMonths: {
		one: "1 maand",
		other: "{{count}} maande"
	},
	aboutXYears: {
		one: "ongeveer 1 jaar",
		other: "ongeveer {{count}} jaar"
	},
	xYears: {
		one: "1 jaar",
		other: "{{count}} jaar"
	},
	overXYears: {
		one: "meer as 1 jaar",
		other: "meer as {{count}} jaar"
	},
	almostXYears: {
		one: "byna 1 jaar",
		other: "byna {{count}} jaar"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "oor " + r : r + " gelede" : r;
}, o = {
	date: e({
		formats: {
			full: "EEEE, d MMMM yyyy",
			long: "d MMMM yyyy",
			medium: "d MMM yyyy",
			short: "yyyy/MM/dd"
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
	lastWeek: "'verlede' eeee 'om' p",
	yesterday: "'gister om' p",
	today: "'vandag om' p",
	tomorrow: "'môre om' p",
	nextWeek: "eeee 'om' p",
	other: "P"
}, c = {
	code: "af",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => s[e],
	localize: {
		ordinalNumber: (e) => {
			let t = Number(e), n = t % 100;
			if (n < 20) switch (n) {
				case 1:
				case 8: return t + "ste";
				default: return t + "de";
			}
			return t + "ste";
		},
		era: n({
			values: {
				narrow: ["vC", "nC"],
				abbreviated: ["vC", "nC"],
				wide: ["voor Christus", "na Christus"]
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
					"1ste kwartaal",
					"2de kwartaal",
					"3de kwartaal",
					"4de kwartaal"
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
					"Jan",
					"Feb",
					"Mrt",
					"Apr",
					"Mei",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Okt",
					"Nov",
					"Des"
				],
				wide: [
					"Januarie",
					"Februarie",
					"Maart",
					"April",
					"Mei",
					"Junie",
					"Julie",
					"Augustus",
					"September",
					"Oktober",
					"November",
					"Desember"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"S",
					"M",
					"D",
					"W",
					"D",
					"V",
					"S"
				],
				short: [
					"So",
					"Ma",
					"Di",
					"Wo",
					"Do",
					"Vr",
					"Sa"
				],
				abbreviated: [
					"Son",
					"Maa",
					"Din",
					"Woe",
					"Don",
					"Vry",
					"Sat"
				],
				wide: [
					"Sondag",
					"Maandag",
					"Dinsdag",
					"Woensdag",
					"Donderdag",
					"Vrydag",
					"Saterdag"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "vm",
					pm: "nm",
					midnight: "middernag",
					noon: "middaguur",
					morning: "oggend",
					afternoon: "middag",
					evening: "laat middag",
					night: "aand"
				},
				abbreviated: {
					am: "vm",
					pm: "nm",
					midnight: "middernag",
					noon: "middaguur",
					morning: "oggend",
					afternoon: "middag",
					evening: "laat middag",
					night: "aand"
				},
				wide: {
					am: "vm",
					pm: "nm",
					midnight: "middernag",
					noon: "middaguur",
					morning: "oggend",
					afternoon: "middag",
					evening: "laat middag",
					night: "aand"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "vm",
					pm: "nm",
					midnight: "middernag",
					noon: "uur die middag",
					morning: "uur die oggend",
					afternoon: "uur die middag",
					evening: "uur die aand",
					night: "uur die aand"
				},
				abbreviated: {
					am: "vm",
					pm: "nm",
					midnight: "middernag",
					noon: "uur die middag",
					morning: "uur die oggend",
					afternoon: "uur die middag",
					evening: "uur die aand",
					night: "uur die aand"
				},
				wide: {
					am: "vm",
					pm: "nm",
					midnight: "middernag",
					noon: "uur die middag",
					morning: "uur die oggend",
					afternoon: "uur die middag",
					evening: "uur die aand",
					night: "uur die aand"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(ste|de)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^([vn]\.? ?C\.?)/,
				abbreviated: /^([vn]\. ?C\.?)/,
				wide: /^((voor|na) Christus)/
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^v/, /^n/] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^K[1234]/i,
				wide: /^[1234](st|d)e kwartaal/i
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
				abbreviated: /^(Jan|Feb|Mrt|Apr|Mei|Jun|Jul|Aug|Sep|Okt|Nov|Dec)\.?/i,
				wide: /^(Januarie|Februarie|Maart|April|Mei|Junie|Julie|Augustus|September|Oktober|November|Desember)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^J/i,
					/^F/i,
					/^M/i,
					/^A/i,
					/^M/i,
					/^J/i,
					/^J/i,
					/^A/i,
					/^S/i,
					/^O/i,
					/^N/i,
					/^D/i
				],
				any: [
					/^Jan/i,
					/^Feb/i,
					/^Mrt/i,
					/^Apr/i,
					/^Mei/i,
					/^Jun/i,
					/^Jul/i,
					/^Aug/i,
					/^Sep/i,
					/^Okt/i,
					/^Nov/i,
					/^Dec/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^[smdwv]/i,
				short: /^(So|Ma|Di|Wo|Do|Vr|Sa)/i,
				abbreviated: /^(Son|Maa|Din|Woe|Don|Vry|Sat)/i,
				wide: /^(Sondag|Maandag|Dinsdag|Woensdag|Donderdag|Vrydag|Saterdag)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^S/i,
					/^M/i,
					/^D/i,
					/^W/i,
					/^D/i,
					/^V/i,
					/^S/i
				],
				any: [
					/^So/i,
					/^Ma/i,
					/^Di/i,
					/^Wo/i,
					/^Do/i,
					/^Vr/i,
					/^Sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: { any: /^(vm|nm|middernag|(?:uur )?die (oggend|middag|aand))/i },
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^vm/i,
				pm: /^nm/i,
				midnight: /^middernag/i,
				noon: /^middaguur/i,
				morning: /oggend/i,
				afternoon: /middag/i,
				evening: /laat middag/i,
				night: /aand/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
export { c as af, c as default };
