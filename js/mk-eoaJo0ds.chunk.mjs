import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
import { t as i } from "./isSameWeek-IUVRx6Bb.chunk.mjs";
// node_modules/date-fns/locale/mk/_lib/formatDistance.js
var a = {
	lessThanXSeconds: {
		one: "помалку од секунда",
		other: "помалку од {{count}} секунди"
	},
	xSeconds: {
		one: "1 секунда",
		other: "{{count}} секунди"
	},
	halfAMinute: "половина минута",
	lessThanXMinutes: {
		one: "помалку од минута",
		other: "помалку од {{count}} минути"
	},
	xMinutes: {
		one: "1 минута",
		other: "{{count}} минути"
	},
	aboutXHours: {
		one: "околу 1 час",
		other: "околу {{count}} часа"
	},
	xHours: {
		one: "1 час",
		other: "{{count}} часа"
	},
	xDays: {
		one: "1 ден",
		other: "{{count}} дена"
	},
	aboutXWeeks: {
		one: "околу 1 недела",
		other: "околу {{count}} месеци"
	},
	xWeeks: {
		one: "1 недела",
		other: "{{count}} недели"
	},
	aboutXMonths: {
		one: "околу 1 месец",
		other: "околу {{count}} недели"
	},
	xMonths: {
		one: "1 месец",
		other: "{{count}} месеци"
	},
	aboutXYears: {
		one: "околу 1 година",
		other: "околу {{count}} години"
	},
	xYears: {
		one: "1 година",
		other: "{{count}} години"
	},
	overXYears: {
		one: "повеќе од 1 година",
		other: "повеќе од {{count}} години"
	},
	almostXYears: {
		one: "безмалку 1 година",
		other: "безмалку {{count}} години"
	}
}, o = (e, t, n) => {
	let r, i = a[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "за " + r : "пред " + r : r;
}, s = {
	date: e({
		formats: {
			full: "EEEE, dd MMMM yyyy",
			long: "dd MMMM yyyy",
			medium: "dd MMM yyyy",
			short: "dd/MM/yyyy"
		},
		defaultWidth: "full"
	}),
	time: e({
		formats: {
			full: "HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "H:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: e({
		formats: { any: "{{date}} {{time}}" },
		defaultWidth: "any"
	})
}, c = [
	"недела",
	"понеделник",
	"вторник",
	"среда",
	"четврток",
	"петок",
	"сабота"
];
function l(e) {
	let t = c[e];
	switch (e) {
		case 0:
		case 3:
		case 6: return "'минатата " + t + " во' p";
		case 1:
		case 2:
		case 4:
		case 5: return "'минатиот " + t + " во' p";
	}
}
function u(e) {
	let t = c[e];
	switch (e) {
		case 0:
		case 3:
		case 6: return "'ова " + t + " вo' p";
		case 1:
		case 2:
		case 4:
		case 5: return "'овој " + t + " вo' p";
	}
}
function d(e) {
	let t = c[e];
	switch (e) {
		case 0:
		case 3:
		case 6: return "'следната " + t + " вo' p";
		case 1:
		case 2:
		case 4:
		case 5: return "'следниот " + t + " вo' p";
	}
}
var f = {
	lastWeek: (e, t, n) => {
		let r = e.getDay();
		return i(e, t, n) ? u(r) : l(r);
	},
	yesterday: "'вчера во' p",
	today: "'денес во' p",
	tomorrow: "'утре во' p",
	nextWeek: (e, t, n) => {
		let r = e.getDay();
		return i(e, t, n) ? u(r) : d(r);
	},
	other: "P"
}, p = {
	code: "mk",
	formatDistance: o,
	formatLong: s,
	formatRelative: (e, t, n, r) => {
		let i = f[e];
		return typeof i == "function" ? i(t, n, r) : i;
	},
	localize: {
		ordinalNumber: (e, t) => {
			let n = Number(e), r = n % 100;
			if (r > 20 || r < 10) switch (r % 10) {
				case 1: return n + "-ви";
				case 2: return n + "-ри";
				case 7:
				case 8: return n + "-ми";
			}
			return n + "-ти";
		},
		era: n({
			values: {
				narrow: ["пр.н.е.", "н.е."],
				abbreviated: ["пред н. е.", "н. е."],
				wide: ["пред нашата ера", "нашата ера"]
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
					"1-ви кв.",
					"2-ри кв.",
					"3-ти кв.",
					"4-ти кв."
				],
				wide: [
					"1-ви квартал",
					"2-ри квартал",
					"3-ти квартал",
					"4-ти квартал"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: {
				abbreviated: [
					"јан",
					"фев",
					"мар",
					"апр",
					"мај",
					"јун",
					"јул",
					"авг",
					"септ",
					"окт",
					"ноем",
					"дек"
				],
				wide: [
					"јануари",
					"февруари",
					"март",
					"април",
					"мај",
					"јуни",
					"јули",
					"август",
					"септември",
					"октомври",
					"ноември",
					"декември"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"Н",
					"П",
					"В",
					"С",
					"Ч",
					"П",
					"С"
				],
				short: [
					"не",
					"по",
					"вт",
					"ср",
					"че",
					"пе",
					"са"
				],
				abbreviated: [
					"нед",
					"пон",
					"вто",
					"сре",
					"чет",
					"пет",
					"саб"
				],
				wide: [
					"недела",
					"понеделник",
					"вторник",
					"среда",
					"четврток",
					"петок",
					"сабота"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: { wide: {
				am: "претпладне",
				pm: "попладне",
				midnight: "полноќ",
				noon: "напладне",
				morning: "наутро",
				afternoon: "попладне",
				evening: "навечер",
				night: "ноќе"
			} },
			defaultWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(-?[врмт][и])?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^((пр)?н\.?\s?е\.?)/i,
				abbreviated: /^((пр)?н\.?\s?е\.?)/i,
				wide: /^(пред нашата ера|нашата ера)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^п/i, /^н/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^[1234](-?[врт]?и?)? кв.?/i,
				wide: /^[1234](-?[врт]?и?)? квартал/i
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
				abbreviated: /^(јан|фев|мар|апр|мај|јун|јул|авг|сеп|окт|ноем|дек)/i,
				wide: /^(јануари|февруари|март|април|мај|јуни|јули|август|септември|октомври|ноември|декември)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/^ја/i,
				/^Ф/i,
				/^мар/i,
				/^ап/i,
				/^мај/i,
				/^јун/i,
				/^јул/i,
				/^ав/i,
				/^се/i,
				/^окт/i,
				/^но/i,
				/^де/i
			] },
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^[нпвсч]/i,
				short: /^(не|по|вт|ср|че|пе|са)/i,
				abbreviated: /^(нед|пон|вто|сре|чет|пет|саб)/i,
				wide: /^(недела|понеделник|вторник|среда|четврток|петок|сабота)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^н/i,
					/^п/i,
					/^в/i,
					/^с/i,
					/^ч/i,
					/^п/i,
					/^с/i
				],
				any: [
					/^н[ед]/i,
					/^п[он]/i,
					/^вт/i,
					/^ср/i,
					/^ч[ет]/i,
					/^п[ет]/i,
					/^с[аб]/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: { any: /^(претп|попл|полноќ|утро|пладне|вечер|ноќ)/i },
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /претпладне/i,
				pm: /попладне/i,
				midnight: /полноќ/i,
				noon: /напладне/i,
				morning: /наутро/i,
				afternoon: /попладне/i,
				evening: /навечер/i,
				night: /ноќе/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { p as default, p as mk };
