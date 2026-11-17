import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/fa-IR/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "کمتر از یک ثانیه",
		other: "کمتر از {{count}} ثانیه"
	},
	xSeconds: {
		one: "1 ثانیه",
		other: "{{count}} ثانیه"
	},
	halfAMinute: "نیم دقیقه",
	lessThanXMinutes: {
		one: "کمتر از یک دقیقه",
		other: "کمتر از {{count}} دقیقه"
	},
	xMinutes: {
		one: "1 دقیقه",
		other: "{{count}} دقیقه"
	},
	aboutXHours: {
		one: "حدود 1 ساعت",
		other: "حدود {{count}} ساعت"
	},
	xHours: {
		one: "1 ساعت",
		other: "{{count}} ساعت"
	},
	xDays: {
		one: "1 روز",
		other: "{{count}} روز"
	},
	aboutXWeeks: {
		one: "حدود 1 هفته",
		other: "حدود {{count}} هفته"
	},
	xWeeks: {
		one: "1 هفته",
		other: "{{count}} هفته"
	},
	aboutXMonths: {
		one: "حدود 1 ماه",
		other: "حدود {{count}} ماه"
	},
	xMonths: {
		one: "1 ماه",
		other: "{{count}} ماه"
	},
	aboutXYears: {
		one: "حدود 1 سال",
		other: "حدود {{count}} سال"
	},
	xYears: {
		one: "1 سال",
		other: "{{count}} سال"
	},
	overXYears: {
		one: "بیشتر از 1 سال",
		other: "بیشتر از {{count}} سال"
	},
	almostXYears: {
		one: "نزدیک 1 سال",
		other: "نزدیک {{count}} سال"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "در " + r : r + " قبل" : r;
}, o = {
	date: e({
		formats: {
			full: "EEEE do MMMM y",
			long: "do MMMM y",
			medium: "d MMM y",
			short: "yyyy/MM/dd"
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
			full: "{{date}} 'در' {{time}}",
			long: "{{date}} 'در' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "eeee 'گذشته در' p",
	yesterday: "'دیروز در' p",
	today: "'امروز در' p",
	tomorrow: "'فردا در' p",
	nextWeek: "eeee 'در' p",
	other: "P"
}, c = {
	code: "fa-IR",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => s[e],
	localize: {
		ordinalNumber: (e, t) => String(e),
		era: n({
			values: {
				narrow: ["ق", "ب"],
				abbreviated: ["ق.م.", "ب.م."],
				wide: ["قبل از میلاد", "بعد از میلاد"]
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
					"س‌م1",
					"س‌م2",
					"س‌م3",
					"س‌م4"
				],
				wide: [
					"سه‌ماهه 1",
					"سه‌ماهه 2",
					"سه‌ماهه 3",
					"سه‌ماهه 4"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: {
				narrow: [
					"ژ",
					"ف",
					"م",
					"آ",
					"م",
					"ج",
					"ج",
					"آ",
					"س",
					"ا",
					"ن",
					"د"
				],
				abbreviated: [
					"ژانـ",
					"فور",
					"مارس",
					"آپر",
					"می",
					"جون",
					"جولـ",
					"آگو",
					"سپتـ",
					"اکتـ",
					"نوامـ",
					"دسامـ"
				],
				wide: [
					"ژانویه",
					"فوریه",
					"مارس",
					"آپریل",
					"می",
					"جون",
					"جولای",
					"آگوست",
					"سپتامبر",
					"اکتبر",
					"نوامبر",
					"دسامبر"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"ی",
					"د",
					"س",
					"چ",
					"پ",
					"ج",
					"ش"
				],
				short: [
					"1ش",
					"2ش",
					"3ش",
					"4ش",
					"5ش",
					"ج",
					"ش"
				],
				abbreviated: [
					"یکشنبه",
					"دوشنبه",
					"سه‌شنبه",
					"چهارشنبه",
					"پنجشنبه",
					"جمعه",
					"شنبه"
				],
				wide: [
					"یکشنبه",
					"دوشنبه",
					"سه‌شنبه",
					"چهارشنبه",
					"پنجشنبه",
					"جمعه",
					"شنبه"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "ق",
					pm: "ب",
					midnight: "ن",
					noon: "ظ",
					morning: "ص",
					afternoon: "ب.ظ.",
					evening: "ع",
					night: "ش"
				},
				abbreviated: {
					am: "ق.ظ.",
					pm: "ب.ظ.",
					midnight: "نیمه‌شب",
					noon: "ظهر",
					morning: "صبح",
					afternoon: "بعدازظهر",
					evening: "عصر",
					night: "شب"
				},
				wide: {
					am: "قبل‌ازظهر",
					pm: "بعدازظهر",
					midnight: "نیمه‌شب",
					noon: "ظهر",
					morning: "صبح",
					afternoon: "بعدازظهر",
					evening: "عصر",
					night: "شب"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "ق",
					pm: "ب",
					midnight: "ن",
					noon: "ظ",
					morning: "ص",
					afternoon: "ب.ظ.",
					evening: "ع",
					night: "ش"
				},
				abbreviated: {
					am: "ق.ظ.",
					pm: "ب.ظ.",
					midnight: "نیمه‌شب",
					noon: "ظهر",
					morning: "صبح",
					afternoon: "بعدازظهر",
					evening: "عصر",
					night: "شب"
				},
				wide: {
					am: "قبل‌ازظهر",
					pm: "بعدازظهر",
					midnight: "نیمه‌شب",
					noon: "ظهر",
					morning: "صبح",
					afternoon: "بعدازظهر",
					evening: "عصر",
					night: "شب"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^(ق|ب)/i,
				abbreviated: /^(ق\.?\s?م\.?|ق\.?\s?د\.?\s?م\.?|م\.?\s?|د\.?\s?م\.?)/i,
				wide: /^(قبل از میلاد|قبل از دوران مشترک|میلادی|دوران مشترک|بعد از میلاد)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^قبل/i, /^بعد/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^س‌م[1234]/i,
				wide: /^سه‌ماهه [1234]/i
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
				narrow: /^[جژفمآاماسند]/i,
				abbreviated: /^(جنو|ژانـ|ژانویه|فوریه|فور|مارس|آوریل|آپر|مه|می|ژوئن|جون|جول|جولـ|ژوئیه|اوت|آگو|سپتمبر|سپتامبر|اکتبر|اکتوبر|نوامبر|نوامـ|دسامبر|دسامـ|دسم)/i,
				wide: /^(ژانویه|جنوری|فبروری|فوریه|مارچ|مارس|آپریل|اپریل|ایپریل|آوریل|مه|می|ژوئن|جون|جولای|ژوئیه|آگست|اگست|آگوست|اوت|سپتمبر|سپتامبر|اکتبر|اکتوبر|نوامبر|نومبر|دسامبر|دسمبر)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^(ژ|ج)/i,
					/^ف/i,
					/^م/i,
					/^(آ|ا)/i,
					/^م/i,
					/^(ژ|ج)/i,
					/^(ج|ژ)/i,
					/^(آ|ا)/i,
					/^س/i,
					/^ا/i,
					/^ن/i,
					/^د/i
				],
				any: [
					/^ژا/i,
					/^ف/i,
					/^ما/i,
					/^آپ/i,
					/^(می|مه)/i,
					/^(ژوئن|جون)/i,
					/^(ژوئی|جول)/i,
					/^(اوت|آگ)/i,
					/^س/i,
					/^(اوک|اک)/i,
					/^ن/i,
					/^د/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^[شیدسچپج]/i,
				short: /^(ش|ج|1ش|2ش|3ش|4ش|5ش)/i,
				abbreviated: /^(یکشنبه|دوشنبه|سه‌شنبه|چهارشنبه|پنج‌شنبه|جمعه|شنبه)/i,
				wide: /^(یکشنبه|دوشنبه|سه‌شنبه|چهارشنبه|پنج‌شنبه|جمعه|شنبه)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^ی/i,
					/^دو/i,
					/^س/i,
					/^چ/i,
					/^پ/i,
					/^ج/i,
					/^ش/i
				],
				any: [
					/^(ی|1ش|یکشنبه)/i,
					/^(د|2ش|دوشنبه)/i,
					/^(س|3ش|سه‌شنبه)/i,
					/^(چ|4ش|چهارشنبه)/i,
					/^(پ|5ش|پنجشنبه)/i,
					/^(ج|جمعه)/i,
					/^(ش|شنبه)/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(ب|ق|ن|ظ|ص|ب.ظ.|ع|ش)/i,
				abbreviated: /^(ق.ظ.|ب.ظ.|نیمه‌شب|ظهر|صبح|بعدازظهر|عصر|شب)/i,
				wide: /^(قبل‌ازظهر|نیمه‌شب|ظهر|صبح|بعدازظهر|عصر|شب)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: {
				am: /^(ق|ق.ظ.|قبل‌ازظهر)/i,
				pm: /^(ب|ب.ظ.|بعدازظهر)/i,
				midnight: /^(‌نیمه‌شب|ن)/i,
				noon: /^(ظ|ظهر)/i,
				morning: /(ص|صبح)/i,
				afternoon: /(ب|ب.ظ.|بعدازظهر)/i,
				evening: /(ع|عصر)/i,
				night: /(ش|شب)/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 6,
		firstWeekContainsDate: 1
	}
};
export { c as default, c as faIR };
