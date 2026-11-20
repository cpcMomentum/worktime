import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
import { t as i } from "./isSameWeek-IUVRx6Bb.chunk.mjs";
import { i as a } from "./normalizeDates-GspJxgT4.chunk.mjs";
// node_modules/date-fns/locale/bg/_lib/formatDistance.js
var o = {
	lessThanXSeconds: {
		one: "по-малко от секунда",
		other: "по-малко от {{count}} секунди"
	},
	xSeconds: {
		one: "1 секунда",
		other: "{{count}} секунди"
	},
	halfAMinute: "половин минута",
	lessThanXMinutes: {
		one: "по-малко от минута",
		other: "по-малко от {{count}} минути"
	},
	xMinutes: {
		one: "1 минута",
		other: "{{count}} минути"
	},
	aboutXHours: {
		one: "около час",
		other: "около {{count}} часа"
	},
	xHours: {
		one: "1 час",
		other: "{{count}} часа"
	},
	xDays: {
		one: "1 ден",
		other: "{{count}} дни"
	},
	aboutXWeeks: {
		one: "около седмица",
		other: "около {{count}} седмици"
	},
	xWeeks: {
		one: "1 седмица",
		other: "{{count}} седмици"
	},
	aboutXMonths: {
		one: "около месец",
		other: "около {{count}} месеца"
	},
	xMonths: {
		one: "1 месец",
		other: "{{count}} месеца"
	},
	aboutXYears: {
		one: "около година",
		other: "около {{count}} години"
	},
	xYears: {
		one: "1 година",
		other: "{{count}} години"
	},
	overXYears: {
		one: "над година",
		other: "над {{count}} години"
	},
	almostXYears: {
		one: "почти година",
		other: "почти {{count}} години"
	}
}, s = (e, t, n) => {
	let r, i = o[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "след " + r : "преди " + r : r;
}, c = {
	date: e({
		formats: {
			full: "EEEE, dd MMMM yyyy",
			long: "dd MMMM yyyy",
			medium: "dd MMM yyyy",
			short: "dd.MM.yyyy"
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
}, l = [
	"неделя",
	"понеделник",
	"вторник",
	"сряда",
	"четвъртък",
	"петък",
	"събота"
];
function u(e) {
	let t = l[e];
	switch (e) {
		case 0:
		case 3:
		case 6: return "'миналата " + t + " в' p";
		case 1:
		case 2:
		case 4:
		case 5: return "'миналия " + t + " в' p";
	}
}
function d(e) {
	let t = l[e];
	return e === 2 ? "'във " + t + " в' p" : "'в " + t + " в' p";
}
function f(e) {
	let t = l[e];
	switch (e) {
		case 0:
		case 3:
		case 6: return "'следващата " + t + " в' p";
		case 1:
		case 2:
		case 4:
		case 5: return "'следващия " + t + " в' p";
	}
}
var p = {
	lastWeek: (e, t, n) => {
		let r = a(e), o = r.getDay();
		return i(r, t, n) ? d(o) : u(o);
	},
	yesterday: "'вчера в' p",
	today: "'днес в' p",
	tomorrow: "'утре в' p",
	nextWeek: (e, t, n) => {
		let r = a(e), o = r.getDay();
		return i(r, t, n) ? d(o) : f(o);
	},
	other: "P"
}, m = (e, t, n, r) => {
	let i = p[e];
	return typeof i == "function" ? i(t, n, r) : i;
}, h = {
	narrow: ["пр.н.е.", "н.е."],
	abbreviated: ["преди н. е.", "н. е."],
	wide: ["преди новата ера", "новата ера"]
}, g = {
	narrow: [
		"1",
		"2",
		"3",
		"4"
	],
	abbreviated: [
		"1-во тримес.",
		"2-ро тримес.",
		"3-то тримес.",
		"4-то тримес."
	],
	wide: [
		"1-во тримесечие",
		"2-ро тримесечие",
		"3-то тримесечие",
		"4-то тримесечие"
	]
}, _ = {
	abbreviated: [
		"яну",
		"фев",
		"мар",
		"апр",
		"май",
		"юни",
		"юли",
		"авг",
		"сеп",
		"окт",
		"ное",
		"дек"
	],
	wide: [
		"януари",
		"февруари",
		"март",
		"април",
		"май",
		"юни",
		"юли",
		"август",
		"септември",
		"октомври",
		"ноември",
		"декември"
	]
}, v = {
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
		"нд",
		"пн",
		"вт",
		"ср",
		"чт",
		"пт",
		"сб"
	],
	abbreviated: [
		"нед",
		"пон",
		"вто",
		"сря",
		"чет",
		"пет",
		"съб"
	],
	wide: [
		"неделя",
		"понеделник",
		"вторник",
		"сряда",
		"четвъртък",
		"петък",
		"събота"
	]
}, y = { wide: {
	am: "преди обяд",
	pm: "след обяд",
	midnight: "в полунощ",
	noon: "на обяд",
	morning: "сутринта",
	afternoon: "следобед",
	evening: "вечерта",
	night: "през нощта"
} };
function b(e) {
	return e === "year" || e === "week" || e === "minute" || e === "second";
}
function x(e) {
	return e === "quarter";
}
function S(e, t, n, r, i) {
	let a = x(t) ? i : b(t) ? r : n;
	return e + "-" + a;
}
// node_modules/date-fns/locale/bg.js
var C = {
	code: "bg",
	formatDistance: s,
	formatLong: c,
	formatRelative: m,
	localize: {
		ordinalNumber: (e, t) => {
			let n = Number(e), r = t?.unit;
			if (n === 0) return S(0, r, "ев", "ева", "ево");
			if (n % 1e3 == 0) return S(n, r, "ен", "на", "но");
			if (n % 100 == 0) return S(n, r, "тен", "тна", "тно");
			let i = n % 100;
			if (i > 20 || i < 10) switch (i % 10) {
				case 1: return S(n, r, "ви", "ва", "во");
				case 2: return S(n, r, "ри", "ра", "ро");
				case 7:
				case 8: return S(n, r, "ми", "ма", "мо");
			}
			return S(n, r, "ти", "та", "то");
		},
		era: n({
			values: h,
			defaultWidth: "wide"
		}),
		quarter: n({
			values: g,
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: _,
			defaultWidth: "wide"
		}),
		day: n({
			values: v,
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: y,
			defaultWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(-?[врмт][аи]|-?т?(ен|на)|-?(ев|ева))?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^((пр)?н\.?\s?е\.?)/i,
				abbreviated: /^((пр)?н\.?\s?е\.?)/i,
				wide: /^(преди новата ера|новата ера|нова ера)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^п/i, /^н/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^[1234](-?[врт]?o?)? тримес.?/i,
				wide: /^[1234](-?[врт]?о?)? тримесечие/i
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
				abbreviated: /^(яну|фев|мар|апр|май|юни|юли|авг|сеп|окт|ное|дек)/i,
				wide: /^(януари|февруари|март|април|май|юни|юли|август|септември|октомври|ноември|декември)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/^я/i,
				/^ф/i,
				/^мар/i,
				/^ап/i,
				/^май/i,
				/^юн/i,
				/^юл/i,
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
				short: /^(нд|пн|вт|ср|чт|пт|сб)/i,
				abbreviated: /^(нед|пон|вто|сря|чет|пет|съб)/i,
				wide: /^(неделя|понеделник|вторник|сряда|четвъртък|петък|събота)/i
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
					/^с[ъб]/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: { any: /^(преди о|след о|в по|на о|през|веч|сут|следо)/i },
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^преди о/i,
				pm: /^след о/i,
				midnight: /^в пол/i,
				noon: /^на об/i,
				morning: /^сут/i,
				afternoon: /^следо/i,
				evening: /^веч/i,
				night: /^през н/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 1
	}
};
export { C as bg, C as default };
