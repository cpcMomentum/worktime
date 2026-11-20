import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/lt/_lib/formatDistance.js
var i = {
	xseconds_other: "sekundė_sekundžių_sekundes",
	xminutes_one: "minutė_minutės_minutę",
	xminutes_other: "minutės_minučių_minutes",
	xhours_one: "valanda_valandos_valandą",
	xhours_other: "valandos_valandų_valandas",
	xdays_one: "diena_dienos_dieną",
	xdays_other: "dienos_dienų_dienas",
	xweeks_one: "savaitė_savaitės_savaitę",
	xweeks_other: "savaitės_savaičių_savaites",
	xmonths_one: "mėnuo_mėnesio_mėnesį",
	xmonths_other: "mėnesiai_mėnesių_mėnesius",
	xyears_one: "metai_metų_metus",
	xyears_other: "metai_metų_metus",
	about: "apie",
	over: "daugiau nei",
	almost: "beveik",
	lessthan: "mažiau nei"
}, a = (e, t, n, r) => t ? r ? "kelių sekundžių" : "kelias sekundes" : "kelios sekundės", o = (e, t, n, r) => t ? r ? l(n)[1] : l(n)[2] : l(n)[0], s = (e, t, n, r) => {
	let i = e + " ";
	return e === 1 ? i + o(e, t, n, r) : t ? r ? i + l(n)[1] : i + (c(e) ? l(n)[1] : l(n)[2]) : i + (c(e) ? l(n)[1] : l(n)[0]);
};
function c(e) {
	return e % 10 == 0 || e > 10 && e < 20;
}
function l(e) {
	return i[e].split("_");
}
var u = {
	lessThanXSeconds: {
		one: a,
		other: s
	},
	xSeconds: {
		one: a,
		other: s
	},
	halfAMinute: "pusė minutės",
	lessThanXMinutes: {
		one: o,
		other: s
	},
	xMinutes: {
		one: o,
		other: s
	},
	aboutXHours: {
		one: o,
		other: s
	},
	xHours: {
		one: o,
		other: s
	},
	xDays: {
		one: o,
		other: s
	},
	aboutXWeeks: {
		one: o,
		other: s
	},
	xWeeks: {
		one: o,
		other: s
	},
	aboutXMonths: {
		one: o,
		other: s
	},
	xMonths: {
		one: o,
		other: s
	},
	aboutXYears: {
		one: o,
		other: s
	},
	xYears: {
		one: o,
		other: s
	},
	overXYears: {
		one: o,
		other: s
	},
	almostXYears: {
		one: o,
		other: s
	}
}, d = (e, t, n) => {
	let r = e.match(/about|over|almost|lessthan/i), a = r ? e.replace(r[0], "") : e, o = n?.comparison !== void 0 && n.comparison > 0, s, c = u[e];
	return s = typeof c == "string" ? c : t === 1 ? c.one(t, n?.addSuffix === !0, a.toLowerCase() + "_one", o) : c.other(t, n?.addSuffix === !0, a.toLowerCase() + "_other", o), r && (s = i[r[0].toLowerCase()] + " " + s), n?.addSuffix ? n.comparison && n.comparison > 0 ? "po " + s : "prieš " + s : s;
}, f = {
	date: e({
		formats: {
			full: "y 'm'. MMMM d 'd'., EEEE",
			long: "y 'm'. MMMM d 'd'.",
			medium: "y-MM-dd",
			short: "y-MM-dd"
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
}, p = {
	lastWeek: "'Praėjusį' eeee p",
	yesterday: "'Vakar' p",
	today: "'Šiandien' p",
	tomorrow: "'Rytoj' p",
	nextWeek: "eeee p",
	other: "P"
}, m = {
	code: "lt",
	formatDistance: d,
	formatLong: f,
	formatRelative: (e, t, n, r) => p[e],
	localize: {
		ordinalNumber: (e, t) => Number(e) + "-oji",
		era: n({
			values: {
				narrow: ["pr. Kr.", "po Kr."],
				abbreviated: ["pr. Kr.", "po Kr."],
				wide: ["prieš Kristų", "po Kristaus"]
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
					"I ketv.",
					"II ketv.",
					"III ketv.",
					"IV ketv."
				],
				wide: [
					"I ketvirtis",
					"II ketvirtis",
					"III ketvirtis",
					"IV ketvirtis"
				]
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: [
					"1",
					"2",
					"3",
					"4"
				],
				abbreviated: [
					"I k.",
					"II k.",
					"III k.",
					"IV k."
				],
				wide: [
					"I ketvirtis",
					"II ketvirtis",
					"III ketvirtis",
					"IV ketvirtis"
				]
			},
			defaultFormattingWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: {
				narrow: [
					"S",
					"V",
					"K",
					"B",
					"G",
					"B",
					"L",
					"R",
					"R",
					"S",
					"L",
					"G"
				],
				abbreviated: [
					"saus.",
					"vas.",
					"kov.",
					"bal.",
					"geg.",
					"birž.",
					"liep.",
					"rugp.",
					"rugs.",
					"spal.",
					"lapkr.",
					"gruod."
				],
				wide: [
					"sausis",
					"vasaris",
					"kovas",
					"balandis",
					"gegužė",
					"birželis",
					"liepa",
					"rugpjūtis",
					"rugsėjis",
					"spalis",
					"lapkritis",
					"gruodis"
				]
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: [
					"S",
					"V",
					"K",
					"B",
					"G",
					"B",
					"L",
					"R",
					"R",
					"S",
					"L",
					"G"
				],
				abbreviated: [
					"saus.",
					"vas.",
					"kov.",
					"bal.",
					"geg.",
					"birž.",
					"liep.",
					"rugp.",
					"rugs.",
					"spal.",
					"lapkr.",
					"gruod."
				],
				wide: [
					"sausio",
					"vasario",
					"kovo",
					"balandžio",
					"gegužės",
					"birželio",
					"liepos",
					"rugpjūčio",
					"rugsėjo",
					"spalio",
					"lapkričio",
					"gruodžio"
				]
			},
			defaultFormattingWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"S",
					"P",
					"A",
					"T",
					"K",
					"P",
					"Š"
				],
				short: [
					"Sk",
					"Pr",
					"An",
					"Tr",
					"Kt",
					"Pn",
					"Št"
				],
				abbreviated: [
					"sk",
					"pr",
					"an",
					"tr",
					"kt",
					"pn",
					"št"
				],
				wide: [
					"sekmadienis",
					"pirmadienis",
					"antradienis",
					"trečiadienis",
					"ketvirtadienis",
					"penktadienis",
					"šeštadienis"
				]
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: [
					"S",
					"P",
					"A",
					"T",
					"K",
					"P",
					"Š"
				],
				short: [
					"Sk",
					"Pr",
					"An",
					"Tr",
					"Kt",
					"Pn",
					"Št"
				],
				abbreviated: [
					"sk",
					"pr",
					"an",
					"tr",
					"kt",
					"pn",
					"št"
				],
				wide: [
					"sekmadienį",
					"pirmadienį",
					"antradienį",
					"trečiadienį",
					"ketvirtadienį",
					"penktadienį",
					"šeštadienį"
				]
			},
			defaultFormattingWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "pr. p.",
					pm: "pop.",
					midnight: "vidurnaktis",
					noon: "vidurdienis",
					morning: "rytas",
					afternoon: "diena",
					evening: "vakaras",
					night: "naktis"
				},
				abbreviated: {
					am: "priešpiet",
					pm: "popiet",
					midnight: "vidurnaktis",
					noon: "vidurdienis",
					morning: "rytas",
					afternoon: "diena",
					evening: "vakaras",
					night: "naktis"
				},
				wide: {
					am: "priešpiet",
					pm: "popiet",
					midnight: "vidurnaktis",
					noon: "vidurdienis",
					morning: "rytas",
					afternoon: "diena",
					evening: "vakaras",
					night: "naktis"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "pr. p.",
					pm: "pop.",
					midnight: "vidurnaktis",
					noon: "perpiet",
					morning: "rytas",
					afternoon: "popietė",
					evening: "vakaras",
					night: "naktis"
				},
				abbreviated: {
					am: "priešpiet",
					pm: "popiet",
					midnight: "vidurnaktis",
					noon: "perpiet",
					morning: "rytas",
					afternoon: "popietė",
					evening: "vakaras",
					night: "naktis"
				},
				wide: {
					am: "priešpiet",
					pm: "popiet",
					midnight: "vidurnaktis",
					noon: "perpiet",
					morning: "rytas",
					afternoon: "popietė",
					evening: "vakaras",
					night: "naktis"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(-oji)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^p(r|o)\.?\s?(kr\.?|me)/i,
				abbreviated: /^(pr\.\s?(kr\.|m\.\s?e\.)|po\s?kr\.|mūsų eroje)/i,
				wide: /^(prieš Kristų|prieš mūsų erą|po Kristaus|mūsų eroje)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				wide: [/prieš/i, /(po|mūsų)/i],
				any: [/^pr/i, /^(po|m)/i]
			},
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^([1234])/i,
				abbreviated: /^(I|II|III|IV)\s?ketv?\.?/i,
				wide: /^(I|II|III|IV)\s?ketvirtis/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/1/i,
					/2/i,
					/3/i,
					/4/i
				],
				any: [
					/I$/i,
					/II$/i,
					/III/i,
					/IV/i
				]
			},
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: t({
			matchPatterns: {
				narrow: /^[svkbglr]/i,
				abbreviated: /^(saus\.|vas\.|kov\.|bal\.|geg\.|birž\.|liep\.|rugp\.|rugs\.|spal\.|lapkr\.|gruod\.)/i,
				wide: /^(sausi(s|o)|vasari(s|o)|kov(a|o)s|balandž?i(s|o)|gegužės?|birželi(s|o)|liep(a|os)|rugpjū(t|č)i(s|o)|rugsėj(is|o)|spali(s|o)|lapkri(t|č)i(s|o)|gruodž?i(s|o))/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^v/i,
					/^k/i,
					/^b/i,
					/^g/i,
					/^b/i,
					/^l/i,
					/^r/i,
					/^r/i,
					/^s/i,
					/^l/i,
					/^g/i
				],
				any: [
					/^saus/i,
					/^vas/i,
					/^kov/i,
					/^bal/i,
					/^geg/i,
					/^birž/i,
					/^liep/i,
					/^rugp/i,
					/^rugs/i,
					/^spal/i,
					/^lapkr/i,
					/^gruod/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^[spatkš]/i,
				short: /^(sk|pr|an|tr|kt|pn|št)/i,
				abbreviated: /^(sk|pr|an|tr|kt|pn|št)/i,
				wide: /^(sekmadien(is|į)|pirmadien(is|į)|antradien(is|į)|trečiadien(is|į)|ketvirtadien(is|į)|penktadien(is|į)|šeštadien(is|į))/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^p/i,
					/^a/i,
					/^t/i,
					/^k/i,
					/^p/i,
					/^š/i
				],
				wide: [
					/^se/i,
					/^pi/i,
					/^an/i,
					/^tr/i,
					/^ke/i,
					/^pe/i,
					/^še/i
				],
				any: [
					/^sk/i,
					/^pr/i,
					/^an/i,
					/^tr/i,
					/^kt/i,
					/^pn/i,
					/^št/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(pr.\s?p.|pop.|vidurnaktis|(vidurdienis|perpiet)|rytas|(diena|popietė)|vakaras|naktis)/i,
				any: /^(priešpiet|popiet$|vidurnaktis|(vidurdienis|perpiet)|rytas|(diena|popietė)|vakaras|naktis)/i
			},
			defaultMatchWidth: "any",
			parsePatterns: {
				narrow: {
					am: /^pr/i,
					pm: /^pop./i,
					midnight: /^vidurnaktis/i,
					noon: /^(vidurdienis|perp)/i,
					morning: /rytas/i,
					afternoon: /(die|popietė)/i,
					evening: /vakaras/i,
					night: /naktis/i
				},
				any: {
					am: /^pr/i,
					pm: /^popiet$/i,
					midnight: /^vidurnaktis/i,
					noon: /^(vidurdienis|perp)/i,
					morning: /rytas/i,
					afternoon: /(die|popietė)/i,
					evening: /vakaras/i,
					night: /naktis/i
				}
			},
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { m as default, m as lt };
