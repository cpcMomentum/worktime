import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/id/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "kurang dari 1 detik",
		other: "kurang dari {{count}} detik"
	},
	xSeconds: {
		one: "1 detik",
		other: "{{count}} detik"
	},
	halfAMinute: "setengah menit",
	lessThanXMinutes: {
		one: "kurang dari 1 menit",
		other: "kurang dari {{count}} menit"
	},
	xMinutes: {
		one: "1 menit",
		other: "{{count}} menit"
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
	return r = typeof a == "string" ? a : t === 1 ? a.one : a.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "dalam waktu " + r : r + " yang lalu" : r;
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
	lastWeek: "eeee 'lalu pukul' p",
	yesterday: "'Kemarin pukul' p",
	today: "'Hari ini pukul' p",
	tomorrow: "'Besok pukul' p",
	nextWeek: "eeee 'pukul' p",
	other: "P"
}, c = {
	code: "id",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => s[e],
	localize: {
		ordinalNumber: (e, t) => "ke-" + Number(e),
		era: n({
			values: {
				narrow: ["SM", "M"],
				abbreviated: ["SM", "M"],
				wide: ["Sebelum Masehi", "Masehi"]
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
					"K1",
					"K2",
					"K3",
					"K4"
				],
				wide: [
					"Kuartal ke-1",
					"Kuartal ke-2",
					"Kuartal ke-3",
					"Kuartal ke-4"
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
					"Mar",
					"Apr",
					"Mei",
					"Jun",
					"Jul",
					"Agt",
					"Sep",
					"Okt",
					"Nov",
					"Des"
				],
				wide: [
					"Januari",
					"Februari",
					"Maret",
					"April",
					"Mei",
					"Juni",
					"Juli",
					"Agustus",
					"September",
					"Oktober",
					"November",
					"Desember"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"M",
					"S",
					"S",
					"R",
					"K",
					"J",
					"S"
				],
				short: [
					"Min",
					"Sen",
					"Sel",
					"Rab",
					"Kam",
					"Jum",
					"Sab"
				],
				abbreviated: [
					"Min",
					"Sen",
					"Sel",
					"Rab",
					"Kam",
					"Jum",
					"Sab"
				],
				wide: [
					"Minggu",
					"Senin",
					"Selasa",
					"Rabu",
					"Kamis",
					"Jumat",
					"Sabtu"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "AM",
					pm: "PM",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "siang",
					evening: "sore",
					night: "malam"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "siang",
					evening: "sore",
					night: "malam"
				},
				wide: {
					am: "AM",
					pm: "PM",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "siang",
					evening: "sore",
					night: "malam"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "AM",
					pm: "PM",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "siang",
					evening: "sore",
					night: "malam"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "siang",
					evening: "sore",
					night: "malam"
				},
				wide: {
					am: "AM",
					pm: "PM",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "siang",
					evening: "sore",
					night: "malam"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^ke-(\d+)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^(sm|m)/i,
				abbreviated: /^(s\.?\s?m\.?|s\.?\s?e\.?\s?u\.?|m\.?|e\.?\s?u\.?)/i,
				wide: /^(sebelum masehi|sebelum era umum|masehi|era umum)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^s/i, /^(m|e)/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^K-?\s[1234]/i,
				wide: /^Kuartal ke-?\s?[1234]/i
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
				abbreviated: /^(jan|feb|mar|apr|mei|jun|jul|agt|sep|okt|nov|des)/i,
				wide: /^(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)/i
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
					/^ma/i,
					/^ap/i,
					/^me/i,
					/^jun/i,
					/^jul/i,
					/^ag/i,
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
				narrow: /^[srkjm]/i,
				short: /^(min|sen|sel|rab|kam|jum|sab)/i,
				abbreviated: /^(min|sen|sel|rab|kam|jum|sab)/i,
				wide: /^(minggu|senin|selasa|rabu|kamis|jumat|sabtu)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^m/i,
					/^s/i,
					/^s/i,
					/^r/i,
					/^k/i,
					/^j/i,
					/^s/i
				],
				any: [
					/^m/i,
					/^sen/i,
					/^sel/i,
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
				narrow: /^(a|p|tengah m|tengah h|(di(\swaktu)?) (pagi|siang|sore|malam))/i,
				any: /^([ap]\.?\s?m\.?|tengah malam|tengah hari|(di(\swaktu)?) (pagi|siang|sore|malam))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^pm/i,
				midnight: /^tengah m/i,
				noon: /^tengah h/i,
				morning: /pagi/i,
				afternoon: /siang/i,
				evening: /sore/i,
				night: /malam/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 1
	}
};
export { c as default, c as id };
