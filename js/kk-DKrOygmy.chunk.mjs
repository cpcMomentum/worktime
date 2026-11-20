import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
import { t as i } from "./isSameWeek-IUVRx6Bb.chunk.mjs";
// node_modules/date-fns/locale/kk/_lib/formatDistance.js
var a = {
	lessThanXSeconds: {
		regular: {
			one: "1 секундтан аз",
			singularNominative: "{{count}} секундтан аз",
			singularGenitive: "{{count}} секундтан аз",
			pluralGenitive: "{{count}} секундтан аз"
		},
		future: {
			one: "бір секундтан кейін",
			singularNominative: "{{count}} секундтан кейін",
			singularGenitive: "{{count}} секундтан кейін",
			pluralGenitive: "{{count}} секундтан кейін"
		}
	},
	xSeconds: {
		regular: {
			singularNominative: "{{count}} секунд",
			singularGenitive: "{{count}} секунд",
			pluralGenitive: "{{count}} секунд"
		},
		past: {
			singularNominative: "{{count}} секунд бұрын",
			singularGenitive: "{{count}} секунд бұрын",
			pluralGenitive: "{{count}} секунд бұрын"
		},
		future: {
			singularNominative: "{{count}} секундтан кейін",
			singularGenitive: "{{count}} секундтан кейін",
			pluralGenitive: "{{count}} секундтан кейін"
		}
	},
	halfAMinute: (e) => e?.addSuffix ? e.comparison && e.comparison > 0 ? "жарты минут ішінде" : "жарты минут бұрын" : "жарты минут",
	lessThanXMinutes: {
		regular: {
			one: "1 минуттан аз",
			singularNominative: "{{count}} минуттан аз",
			singularGenitive: "{{count}} минуттан аз",
			pluralGenitive: "{{count}} минуттан аз"
		},
		future: {
			one: "минуттан кем ",
			singularNominative: "{{count}} минуттан кем",
			singularGenitive: "{{count}} минуттан кем",
			pluralGenitive: "{{count}} минуттан кем"
		}
	},
	xMinutes: {
		regular: {
			singularNominative: "{{count}} минут",
			singularGenitive: "{{count}} минут",
			pluralGenitive: "{{count}} минут"
		},
		past: {
			singularNominative: "{{count}} минут бұрын",
			singularGenitive: "{{count}} минут бұрын",
			pluralGenitive: "{{count}} минут бұрын"
		},
		future: {
			singularNominative: "{{count}} минуттан кейін",
			singularGenitive: "{{count}} минуттан кейін",
			pluralGenitive: "{{count}} минуттан кейін"
		}
	},
	aboutXHours: {
		regular: {
			singularNominative: "шамамен {{count}} сағат",
			singularGenitive: "шамамен {{count}} сағат",
			pluralGenitive: "шамамен {{count}} сағат"
		},
		future: {
			singularNominative: "шамамен {{count}} сағаттан кейін",
			singularGenitive: "шамамен {{count}} сағаттан кейін",
			pluralGenitive: "шамамен {{count}} сағаттан кейін"
		}
	},
	xHours: { regular: {
		singularNominative: "{{count}} сағат",
		singularGenitive: "{{count}} сағат",
		pluralGenitive: "{{count}} сағат"
	} },
	xDays: {
		regular: {
			singularNominative: "{{count}} күн",
			singularGenitive: "{{count}} күн",
			pluralGenitive: "{{count}} күн"
		},
		future: {
			singularNominative: "{{count}} күннен кейін",
			singularGenitive: "{{count}} күннен кейін",
			pluralGenitive: "{{count}} күннен кейін"
		}
	},
	aboutXWeeks: {
		type: "weeks",
		one: "шамамен 1 апта",
		other: "шамамен {{count}} апта"
	},
	xWeeks: {
		type: "weeks",
		one: "1 апта",
		other: "{{count}} апта"
	},
	aboutXMonths: {
		regular: {
			singularNominative: "шамамен {{count}} ай",
			singularGenitive: "шамамен {{count}} ай",
			pluralGenitive: "шамамен {{count}} ай"
		},
		future: {
			singularNominative: "шамамен {{count}} айдан кейін",
			singularGenitive: "шамамен {{count}} айдан кейін",
			pluralGenitive: "шамамен {{count}} айдан кейін"
		}
	},
	xMonths: { regular: {
		singularNominative: "{{count}} ай",
		singularGenitive: "{{count}} ай",
		pluralGenitive: "{{count}} ай"
	} },
	aboutXYears: {
		regular: {
			singularNominative: "шамамен {{count}} жыл",
			singularGenitive: "шамамен {{count}} жыл",
			pluralGenitive: "шамамен {{count}} жыл"
		},
		future: {
			singularNominative: "шамамен {{count}} жылдан кейін",
			singularGenitive: "шамамен {{count}} жылдан кейін",
			pluralGenitive: "шамамен {{count}} жылдан кейін"
		}
	},
	xYears: {
		regular: {
			singularNominative: "{{count}} жыл",
			singularGenitive: "{{count}} жыл",
			pluralGenitive: "{{count}} жыл"
		},
		future: {
			singularNominative: "{{count}} жылдан кейін",
			singularGenitive: "{{count}} жылдан кейін",
			pluralGenitive: "{{count}} жылдан кейін"
		}
	},
	overXYears: {
		regular: {
			singularNominative: "{{count}} жылдан астам",
			singularGenitive: "{{count}} жылдан астам",
			pluralGenitive: "{{count}} жылдан астам"
		},
		future: {
			singularNominative: "{{count}} жылдан астам",
			singularGenitive: "{{count}} жылдан астам",
			pluralGenitive: "{{count}} жылдан астам"
		}
	},
	almostXYears: {
		regular: {
			singularNominative: "{{count}} жылға жақын",
			singularGenitive: "{{count}} жылға жақын",
			pluralGenitive: "{{count}} жылға жақын"
		},
		future: {
			singularNominative: "{{count}} жылдан кейін",
			singularGenitive: "{{count}} жылдан кейін",
			pluralGenitive: "{{count}} жылдан кейін"
		}
	}
};
function o(e, t) {
	if (e.one && t === 1) return e.one;
	let n = t % 10, r = t % 100;
	return n === 1 && r !== 11 ? e.singularNominative.replace("{{count}}", String(t)) : n >= 2 && n <= 4 && (r < 10 || r > 20) ? e.singularGenitive.replace("{{count}}", String(t)) : e.pluralGenitive.replace("{{count}}", String(t));
}
var s = (e, t, n) => {
	let r = a[e];
	return typeof r == "function" ? r(n) : r.type === "weeks" ? t === 1 ? r.one : r.other.replace("{{count}}", String(t)) : n?.addSuffix ? n.comparison && n.comparison > 0 ? r.future ? o(r.future, t) : o(r.regular, t) + " кейін" : r.past ? o(r.past, t) : o(r.regular, t) + " бұрын" : o(r.regular, t);
}, c = {
	date: e({
		formats: {
			full: "EEEE, do MMMM y 'ж.'",
			long: "do MMMM y 'ж.'",
			medium: "d MMM y 'ж.'",
			short: "dd.MM.yyyy"
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
		formats: { any: "{{date}}, {{time}}" },
		defaultWidth: "any"
	})
}, l = [
	"жексенбіде",
	"дүйсенбіде",
	"сейсенбіде",
	"сәрсенбіде",
	"бейсенбіде",
	"жұмада",
	"сенбіде"
];
function u(e) {
	return "'өткен " + l[e] + " сағат' p'-де'";
}
function d(e) {
	return "'" + l[e] + " сағат' p'-де'";
}
function f(e) {
	return "'келесі " + l[e] + " сағат' p'-де'";
}
var p = {
	lastWeek: (e, t, n) => {
		let r = e.getDay();
		return i(e, t, n) ? d(r) : u(r);
	},
	yesterday: "'кеше сағат' p'-де'",
	today: "'бүгін сағат' p'-де'",
	tomorrow: "'ертең сағат' p'-де'",
	nextWeek: (e, t, n) => {
		let r = e.getDay();
		return i(e, t, n) ? d(r) : f(r);
	},
	other: "P"
}, m = (e, t, n, r) => {
	let i = p[e];
	return typeof i == "function" ? i(t, n, r) : i;
}, h = {
	narrow: ["б.з.д.", "б.з."],
	abbreviated: ["б.з.д.", "б.з."],
	wide: ["біздің заманымызға дейін", "біздің заманымыз"]
}, g = {
	narrow: [
		"1",
		"2",
		"3",
		"4"
	],
	abbreviated: [
		"1-ші тоқ.",
		"2-ші тоқ.",
		"3-ші тоқ.",
		"4-ші тоқ."
	],
	wide: [
		"1-ші тоқсан",
		"2-ші тоқсан",
		"3-ші тоқсан",
		"4-ші тоқсан"
	]
}, _ = {
	narrow: [
		"Қ",
		"А",
		"Н",
		"С",
		"М",
		"М",
		"Ш",
		"Т",
		"Қ",
		"Қ",
		"Қ",
		"Ж"
	],
	abbreviated: [
		"қаң",
		"ақп",
		"нау",
		"сәу",
		"мам",
		"мау",
		"шіл",
		"там",
		"қыр",
		"қаз",
		"қар",
		"жел"
	],
	wide: [
		"қаңтар",
		"ақпан",
		"наурыз",
		"сәуір",
		"мамыр",
		"маусым",
		"шілде",
		"тамыз",
		"қыркүйек",
		"қазан",
		"қараша",
		"желтоқсан"
	]
}, v = {
	narrow: [
		"Қ",
		"А",
		"Н",
		"С",
		"М",
		"М",
		"Ш",
		"Т",
		"Қ",
		"Қ",
		"Қ",
		"Ж"
	],
	abbreviated: [
		"қаң",
		"ақп",
		"нау",
		"сәу",
		"мам",
		"мау",
		"шіл",
		"там",
		"қыр",
		"қаз",
		"қар",
		"жел"
	],
	wide: [
		"қаңтар",
		"ақпан",
		"наурыз",
		"сәуір",
		"мамыр",
		"маусым",
		"шілде",
		"тамыз",
		"қыркүйек",
		"қазан",
		"қараша",
		"желтоқсан"
	]
}, y = {
	narrow: [
		"Ж",
		"Д",
		"С",
		"С",
		"Б",
		"Ж",
		"С"
	],
	short: [
		"жс",
		"дс",
		"сс",
		"ср",
		"бс",
		"жм",
		"сб"
	],
	abbreviated: [
		"жс",
		"дс",
		"сс",
		"ср",
		"бс",
		"жм",
		"сб"
	],
	wide: [
		"жексенбі",
		"дүйсенбі",
		"сейсенбі",
		"сәрсенбі",
		"бейсенбі",
		"жұма",
		"сенбі"
	]
}, b = {
	narrow: {
		am: "ТД",
		pm: "ТК",
		midnight: "түн ортасы",
		noon: "түс",
		morning: "таң",
		afternoon: "күндіз",
		evening: "кеш",
		night: "түн"
	},
	wide: {
		am: "ТД",
		pm: "ТК",
		midnight: "түн ортасы",
		noon: "түс",
		morning: "таң",
		afternoon: "күндіз",
		evening: "кеш",
		night: "түн"
	}
}, x = {
	narrow: {
		am: "ТД",
		pm: "ТК",
		midnight: "түн ортасында",
		noon: "түс",
		morning: "таң",
		afternoon: "күн",
		evening: "кеш",
		night: "түн"
	},
	wide: {
		am: "ТД",
		pm: "ТК",
		midnight: "түн ортасында",
		noon: "түсте",
		morning: "таңертең",
		afternoon: "күндіз",
		evening: "кеште",
		night: "түнде"
	}
}, S = {
	0: "-ші",
	1: "-ші",
	2: "-ші",
	3: "-ші",
	4: "-ші",
	5: "-ші",
	6: "-шы",
	7: "-ші",
	8: "-ші",
	9: "-шы",
	10: "-шы",
	20: "-шы",
	30: "-шы",
	40: "-шы",
	50: "-ші",
	60: "-шы",
	70: "-ші",
	80: "-ші",
	90: "-шы",
	100: "-ші"
}, C = {
	code: "kk",
	formatDistance: s,
	formatLong: c,
	formatRelative: m,
	localize: {
		ordinalNumber: (e, t) => {
			let n = Number(e), r = n % 10, i = n >= 100 ? 100 : null;
			return n + (S[n] || S[r] || i && S[i] || "");
		},
		era: n({
			values: h,
			defaultWidth: "wide"
		}),
		quarter: n({
			values: g,
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: _,
			defaultWidth: "wide",
			formattingValues: v,
			defaultFormattingWidth: "wide"
		}),
		day: n({
			values: y,
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: b,
			defaultWidth: "any",
			formattingValues: x,
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(-?(ші|шы))?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^((б )?з\.?\s?д\.?)/i,
				abbreviated: /^((б )?з\.?\s?д\.?)/i,
				wide: /^(біздің заманымызға дейін|біздің заманымыз|біздің заманымыздан)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^б/i, /^з/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^[1234](-?ші)? тоқ.?/i,
				wide: /^[1234](-?ші)? тоқсан/i
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
				narrow: /^(қ|а|н|с|м|мау|ш|т|қыр|қаз|қар|ж)/i,
				abbreviated: /^(қаң|ақп|нау|сәу|мам|мау|шіл|там|қыр|қаз|қар|жел)/i,
				wide: /^(қаңтар|ақпан|наурыз|сәуір|мамыр|маусым|шілде|тамыз|қыркүйек|қазан|қараша|желтоқсан)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^қ/i,
					/^а/i,
					/^н/i,
					/^с/i,
					/^м/i,
					/^м/i,
					/^ш/i,
					/^т/i,
					/^қ/i,
					/^қ/i,
					/^қ/i,
					/^ж/i
				],
				abbreviated: [
					/^қаң/i,
					/^ақп/i,
					/^нау/i,
					/^сәу/i,
					/^мам/i,
					/^мау/i,
					/^шіл/i,
					/^там/i,
					/^қыр/i,
					/^қаз/i,
					/^қар/i,
					/^жел/i
				],
				any: [
					/^қ/i,
					/^а/i,
					/^н/i,
					/^с/i,
					/^м/i,
					/^м/i,
					/^ш/i,
					/^т/i,
					/^қ/i,
					/^қ/i,
					/^қ/i,
					/^ж/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^(ж|д|с|с|б|ж|с)/i,
				short: /^(жс|дс|сс|ср|бс|жм|сб)/i,
				wide: /^(жексенбі|дүйсенбі|сейсенбі|сәрсенбі|бейсенбі|жұма|сенбі)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^ж/i,
					/^д/i,
					/^с/i,
					/^с/i,
					/^б/i,
					/^ж/i,
					/^с/i
				],
				short: [
					/^жс/i,
					/^дс/i,
					/^сс/i,
					/^ср/i,
					/^бс/i,
					/^жм/i,
					/^сб/i
				],
				any: [
					/^ж[ек]/i,
					/^д[үй]/i,
					/^сe[й]/i,
					/^сә[р]/i,
					/^б[ей]/i,
					/^ж[ұм]/i,
					/^се[н]/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^Т\.?\s?[ДК]\.?|түн ортасында|((түсте|таңертең|таңда|таңертең|таңмен|таң|күндіз|күн|кеште|кеш|түнде|түн)\.?)/i,
				wide: /^Т\.?\s?[ДК]\.?|түн ортасында|((түсте|таңертең|таңда|таңертең|таңмен|таң|күндіз|күн|кеште|кеш|түнде|түн)\.?)/i,
				any: /^Т\.?\s?[ДК]\.?|түн ортасында|((түсте|таңертең|таңда|таңертең|таңмен|таң|күндіз|күн|кеште|кеш|түнде|түн)\.?)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: {
				am: /^ТД/i,
				pm: /^ТК/i,
				midnight: /^түн орта/i,
				noon: /^күндіз/i,
				morning: /таң/i,
				afternoon: /түс/i,
				evening: /кеш/i,
				night: /түн/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 1
	}
};
export { C as default, C as kk };
