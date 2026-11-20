import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/ar-EG/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "أقل من ثانية",
		two: "أقل من ثانيتين",
		threeToTen: "أقل من {{count}} ثواني",
		other: "أقل من {{count}} ثانية"
	},
	xSeconds: {
		one: "ثانية",
		two: "ثانيتين",
		threeToTen: "{{count}} ثواني",
		other: "{{count}} ثانية"
	},
	halfAMinute: "نص دقيقة",
	lessThanXMinutes: {
		one: "أقل من دقيقة",
		two: "أقل من دقيقتين",
		threeToTen: "أقل من {{count}} دقايق",
		other: "أقل من {{count}} دقيقة"
	},
	xMinutes: {
		one: "دقيقة",
		two: "دقيقتين",
		threeToTen: "{{count}} دقايق",
		other: "{{count}} دقيقة"
	},
	aboutXHours: {
		one: "حوالي ساعة",
		two: "حوالي ساعتين",
		threeToTen: "حوالي {{count}} ساعات",
		other: "حوالي {{count}} ساعة"
	},
	xHours: {
		one: "ساعة",
		two: "ساعتين",
		threeToTen: "{{count}} ساعات",
		other: "{{count}} ساعة"
	},
	xDays: {
		one: "يوم",
		two: "يومين",
		threeToTen: "{{count}} أيام",
		other: "{{count}} يوم"
	},
	aboutXWeeks: {
		one: "حوالي أسبوع",
		two: "حوالي أسبوعين",
		threeToTen: "حوالي {{count}} أسابيع",
		other: "حوالي {{count}} أسبوع"
	},
	xWeeks: {
		one: "أسبوع",
		two: "أسبوعين",
		threeToTen: "{{count}} أسابيع",
		other: "{{count}} أسبوع"
	},
	aboutXMonths: {
		one: "حوالي شهر",
		two: "حوالي شهرين",
		threeToTen: "حوالي {{count}} أشهر",
		other: "حوالي {{count}} شهر"
	},
	xMonths: {
		one: "شهر",
		two: "شهرين",
		threeToTen: "{{count}} أشهر",
		other: "{{count}} شهر"
	},
	aboutXYears: {
		one: "حوالي سنة",
		two: "حوالي سنتين",
		threeToTen: "حوالي {{count}} سنين",
		other: "حوالي {{count}} سنة"
	},
	xYears: {
		one: "عام",
		two: "عامين",
		threeToTen: "{{count}} أعوام",
		other: "{{count}} عام"
	},
	overXYears: {
		one: "أكثر من سنة",
		two: "أكثر من سنتين",
		threeToTen: "أكثر من {{count}} سنين",
		other: "أكثر من {{count}} سنة"
	},
	almostXYears: {
		one: "عام تقريبًا",
		two: "عامين تقريبًا",
		threeToTen: "{{count}} أعوام تقريبًا",
		other: "{{count}} عام تقريبًا"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : t === 2 ? a.two : t <= 10 ? a.threeToTen.replace("{{count}}", String(t)) : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? `في خلال ${r}` : `منذ ${r}` : r;
}, o = {
	date: e({
		formats: {
			full: "EEEE، do MMMM y",
			long: "do MMMM y",
			medium: "dd/MMM/y",
			short: "d/MM/y"
		},
		defaultWidth: "full"
	}),
	time: e({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: e({
		formats: {
			full: "{{date}} 'الساعة' {{time}}",
			long: "{{date}} 'الساعة' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "eeee 'اللي جاي الساعة' p",
	yesterday: "'إمبارح الساعة' p",
	today: "'النهاردة الساعة' p",
	tomorrow: "'بكرة الساعة' p",
	nextWeek: "eeee 'الساعة' p",
	other: "P"
}, c = {
	code: "ar-EG",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => s[e],
	localize: {
		ordinalNumber: (e, t) => String(e),
		era: n({
			values: {
				narrow: ["ق", "ب"],
				abbreviated: ["ق.م", "ب.م"],
				wide: ["قبل الميلاد", "بعد الميلاد"]
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
					"ر1",
					"ر2",
					"ر3",
					"ر4"
				],
				wide: [
					"الربع الأول",
					"الربع الثاني",
					"الربع الثالث",
					"الربع الرابع"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: {
				narrow: [
					"ي",
					"ف",
					"م",
					"أ",
					"م",
					"ي",
					"ي",
					"أ",
					"س",
					"أ",
					"ن",
					"د"
				],
				abbreviated: [
					"ينا",
					"فبر",
					"مارس",
					"أبريل",
					"مايو",
					"يونـ",
					"يولـ",
					"أغسـ",
					"سبتـ",
					"أكتـ",
					"نوفـ",
					"ديسـ"
				],
				wide: [
					"يناير",
					"فبراير",
					"مارس",
					"أبريل",
					"مايو",
					"يونيو",
					"يوليو",
					"أغسطس",
					"سبتمبر",
					"أكتوبر",
					"نوفمبر",
					"ديسمبر"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"ح",
					"ن",
					"ث",
					"ر",
					"خ",
					"ج",
					"س"
				],
				short: [
					"أحد",
					"اثنين",
					"ثلاثاء",
					"أربعاء",
					"خميس",
					"جمعة",
					"سبت"
				],
				abbreviated: [
					"أحد",
					"اثنين",
					"ثلاثاء",
					"أربعاء",
					"خميس",
					"جمعة",
					"سبت"
				],
				wide: [
					"الأحد",
					"الاثنين",
					"الثلاثاء",
					"الأربعاء",
					"الخميس",
					"الجمعة",
					"السبت"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "ص",
					pm: "م",
					midnight: "ن",
					noon: "ظ",
					morning: "صباحاً",
					afternoon: "بعد الظهر",
					evening: "مساءً",
					night: "ليلاً"
				},
				abbreviated: {
					am: "ص",
					pm: "م",
					midnight: "نصف الليل",
					noon: "ظهراً",
					morning: "صباحاً",
					afternoon: "بعد الظهر",
					evening: "مساءً",
					night: "ليلاً"
				},
				wide: {
					am: "ص",
					pm: "م",
					midnight: "نصف الليل",
					noon: "ظهراً",
					morning: "صباحاً",
					afternoon: "بعد الظهر",
					evening: "مساءً",
					night: "ليلاً"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "ص",
					pm: "م",
					midnight: "ن",
					noon: "ظ",
					morning: "في الصباح",
					afternoon: "بعد الظهر",
					evening: "في المساء",
					night: "في الليل"
				},
				abbreviated: {
					am: "ص",
					pm: "م",
					midnight: "نصف الليل",
					noon: "ظهراً",
					morning: "في الصباح",
					afternoon: "بعد الظهر",
					evening: "في المساء",
					night: "في الليل"
				},
				wide: {
					am: "ص",
					pm: "م",
					midnight: "نصف الليل",
					morning: "في الصباح",
					noon: "ظهراً",
					afternoon: "بعد الظهر",
					evening: "في المساء",
					night: "في الليل"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)/,
			parsePattern: /\d+/i,
			valueCallback: function(e) {
				return parseInt(e, 10);
			}
		}),
		era: t({
			matchPatterns: {
				narrow: /^(ق|ب)/g,
				abbreviated: /^(ق.م|ب.م)/g,
				wide: /^(قبل الميلاد|بعد الميلاد)/g
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^ق/g, /^ب/g] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/,
				abbreviated: /^ر[1234]/,
				wide: /^الربع (الأول|الثاني|الثالث|الرابع)/
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				wide: [
					/الربع الأول/,
					/الربع الثاني/,
					/الربع الثالث/,
					/الربع الرابع/
				],
				any: [
					/1/,
					/2/,
					/3/,
					/4/
				]
			},
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: t({
			matchPatterns: {
				narrow: /^(ي|ف|م|أ|س|ن|د)/,
				abbreviated: /^(ينا|فبر|مارس|أبريل|مايو|يونـ|يولـ|أغسـ|سبتـ|أكتـ|نوفـ|ديسـ)/,
				wide: /^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^ي/,
					/^ف/,
					/^م/,
					/^أ/,
					/^م/,
					/^ي/,
					/^ي/,
					/^أ/,
					/^س/,
					/^أ/,
					/^ن/,
					/^د/
				],
				any: [
					/^ينا/,
					/^فبر/,
					/^مارس/,
					/^أبريل/,
					/^مايو/,
					/^يون/,
					/^يول/,
					/^أغس/,
					/^سبت/,
					/^أكت/,
					/^نوف/,
					/^ديس/
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^(ح|ن|ث|ر|خ|ج|س)/,
				short: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/,
				abbreviated: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/,
				wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^ح/,
					/^ن/,
					/^ث/,
					/^ر/,
					/^خ/,
					/^ج/,
					/^س/
				],
				any: [
					/أحد/,
					/اثنين/,
					/ثلاثاء/,
					/أربعاء/,
					/خميس/,
					/جمعة/,
					/سبت/
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(ص|م|ن|ظ|في الصباح|بعد الظهر|في المساء|في الليل)/,
				abbreviated: /^(ص|م|نصف الليل|ظهراً|في الصباح|بعد الظهر|في المساء|في الليل)/,
				wide: /^(ص|م|نصف الليل|في الصباح|ظهراً|بعد الظهر|في المساء|في الليل)/,
				any: /^(ص|م|صباح|ظهر|مساء|ليل)/
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^ص/,
				pm: /^م/,
				midnight: /^ن/,
				noon: /^ظ/,
				morning: /^ص/,
				afternoon: /^بعد/,
				evening: /^م/,
				night: /^ل/
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
export { c as arEG, c as default };
