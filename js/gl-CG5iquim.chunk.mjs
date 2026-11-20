import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/gl/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "menos dun segundo",
		other: "menos de {{count}} segundos"
	},
	xSeconds: {
		one: "1 segundo",
		other: "{{count}} segundos"
	},
	halfAMinute: "medio minuto",
	lessThanXMinutes: {
		one: "menos dun minuto",
		other: "menos de {{count}} minutos"
	},
	xMinutes: {
		one: "1 minuto",
		other: "{{count}} minutos"
	},
	aboutXHours: {
		one: "arredor dunha hora",
		other: "arredor de {{count}} horas"
	},
	xHours: {
		one: "1 hora",
		other: "{{count}} horas"
	},
	xDays: {
		one: "1 día",
		other: "{{count}} días"
	},
	aboutXWeeks: {
		one: "arredor dunha semana",
		other: "arredor de {{count}} semanas"
	},
	xWeeks: {
		one: "1 semana",
		other: "{{count}} semanas"
	},
	aboutXMonths: {
		one: "arredor de 1 mes",
		other: "arredor de {{count}} meses"
	},
	xMonths: {
		one: "1 mes",
		other: "{{count}} meses"
	},
	aboutXYears: {
		one: "arredor dun ano",
		other: "arredor de {{count}} anos"
	},
	xYears: {
		one: "1 ano",
		other: "{{count}} anos"
	},
	overXYears: {
		one: "máis dun ano",
		other: "máis de {{count}} anos"
	},
	almostXYears: {
		one: "case un ano",
		other: "case {{count}} anos"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "en " + r : "hai " + r : r;
}, o = {
	date: e({
		formats: {
			full: "EEEE, d 'de' MMMM y",
			long: "d 'de' MMMM y",
			medium: "d MMM y",
			short: "dd/MM/y"
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
			full: "{{date}} 'ás' {{time}}",
			long: "{{date}} 'ás' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "'o' eeee 'pasado á' LT",
	yesterday: "'onte á' p",
	today: "'hoxe á' p",
	tomorrow: "'mañá á' p",
	nextWeek: "eeee 'á' p",
	other: "P"
}, c = {
	lastWeek: "'o' eeee 'pasado ás' p",
	yesterday: "'onte ás' p",
	today: "'hoxe ás' p",
	tomorrow: "'mañá ás' p",
	nextWeek: "eeee 'ás' p",
	other: "P"
}, l = {
	code: "gl",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => t.getHours() === 1 ? s[e] : c[e],
	localize: {
		ordinalNumber: (e, t) => Number(e) + "º",
		era: n({
			values: {
				narrow: ["AC", "DC"],
				abbreviated: ["AC", "DC"],
				wide: ["antes de cristo", "despois de cristo"]
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
					"T1",
					"T2",
					"T3",
					"T4"
				],
				wide: [
					"1º trimestre",
					"2º trimestre",
					"3º trimestre",
					"4º trimestre"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: {
				narrow: [
					"e",
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
					"xan",
					"feb",
					"mar",
					"abr",
					"mai",
					"xun",
					"xul",
					"ago",
					"set",
					"out",
					"nov",
					"dec"
				],
				wide: [
					"xaneiro",
					"febreiro",
					"marzo",
					"abril",
					"maio",
					"xuño",
					"xullo",
					"agosto",
					"setembro",
					"outubro",
					"novembro",
					"decembro"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"d",
					"l",
					"m",
					"m",
					"j",
					"v",
					"s"
				],
				short: [
					"do",
					"lu",
					"ma",
					"me",
					"xo",
					"ve",
					"sa"
				],
				abbreviated: [
					"dom",
					"lun",
					"mar",
					"mer",
					"xov",
					"ven",
					"sab"
				],
				wide: [
					"domingo",
					"luns",
					"martes",
					"mércores",
					"xoves",
					"venres",
					"sábado"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "mn",
					noon: "md",
					morning: "mañá",
					afternoon: "tarde",
					evening: "tarde",
					night: "noite"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "medianoite",
					noon: "mediodía",
					morning: "mañá",
					afternoon: "tarde",
					evening: "tardiña",
					night: "noite"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "medianoite",
					noon: "mediodía",
					morning: "mañá",
					afternoon: "tarde",
					evening: "tardiña",
					night: "noite"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "mn",
					noon: "md",
					morning: "da mañá",
					afternoon: "da tarde",
					evening: "da tardiña",
					night: "da noite"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "medianoite",
					noon: "mediodía",
					morning: "da mañá",
					afternoon: "da tarde",
					evening: "da tardiña",
					night: "da noite"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "medianoite",
					noon: "mediodía",
					morning: "da mañá",
					afternoon: "da tarde",
					evening: "da tardiña",
					night: "da noite"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(º)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^(ac|dc|a|d)/i,
				abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
				wide: /^(antes de cristo|antes da era com[uú]n|despois de cristo|era com[uú]n)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				any: [/^ac/i, /^dc/i],
				wide: [/^(antes de cristo|antes da era com[uú]n)/i, /^(despois de cristo|era com[uú]n)/i]
			},
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^T[1234]/i,
				wide: /^[1234](º)? trimestre/i
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
				narrow: /^[xfmasond]/i,
				abbreviated: /^(xan|feb|mar|abr|mai|xun|xul|ago|set|out|nov|dec)/i,
				wide: /^(xaneiro|febreiro|marzo|abril|maio|xuño|xullo|agosto|setembro|outubro|novembro|decembro)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^x/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^x/i,
					/^x/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^xan/i,
					/^feb/i,
					/^mar/i,
					/^abr/i,
					/^mai/i,
					/^xun/i,
					/^xul/i,
					/^ago/i,
					/^set/i,
					/^out/i,
					/^nov/i,
					/^dec/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^[dlmxvs]/i,
				short: /^(do|lu|ma|me|xo|ve|sa)/i,
				abbreviated: /^(dom|lun|mar|mer|xov|ven|sab)/i,
				wide: /^(domingo|luns|martes|m[eé]rcores|xoves|venres|s[áa]bado)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^d/i,
					/^l/i,
					/^m/i,
					/^m/i,
					/^x/i,
					/^v/i,
					/^s/i
				],
				any: [
					/^do/i,
					/^lu/i,
					/^ma/i,
					/^me/i,
					/^xo/i,
					/^ve/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(a|p|mn|md|(da|[aá]s) (mañ[aá]|tarde|noite))/i,
				any: /^([ap]\.?\s?m\.?|medianoite|mediod[ií]a|(da|[aá]s) (mañ[aá]|tarde|noite))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mn/i,
				noon: /^md/i,
				morning: /mañ[aá]/i,
				afternoon: /tarde/i,
				evening: /tardiña/i,
				night: /noite/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 1
	}
};
export { l as default, l as gl };
