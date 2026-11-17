import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/eu/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "segundo bat baino gutxiago",
		other: "{{count}} segundo baino gutxiago"
	},
	xSeconds: {
		one: "1 segundo",
		other: "{{count}} segundo"
	},
	halfAMinute: "minutu erdi",
	lessThanXMinutes: {
		one: "minutu bat baino gutxiago",
		other: "{{count}} minutu baino gutxiago"
	},
	xMinutes: {
		one: "1 minutu",
		other: "{{count}} minutu"
	},
	aboutXHours: {
		one: "1 ordu gutxi gorabehera",
		other: "{{count}} ordu gutxi gorabehera"
	},
	xHours: {
		one: "1 ordu",
		other: "{{count}} ordu"
	},
	xDays: {
		one: "1 egun",
		other: "{{count}} egun"
	},
	aboutXWeeks: {
		one: "aste 1 inguru",
		other: "{{count}} aste inguru"
	},
	xWeeks: {
		one: "1 aste",
		other: "{{count}} astean"
	},
	aboutXMonths: {
		one: "1 hilabete gutxi gorabehera",
		other: "{{count}} hilabete gutxi gorabehera"
	},
	xMonths: {
		one: "1 hilabete",
		other: "{{count}} hilabete"
	},
	aboutXYears: {
		one: "1 urte gutxi gorabehera",
		other: "{{count}} urte gutxi gorabehera"
	},
	xYears: {
		one: "1 urte",
		other: "{{count}} urte"
	},
	overXYears: {
		one: "1 urte baino gehiago",
		other: "{{count}} urte baino gehiago"
	},
	almostXYears: {
		one: "ia 1 urte",
		other: "ia {{count}} urte"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "en " + r : "duela " + r : r;
}, o = {
	date: e({
		formats: {
			full: "EEEE, y'ko' MMMM'ren' d'a' y'ren'",
			long: "y'ko' MMMM'ren' d'a'",
			medium: "y MMM d",
			short: "yy/MM/dd"
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
			full: "{{date}} 'tan' {{time}}",
			long: "{{date}} 'tan' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "'joan den' eeee, LT",
	yesterday: "'atzo,' p",
	today: "'gaur,' p",
	tomorrow: "'bihar,' p",
	nextWeek: "eeee, p",
	other: "P"
}, c = {
	lastWeek: "'joan den' eeee, p",
	yesterday: "'atzo,' p",
	today: "'gaur,' p",
	tomorrow: "'bihar,' p",
	nextWeek: "eeee, p",
	other: "P"
}, l = {
	code: "eu",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t) => t.getHours() === 1 ? s[e] : c[e],
	localize: {
		ordinalNumber: (e, t) => Number(e) + ".",
		era: n({
			values: {
				narrow: ["k.a.", "k.o."],
				abbreviated: ["k.a.", "k.o."],
				wide: ["kristo aurretik", "kristo ondoren"]
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
					"1H",
					"2H",
					"3H",
					"4H"
				],
				wide: [
					"1. hiruhilekoa",
					"2. hiruhilekoa",
					"3. hiruhilekoa",
					"4. hiruhilekoa"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: {
				narrow: [
					"u",
					"o",
					"m",
					"a",
					"m",
					"e",
					"u",
					"a",
					"i",
					"u",
					"a",
					"a"
				],
				abbreviated: [
					"urt",
					"ots",
					"mar",
					"api",
					"mai",
					"eka",
					"uzt",
					"abu",
					"ira",
					"urr",
					"aza",
					"abe"
				],
				wide: [
					"urtarrila",
					"otsaila",
					"martxoa",
					"apirila",
					"maiatza",
					"ekaina",
					"uztaila",
					"abuztua",
					"iraila",
					"urria",
					"azaroa",
					"abendua"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"i",
					"a",
					"a",
					"a",
					"o",
					"o",
					"l"
				],
				short: [
					"ig",
					"al",
					"as",
					"az",
					"og",
					"or",
					"lr"
				],
				abbreviated: [
					"iga",
					"ast",
					"ast",
					"ast",
					"ost",
					"ost",
					"lar"
				],
				wide: [
					"igandea",
					"astelehena",
					"asteartea",
					"asteazkena",
					"osteguna",
					"ostirala",
					"larunbata"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "ge",
					noon: "eg",
					morning: "goiza",
					afternoon: "arratsaldea",
					evening: "arratsaldea",
					night: "gaua"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "gauerdia",
					noon: "eguerdia",
					morning: "goiza",
					afternoon: "arratsaldea",
					evening: "arratsaldea",
					night: "gaua"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "gauerdia",
					noon: "eguerdia",
					morning: "goiza",
					afternoon: "arratsaldea",
					evening: "arratsaldea",
					night: "gaua"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "ge",
					noon: "eg",
					morning: "goizean",
					afternoon: "arratsaldean",
					evening: "arratsaldean",
					night: "gauean"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "gauerdia",
					noon: "eguerdia",
					morning: "goizean",
					afternoon: "arratsaldean",
					evening: "arratsaldean",
					night: "gauean"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "gauerdia",
					noon: "eguerdia",
					morning: "goizean",
					afternoon: "arratsaldean",
					evening: "arratsaldean",
					night: "gauean"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(.)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^(k.a.|k.o.)/i,
				abbreviated: /^(k.a.|k.o.)/i,
				wide: /^(kristo aurretik|kristo ondoren)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [/^k.a./i, /^k.o./i],
				abbreviated: [/^(k.a.)/i, /^(k.o.)/i],
				wide: [/^(kristo aurretik)/i, /^(kristo ondoren)/i]
			},
			defaultParseWidth: "wide"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^[1234]H/i,
				wide: /^[1234](.)? hiruhilekoa/i
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
				narrow: /^[uomaei]/i,
				abbreviated: /^(urt|ots|mar|api|mai|eka|uzt|abu|ira|urr|aza|abe)/i,
				wide: /^(urtarrila|otsaila|martxoa|apirila|maiatza|ekaina|uztaila|abuztua|iraila|urria|azaroa|abendua)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^u/i,
					/^o/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^e/i,
					/^u/i,
					/^a/i,
					/^i/i,
					/^u/i,
					/^a/i,
					/^a/i
				],
				any: [
					/^urt/i,
					/^ots/i,
					/^mar/i,
					/^api/i,
					/^mai/i,
					/^eka/i,
					/^uzt/i,
					/^abu/i,
					/^ira/i,
					/^urr/i,
					/^aza/i,
					/^abe/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^[iaol]/i,
				short: /^(ig|al|as|az|og|or|lr)/i,
				abbreviated: /^(iga|ast|ast|ast|ost|ost|lar)/i,
				wide: /^(igandea|astelehena|asteartea|asteazkena|osteguna|ostirala|larunbata)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^i/i,
					/^a/i,
					/^a/i,
					/^a/i,
					/^o/i,
					/^o/i,
					/^l/i
				],
				short: [
					/^ig/i,
					/^al/i,
					/^as/i,
					/^az/i,
					/^og/i,
					/^or/i,
					/^lr/i
				],
				abbreviated: [
					/^iga/i,
					/^ast/i,
					/^ast/i,
					/^ast/i,
					/^ost/i,
					/^ost/i,
					/^lar/i
				],
				wide: [
					/^igandea/i,
					/^astelehena/i,
					/^asteartea/i,
					/^asteazkena/i,
					/^osteguna/i,
					/^ostirala/i,
					/^larunbata/i
				]
			},
			defaultParseWidth: "wide"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(a|p|ge|eg|((goiza|goizean)|arratsaldea|(gaua|gauean)))/i,
				any: /^([ap]\.?\s?m\.?|gauerdia|eguerdia|((goiza|goizean)|arratsaldea|(gaua|gauean)))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: {
				narrow: {
					am: /^a/i,
					pm: /^p/i,
					midnight: /^ge/i,
					noon: /^eg/i,
					morning: /goiz/i,
					afternoon: /arratsaldea/i,
					evening: /arratsaldea/i,
					night: /gau/i
				},
				any: {
					am: /^a/i,
					pm: /^p/i,
					midnight: /^gauerdia/i,
					noon: /^eguerdia/i,
					morning: /goiz/i,
					afternoon: /arratsaldea/i,
					evening: /arratsaldea/i,
					night: /gau/i
				}
			},
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 1
	}
};
export { l as default, l as eu };
