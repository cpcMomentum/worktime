import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/ms/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "kurang dari 1 saat",
		other: "kurang dari {{count}} saat"
	},
	xSeconds: {
		one: "1 saat",
		other: "{{count}} saat"
	},
	halfAMinute: "setengah minit",
	lessThanXMinutes: {
		one: "kurang dari 1 minit",
		other: "kurang dari {{count}} minit"
	},
	xMinutes: {
		one: "1 minit",
		other: "{{count}} minit"
	},
	aboutXHours: {
		one: "sekitar 1 jam",
		other: "sekitar {{count}} jam"
	},
	xHours: {
		one: "1 jam",
		other: "{{count}} jam"
	},
	xDays: {
		one: "1 hari",
		other: "{{count}} hari"
	},
	aboutXWeeks: {
		one: "sekitar 1 minggu",
		other: "sekitar {{count}} minggu"
	},
	xWeeks: {
		one: "1 minggu",
		other: "{{count}} minggu"
	},
	aboutXMonths: {
		one: "sekitar 1 bulan",
		other: "sekitar {{count}} bulan"
	},
	xMonths: {
		one: "1 bulan",
		other: "{{count}} bulan"
	},
	aboutXYears: {
		one: "sekitar 1 tahun",
		other: "sekitar {{count}} tahun"
	},
	xYears: {
		one: "1 tahun",
		other: "{{count}} tahun"
	},
	overXYears: {
		one: "lebih dari 1 tahun",
		other: "lebih dari {{count}} tahun"
	},
	almostXYears: {
		one: "hampir 1 tahun",
		other: "hampir {{count}} tahun"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "dalam masa " + r : r + " yang lalu" : r;
}, o = {
	date: e({
		formats: {
			full: "EEEE, d MMMM yyyy",
			long: "d MMMM yyyy",
			medium: "d MMM yyyy",
			short: "d/M/yyyy"
		},
		defaultWidth: "full"
	}),
	time: e({
		formats: {
			full: "HH.mm.ss",
			long: "HH.mm.ss",
			medium: "HH.mm",
			short: "HH.mm"
		},
		defaultWidth: "full"
	}),
	dateTime: e({
		formats: {
			full: "{{date}} 'pukul' {{time}}",
			long: "{{date}} 'pukul' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "eeee 'lepas pada jam' p",
	yesterday: "'Semalam pada jam' p",
	today: "'Hari ini pada jam' p",
	tomorrow: "'Esok pada jam' p",
	nextWeek: "eeee 'pada jam' p",
	other: "P"
}, c = {
	code: "ms",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => s[e],
	localize: {
		ordinalNumber: (e, t) => "ke-" + Number(e),
		era: n({
			values: {
				narrow: ["SM", "M"],
				abbreviated: ["SM", "M"],
				wide: ["Sebelum Masihi", "Masihi"]
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
					"S1",
					"S2",
					"S3",
					"S4"
				],
				wide: [
					"Suku pertama",
					"Suku kedua",
					"Suku ketiga",
					"Suku keempat"
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
					"O",
					"S",
					"O",
					"N",
					"D"
				],
				abbreviated: [
					"Jan",
					"Feb",
					"Mac",
					"Apr",
					"Mei",
					"Jun",
					"Jul",
					"Ogo",
					"Sep",
					"Okt",
					"Nov",
					"Dis"
				],
				wide: [
					"Januari",
					"Februari",
					"Mac",
					"April",
					"Mei",
					"Jun",
					"Julai",
					"Ogos",
					"September",
					"Oktober",
					"November",
					"Disember"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"A",
					"I",
					"S",
					"R",
					"K",
					"J",
					"S"
				],
				short: [
					"Ahd",
					"Isn",
					"Sel",
					"Rab",
					"Kha",
					"Jum",
					"Sab"
				],
				abbreviated: [
					"Ahd",
					"Isn",
					"Sel",
					"Rab",
					"Kha",
					"Jum",
					"Sab"
				],
				wide: [
					"Ahad",
					"Isnin",
					"Selasa",
					"Rabu",
					"Khamis",
					"Jumaat",
					"Sabtu"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "am",
					pm: "pm",
					midnight: "tgh malam",
					noon: "tgh hari",
					morning: "pagi",
					afternoon: "tengah hari",
					evening: "petang",
					night: "malam"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "tengah hari",
					evening: "petang",
					night: "malam"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "tengah hari",
					evening: "petang",
					night: "malam"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "am",
					pm: "pm",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "tengah hari",
					evening: "petang",
					night: "malam"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "tengah hari",
					evening: "petang",
					night: "malam"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "tengah hari",
					evening: "petang",
					night: "malam"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^ke-(\d+)?/i,
			parsePattern: /petama|\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^(sm|m)/i,
				abbreviated: /^(s\.?\s?m\.?|m\.?)/i,
				wide: /^(sebelum masihi|masihi)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^s/i, /^(m)/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^S[1234]/i,
				wide: /Suku (pertama|kedua|ketiga|keempat)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/pertama|1/i,
				/kedua|2/i,
				/ketiga|3/i,
				/keempat|4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: t({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mac|apr|mei|jun|jul|ogo|sep|okt|nov|dis)/i,
				wide: /^(januari|februari|mac|april|mei|jun|julai|ogos|september|oktober|november|disember)/i
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
					/^o/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^ma/i,
					/^ap/i,
					/^me/i,
					/^jun/i,
					/^jul/i,
					/^og/i,
					/^s/i,
					/^ok/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^[aisrkj]/i,
				short: /^(ahd|isn|sel|rab|kha|jum|sab)/i,
				abbreviated: /^(ahd|isn|sel|rab|kha|jum|sab)/i,
				wide: /^(ahad|isnin|selasa|rabu|khamis|jumaat|sabtu)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^a/i,
					/^i/i,
					/^s/i,
					/^r/i,
					/^k/i,
					/^j/i,
					/^s/i
				],
				any: [
					/^a/i,
					/^i/i,
					/^se/i,
					/^r/i,
					/^k/i,
					/^j/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(am|pm|tengah malam|tengah hari|pagi|petang|malam)/i,
				any: /^([ap]\.?\s?m\.?|tengah malam|tengah hari|pagi|petang|malam)/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^pm/i,
				midnight: /^tengah m/i,
				noon: /^tengah h/i,
				morning: /pa/i,
				afternoon: /tengah h/i,
				evening: /pe/i,
				night: /m/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 1
	}
};
export { c as default, c as ms };
