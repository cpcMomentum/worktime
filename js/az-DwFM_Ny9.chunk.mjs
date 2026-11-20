import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/az/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "bir saniyədən az",
		other: "{{count}} bir saniyədən az"
	},
	xSeconds: {
		one: "1 saniyə",
		other: "{{count}} saniyə"
	},
	halfAMinute: "yarım dəqiqə",
	lessThanXMinutes: {
		one: "bir dəqiqədən az",
		other: "{{count}} bir dəqiqədən az"
	},
	xMinutes: {
		one: "bir dəqiqə",
		other: "{{count}} dəqiqə"
	},
	aboutXHours: {
		one: "təxminən 1 saat",
		other: "təxminən {{count}} saat"
	},
	xHours: {
		one: "1 saat",
		other: "{{count}} saat"
	},
	xDays: {
		one: "1 gün",
		other: "{{count}} gün"
	},
	aboutXWeeks: {
		one: "təxminən 1 həftə",
		other: "təxminən {{count}} həftə"
	},
	xWeeks: {
		one: "1 həftə",
		other: "{{count}} həftə"
	},
	aboutXMonths: {
		one: "təxminən 1 ay",
		other: "təxminən {{count}} ay"
	},
	xMonths: {
		one: "1 ay",
		other: "{{count}} ay"
	},
	aboutXYears: {
		one: "təxminən 1 il",
		other: "təxminən {{count}} il"
	},
	xYears: {
		one: "1 il",
		other: "{{count}} il"
	},
	overXYears: {
		one: "1 ildən çox",
		other: "{{count}} ildən çox"
	},
	almostXYears: {
		one: "demək olar ki 1 il",
		other: "demək olar ki {{count}} il"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? r + " sonra" : r + " əvvəl" : r;
}, o = {
	date: e({
		formats: {
			full: "EEEE, do MMMM y 'il'",
			long: "do MMMM y 'il'",
			medium: "d MMM y 'il'",
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
		formats: {
			full: "{{date}} {{time}} - 'də'",
			long: "{{date}} {{time}} - 'də'",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "'sonuncu' eeee p -'də'",
	yesterday: "'dünən' p -'də'",
	today: "'bugün' p -'də'",
	tomorrow: "'sabah' p -'də'",
	nextWeek: "eeee p -'də'",
	other: "P"
}, c = (e, t, n, r) => s[e], l = {
	narrow: ["e.ə", "b.e"],
	abbreviated: ["e.ə", "b.e"],
	wide: ["eramızdan əvvəl", "bizim era"]
}, u = {
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
		"1ci kvartal",
		"2ci kvartal",
		"3cü kvartal",
		"4cü kvartal"
	]
}, d = {
	narrow: [
		"Y",
		"F",
		"M",
		"A",
		"M",
		"İ",
		"İ",
		"A",
		"S",
		"O",
		"N",
		"D"
	],
	abbreviated: [
		"Yan",
		"Fev",
		"Mar",
		"Apr",
		"May",
		"İyun",
		"İyul",
		"Avq",
		"Sen",
		"Okt",
		"Noy",
		"Dek"
	],
	wide: [
		"Yanvar",
		"Fevral",
		"Mart",
		"Aprel",
		"May",
		"İyun",
		"İyul",
		"Avqust",
		"Sentyabr",
		"Oktyabr",
		"Noyabr",
		"Dekabr"
	]
}, f = {
	narrow: [
		"B.",
		"B.e",
		"Ç.a",
		"Ç.",
		"C.a",
		"C.",
		"Ş."
	],
	short: [
		"B.",
		"B.e",
		"Ç.a",
		"Ç.",
		"C.a",
		"C.",
		"Ş."
	],
	abbreviated: [
		"Baz",
		"Baz.e",
		"Çər.a",
		"Çər",
		"Cüm.a",
		"Cüm",
		"Şə"
	],
	wide: [
		"Bazar",
		"Bazar ertəsi",
		"Çərşənbə axşamı",
		"Çərşənbə",
		"Cümə axşamı",
		"Cümə",
		"Şənbə"
	]
}, p = {
	narrow: {
		am: "am",
		pm: "pm",
		midnight: "gecəyarı",
		noon: "gün",
		morning: "səhər",
		afternoon: "gündüz",
		evening: "axşam",
		night: "gecə"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "gecəyarı",
		noon: "gün",
		morning: "səhər",
		afternoon: "gündüz",
		evening: "axşam",
		night: "gecə"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "gecəyarı",
		noon: "gün",
		morning: "səhər",
		afternoon: "gündüz",
		evening: "axşam",
		night: "gecə"
	}
}, m = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "gecəyarı",
		noon: "gün",
		morning: "səhər",
		afternoon: "gündüz",
		evening: "axşam",
		night: "gecə"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "gecəyarı",
		noon: "gün",
		morning: "səhər",
		afternoon: "gündüz",
		evening: "axşam",
		night: "gecə"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "gecəyarı",
		noon: "gün",
		morning: "səhər",
		afternoon: "gündüz",
		evening: "axşam",
		night: "gecə"
	}
}, h = {
	1: "-inci",
	5: "-inci",
	8: "-inci",
	70: "-inci",
	80: "-inci",
	2: "-nci",
	7: "-nci",
	20: "-nci",
	50: "-nci",
	3: "-üncü",
	4: "-üncü",
	100: "-üncü",
	6: "-ncı",
	9: "-uncu",
	10: "-uncu",
	30: "-uncu",
	60: "-ıncı",
	90: "-ıncı"
}, g = (e) => {
	if (e === 0) return e + "-ıncı";
	let t = e % 10, n = e % 100 - t, r = e >= 100 ? 100 : null;
	return h[t] ? h[t] : h[n] ? h[n] : r === null ? "" : h[r];
}, _ = {
	code: "az",
	formatDistance: a,
	formatLong: o,
	formatRelative: c,
	localize: {
		ordinalNumber: (e, t) => {
			let n = Number(e);
			return n + g(n);
		},
		era: n({
			values: l,
			defaultWidth: "wide"
		}),
		quarter: n({
			values: u,
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: d,
			defaultWidth: "wide"
		}),
		day: n({
			values: f,
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: p,
			defaultWidth: "wide",
			formattingValues: m,
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(-?(ci|inci|nci|uncu|üncü|ncı))?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^(b|a)$/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)$/i,
				wide: /^(bizim eradan əvvəl|bizim era)$/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b$/i, /^(a|c)$/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]$/i,
				abbreviated: /^K[1234]$/i,
				wide: /^[1234](ci)? kvartal$/i
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
				narrow: /^[(?-i)yfmaisond]$/i,
				abbreviated: /^(Yan|Fev|Mar|Apr|May|İyun|İyul|Avq|Sen|Okt|Noy|Dek)$/i,
				wide: /^(Yanvar|Fevral|Mart|Aprel|May|İyun|İyul|Avgust|Sentyabr|Oktyabr|Noyabr|Dekabr)$/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^[(?-i)y]$/i,
					/^[(?-i)f]$/i,
					/^[(?-i)m]$/i,
					/^[(?-i)a]$/i,
					/^[(?-i)m]$/i,
					/^[(?-i)i]$/i,
					/^[(?-i)i]$/i,
					/^[(?-i)a]$/i,
					/^[(?-i)s]$/i,
					/^[(?-i)o]$/i,
					/^[(?-i)n]$/i,
					/^[(?-i)d]$/i
				],
				abbreviated: [
					/^Yan$/i,
					/^Fev$/i,
					/^Mar$/i,
					/^Apr$/i,
					/^May$/i,
					/^İyun$/i,
					/^İyul$/i,
					/^Avg$/i,
					/^Sen$/i,
					/^Okt$/i,
					/^Noy$/i,
					/^Dek$/i
				],
				wide: [
					/^Yanvar$/i,
					/^Fevral$/i,
					/^Mart$/i,
					/^Aprel$/i,
					/^May$/i,
					/^İyun$/i,
					/^İyul$/i,
					/^Avgust$/i,
					/^Sentyabr$/i,
					/^Oktyabr$/i,
					/^Noyabr$/i,
					/^Dekabr$/i
				]
			},
			defaultParseWidth: "narrow"
		}),
		day: t({
			matchPatterns: {
				narrow: /^(B\.|B\.e|Ç\.a|Ç\.|C\.a|C\.|Ş\.)$/i,
				short: /^(B\.|B\.e|Ç\.a|Ç\.|C\.a|C\.|Ş\.)$/i,
				abbreviated: /^(Baz\.e|Çər|Çər\.a|Cüm|Cüm\.a|Şə)$/i,
				wide: /^(Bazar|Bazar ertəsi|Çərşənbə axşamı|Çərşənbə|Cümə axşamı|Cümə|Şənbə)$/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^B\.$/i,
					/^B\.e$/i,
					/^Ç\.a$/i,
					/^Ç\.$/i,
					/^C\.a$/i,
					/^C\.$/i,
					/^Ş\.$/i
				],
				abbreviated: [
					/^Baz$/i,
					/^Baz\.e$/i,
					/^Çər\.a$/i,
					/^Çər$/i,
					/^Cüm\.a$/i,
					/^Cüm$/i,
					/^Şə$/i
				],
				wide: [
					/^Bazar$/i,
					/^Bazar ertəsi$/i,
					/^Çərşənbə axşamı$/i,
					/^Çərşənbə$/i,
					/^Cümə axşamı$/i,
					/^Cümə$/i,
					/^Şənbə$/i
				],
				any: [
					/^B\.$/i,
					/^B\.e$/i,
					/^Ç\.a$/i,
					/^Ç\.$/i,
					/^C\.a$/i,
					/^C\.$/i,
					/^Ş\.$/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(a|p|gecəyarı|gün|səhər|gündüz|axşam|gecə)$/i,
				any: /^(am|pm|a\.m\.|p\.m\.|AM|PM|gecəyarı|gün|səhər|gündüz|axşam|gecə)$/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a$/i,
				pm: /^p$/i,
				midnight: /^gecəyarı$/i,
				noon: /^gün$/i,
				morning: /səhər$/i,
				afternoon: /gündüz$/i,
				evening: /axşam$/i,
				night: /gecə$/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 1
	}
};
export { _ as az, _ as default };
