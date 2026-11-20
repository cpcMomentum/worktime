import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/ja-Hira/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "1びょうみまん",
		other: "{{count}}びょうみまん",
		oneWithSuffix: "やく1びょう",
		otherWithSuffix: "やく{{count}}びょう"
	},
	xSeconds: {
		one: "1びょう",
		other: "{{count}}びょう"
	},
	halfAMinute: "30びょう",
	lessThanXMinutes: {
		one: "1ぷんみまん",
		other: "{{count}}ふんみまん",
		oneWithSuffix: "やく1ぷん",
		otherWithSuffix: "やく{{count}}ふん"
	},
	xMinutes: {
		one: "1ぷん",
		other: "{{count}}ふん"
	},
	aboutXHours: {
		one: "やく1じかん",
		other: "やく{{count}}じかん"
	},
	xHours: {
		one: "1じかん",
		other: "{{count}}じかん"
	},
	xDays: {
		one: "1にち",
		other: "{{count}}にち"
	},
	aboutXWeeks: {
		one: "やく1しゅうかん",
		other: "やく{{count}}しゅうかん"
	},
	xWeeks: {
		one: "1しゅうかん",
		other: "{{count}}しゅうかん"
	},
	aboutXMonths: {
		one: "やく1かげつ",
		other: "やく{{count}}かげつ"
	},
	xMonths: {
		one: "1かげつ",
		other: "{{count}}かげつ"
	},
	aboutXYears: {
		one: "やく1ねん",
		other: "やく{{count}}ねん"
	},
	xYears: {
		one: "1ねん",
		other: "{{count}}ねん"
	},
	overXYears: {
		one: "1ねんいじょう",
		other: "{{count}}ねんいじょう"
	},
	almostXYears: {
		one: "1ねんちかく",
		other: "{{count}}ねんちかく"
	}
}, a = (e, t, n) => {
	n ||= {};
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? n.addSuffix && a.oneWithSuffix ? a.oneWithSuffix : a.one : n.addSuffix && a.otherWithSuffix ? a.otherWithSuffix.replace("{{count}}", String(t)) : a.other.replace("{{count}}", String(t)), n.addSuffix ? n.comparison && n.comparison > 0 ? r + "あと" : r + "まえ" : r;
}, o = {
	date: e({
		formats: {
			full: "yねんMがつdにちEEEE",
			long: "yねんMがつdにち",
			medium: "y/MM/dd",
			short: "y/MM/dd"
		},
		defaultWidth: "full"
	}),
	time: e({
		formats: {
			full: "Hじmmふんssびょう zzzz",
			long: "H:mm:ss z",
			medium: "H:mm:ss",
			short: "H:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: e({
		formats: {
			full: "{{date}} {{time}}",
			long: "{{date}} {{time}}",
			medium: "{{date}} {{time}}",
			short: "{{date}} {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "せんしゅうのeeeeのp",
	yesterday: "きのうのp",
	today: "きょうのp",
	tomorrow: "あしたのp",
	nextWeek: "よくしゅうのeeeeのp",
	other: "P"
}, c = {
	code: "ja-Hira",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => s[e],
	localize: {
		ordinalNumber: (e, t) => {
			let n = Number(e);
			switch (String(t?.unit)) {
				case "year": return `${n}ねん`;
				case "quarter": return `だい${n}しはんき`;
				case "month": return `${n}がつ`;
				case "week": return `だい${n}しゅう`;
				case "date": return `${n}にち`;
				case "hour": return `${n}じ`;
				case "minute": return `${n}ふん`;
				case "second": return `${n}びょう`;
				default: return `${n}`;
			}
		},
		era: n({
			values: {
				narrow: ["BC", "AC"],
				abbreviated: ["きげんぜん", "せいれき"],
				wide: ["きげんぜん", "せいれき"]
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
					"Q1",
					"Q2",
					"Q3",
					"Q4"
				],
				wide: [
					"だい1しはんき",
					"だい2しはんき",
					"だい3しはんき",
					"だい4しはんき"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => Number(e) - 1
		}),
		month: n({
			values: {
				narrow: [
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"7",
					"8",
					"9",
					"10",
					"11",
					"12"
				],
				abbreviated: [
					"1がつ",
					"2がつ",
					"3がつ",
					"4がつ",
					"5がつ",
					"6がつ",
					"7がつ",
					"8がつ",
					"9がつ",
					"10がつ",
					"11がつ",
					"12がつ"
				],
				wide: [
					"1がつ",
					"2がつ",
					"3がつ",
					"4がつ",
					"5がつ",
					"6がつ",
					"7がつ",
					"8がつ",
					"9がつ",
					"10がつ",
					"11がつ",
					"12がつ"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"にち",
					"げつ",
					"か",
					"すい",
					"もく",
					"きん",
					"ど"
				],
				short: [
					"にち",
					"げつ",
					"か",
					"すい",
					"もく",
					"きん",
					"ど"
				],
				abbreviated: [
					"にち",
					"げつ",
					"か",
					"すい",
					"もく",
					"きん",
					"ど"
				],
				wide: [
					"にちようび",
					"げつようび",
					"かようび",
					"すいようび",
					"もくようび",
					"きんようび",
					"どようび"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "ごぜん",
					pm: "ごご",
					midnight: "しんや",
					noon: "しょうご",
					morning: "あさ",
					afternoon: "ごご",
					evening: "よる",
					night: "しんや"
				},
				abbreviated: {
					am: "ごぜん",
					pm: "ごご",
					midnight: "しんや",
					noon: "しょうご",
					morning: "あさ",
					afternoon: "ごご",
					evening: "よる",
					night: "しんや"
				},
				wide: {
					am: "ごぜん",
					pm: "ごご",
					midnight: "しんや",
					noon: "しょうご",
					morning: "あさ",
					afternoon: "ごご",
					evening: "よる",
					night: "しんや"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "ごぜん",
					pm: "ごご",
					midnight: "しんや",
					noon: "しょうご",
					morning: "あさ",
					afternoon: "ごご",
					evening: "よる",
					night: "しんや"
				},
				abbreviated: {
					am: "ごぜん",
					pm: "ごご",
					midnight: "しんや",
					noon: "しょうご",
					morning: "あさ",
					afternoon: "ごご",
					evening: "よる",
					night: "しんや"
				},
				wide: {
					am: "ごぜん",
					pm: "ごご",
					midnight: "しんや",
					noon: "しょうご",
					morning: "あさ",
					afternoon: "ごご",
					evening: "よる",
					night: "しんや"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^だ?い?\d+(ねん|しはんき|がつ|しゅう|にち|じ|ふん|びょう)?/i,
			parsePattern: /\d+/i,
			valueCallback: function(e) {
				return parseInt(e, 10);
			}
		}),
		era: t({
			matchPatterns: {
				narrow: /^(B\.?C\.?|A\.?D\.?)/i,
				abbreviated: /^(きげん[前後]|せいれき)/i,
				wide: /^(きげん[前後]|せいれき)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [/^B/i, /^A/i],
				any: [/^(きげんぜん)/i, /^(せいれき|きげんご)/i]
			},
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^Q[1234]/i,
				wide: /^だい[1234一二三四１２３４]しはんき/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/(1|一|１)/i,
				/(2|二|２)/i,
				/(3|三|３)/i,
				/(4|四|４)/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: t({
			matchPatterns: {
				narrow: /^([123456789]|1[012])/,
				abbreviated: /^([123456789]|1[012])がつ/i,
				wide: /^([123456789]|1[012])がつ/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/^1\D/,
				/^2/,
				/^3/,
				/^4/,
				/^5/,
				/^6/,
				/^7/,
				/^8/,
				/^9/,
				/^10/,
				/^11/,
				/^12/
			] },
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^(にち|げつ|か|すい|もく|きん|ど)/,
				short: /^(にち|げつ|か|すい|もく|きん|ど)/,
				abbreviated: /^(にち|げつ|か|すい|もく|きん|ど)/,
				wide: /^(にち|げつ|か|すい|もく|きん|ど)ようび/
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/^にち/,
				/^げつ/,
				/^か/,
				/^すい/,
				/^もく/,
				/^きん/,
				/^ど/
			] },
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: { any: /^(AM|PM|ごぜん|ごご|しょうご|しんや|まよなか|よる|あさ)/i },
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^(A|ごぜん)/i,
				pm: /^(P|ごご)/i,
				midnight: /^しんや|まよなか/i,
				noon: /^しょうご/i,
				morning: /^あさ/i,
				afternoon: /^ごご/i,
				evening: /^よる/i,
				night: /^しんや/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
export { c as default, c as jaHira };
