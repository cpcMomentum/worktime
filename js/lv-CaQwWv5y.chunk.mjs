import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
import { t as i } from "./isSameWeek-IUVRx6Bb.chunk.mjs";
// node_modules/date-fns/locale/lv/_lib/formatDistance.js
function a(e) {
	return (t, n) => {
		if (t === 1) return n?.addSuffix ? e.one[0].replace("{{time}}", e.one[2]) : e.one[0].replace("{{time}}", e.one[1]);
		{
			let r = t % 10 == 1 && t % 100 != 11;
			return n?.addSuffix ? e.other[0].replace("{{time}}", r ? e.other[3] : e.other[4]).replace("{{count}}", String(t)) : e.other[0].replace("{{time}}", r ? e.other[1] : e.other[2]).replace("{{count}}", String(t));
		}
	};
}
var o = {
	lessThanXSeconds: a({
		one: [
			"mazāk par {{time}}",
			"sekundi",
			"sekundi"
		],
		other: [
			"mazāk nekā {{count}} {{time}}",
			"sekunde",
			"sekundes",
			"sekundes",
			"sekundēm"
		]
	}),
	xSeconds: a({
		one: [
			"1 {{time}}",
			"sekunde",
			"sekundes"
		],
		other: [
			"{{count}} {{time}}",
			"sekunde",
			"sekundes",
			"sekundes",
			"sekundēm"
		]
	}),
	halfAMinute: (e, t) => t?.addSuffix ? "pusminūtes" : "pusminūte",
	lessThanXMinutes: a({
		one: [
			"mazāk par {{time}}",
			"minūti",
			"minūti"
		],
		other: [
			"mazāk nekā {{count}} {{time}}",
			"minūte",
			"minūtes",
			"minūtes",
			"minūtēm"
		]
	}),
	xMinutes: a({
		one: [
			"1 {{time}}",
			"minūte",
			"minūtes"
		],
		other: [
			"{{count}} {{time}}",
			"minūte",
			"minūtes",
			"minūtes",
			"minūtēm"
		]
	}),
	aboutXHours: a({
		one: [
			"apmēram 1 {{time}}",
			"stunda",
			"stundas"
		],
		other: [
			"apmēram {{count}} {{time}}",
			"stunda",
			"stundas",
			"stundas",
			"stundām"
		]
	}),
	xHours: a({
		one: [
			"1 {{time}}",
			"stunda",
			"stundas"
		],
		other: [
			"{{count}} {{time}}",
			"stunda",
			"stundas",
			"stundas",
			"stundām"
		]
	}),
	xDays: a({
		one: [
			"1 {{time}}",
			"diena",
			"dienas"
		],
		other: [
			"{{count}} {{time}}",
			"diena",
			"dienas",
			"dienas",
			"dienām"
		]
	}),
	aboutXWeeks: a({
		one: [
			"apmēram 1 {{time}}",
			"nedēļa",
			"nedēļas"
		],
		other: [
			"apmēram {{count}} {{time}}",
			"nedēļa",
			"nedēļu",
			"nedēļas",
			"nedēļām"
		]
	}),
	xWeeks: a({
		one: [
			"1 {{time}}",
			"nedēļa",
			"nedēļas"
		],
		other: [
			"{{count}} {{time}}",
			"nedēļa",
			"nedēļu",
			"nedēļas",
			"nedēļām"
		]
	}),
	aboutXMonths: a({
		one: [
			"apmēram 1 {{time}}",
			"mēnesis",
			"mēneša"
		],
		other: [
			"apmēram {{count}} {{time}}",
			"mēnesis",
			"mēneši",
			"mēneša",
			"mēnešiem"
		]
	}),
	xMonths: a({
		one: [
			"1 {{time}}",
			"mēnesis",
			"mēneša"
		],
		other: [
			"{{count}} {{time}}",
			"mēnesis",
			"mēneši",
			"mēneša",
			"mēnešiem"
		]
	}),
	aboutXYears: a({
		one: [
			"apmēram 1 {{time}}",
			"gads",
			"gada"
		],
		other: [
			"apmēram {{count}} {{time}}",
			"gads",
			"gadi",
			"gada",
			"gadiem"
		]
	}),
	xYears: a({
		one: [
			"1 {{time}}",
			"gads",
			"gada"
		],
		other: [
			"{{count}} {{time}}",
			"gads",
			"gadi",
			"gada",
			"gadiem"
		]
	}),
	overXYears: a({
		one: [
			"ilgāk par 1 {{time}}",
			"gadu",
			"gadu"
		],
		other: [
			"vairāk nekā {{count}} {{time}}",
			"gads",
			"gadi",
			"gada",
			"gadiem"
		]
	}),
	almostXYears: a({
		one: [
			"gandrīz 1 {{time}}",
			"gads",
			"gada"
		],
		other: [
			"vairāk nekā {{count}} {{time}}",
			"gads",
			"gadi",
			"gada",
			"gadiem"
		]
	})
}, s = (e, t, n) => {
	let r = o[e](t, n);
	return n?.addSuffix ? n.comparison && n.comparison > 0 ? "pēc " + r : "pirms " + r : r;
}, c = {
	date: e({
		formats: {
			full: "EEEE, y. 'gada' d. MMMM",
			long: "y. 'gada' d. MMMM",
			medium: "dd.MM.y.",
			short: "dd.MM.y."
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
			full: "{{date}} 'plkst.' {{time}}",
			long: "{{date}} 'plkst.' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, l = [
	"svētdienā",
	"pirmdienā",
	"otrdienā",
	"trešdienā",
	"ceturtdienā",
	"piektdienā",
	"sestdienā"
], u = {
	lastWeek: (e, t, n) => i(e, t, n) ? "eeee 'plkst.' p" : "'Pagājušā " + l[e.getDay()] + " plkst.' p",
	yesterday: "'Vakar plkst.' p",
	today: "'Šodien plkst.' p",
	tomorrow: "'Rīt plkst.' p",
	nextWeek: (e, t, n) => i(e, t, n) ? "eeee 'plkst.' p" : "'Nākamajā " + l[e.getDay()] + " plkst.' p",
	other: "P"
}, d = {
	code: "lv",
	formatDistance: s,
	formatLong: c,
	formatRelative: (e, t, n, r) => {
		let i = u[e];
		return typeof i == "function" ? i(t, n, r) : i;
	},
	localize: {
		ordinalNumber: (e, t) => Number(e) + ".",
		era: n({
			values: {
				narrow: ["p.m.ē", "m.ē"],
				abbreviated: ["p. m. ē.", "m. ē."],
				wide: ["pirms mūsu ēras", "mūsu ērā"]
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
					"1. cet.",
					"2. cet.",
					"3. cet.",
					"4. cet."
				],
				wide: [
					"pirmais ceturksnis",
					"otrais ceturksnis",
					"trešais ceturksnis",
					"ceturtais ceturksnis"
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
					"1. cet.",
					"2. cet.",
					"3. cet.",
					"4. cet."
				],
				wide: [
					"pirmajā ceturksnī",
					"otrajā ceturksnī",
					"trešajā ceturksnī",
					"ceturtajā ceturksnī"
				]
			},
			defaultFormattingWidth: "wide",
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
					"janv.",
					"febr.",
					"marts",
					"apr.",
					"maijs",
					"jūn.",
					"jūl.",
					"aug.",
					"sept.",
					"okt.",
					"nov.",
					"dec."
				],
				wide: [
					"janvāris",
					"februāris",
					"marts",
					"aprīlis",
					"maijs",
					"jūnijs",
					"jūlijs",
					"augusts",
					"septembris",
					"oktobris",
					"novembris",
					"decembris"
				]
			},
			defaultWidth: "wide",
			formattingValues: {
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
					"janv.",
					"febr.",
					"martā",
					"apr.",
					"maijs",
					"jūn.",
					"jūl.",
					"aug.",
					"sept.",
					"okt.",
					"nov.",
					"dec."
				],
				wide: [
					"janvārī",
					"februārī",
					"martā",
					"aprīlī",
					"maijā",
					"jūnijā",
					"jūlijā",
					"augustā",
					"septembrī",
					"oktobrī",
					"novembrī",
					"decembrī"
				]
			},
			defaultFormattingWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"S",
					"P",
					"O",
					"T",
					"C",
					"P",
					"S"
				],
				short: [
					"Sv",
					"P",
					"O",
					"T",
					"C",
					"Pk",
					"S"
				],
				abbreviated: [
					"svētd.",
					"pirmd.",
					"otrd.",
					"trešd.",
					"ceturtd.",
					"piektd.",
					"sestd."
				],
				wide: [
					"svētdiena",
					"pirmdiena",
					"otrdiena",
					"trešdiena",
					"ceturtdiena",
					"piektdiena",
					"sestdiena"
				]
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: [
					"S",
					"P",
					"O",
					"T",
					"C",
					"P",
					"S"
				],
				short: [
					"Sv",
					"P",
					"O",
					"T",
					"C",
					"Pk",
					"S"
				],
				abbreviated: [
					"svētd.",
					"pirmd.",
					"otrd.",
					"trešd.",
					"ceturtd.",
					"piektd.",
					"sestd."
				],
				wide: [
					"svētdienā",
					"pirmdienā",
					"otrdienā",
					"trešdienā",
					"ceturtdienā",
					"piektdienā",
					"sestdienā"
				]
			},
			defaultFormattingWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "am",
					pm: "pm",
					midnight: "pusn.",
					noon: "pusd.",
					morning: "rīts",
					afternoon: "diena",
					evening: "vakars",
					night: "nakts"
				},
				abbreviated: {
					am: "am",
					pm: "pm",
					midnight: "pusn.",
					noon: "pusd.",
					morning: "rīts",
					afternoon: "pēcpusd.",
					evening: "vakars",
					night: "nakts"
				},
				wide: {
					am: "am",
					pm: "pm",
					midnight: "pusnakts",
					noon: "pusdienlaiks",
					morning: "rīts",
					afternoon: "pēcpusdiena",
					evening: "vakars",
					night: "nakts"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "am",
					pm: "pm",
					midnight: "pusn.",
					noon: "pusd.",
					morning: "rītā",
					afternoon: "dienā",
					evening: "vakarā",
					night: "naktī"
				},
				abbreviated: {
					am: "am",
					pm: "pm",
					midnight: "pusn.",
					noon: "pusd.",
					morning: "rītā",
					afternoon: "pēcpusd.",
					evening: "vakarā",
					night: "naktī"
				},
				wide: {
					am: "am",
					pm: "pm",
					midnight: "pusnaktī",
					noon: "pusdienlaikā",
					morning: "rītā",
					afternoon: "pēcpusdienā",
					evening: "vakarā",
					night: "naktī"
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
				narrow: /^(p\.m\.ē|m\.ē)/i,
				abbreviated: /^(p\. m\. ē\.|m\. ē\.)/i,
				wide: /^(pirms mūsu ēras|mūsu ērā)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^p/i, /^m/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^[1234](\. cet\.)/i,
				wide: /^(pirma(is|jā)|otra(is|jā)|treša(is|jā)|ceturta(is|jā)) ceturksn(is|ī)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^1/i,
					/^2/i,
					/^3/i,
					/^4/i
				],
				abbreviated: [
					/^1/i,
					/^2/i,
					/^3/i,
					/^4/i
				],
				wide: [
					/^p/i,
					/^o/i,
					/^t/i,
					/^c/i
				]
			},
			defaultParseWidth: "wide",
			valueCallback: (e) => e + 1
		}),
		month: t({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(janv\.|febr\.|marts|apr\.|maijs|jūn\.|jūl\.|aug\.|sept\.|okt\.|nov\.|dec\.)/i,
				wide: /^(janvār(is|ī)|februār(is|ī)|mart[sā]|aprīl(is|ī)|maij[sā]|jūnij[sā]|jūlij[sā]|august[sā]|septembr(is|ī)|oktobr(is|ī)|novembr(is|ī)|decembr(is|ī))/i
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
					/^mai/i,
					/^jūn/i,
					/^jūl/i,
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
				narrow: /^[spotc]/i,
				short: /^(sv|pi|o|t|c|pk|s)/i,
				abbreviated: /^(svētd\.|pirmd\.|otrd.\|trešd\.|ceturtd\.|piektd\.|sestd\.)/i,
				wide: /^(svētdien(a|ā)|pirmdien(a|ā)|otrdien(a|ā)|trešdien(a|ā)|ceturtdien(a|ā)|piektdien(a|ā)|sestdien(a|ā))/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^p/i,
					/^o/i,
					/^t/i,
					/^c/i,
					/^p/i,
					/^s/i
				],
				any: [
					/^sv/i,
					/^pi/i,
					/^o/i,
					/^t/i,
					/^c/i,
					/^p/i,
					/^se/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(am|pm|pusn\.|pusd\.|rīt(s|ā)|dien(a|ā)|vakar(s|ā)|nakt(s|ī))/,
				abbreviated: /^(am|pm|pusn\.|pusd\.|rīt(s|ā)|pēcpusd\.|vakar(s|ā)|nakt(s|ī))/,
				wide: /^(am|pm|pusnakt(s|ī)|pusdienlaik(s|ā)|rīt(s|ā)|pēcpusdien(a|ā)|vakar(s|ā)|nakt(s|ī))/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: {
				am: /^am/i,
				pm: /^pm/i,
				midnight: /^pusn/i,
				noon: /^pusd/i,
				morning: /^r/i,
				afternoon: /^(d|pēc)/i,
				evening: /^v/i,
				night: /^n/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { d as default, d as lv };
