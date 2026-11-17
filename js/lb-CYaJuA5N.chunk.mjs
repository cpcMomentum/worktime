import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/lb/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		standalone: {
			one: "manner wéi eng Sekonn",
			other: "manner wéi {{count}} Sekonnen"
		},
		withPreposition: {
			one: "manner wéi enger Sekonn",
			other: "manner wéi {{count}} Sekonnen"
		}
	},
	xSeconds: {
		standalone: {
			one: "eng Sekonn",
			other: "{{count}} Sekonnen"
		},
		withPreposition: {
			one: "enger Sekonn",
			other: "{{count}} Sekonnen"
		}
	},
	halfAMinute: {
		standalone: "eng hallef Minutt",
		withPreposition: "enger hallwer Minutt"
	},
	lessThanXMinutes: {
		standalone: {
			one: "manner wéi eng Minutt",
			other: "manner wéi {{count}} Minutten"
		},
		withPreposition: {
			one: "manner wéi enger Minutt",
			other: "manner wéi {{count}} Minutten"
		}
	},
	xMinutes: {
		standalone: {
			one: "eng Minutt",
			other: "{{count}} Minutten"
		},
		withPreposition: {
			one: "enger Minutt",
			other: "{{count}} Minutten"
		}
	},
	aboutXHours: {
		standalone: {
			one: "ongeféier eng Stonn",
			other: "ongeféier {{count}} Stonnen"
		},
		withPreposition: {
			one: "ongeféier enger Stonn",
			other: "ongeféier {{count}} Stonnen"
		}
	},
	xHours: {
		standalone: {
			one: "eng Stonn",
			other: "{{count}} Stonnen"
		},
		withPreposition: {
			one: "enger Stonn",
			other: "{{count}} Stonnen"
		}
	},
	xDays: {
		standalone: {
			one: "een Dag",
			other: "{{count}} Deeg"
		},
		withPreposition: {
			one: "engem Dag",
			other: "{{count}} Deeg"
		}
	},
	aboutXWeeks: {
		standalone: {
			one: "ongeféier eng Woch",
			other: "ongeféier {{count}} Wochen"
		},
		withPreposition: {
			one: "ongeféier enger Woche",
			other: "ongeféier {{count}} Wochen"
		}
	},
	xWeeks: {
		standalone: {
			one: "eng Woch",
			other: "{{count}} Wochen"
		},
		withPreposition: {
			one: "enger Woch",
			other: "{{count}} Wochen"
		}
	},
	aboutXMonths: {
		standalone: {
			one: "ongeféier ee Mount",
			other: "ongeféier {{count}} Méint"
		},
		withPreposition: {
			one: "ongeféier engem Mount",
			other: "ongeféier {{count}} Méint"
		}
	},
	xMonths: {
		standalone: {
			one: "ee Mount",
			other: "{{count}} Méint"
		},
		withPreposition: {
			one: "engem Mount",
			other: "{{count}} Méint"
		}
	},
	aboutXYears: {
		standalone: {
			one: "ongeféier ee Joer",
			other: "ongeféier {{count}} Joer"
		},
		withPreposition: {
			one: "ongeféier engem Joer",
			other: "ongeféier {{count}} Joer"
		}
	},
	xYears: {
		standalone: {
			one: "ee Joer",
			other: "{{count}} Joer"
		},
		withPreposition: {
			one: "engem Joer",
			other: "{{count}} Joer"
		}
	},
	overXYears: {
		standalone: {
			one: "méi wéi ee Joer",
			other: "méi wéi {{count}} Joer"
		},
		withPreposition: {
			one: "méi wéi engem Joer",
			other: "méi wéi {{count}} Joer"
		}
	},
	almostXYears: {
		standalone: {
			one: "bal ee Joer",
			other: "bal {{count}} Joer"
		},
		withPreposition: {
			one: "bal engem Joer",
			other: "bal {{count}} Joer"
		}
	}
}, a = [
	"d",
	"h",
	"n",
	"t",
	"z"
], o = [
	"a,",
	"e",
	"i",
	"o",
	"u"
], s = [
	0,
	1,
	2,
	3,
	8,
	9
], c = [
	40,
	50,
	60,
	70
];
function l(e) {
	let t = e.charAt(0).toLowerCase();
	if (o.indexOf(t) != -1 || a.indexOf(t) != -1) return !0;
	let n = e.split(" ")[0], r = parseInt(n);
	return !isNaN(r) && s.indexOf(r % 10) != -1 && c.indexOf(parseInt(n.substring(0, 2))) == -1;
}
var u = (e, t, n) => {
	let r, a = i[e], o = n?.addSuffix ? a.withPreposition : a.standalone;
	return r = typeof o == "string" ? o : t === 1 ? o.one : o.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "a" + (l(r) ? "n" : "") + " " + r : "viru" + (l(r) ? "n" : "") + " " + r : r;
}, d = {
	date: e({
		formats: {
			full: "EEEE, do MMMM y",
			long: "do MMMM y",
			medium: "do MMM y",
			short: "dd.MM.yy"
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
			full: "{{date}} 'um' {{time}}",
			long: "{{date}} 'um' {{time}}",
			medium: "{{date}} {{time}}",
			short: "{{date}} {{time}}"
		},
		defaultWidth: "full"
	})
}, f = {
	lastWeek: (e) => {
		let t = e.getDay(), n = "'läschte";
		return (t === 2 || t === 4) && (n += "n"), n += "' eeee 'um' p", n;
	},
	yesterday: "'gëschter um' p",
	today: "'haut um' p",
	tomorrow: "'moien um' p",
	nextWeek: "eeee 'um' p",
	other: "P"
}, p = {
	code: "lb",
	formatDistance: u,
	formatLong: d,
	formatRelative: (e, t, n, r) => {
		let i = f[e];
		return typeof i == "function" ? i(t) : i;
	},
	localize: {
		ordinalNumber: (e, t) => Number(e) + ".",
		era: n({
			values: {
				narrow: ["v.Chr.", "n.Chr."],
				abbreviated: ["v.Chr.", "n.Chr."],
				wide: ["viru Christus", "no Christus"]
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
					"1. Quartal",
					"2. Quartal",
					"3. Quartal",
					"4. Quartal"
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
					"Mäe",
					"Abr",
					"Mee",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Okt",
					"Nov",
					"Dez"
				],
				wide: [
					"Januar",
					"Februar",
					"Mäerz",
					"Abrëll",
					"Mee",
					"Juni",
					"Juli",
					"August",
					"September",
					"Oktober",
					"November",
					"Dezember"
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
					"M",
					"D",
					"F",
					"S"
				],
				short: [
					"So",
					"Mé",
					"Dë",
					"Më",
					"Do",
					"Fr",
					"Sa"
				],
				abbreviated: [
					"So.",
					"Mé.",
					"Dë.",
					"Më.",
					"Do.",
					"Fr.",
					"Sa."
				],
				wide: [
					"Sonndeg",
					"Méindeg",
					"Dënschdeg",
					"Mëttwoch",
					"Donneschdeg",
					"Freideg",
					"Samschdeg"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "mo.",
					pm: "nomë.",
					midnight: "Mëtternuecht",
					noon: "Mëtteg",
					morning: "Moien",
					afternoon: "Nomëtteg",
					evening: "Owend",
					night: "Nuecht"
				},
				abbreviated: {
					am: "moies",
					pm: "nomëttes",
					midnight: "Mëtternuecht",
					noon: "Mëtteg",
					morning: "Moien",
					afternoon: "Nomëtteg",
					evening: "Owend",
					night: "Nuecht"
				},
				wide: {
					am: "moies",
					pm: "nomëttes",
					midnight: "Mëtternuecht",
					noon: "Mëtteg",
					morning: "Moien",
					afternoon: "Nomëtteg",
					evening: "Owend",
					night: "Nuecht"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "mo.",
					pm: "nom.",
					midnight: "Mëtternuecht",
					noon: "mëttes",
					morning: "moies",
					afternoon: "nomëttes",
					evening: "owes",
					night: "nuets"
				},
				abbreviated: {
					am: "moies",
					pm: "nomëttes",
					midnight: "Mëtternuecht",
					noon: "mëttes",
					morning: "moies",
					afternoon: "nomëttes",
					evening: "owes",
					night: "nuets"
				},
				wide: {
					am: "moies",
					pm: "nomëttes",
					midnight: "Mëtternuecht",
					noon: "mëttes",
					morning: "moies",
					afternoon: "nomëttes",
					evening: "owes",
					night: "nuets"
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
				narrow: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
				abbreviated: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
				wide: /^(viru Christus|virun eiser Zäitrechnung|no Christus|eiser Zäitrechnung)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^v/i, /^n/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](\.)? Quartal/i
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
				abbreviated: /^(jan|feb|mäe|abr|mee|jun|jul|aug|sep|okt|nov|dez)/i,
				wide: /^(januar|februar|mäerz|abrëll|mee|juni|juli|august|september|oktober|november|dezember)/i
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
					/^mä/i,
					/^ab/i,
					/^me/i,
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
				narrow: /^[smdf]/i,
				short: /^(so|mé|dë|më|do|fr|sa)/i,
				abbreviated: /^(son?|méi?|dën?|mët?|don?|fre?|sam?)\.?/i,
				wide: /^(sonndeg|méindeg|dënschdeg|mëttwoch|donneschdeg|freideg|samschdeg)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/^so/i,
				/^mé/i,
				/^dë/i,
				/^më/i,
				/^do/i,
				/^f/i,
				/^sa/i
			] },
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(mo\.?|nomë\.?|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i,
				abbreviated: /^(moi\.?|nomët\.?|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i,
				wide: /^(moies|nomëttes|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: {
				am: /^m/i,
				pm: /^n/i,
				midnight: /^Mëtter/i,
				noon: /^mëttes/i,
				morning: /moies/i,
				afternoon: /nomëttes/i,
				evening: /owes/i,
				night: /nuets/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { p as default, p as lb };
