import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/fi/_lib/formatDistance.js
function i(e) {
	return e.replace(/sekuntia?/, "sekunnin");
}
function a(e) {
	return e.replace(/minuuttia?/, "minuutin");
}
function o(e) {
	return e.replace(/tuntia?/, "tunnin");
}
function s(e) {
	return e.replace(/päivää?/, "päivän");
}
function c(e) {
	return e.replace(/(viikko|viikkoa)/, "viikon");
}
function l(e) {
	return e.replace(/(kuukausi|kuukautta)/, "kuukauden");
}
function u(e) {
	return e.replace(/(vuosi|vuotta)/, "vuoden");
}
var d = {
	lessThanXSeconds: {
		one: "alle sekunti",
		other: "alle {{count}} sekuntia",
		futureTense: i
	},
	xSeconds: {
		one: "sekunti",
		other: "{{count}} sekuntia",
		futureTense: i
	},
	halfAMinute: {
		one: "puoli minuuttia",
		other: "puoli minuuttia",
		futureTense: (e) => "puolen minuutin"
	},
	lessThanXMinutes: {
		one: "alle minuutti",
		other: "alle {{count}} minuuttia",
		futureTense: a
	},
	xMinutes: {
		one: "minuutti",
		other: "{{count}} minuuttia",
		futureTense: a
	},
	aboutXHours: {
		one: "noin tunti",
		other: "noin {{count}} tuntia",
		futureTense: o
	},
	xHours: {
		one: "tunti",
		other: "{{count}} tuntia",
		futureTense: o
	},
	xDays: {
		one: "päivä",
		other: "{{count}} päivää",
		futureTense: s
	},
	aboutXWeeks: {
		one: "noin viikko",
		other: "noin {{count}} viikkoa",
		futureTense: c
	},
	xWeeks: {
		one: "viikko",
		other: "{{count}} viikkoa",
		futureTense: c
	},
	aboutXMonths: {
		one: "noin kuukausi",
		other: "noin {{count}} kuukautta",
		futureTense: l
	},
	xMonths: {
		one: "kuukausi",
		other: "{{count}} kuukautta",
		futureTense: l
	},
	aboutXYears: {
		one: "noin vuosi",
		other: "noin {{count}} vuotta",
		futureTense: u
	},
	xYears: {
		one: "vuosi",
		other: "{{count}} vuotta",
		futureTense: u
	},
	overXYears: {
		one: "yli vuosi",
		other: "yli {{count}} vuotta",
		futureTense: u
	},
	almostXYears: {
		one: "lähes vuosi",
		other: "lähes {{count}} vuotta",
		futureTense: u
	}
}, f = (e, t, n) => {
	let r = d[e], i = t === 1 ? r.one : r.other.replace("{{count}}", String(t));
	return n?.addSuffix ? n.comparison && n.comparison > 0 ? r.futureTense(i) + " kuluttua" : i + " sitten" : i;
}, p = {
	date: e({
		formats: {
			full: "eeee d. MMMM y",
			long: "d. MMMM y",
			medium: "d. MMM y",
			short: "d.M.y"
		},
		defaultWidth: "full"
	}),
	time: e({
		formats: {
			full: "HH.mm.ss zzzz",
			long: "HH.mm.ss z",
			medium: "HH.mm.ss",
			short: "HH.mm"
		},
		defaultWidth: "full"
	}),
	dateTime: e({
		formats: {
			full: "{{date}} 'klo' {{time}}",
			long: "{{date}} 'klo' {{time}}",
			medium: "{{date}} {{time}}",
			short: "{{date}} {{time}}"
		},
		defaultWidth: "full"
	})
}, m = {
	lastWeek: "'viime' eeee 'klo' p",
	yesterday: "'eilen klo' p",
	today: "'tänään klo' p",
	tomorrow: "'huomenna klo' p",
	nextWeek: "'ensi' eeee 'klo' p",
	other: "P"
}, h = (e, t, n, r) => m[e], g = {
	narrow: ["eaa.", "jaa."],
	abbreviated: ["eaa.", "jaa."],
	wide: ["ennen ajanlaskun alkua", "jälkeen ajanlaskun alun"]
}, _ = {
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
		"1. kvartaali",
		"2. kvartaali",
		"3. kvartaali",
		"4. kvartaali"
	]
}, v = {
	narrow: [
		"T",
		"H",
		"M",
		"H",
		"T",
		"K",
		"H",
		"E",
		"S",
		"L",
		"M",
		"J"
	],
	abbreviated: [
		"tammi",
		"helmi",
		"maalis",
		"huhti",
		"touko",
		"kesä",
		"heinä",
		"elo",
		"syys",
		"loka",
		"marras",
		"joulu"
	],
	wide: [
		"tammikuu",
		"helmikuu",
		"maaliskuu",
		"huhtikuu",
		"toukokuu",
		"kesäkuu",
		"heinäkuu",
		"elokuu",
		"syyskuu",
		"lokakuu",
		"marraskuu",
		"joulukuu"
	]
}, y = {
	narrow: v.narrow,
	abbreviated: v.abbreviated,
	wide: [
		"tammikuuta",
		"helmikuuta",
		"maaliskuuta",
		"huhtikuuta",
		"toukokuuta",
		"kesäkuuta",
		"heinäkuuta",
		"elokuuta",
		"syyskuuta",
		"lokakuuta",
		"marraskuuta",
		"joulukuuta"
	]
}, b = {
	narrow: [
		"S",
		"M",
		"T",
		"K",
		"T",
		"P",
		"L"
	],
	short: [
		"su",
		"ma",
		"ti",
		"ke",
		"to",
		"pe",
		"la"
	],
	abbreviated: [
		"sunn.",
		"maan.",
		"tiis.",
		"kesk.",
		"torst.",
		"perj.",
		"la"
	],
	wide: [
		"sunnuntai",
		"maanantai",
		"tiistai",
		"keskiviikko",
		"torstai",
		"perjantai",
		"lauantai"
	]
}, x = {
	narrow: b.narrow,
	short: b.short,
	abbreviated: b.abbreviated,
	wide: [
		"sunnuntaina",
		"maanantaina",
		"tiistaina",
		"keskiviikkona",
		"torstaina",
		"perjantaina",
		"lauantaina"
	]
}, S = {
	code: "fi",
	formatDistance: f,
	formatLong: p,
	formatRelative: h,
	localize: {
		ordinalNumber: (e, t) => Number(e) + ".",
		era: n({
			values: g,
			defaultWidth: "wide"
		}),
		quarter: n({
			values: _,
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: v,
			defaultWidth: "wide",
			formattingValues: y,
			defaultFormattingWidth: "wide"
		}),
		day: n({
			values: b,
			defaultWidth: "wide",
			formattingValues: x,
			defaultFormattingWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "ap",
					pm: "ip",
					midnight: "keskiyö",
					noon: "keskipäivä",
					morning: "ap",
					afternoon: "ip",
					evening: "illalla",
					night: "yöllä"
				},
				abbreviated: {
					am: "ap",
					pm: "ip",
					midnight: "keskiyö",
					noon: "keskipäivä",
					morning: "ap",
					afternoon: "ip",
					evening: "illalla",
					night: "yöllä"
				},
				wide: {
					am: "ap",
					pm: "ip",
					midnight: "keskiyöllä",
					noon: "keskipäivällä",
					morning: "aamupäivällä",
					afternoon: "iltapäivällä",
					evening: "illalla",
					night: "yöllä"
				}
			},
			defaultWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(\.)/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^(e|j)/i,
				abbreviated: /^(eaa.|jaa.)/i,
				wide: /^(ennen ajanlaskun alkua|jälkeen ajanlaskun alun)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^e/i, /^j/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234]\.? kvartaali/i
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
				narrow: /^[thmkeslj]/i,
				abbreviated: /^(tammi|helmi|maalis|huhti|touko|kesä|heinä|elo|syys|loka|marras|joulu)/i,
				wide: /^(tammikuu|helmikuu|maaliskuu|huhtikuu|toukokuu|kesäkuu|heinäkuu|elokuu|syyskuu|lokakuu|marraskuu|joulukuu)(ta)?/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^t/i,
					/^h/i,
					/^m/i,
					/^h/i,
					/^t/i,
					/^k/i,
					/^h/i,
					/^e/i,
					/^s/i,
					/^l/i,
					/^m/i,
					/^j/i
				],
				any: [
					/^ta/i,
					/^hel/i,
					/^maa/i,
					/^hu/i,
					/^to/i,
					/^k/i,
					/^hei/i,
					/^e/i,
					/^s/i,
					/^l/i,
					/^mar/i,
					/^j/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^[smtkpl]/i,
				short: /^(su|ma|ti|ke|to|pe|la)/i,
				abbreviated: /^(sunn.|maan.|tiis.|kesk.|torst.|perj.|la)/i,
				wide: /^(sunnuntai|maanantai|tiistai|keskiviikko|torstai|perjantai|lauantai)(na)?/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^k/i,
					/^t/i,
					/^p/i,
					/^l/i
				],
				any: [
					/^s/i,
					/^m/i,
					/^ti/i,
					/^k/i,
					/^to/i,
					/^p/i,
					/^l/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(ap|ip|keskiyö|keskipäivä|aamupäivällä|iltapäivällä|illalla|yöllä)/i,
				any: /^(ap|ip|keskiyöllä|keskipäivällä|aamupäivällä|iltapäivällä|illalla|yöllä)/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^ap/i,
				pm: /^ip/i,
				midnight: /^keskiyö/i,
				noon: /^keskipäivä/i,
				morning: /aamupäivällä/i,
				afternoon: /iltapäivällä/i,
				evening: /illalla/i,
				night: /yöllä/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { S as default, S as fi };
