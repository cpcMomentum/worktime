import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/bn/_lib/localize.js
var i = {
	locale: {
		1: "১",
		2: "২",
		3: "৩",
		4: "৪",
		5: "৫",
		6: "৬",
		7: "৭",
		8: "৮",
		9: "৯",
		0: "০"
	},
	number: {
		"১": "1",
		"২": "2",
		"৩": "3",
		"৪": "4",
		"৫": "5",
		"৬": "6",
		"৭": "7",
		"৮": "8",
		"৯": "9",
		"০": "0"
	}
}, a = {
	narrow: ["খ্রিঃপূঃ", "খ্রিঃ"],
	abbreviated: ["খ্রিঃপূর্ব", "খ্রিঃ"],
	wide: ["খ্রিস্টপূর্ব", "খ্রিস্টাব্দ"]
}, o = {
	narrow: [
		"১",
		"২",
		"৩",
		"৪"
	],
	abbreviated: [
		"১ত্রৈ",
		"২ত্রৈ",
		"৩ত্রৈ",
		"৪ত্রৈ"
	],
	wide: [
		"১ম ত্রৈমাসিক",
		"২য় ত্রৈমাসিক",
		"৩য় ত্রৈমাসিক",
		"৪র্থ ত্রৈমাসিক"
	]
}, s = {
	narrow: [
		"জানু",
		"ফেব্রু",
		"মার্চ",
		"এপ্রিল",
		"মে",
		"জুন",
		"জুলাই",
		"আগস্ট",
		"সেপ্ট",
		"অক্টো",
		"নভে",
		"ডিসে"
	],
	abbreviated: [
		"জানু",
		"ফেব্রু",
		"মার্চ",
		"এপ্রিল",
		"মে",
		"জুন",
		"জুলাই",
		"আগস্ট",
		"সেপ্ট",
		"অক্টো",
		"নভে",
		"ডিসে"
	],
	wide: [
		"জানুয়ারি",
		"ফেব্রুয়ারি",
		"মার্চ",
		"এপ্রিল",
		"মে",
		"জুন",
		"জুলাই",
		"আগস্ট",
		"সেপ্টেম্বর",
		"অক্টোবর",
		"নভেম্বর",
		"ডিসেম্বর"
	]
}, c = {
	narrow: [
		"র",
		"সো",
		"ম",
		"বু",
		"বৃ",
		"শু",
		"শ"
	],
	short: [
		"রবি",
		"সোম",
		"মঙ্গল",
		"বুধ",
		"বৃহ",
		"শুক্র",
		"শনি"
	],
	abbreviated: [
		"রবি",
		"সোম",
		"মঙ্গল",
		"বুধ",
		"বৃহ",
		"শুক্র",
		"শনি"
	],
	wide: [
		"রবিবার",
		"সোমবার",
		"মঙ্গলবার",
		"বুধবার",
		"বৃহস্পতিবার ",
		"শুক্রবার",
		"শনিবার"
	]
}, l = {
	narrow: {
		am: "পূ",
		pm: "অপ",
		midnight: "মধ্যরাত",
		noon: "মধ্যাহ্ন",
		morning: "সকাল",
		afternoon: "বিকাল",
		evening: "সন্ধ্যা",
		night: "রাত"
	},
	abbreviated: {
		am: "পূর্বাহ্ন",
		pm: "অপরাহ্ন",
		midnight: "মধ্যরাত",
		noon: "মধ্যাহ্ন",
		morning: "সকাল",
		afternoon: "বিকাল",
		evening: "সন্ধ্যা",
		night: "রাত"
	},
	wide: {
		am: "পূর্বাহ্ন",
		pm: "অপরাহ্ন",
		midnight: "মধ্যরাত",
		noon: "মধ্যাহ্ন",
		morning: "সকাল",
		afternoon: "বিকাল",
		evening: "সন্ধ্যা",
		night: "রাত"
	}
}, u = {
	narrow: {
		am: "পূ",
		pm: "অপ",
		midnight: "মধ্যরাত",
		noon: "মধ্যাহ্ন",
		morning: "সকাল",
		afternoon: "বিকাল",
		evening: "সন্ধ্যা",
		night: "রাত"
	},
	abbreviated: {
		am: "পূর্বাহ্ন",
		pm: "অপরাহ্ন",
		midnight: "মধ্যরাত",
		noon: "মধ্যাহ্ন",
		morning: "সকাল",
		afternoon: "বিকাল",
		evening: "সন্ধ্যা",
		night: "রাত"
	},
	wide: {
		am: "পূর্বাহ্ন",
		pm: "অপরাহ্ন",
		midnight: "মধ্যরাত",
		noon: "মধ্যাহ্ন",
		morning: "সকাল",
		afternoon: "বিকাল",
		evening: "সন্ধ্যা",
		night: "রাত"
	}
};
function d(e, t) {
	if (e > 18 && e <= 31) return t + "শে";
	switch (e) {
		case 1: return t + "লা";
		case 2:
		case 3: return t + "রা";
		case 4: return t + "ঠা";
		default: return t + "ই";
	}
}
var f = (e, t) => {
	let n = Number(e), r = p(n);
	if (t?.unit === "date") return d(n, r);
	if (n > 10 || n === 0) return r + "তম";
	switch (n % 10) {
		case 2:
		case 3: return r + "য়";
		case 4: return r + "র্থ";
		case 6: return r + "ষ্ঠ";
		default: return r + "ম";
	}
};
function p(e) {
	return e.toString().replace(/\d/g, function(e) {
		return i.locale[e];
	});
}
var m = {
	ordinalNumber: f,
	era: n({
		values: a,
		defaultWidth: "wide"
	}),
	quarter: n({
		values: o,
		defaultWidth: "wide",
		argumentCallback: (e) => e - 1
	}),
	month: n({
		values: s,
		defaultWidth: "wide"
	}),
	day: n({
		values: c,
		defaultWidth: "wide"
	}),
	dayPeriod: n({
		values: l,
		defaultWidth: "wide",
		formattingValues: u,
		defaultFormattingWidth: "wide"
	})
}, h = {
	lessThanXSeconds: {
		one: "প্রায় ১ সেকেন্ড",
		other: "প্রায় {{count}} সেকেন্ড"
	},
	xSeconds: {
		one: "১ সেকেন্ড",
		other: "{{count}} সেকেন্ড"
	},
	halfAMinute: "আধ মিনিট",
	lessThanXMinutes: {
		one: "প্রায় ১ মিনিট",
		other: "প্রায় {{count}} মিনিট"
	},
	xMinutes: {
		one: "১ মিনিট",
		other: "{{count}} মিনিট"
	},
	aboutXHours: {
		one: "প্রায় ১ ঘন্টা",
		other: "প্রায় {{count}} ঘন্টা"
	},
	xHours: {
		one: "১ ঘন্টা",
		other: "{{count}} ঘন্টা"
	},
	xDays: {
		one: "১ দিন",
		other: "{{count}} দিন"
	},
	aboutXWeeks: {
		one: "প্রায় ১ সপ্তাহ",
		other: "প্রায় {{count}} সপ্তাহ"
	},
	xWeeks: {
		one: "১ সপ্তাহ",
		other: "{{count}} সপ্তাহ"
	},
	aboutXMonths: {
		one: "প্রায় ১ মাস",
		other: "প্রায় {{count}} মাস"
	},
	xMonths: {
		one: "১ মাস",
		other: "{{count}} মাস"
	},
	aboutXYears: {
		one: "প্রায় ১ বছর",
		other: "প্রায় {{count}} বছর"
	},
	xYears: {
		one: "১ বছর",
		other: "{{count}} বছর"
	},
	overXYears: {
		one: "১ বছরের বেশি",
		other: "{{count}} বছরের বেশি"
	},
	almostXYears: {
		one: "প্রায় ১ বছর",
		other: "প্রায় {{count}} বছর"
	}
}, g = (e, t, n) => {
	let r, i = h[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", p(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? r + " এর মধ্যে" : r + " আগে" : r;
}, _ = {
	date: e({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
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
			full: "{{date}} {{time}} 'সময়'",
			long: "{{date}} {{time}} 'সময়'",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, v = {
	lastWeek: "'গত' eeee 'সময়' p",
	yesterday: "'গতকাল' 'সময়' p",
	today: "'আজ' 'সময়' p",
	tomorrow: "'আগামীকাল' 'সময়' p",
	nextWeek: "eeee 'সময়' p",
	other: "P"
}, y = {
	code: "bn",
	formatDistance: g,
	formatLong: _,
	formatRelative: (e, t, n, r) => v[e],
	localize: m,
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(ম|য়|র্থ|ষ্ঠ|শে|ই|তম)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^(খ্রিঃপূঃ|খ্রিঃ)/i,
				abbreviated: /^(খ্রিঃপূর্ব|খ্রিঃ)/i,
				wide: /^(খ্রিস্টপূর্ব|খ্রিস্টাব্দ)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [/^খ্রিঃপূঃ/i, /^খ্রিঃ/i],
				abbreviated: [/^খ্রিঃপূর্ব/i, /^খ্রিঃ/i],
				wide: [/^খ্রিস্টপূর্ব/i, /^খ্রিস্টাব্দ/i]
			},
			defaultParseWidth: "wide"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[১২৩৪]/i,
				abbreviated: /^[১২৩৪]ত্রৈ/i,
				wide: /^[১২৩৪](ম|য়|র্থ)? ত্রৈমাসিক/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/১/i,
				/২/i,
				/৩/i,
				/৪/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: t({
			matchPatterns: {
				narrow: /^(জানু|ফেব্রু|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্ট|অক্টো|নভে|ডিসে)/i,
				abbreviated: /^(জানু|ফেব্রু|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্ট|অক্টো|নভে|ডিসে)/i,
				wide: /^(জানুয়ারি|ফেব্রুয়ারি|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্টেম্বর|অক্টোবর|নভেম্বর|ডিসেম্বর)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/^জানু/i,
				/^ফেব্রু/i,
				/^মার্চ/i,
				/^এপ্রিল/i,
				/^মে/i,
				/^জুন/i,
				/^জুলাই/i,
				/^আগস্ট/i,
				/^সেপ্ট/i,
				/^অক্টো/i,
				/^নভে/i,
				/^ডিসে/i
			] },
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^(র|সো|ম|বু|বৃ|শু|শ)+/i,
				short: /^(রবি|সোম|মঙ্গল|বুধ|বৃহ|শুক্র|শনি)+/i,
				abbreviated: /^(রবি|সোম|মঙ্গল|বুধ|বৃহ|শুক্র|শনি)+/i,
				wide: /^(রবিবার|সোমবার|মঙ্গলবার|বুধবার|বৃহস্পতিবার |শুক্রবার|শনিবার)+/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^র/i,
					/^সো/i,
					/^ম/i,
					/^বু/i,
					/^বৃ/i,
					/^শু/i,
					/^শ/i
				],
				short: [
					/^রবি/i,
					/^সোম/i,
					/^মঙ্গল/i,
					/^বুধ/i,
					/^বৃহ/i,
					/^শুক্র/i,
					/^শনি/i
				],
				abbreviated: [
					/^রবি/i,
					/^সোম/i,
					/^মঙ্গল/i,
					/^বুধ/i,
					/^বৃহ/i,
					/^শুক্র/i,
					/^শনি/i
				],
				wide: [
					/^রবিবার/i,
					/^সোমবার/i,
					/^মঙ্গলবার/i,
					/^বুধবার/i,
					/^বৃহস্পতিবার /i,
					/^শুক্রবার/i,
					/^শনিবার/i
				]
			},
			defaultParseWidth: "wide"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^(পূ|অপ|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i,
				abbreviated: /^(পূর্বাহ্ন|অপরাহ্ন|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i,
				wide: /^(পূর্বাহ্ন|অপরাহ্ন|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: {
				am: /^পূ/i,
				pm: /^অপ/i,
				midnight: /^মধ্যরাত/i,
				noon: /^মধ্যাহ্ন/i,
				morning: /সকাল/i,
				afternoon: /বিকাল/i,
				evening: /সন্ধ্যা/i,
				night: /রাত/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
export { y as bn, y as default };
