import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/ka/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		past: "{{count}} წამზე ნაკლები ხნის წინ",
		present: "{{count}} წამზე ნაკლები",
		future: "{{count}} წამზე ნაკლებში"
	},
	xSeconds: {
		past: "{{count}} წამის წინ",
		present: "{{count}} წამი",
		future: "{{count}} წამში"
	},
	halfAMinute: {
		past: "ნახევარი წუთის წინ",
		present: "ნახევარი წუთი",
		future: "ნახევარი წუთში"
	},
	lessThanXMinutes: {
		past: "{{count}} წუთზე ნაკლები ხნის წინ",
		present: "{{count}} წუთზე ნაკლები",
		future: "{{count}} წუთზე ნაკლებში"
	},
	xMinutes: {
		past: "{{count}} წუთის წინ",
		present: "{{count}} წუთი",
		future: "{{count}} წუთში"
	},
	aboutXHours: {
		past: "დაახლოებით {{count}} საათის წინ",
		present: "დაახლოებით {{count}} საათი",
		future: "დაახლოებით {{count}} საათში"
	},
	xHours: {
		past: "{{count}} საათის წინ",
		present: "{{count}} საათი",
		future: "{{count}} საათში"
	},
	xDays: {
		past: "{{count}} დღის წინ",
		present: "{{count}} დღე",
		future: "{{count}} დღეში"
	},
	aboutXWeeks: {
		past: "დაახლოებით {{count}} კვირას წინ",
		present: "დაახლოებით {{count}} კვირა",
		future: "დაახლოებით {{count}} კვირაში"
	},
	xWeeks: {
		past: "{{count}} კვირას კვირა",
		present: "{{count}} კვირა",
		future: "{{count}} კვირაში"
	},
	aboutXMonths: {
		past: "დაახლოებით {{count}} თვის წინ",
		present: "დაახლოებით {{count}} თვე",
		future: "დაახლოებით {{count}} თვეში"
	},
	xMonths: {
		past: "{{count}} თვის წინ",
		present: "{{count}} თვე",
		future: "{{count}} თვეში"
	},
	aboutXYears: {
		past: "დაახლოებით {{count}} წლის წინ",
		present: "დაახლოებით {{count}} წელი",
		future: "დაახლოებით {{count}} წელში"
	},
	xYears: {
		past: "{{count}} წლის წინ",
		present: "{{count}} წელი",
		future: "{{count}} წელში"
	},
	overXYears: {
		past: "{{count}} წელზე მეტი ხნის წინ",
		present: "{{count}} წელზე მეტი",
		future: "{{count}} წელზე მეტი ხნის შემდეგ"
	},
	almostXYears: {
		past: "თითქმის {{count}} წლის წინ",
		present: "თითქმის {{count}} წელი",
		future: "თითქმის {{count}} წელში"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : n?.addSuffix && n.comparison && n.comparison > 0 ? a.future.replace("{{count}}", String(t)) : n?.addSuffix ? a.past.replace("{{count}}", String(t)) : a.present.replace("{{count}}", String(t)), r;
}, o = {
	date: e({
		formats: {
			full: "EEEE, do MMMM, y",
			long: "do, MMMM, y",
			medium: "d, MMM, y",
			short: "dd/MM/yyyy"
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
			full: "{{date}} {{time}}'-ზე'",
			long: "{{date}} {{time}}'-ზე'",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "'წინა' eeee p'-ზე'",
	yesterday: "'გუშინ' p'-ზე'",
	today: "'დღეს' p'-ზე'",
	tomorrow: "'ხვალ' p'-ზე'",
	nextWeek: "'შემდეგი' eeee p'-ზე'",
	other: "P"
}, c = {
	code: "ka",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => s[e],
	localize: {
		ordinalNumber: (e) => {
			let t = Number(e);
			return t === 1 ? t + "-ლი" : t + "-ე";
		},
		era: n({
			values: {
				narrow: ["ჩ.წ-მდე", "ჩ.წ"],
				abbreviated: ["ჩვ.წ-მდე", "ჩვ.წ"],
				wide: ["ჩვენს წელთაღრიცხვამდე", "ჩვენი წელთაღრიცხვით"]
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
					"1-ლი კვ",
					"2-ე კვ",
					"3-ე კვ",
					"4-ე კვ"
				],
				wide: [
					"1-ლი კვარტალი",
					"2-ე კვარტალი",
					"3-ე კვარტალი",
					"4-ე კვარტალი"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: {
				narrow: [
					"ია",
					"თე",
					"მა",
					"აპ",
					"მს",
					"ვნ",
					"ვლ",
					"აგ",
					"სე",
					"ოქ",
					"ნო",
					"დე"
				],
				abbreviated: [
					"იან",
					"თებ",
					"მარ",
					"აპრ",
					"მაი",
					"ივნ",
					"ივლ",
					"აგვ",
					"სექ",
					"ოქტ",
					"ნოე",
					"დეკ"
				],
				wide: [
					"იანვარი",
					"თებერვალი",
					"მარტი",
					"აპრილი",
					"მაისი",
					"ივნისი",
					"ივლისი",
					"აგვისტო",
					"სექტემბერი",
					"ოქტომბერი",
					"ნოემბერი",
					"დეკემბერი"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"კვ",
					"ორ",
					"სა",
					"ოთ",
					"ხუ",
					"პა",
					"შა"
				],
				short: [
					"კვი",
					"ორშ",
					"სამ",
					"ოთხ",
					"ხუთ",
					"პარ",
					"შაბ"
				],
				abbreviated: [
					"კვი",
					"ორშ",
					"სამ",
					"ოთხ",
					"ხუთ",
					"პარ",
					"შაბ"
				],
				wide: [
					"კვირა",
					"ორშაბათი",
					"სამშაბათი",
					"ოთხშაბათი",
					"ხუთშაბათი",
					"პარასკევი",
					"შაბათი"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "შუაღამე",
					noon: "შუადღე",
					morning: "დილა",
					afternoon: "საღამო",
					evening: "საღამო",
					night: "ღამე"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "შუაღამე",
					noon: "შუადღე",
					morning: "დილა",
					afternoon: "საღამო",
					evening: "საღამო",
					night: "ღამე"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "შუაღამე",
					noon: "შუადღე",
					morning: "დილა",
					afternoon: "საღამო",
					evening: "საღამო",
					night: "ღამე"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "შუაღამით",
					noon: "შუადღისას",
					morning: "დილით",
					afternoon: "ნაშუადღევს",
					evening: "საღამოს",
					night: "ღამით"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "შუაღამით",
					noon: "შუადღისას",
					morning: "დილით",
					afternoon: "ნაშუადღევს",
					evening: "საღამოს",
					night: "ღამით"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "შუაღამით",
					noon: "შუადღისას",
					morning: "დილით",
					afternoon: "ნაშუადღევს",
					evening: "საღამოს",
					night: "ღამით"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(-ლი|-ე)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^(ჩვ?\.წ)/i,
				abbreviated: /^(ჩვ?\.წ)/i,
				wide: /^(ჩვენს წელთაღრიცხვამდე|ქრისტეშობამდე|ჩვენი წელთაღრიცხვით|ქრისტეშობიდან)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^(ჩვენს წელთაღრიცხვამდე|ქრისტეშობამდე)/i, /^(ჩვენი წელთაღრიცხვით|ქრისტეშობიდან)/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^[1234]-(ლი|ე)? კვ/i,
				wide: /^[1234]-(ლი|ე)? კვარტალი/i
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
			matchPatterns: { any: /^(ია|თე|მა|აპ|მს|ვნ|ვლ|აგ|სე|ოქ|ნო|დე)/i },
			defaultMatchWidth: "any",
			parsePatterns: { any: [
				/^ია/i,
				/^თ/i,
				/^მარ/i,
				/^აპ/i,
				/^მაი/i,
				/^ი?ვნ/i,
				/^ი?ვლ/i,
				/^აგ/i,
				/^ს/i,
				/^ო/i,
				/^ნ/i,
				/^დ/i
			] },
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^(კვ|ორ|სა|ოთ|ხუ|პა|შა)/i,
				short: /^(კვი|ორშ|სამ|ოთხ|ხუთ|პარ|შაბ)/i,
				wide: /^(კვირა|ორშაბათი|სამშაბათი|ოთხშაბათი|ხუთშაბათი|პარასკევი|შაბათი)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/^კვ/i,
				/^ორ/i,
				/^სა/i,
				/^ოთ/i,
				/^ხუ/i,
				/^პა/i,
				/^შა/i
			] },
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: { any: /^([ap]\.?\s?m\.?|შუაღ|დილ)/i },
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^შუაღ/i,
				noon: /^შუადღ/i,
				morning: /^დილ/i,
				afternoon: /ნაშუადღევს/i,
				evening: /საღამო/i,
				night: /ღამ/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 1
	}
};
export { c as default, c as ka };
