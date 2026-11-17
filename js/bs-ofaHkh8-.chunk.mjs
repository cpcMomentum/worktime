import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/bs/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: {
			standalone: "manje od 1 sekunde",
			withPrepositionAgo: "manje od 1 sekunde",
			withPrepositionIn: "manje od 1 sekundu"
		},
		dual: "manje od {{count}} sekunde",
		other: "manje od {{count}} sekundi"
	},
	xSeconds: {
		one: {
			standalone: "1 sekunda",
			withPrepositionAgo: "1 sekunde",
			withPrepositionIn: "1 sekundu"
		},
		dual: "{{count}} sekunde",
		other: "{{count}} sekundi"
	},
	halfAMinute: "pola minute",
	lessThanXMinutes: {
		one: {
			standalone: "manje od 1 minute",
			withPrepositionAgo: "manje od 1 minute",
			withPrepositionIn: "manje od 1 minutu"
		},
		dual: "manje od {{count}} minute",
		other: "manje od {{count}} minuta"
	},
	xMinutes: {
		one: {
			standalone: "1 minuta",
			withPrepositionAgo: "1 minute",
			withPrepositionIn: "1 minutu"
		},
		dual: "{{count}} minute",
		other: "{{count}} minuta"
	},
	aboutXHours: {
		one: {
			standalone: "oko 1 sat",
			withPrepositionAgo: "oko 1 sat",
			withPrepositionIn: "oko 1 sat"
		},
		dual: "oko {{count}} sata",
		other: "oko {{count}} sati"
	},
	xHours: {
		one: {
			standalone: "1 sat",
			withPrepositionAgo: "1 sat",
			withPrepositionIn: "1 sat"
		},
		dual: "{{count}} sata",
		other: "{{count}} sati"
	},
	xDays: {
		one: {
			standalone: "1 dan",
			withPrepositionAgo: "1 dan",
			withPrepositionIn: "1 dan"
		},
		dual: "{{count}} dana",
		other: "{{count}} dana"
	},
	aboutXWeeks: {
		one: {
			standalone: "oko 1 sedmicu",
			withPrepositionAgo: "oko 1 sedmicu",
			withPrepositionIn: "oko 1 sedmicu"
		},
		dual: "oko {{count}} sedmice",
		other: "oko {{count}} sedmice"
	},
	xWeeks: {
		one: {
			standalone: "1 sedmicu",
			withPrepositionAgo: "1 sedmicu",
			withPrepositionIn: "1 sedmicu"
		},
		dual: "{{count}} sedmice",
		other: "{{count}} sedmice"
	},
	aboutXMonths: {
		one: {
			standalone: "oko 1 mjesec",
			withPrepositionAgo: "oko 1 mjesec",
			withPrepositionIn: "oko 1 mjesec"
		},
		dual: "oko {{count}} mjeseca",
		other: "oko {{count}} mjeseci"
	},
	xMonths: {
		one: {
			standalone: "1 mjesec",
			withPrepositionAgo: "1 mjesec",
			withPrepositionIn: "1 mjesec"
		},
		dual: "{{count}} mjeseca",
		other: "{{count}} mjeseci"
	},
	aboutXYears: {
		one: {
			standalone: "oko 1 godinu",
			withPrepositionAgo: "oko 1 godinu",
			withPrepositionIn: "oko 1 godinu"
		},
		dual: "oko {{count}} godine",
		other: "oko {{count}} godina"
	},
	xYears: {
		one: {
			standalone: "1 godina",
			withPrepositionAgo: "1 godine",
			withPrepositionIn: "1 godinu"
		},
		dual: "{{count}} godine",
		other: "{{count}} godina"
	},
	overXYears: {
		one: {
			standalone: "preko 1 godinu",
			withPrepositionAgo: "preko 1 godinu",
			withPrepositionIn: "preko 1 godinu"
		},
		dual: "preko {{count}} godine",
		other: "preko {{count}} godina"
	},
	almostXYears: {
		one: {
			standalone: "gotovo 1 godinu",
			withPrepositionAgo: "gotovo 1 godinu",
			withPrepositionIn: "gotovo 1 godinu"
		},
		dual: "gotovo {{count}} godine",
		other: "gotovo {{count}} godina"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? n?.addSuffix ? n.comparison && n.comparison > 0 ? a.one.withPrepositionIn : a.one.withPrepositionAgo : a.one.standalone : t % 10 > 1 && t % 10 < 5 && String(t).substr(-2, 1) !== "1" ? a.dual.replace("{{count}}", String(t)) : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "za " + r : "prije " + r : r;
}, o = {
	date: e({
		formats: {
			full: "EEEE, d. MMMM yyyy.",
			long: "d. MMMM yyyy.",
			medium: "d. MMM yy.",
			short: "dd. MM. yy."
		},
		defaultWidth: "full"
	}),
	time: e({
		formats: {
			full: "HH:mm:ss (zzzz)",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: e({
		formats: {
			full: "{{date}} 'u' {{time}}",
			long: "{{date}} 'u' {{time}}",
			medium: "{{date}} {{time}}",
			short: "{{date}} {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: (e) => {
		switch (e.getDay()) {
			case 0: return "'prošle nedjelje u' p";
			case 3: return "'prošle srijede u' p";
			case 6: return "'prošle subote u' p";
			default: return "'prošli' EEEE 'u' p";
		}
	},
	yesterday: "'juče u' p",
	today: "'danas u' p",
	tomorrow: "'sutra u' p",
	nextWeek: (e) => {
		switch (e.getDay()) {
			case 0: return "'sljedeće nedjelje u' p";
			case 3: return "'sljedeću srijedu u' p";
			case 6: return "'sljedeću subotu u' p";
			default: return "'sljedeći' EEEE 'u' p";
		}
	},
	other: "P"
}, c = {
	code: "bs",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => {
		let i = s[e];
		return typeof i == "function" ? i(t) : i;
	},
	localize: {
		ordinalNumber: (e, t) => {
			let n = Number(e);
			return String(n) + ".";
		},
		era: n({
			values: {
				narrow: ["pr.n.e.", "AD"],
				abbreviated: ["pr. Hr.", "po. Hr."],
				wide: ["Prije Hrista", "Poslije Hrista"]
			},
			defaultWidth: "wide"
		}),
		quarter: n({
			values: {
				narrow: [
					"1.",
					"2.",
					"3.",
					"4."
				],
				abbreviated: [
					"1. kv.",
					"2. kv.",
					"3. kv.",
					"4. kv."
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
					"1.",
					"2.",
					"3.",
					"4.",
					"5.",
					"6.",
					"7.",
					"8.",
					"9.",
					"10.",
					"11.",
					"12."
				],
				abbreviated: [
					"jan",
					"feb",
					"mar",
					"apr",
					"maj",
					"jun",
					"jul",
					"avg",
					"sep",
					"okt",
					"nov",
					"dec"
				],
				wide: [
					"januar",
					"februar",
					"mart",
					"april",
					"maj",
					"juni",
					"juli",
					"avgust",
					"septembar",
					"oktobar",
					"novembar",
					"decembar"
				]
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: [
					"1.",
					"2.",
					"3.",
					"4.",
					"5.",
					"6.",
					"7.",
					"8.",
					"9.",
					"10.",
					"11.",
					"12."
				],
				abbreviated: [
					"jan",
					"feb",
					"mar",
					"apr",
					"maj",
					"jun",
					"jul",
					"avg",
					"sep",
					"okt",
					"nov",
					"dec"
				],
				wide: [
					"januar",
					"februar",
					"mart",
					"april",
					"maj",
					"juni",
					"juli",
					"avgust",
					"septembar",
					"oktobar",
					"novembar",
					"decembar"
				]
			},
			defaultFormattingWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"N",
					"P",
					"U",
					"S",
					"Č",
					"P",
					"S"
				],
				short: [
					"ned",
					"pon",
					"uto",
					"sre",
					"čet",
					"pet",
					"sub"
				],
				abbreviated: [
					"ned",
					"pon",
					"uto",
					"sre",
					"čet",
					"pet",
					"sub"
				],
				wide: [
					"nedjelja",
					"ponedjeljak",
					"utorak",
					"srijeda",
					"četvrtak",
					"petak",
					"subota"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "AM",
					pm: "PM",
					midnight: "ponoć",
					noon: "podne",
					morning: "ujutru",
					afternoon: "popodne",
					evening: "uveče",
					night: "noću"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "ponoć",
					noon: "podne",
					morning: "ujutru",
					afternoon: "popodne",
					evening: "uveče",
					night: "noću"
				},
				wide: {
					am: "AM",
					pm: "PM",
					midnight: "ponoć",
					noon: "podne",
					morning: "ujutru",
					afternoon: "poslije podne",
					evening: "uveče",
					night: "noću"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "AM",
					pm: "PM",
					midnight: "ponoć",
					noon: "podne",
					morning: "ujutru",
					afternoon: "popodne",
					evening: "uveče",
					night: "noću"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "ponoć",
					noon: "podne",
					morning: "ujutru",
					afternoon: "popodne",
					evening: "uveče",
					night: "noću"
				},
				wide: {
					am: "AM",
					pm: "PM",
					midnight: "ponoć",
					noon: "podne",
					morning: "ujutru",
					afternoon: "poslije podne",
					evening: "uveče",
					night: "noću"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)\./i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^(pr\.n\.e\.|AD)/i,
				abbreviated: /^(pr\.\s?Hr\.|po\.\s?Hr\.)/i,
				wide: /^(Prije Hrista|prije nove ere|Poslije Hrista|nova era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^pr/i, /^(po|nova)/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^[1234]\.\s?kv\.?/i,
				wide: /^[1234]\. kvartal/i
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
				narrow: /^(10|11|12|[123456789])\./i,
				abbreviated: /^(jan|feb|mar|apr|maj|jun|jul|avg|sep|okt|nov|dec)/i,
				wide: /^((januar|januara)|(februar|februara)|(mart|marta)|(april|aprila)|(maj|maja)|(juni|juna)|(juli|jula)|(avgust|avgusta)|(septembar|septembra)|(oktobar|oktobra)|(novembar|novembra)|(decembar|decembra))/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^1/i,
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
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^maj/i,
					/^jun/i,
					/^jul/i,
					/^avg/i,
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
				narrow: /^[npusčc]/i,
				short: /^(ned|pon|uto|sre|(čet|cet)|pet|sub)/i,
				abbreviated: /^(ned|pon|uto|sre|(čet|cet)|pet|sub)/i,
				wide: /^(nedjelja|ponedjeljak|utorak|srijeda|(četvrtak|cetvrtak)|petak|subota)/i
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
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: { any: /^(am|pm|ponoc|ponoć|(po)?podne|uvece|uveče|noću|poslije podne|ujutru)/i },
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^pono/i,
				noon: /^pod/i,
				morning: /jutro/i,
				afternoon: /(poslije\s|po)+podne/i,
				evening: /(uvece|uveče)/i,
				night: /(nocu|noću)/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { c as bs, c as default };
