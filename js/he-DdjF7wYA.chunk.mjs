import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/he/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "פחות משנייה",
		two: "פחות משתי שניות",
		other: "פחות מ־{{count}} שניות"
	},
	xSeconds: {
		one: "שנייה",
		two: "שתי שניות",
		other: "{{count}} שניות"
	},
	halfAMinute: "חצי דקה",
	lessThanXMinutes: {
		one: "פחות מדקה",
		two: "פחות משתי דקות",
		other: "פחות מ־{{count}} דקות"
	},
	xMinutes: {
		one: "דקה",
		two: "שתי דקות",
		other: "{{count}} דקות"
	},
	aboutXHours: {
		one: "כשעה",
		two: "כשעתיים",
		other: "כ־{{count}} שעות"
	},
	xHours: {
		one: "שעה",
		two: "שעתיים",
		other: "{{count}} שעות"
	},
	xDays: {
		one: "יום",
		two: "יומיים",
		other: "{{count}} ימים"
	},
	aboutXWeeks: {
		one: "כשבוע",
		two: "כשבועיים",
		other: "כ־{{count}} שבועות"
	},
	xWeeks: {
		one: "שבוע",
		two: "שבועיים",
		other: "{{count}} שבועות"
	},
	aboutXMonths: {
		one: "כחודש",
		two: "כחודשיים",
		other: "כ־{{count}} חודשים"
	},
	xMonths: {
		one: "חודש",
		two: "חודשיים",
		other: "{{count}} חודשים"
	},
	aboutXYears: {
		one: "כשנה",
		two: "כשנתיים",
		other: "כ־{{count}} שנים"
	},
	xYears: {
		one: "שנה",
		two: "שנתיים",
		other: "{{count}} שנים"
	},
	overXYears: {
		one: "יותר משנה",
		two: "יותר משנתיים",
		other: "יותר מ־{{count}} שנים"
	},
	almostXYears: {
		one: "כמעט שנה",
		two: "כמעט שנתיים",
		other: "כמעט {{count}} שנים"
	}
}, a = (e, t, n) => {
	if (e === "xDays" && n?.addSuffix && t <= 2) return n.comparison && n.comparison > 0 ? t === 1 ? "מחר" : "מחרתיים" : t === 1 ? "אתמול" : "שלשום";
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : t === 2 ? a.two : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "בעוד " + r : "לפני " + r : r;
}, o = {
	date: e({
		formats: {
			full: "EEEE, d בMMMM y",
			long: "d בMMMM y",
			medium: "d בMMM y",
			short: "d.M.y"
		},
		defaultWidth: "full"
	}),
	time: e({
		formats: {
			full: "H:mm:ss zzzz",
			long: "H:mm:ss z",
			medium: "H:mm:ss",
			short: "H:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: e({
		formats: {
			full: "{{date}} 'בשעה' {{time}}",
			long: "{{date}} 'בשעה' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "eeee 'שעבר בשעה' p",
	yesterday: "'אתמול בשעה' p",
	today: "'היום בשעה' p",
	tomorrow: "'מחר בשעה' p",
	nextWeek: "eeee 'בשעה' p",
	other: "P"
}, c = (e, t, n, r) => s[e], l = {
	ordinalNumber: (e, t) => {
		let n = Number(e);
		if (n <= 0 || n > 10) return String(n);
		let r = String(t?.unit), i = [
			"year",
			"hour",
			"minute",
			"second"
		].indexOf(r) >= 0, a = [
			"ראשון",
			"שני",
			"שלישי",
			"רביעי",
			"חמישי",
			"שישי",
			"שביעי",
			"שמיני",
			"תשיעי",
			"עשירי"
		], o = [
			"ראשונה",
			"שנייה",
			"שלישית",
			"רביעית",
			"חמישית",
			"שישית",
			"שביעית",
			"שמינית",
			"תשיעית",
			"עשירית"
		], s = n - 1;
		return i ? o[s] : a[s];
	},
	era: n({
		values: {
			narrow: ["לפנה״ס", "לספירה"],
			abbreviated: ["לפנה״ס", "לספירה"],
			wide: ["לפני הספירה", "לספירה"]
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
				"רבעון 1",
				"רבעון 2",
				"רבעון 3",
				"רבעון 4"
			]
		},
		defaultWidth: "wide",
		argumentCallback: (e) => e - 1
	}),
	month: n({
		values: {
			narrow: [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12"
			],
			abbreviated: [
				"ינו׳",
				"פבר׳",
				"מרץ",
				"אפר׳",
				"מאי",
				"יוני",
				"יולי",
				"אוג׳",
				"ספט׳",
				"אוק׳",
				"נוב׳",
				"דצמ׳"
			],
			wide: [
				"ינואר",
				"פברואר",
				"מרץ",
				"אפריל",
				"מאי",
				"יוני",
				"יולי",
				"אוגוסט",
				"ספטמבר",
				"אוקטובר",
				"נובמבר",
				"דצמבר"
			]
		},
		defaultWidth: "wide"
	}),
	day: n({
		values: {
			narrow: [
				"א׳",
				"ב׳",
				"ג׳",
				"ד׳",
				"ה׳",
				"ו׳",
				"ש׳"
			],
			short: [
				"א׳",
				"ב׳",
				"ג׳",
				"ד׳",
				"ה׳",
				"ו׳",
				"ש׳"
			],
			abbreviated: [
				"יום א׳",
				"יום ב׳",
				"יום ג׳",
				"יום ד׳",
				"יום ה׳",
				"יום ו׳",
				"שבת"
			],
			wide: [
				"יום ראשון",
				"יום שני",
				"יום שלישי",
				"יום רביעי",
				"יום חמישי",
				"יום שישי",
				"יום שבת"
			]
		},
		defaultWidth: "wide"
	}),
	dayPeriod: n({
		values: {
			narrow: {
				am: "לפנה״צ",
				pm: "אחה״צ",
				midnight: "חצות",
				noon: "צהריים",
				morning: "בוקר",
				afternoon: "אחר הצהריים",
				evening: "ערב",
				night: "לילה"
			},
			abbreviated: {
				am: "לפנה״צ",
				pm: "אחה״צ",
				midnight: "חצות",
				noon: "צהריים",
				morning: "בוקר",
				afternoon: "אחר הצהריים",
				evening: "ערב",
				night: "לילה"
			},
			wide: {
				am: "לפנה״צ",
				pm: "אחה״צ",
				midnight: "חצות",
				noon: "צהריים",
				morning: "בוקר",
				afternoon: "אחר הצהריים",
				evening: "ערב",
				night: "לילה"
			}
		},
		defaultWidth: "wide",
		formattingValues: {
			narrow: {
				am: "לפנה״צ",
				pm: "אחה״צ",
				midnight: "חצות",
				noon: "צהריים",
				morning: "בבוקר",
				afternoon: "בצהריים",
				evening: "בערב",
				night: "בלילה"
			},
			abbreviated: {
				am: "לפנה״צ",
				pm: "אחה״צ",
				midnight: "חצות",
				noon: "צהריים",
				morning: "בבוקר",
				afternoon: "אחר הצהריים",
				evening: "בערב",
				night: "בלילה"
			},
			wide: {
				am: "לפנה״צ",
				pm: "אחה״צ",
				midnight: "חצות",
				noon: "צהריים",
				morning: "בבוקר",
				afternoon: "אחר הצהריים",
				evening: "בערב",
				night: "בלילה"
			}
		},
		defaultFormattingWidth: "wide"
	})
}, u = /^(\d+|(ראשון|שני|שלישי|רביעי|חמישי|שישי|שביעי|שמיני|תשיעי|עשירי|ראשונה|שנייה|שלישית|רביעית|חמישית|שישית|שביעית|שמינית|תשיעית|עשירית))/i, d = /^(\d+|רא|שנ|של|רב|ח|שי|שב|שמ|ת|ע)/i, f = {
	narrow: /^ל(ספירה|פנה״ס)/i,
	abbreviated: /^ל(ספירה|פנה״ס)/i,
	wide: /^ל(פני ה)?ספירה/i
}, p = { any: [/^לפ/i, /^לס/i] }, m = {
	narrow: /^[1234]/i,
	abbreviated: /^q[1234]/i,
	wide: /^רבעון [1234]/i
}, h = { any: [
	/1/i,
	/2/i,
	/3/i,
	/4/i
] }, g = {
	narrow: /^\d+/i,
	abbreviated: /^(ינו|פבר|מרץ|אפר|מאי|יוני|יולי|אוג|ספט|אוק|נוב|דצמ)׳?/i,
	wide: /^(ינואר|פברואר|מרץ|אפריל|מאי|יוני|יולי|אוגוסט|ספטמבר|אוקטובר|נובמבר|דצמבר)/i
}, _ = {
	narrow: [
		/^1$/i,
		/^2/i,
		/^3/i,
		/^4/i,
		/^5/i,
		/^6/i,
		/^7/i,
		/^8/i,
		/^9/i,
		/^10/i,
		/^11/i,
		/^12/i
	],
	any: [
		/^ינ/i,
		/^פ/i,
		/^מר/i,
		/^אפ/i,
		/^מא/i,
		/^יונ/i,
		/^יול/i,
		/^אוג/i,
		/^ס/i,
		/^אוק/i,
		/^נ/i,
		/^ד/i
	]
}, v = {
	narrow: /^[אבגדהוש]׳/i,
	short: /^[אבגדהוש]׳/i,
	abbreviated: /^(שבת|יום (א|ב|ג|ד|ה|ו)׳)/i,
	wide: /^יום (ראשון|שני|שלישי|רביעי|חמישי|שישי|שבת)/i
}, y = {
	abbreviated: [
		/א׳$/i,
		/ב׳$/i,
		/ג׳$/i,
		/ד׳$/i,
		/ה׳$/i,
		/ו׳$/i,
		/^ש/i
	],
	wide: [
		/ן$/i,
		/ני$/i,
		/לישי$/i,
		/עי$/i,
		/מישי$/i,
		/שישי$/i,
		/ת$/i
	],
	any: [
		/^א/i,
		/^ב/i,
		/^ג/i,
		/^ד/i,
		/^ה/i,
		/^ו/i,
		/^ש/i
	]
}, b = { any: /^(אחר ה|ב)?(חצות|צהריים|בוקר|ערב|לילה|אחה״צ|לפנה״צ)/i }, x = { any: {
	am: /^לפ/i,
	pm: /^אחה/i,
	midnight: /^ח/i,
	noon: /^צ/i,
	morning: /בוקר/i,
	afternoon: /בצ|אחר/i,
	evening: /ערב/i,
	night: /לילה/i
} }, S = [
	"רא",
	"שנ",
	"של",
	"רב",
	"ח",
	"שי",
	"שב",
	"שמ",
	"ת",
	"ע"
], C = {
	code: "he",
	formatDistance: a,
	formatLong: o,
	formatRelative: c,
	localize: l,
	match: {
		ordinalNumber: r({
			matchPattern: u,
			parsePattern: d,
			valueCallback: (e) => {
				let t = parseInt(e, 10);
				return isNaN(t) ? S.indexOf(e) + 1 : t;
			}
		}),
		era: t({
			matchPatterns: f,
			defaultMatchWidth: "wide",
			parsePatterns: p,
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: m,
			defaultMatchWidth: "wide",
			parsePatterns: h,
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: t({
			matchPatterns: g,
			defaultMatchWidth: "wide",
			parsePatterns: _,
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: v,
			defaultMatchWidth: "wide",
			parsePatterns: y,
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: b,
			defaultMatchWidth: "any",
			parsePatterns: x,
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
export { C as default, C as he };
