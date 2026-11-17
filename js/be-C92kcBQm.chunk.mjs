import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
import { t as i } from "./isSameWeek-IUVRx6Bb.chunk.mjs";
import { i as a } from "./normalizeDates-GspJxgT4.chunk.mjs";
// node_modules/date-fns/locale/be/_lib/formatDistance.js
function o(e, t) {
	if (e.one !== void 0 && t === 1) return e.one;
	let n = t % 10, r = t % 100;
	return n === 1 && r !== 11 ? e.singularNominative.replace("{{count}}", String(t)) : n >= 2 && n <= 4 && (r < 10 || r > 20) ? e.singularGenitive.replace("{{count}}", String(t)) : e.pluralGenitive.replace("{{count}}", String(t));
}
function s(e) {
	return (t, n) => n && n.addSuffix ? n.comparison && n.comparison > 0 ? e.future ? o(e.future, t) : "праз " + o(e.regular, t) : e.past ? o(e.past, t) : o(e.regular, t) + " таму" : o(e.regular, t);
}
var c = {
	lessThanXSeconds: s({
		regular: {
			one: "менш за секунду",
			singularNominative: "менш за {{count}} секунду",
			singularGenitive: "менш за {{count}} секунды",
			pluralGenitive: "менш за {{count}} секунд"
		},
		future: {
			one: "менш, чым праз секунду",
			singularNominative: "менш, чым праз {{count}} секунду",
			singularGenitive: "менш, чым праз {{count}} секунды",
			pluralGenitive: "менш, чым праз {{count}} секунд"
		}
	}),
	xSeconds: s({
		regular: {
			singularNominative: "{{count}} секунда",
			singularGenitive: "{{count}} секунды",
			pluralGenitive: "{{count}} секунд"
		},
		past: {
			singularNominative: "{{count}} секунду таму",
			singularGenitive: "{{count}} секунды таму",
			pluralGenitive: "{{count}} секунд таму"
		},
		future: {
			singularNominative: "праз {{count}} секунду",
			singularGenitive: "праз {{count}} секунды",
			pluralGenitive: "праз {{count}} секунд"
		}
	}),
	halfAMinute: (e, t) => t && t.addSuffix ? t.comparison && t.comparison > 0 ? "праз паўхвіліны" : "паўхвіліны таму" : "паўхвіліны",
	lessThanXMinutes: s({
		regular: {
			one: "менш за хвіліну",
			singularNominative: "менш за {{count}} хвіліну",
			singularGenitive: "менш за {{count}} хвіліны",
			pluralGenitive: "менш за {{count}} хвілін"
		},
		future: {
			one: "менш, чым праз хвіліну",
			singularNominative: "менш, чым праз {{count}} хвіліну",
			singularGenitive: "менш, чым праз {{count}} хвіліны",
			pluralGenitive: "менш, чым праз {{count}} хвілін"
		}
	}),
	xMinutes: s({
		regular: {
			singularNominative: "{{count}} хвіліна",
			singularGenitive: "{{count}} хвіліны",
			pluralGenitive: "{{count}} хвілін"
		},
		past: {
			singularNominative: "{{count}} хвіліну таму",
			singularGenitive: "{{count}} хвіліны таму",
			pluralGenitive: "{{count}} хвілін таму"
		},
		future: {
			singularNominative: "праз {{count}} хвіліну",
			singularGenitive: "праз {{count}} хвіліны",
			pluralGenitive: "праз {{count}} хвілін"
		}
	}),
	aboutXHours: s({
		regular: {
			singularNominative: "каля {{count}} гадзіны",
			singularGenitive: "каля {{count}} гадзін",
			pluralGenitive: "каля {{count}} гадзін"
		},
		future: {
			singularNominative: "прыблізна праз {{count}} гадзіну",
			singularGenitive: "прыблізна праз {{count}} гадзіны",
			pluralGenitive: "прыблізна праз {{count}} гадзін"
		}
	}),
	xHours: s({
		regular: {
			singularNominative: "{{count}} гадзіна",
			singularGenitive: "{{count}} гадзіны",
			pluralGenitive: "{{count}} гадзін"
		},
		past: {
			singularNominative: "{{count}} гадзіну таму",
			singularGenitive: "{{count}} гадзіны таму",
			pluralGenitive: "{{count}} гадзін таму"
		},
		future: {
			singularNominative: "праз {{count}} гадзіну",
			singularGenitive: "праз {{count}} гадзіны",
			pluralGenitive: "праз {{count}} гадзін"
		}
	}),
	xDays: s({ regular: {
		singularNominative: "{{count}} дзень",
		singularGenitive: "{{count}} дні",
		pluralGenitive: "{{count}} дзён"
	} }),
	aboutXWeeks: s({
		regular: {
			singularNominative: "каля {{count}} тыдні",
			singularGenitive: "каля {{count}} тыдняў",
			pluralGenitive: "каля {{count}} тыдняў"
		},
		future: {
			singularNominative: "прыблізна праз {{count}} тыдзень",
			singularGenitive: "прыблізна праз {{count}} тыдні",
			pluralGenitive: "прыблізна праз {{count}} тыдняў"
		}
	}),
	xWeeks: s({ regular: {
		singularNominative: "{{count}} тыдзень",
		singularGenitive: "{{count}} тыдні",
		pluralGenitive: "{{count}} тыдняў"
	} }),
	aboutXMonths: s({
		regular: {
			singularNominative: "каля {{count}} месяца",
			singularGenitive: "каля {{count}} месяцаў",
			pluralGenitive: "каля {{count}} месяцаў"
		},
		future: {
			singularNominative: "прыблізна праз {{count}} месяц",
			singularGenitive: "прыблізна праз {{count}} месяцы",
			pluralGenitive: "прыблізна праз {{count}} месяцаў"
		}
	}),
	xMonths: s({ regular: {
		singularNominative: "{{count}} месяц",
		singularGenitive: "{{count}} месяцы",
		pluralGenitive: "{{count}} месяцаў"
	} }),
	aboutXYears: s({
		regular: {
			singularNominative: "каля {{count}} года",
			singularGenitive: "каля {{count}} гадоў",
			pluralGenitive: "каля {{count}} гадоў"
		},
		future: {
			singularNominative: "прыблізна праз {{count}} год",
			singularGenitive: "прыблізна праз {{count}} гады",
			pluralGenitive: "прыблізна праз {{count}} гадоў"
		}
	}),
	xYears: s({ regular: {
		singularNominative: "{{count}} год",
		singularGenitive: "{{count}} гады",
		pluralGenitive: "{{count}} гадоў"
	} }),
	overXYears: s({
		regular: {
			singularNominative: "больш за {{count}} год",
			singularGenitive: "больш за {{count}} гады",
			pluralGenitive: "больш за {{count}} гадоў"
		},
		future: {
			singularNominative: "больш, чым праз {{count}} год",
			singularGenitive: "больш, чым праз {{count}} гады",
			pluralGenitive: "больш, чым праз {{count}} гадоў"
		}
	}),
	almostXYears: s({
		regular: {
			singularNominative: "амаль {{count}} год",
			singularGenitive: "амаль {{count}} гады",
			pluralGenitive: "амаль {{count}} гадоў"
		},
		future: {
			singularNominative: "амаль праз {{count}} год",
			singularGenitive: "амаль праз {{count}} гады",
			pluralGenitive: "амаль праз {{count}} гадоў"
		}
	})
}, l = (e, t, n) => (n ||= {}, c[e](t, n)), u = {
	date: e({
		formats: {
			full: "EEEE, d MMMM y 'г.'",
			long: "d MMMM y 'г.'",
			medium: "d MMM y 'г.'",
			short: "dd.MM.y"
		},
		defaultWidth: "full"
	}),
	time: e({
		formats: {
			full: "H:mm:ss zzzz",
			long: "H:mm:ss z",
			medium: "H:mm:ss",
			short: "H:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: e({
		formats: { any: "{{date}}, {{time}}" },
		defaultWidth: "any"
	})
}, d = [
	"нядзелю",
	"панядзелак",
	"аўторак",
	"сераду",
	"чацвер",
	"пятніцу",
	"суботу"
];
function f(e) {
	let t = d[e];
	switch (e) {
		case 0:
		case 3:
		case 5:
		case 6: return "'у мінулую " + t + " а' p";
		case 1:
		case 2:
		case 4: return "'у мінулы " + t + " а' p";
	}
}
function p(e) {
	return "'у " + d[e] + " а' p";
}
function m(e) {
	let t = d[e];
	switch (e) {
		case 0:
		case 3:
		case 5:
		case 6: return "'у наступную " + t + " а' p";
		case 1:
		case 2:
		case 4: return "'у наступны " + t + " а' p";
	}
}
var h = {
	lastWeek: (e, t, n) => {
		let r = a(e), o = r.getDay();
		return i(r, t, n) ? p(o) : f(o);
	},
	yesterday: "'учора а' p",
	today: "'сёння а' p",
	tomorrow: "'заўтра а' p",
	nextWeek: (e, t, n) => {
		let r = a(e), o = r.getDay();
		return i(r, t, n) ? p(o) : m(o);
	},
	other: "P"
}, g = {
	code: "be",
	formatDistance: l,
	formatLong: u,
	formatRelative: (e, t, n, r) => {
		let i = h[e];
		return typeof i == "function" ? i(t, n, r) : i;
	},
	localize: {
		ordinalNumber: (e, t) => {
			let n = String(t?.unit), r = Number(e), i;
			return i = n === "date" ? "-га" : n === "hour" || n === "minute" || n === "second" ? "-я" : (r % 10 == 2 || r % 10 == 3) && r % 100 != 12 && r % 100 != 13 ? "-і" : "-ы", r + i;
		},
		era: n({
			values: {
				narrow: ["да н.э.", "н.э."],
				abbreviated: ["да н. э.", "н. э."],
				wide: ["да нашай эры", "нашай эры"]
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
					"1-ы кв.",
					"2-і кв.",
					"3-і кв.",
					"4-ы кв."
				],
				wide: [
					"1-ы квартал",
					"2-і квартал",
					"3-і квартал",
					"4-ы квартал"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: {
				narrow: [
					"С",
					"Л",
					"С",
					"К",
					"М",
					"Ч",
					"Л",
					"Ж",
					"В",
					"К",
					"Л",
					"С"
				],
				abbreviated: [
					"студз.",
					"лют.",
					"сак.",
					"крас.",
					"май",
					"чэрв.",
					"ліп.",
					"жн.",
					"вер.",
					"кастр.",
					"ліст.",
					"снеж."
				],
				wide: [
					"студзень",
					"люты",
					"сакавік",
					"красавік",
					"май",
					"чэрвень",
					"ліпень",
					"жнівень",
					"верасень",
					"кастрычнік",
					"лістапад",
					"снежань"
				]
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: [
					"С",
					"Л",
					"С",
					"К",
					"М",
					"Ч",
					"Л",
					"Ж",
					"В",
					"К",
					"Л",
					"С"
				],
				abbreviated: [
					"студз.",
					"лют.",
					"сак.",
					"крас.",
					"мая",
					"чэрв.",
					"ліп.",
					"жн.",
					"вер.",
					"кастр.",
					"ліст.",
					"снеж."
				],
				wide: [
					"студзеня",
					"лютага",
					"сакавіка",
					"красавіка",
					"мая",
					"чэрвеня",
					"ліпеня",
					"жніўня",
					"верасня",
					"кастрычніка",
					"лістапада",
					"снежня"
				]
			},
			defaultFormattingWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"Н",
					"П",
					"А",
					"С",
					"Ч",
					"П",
					"С"
				],
				short: [
					"нд",
					"пн",
					"аў",
					"ср",
					"чц",
					"пт",
					"сб"
				],
				abbreviated: [
					"нядз",
					"пан",
					"аўт",
					"сер",
					"чац",
					"пят",
					"суб"
				],
				wide: [
					"нядзеля",
					"панядзелак",
					"аўторак",
					"серада",
					"чацвер",
					"пятніца",
					"субота"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "ДП",
					pm: "ПП",
					midnight: "поўн.",
					noon: "поўд.",
					morning: "ран.",
					afternoon: "дзень",
					evening: "веч.",
					night: "ноч"
				},
				abbreviated: {
					am: "ДП",
					pm: "ПП",
					midnight: "поўн.",
					noon: "поўд.",
					morning: "ран.",
					afternoon: "дзень",
					evening: "веч.",
					night: "ноч"
				},
				wide: {
					am: "ДП",
					pm: "ПП",
					midnight: "поўнач",
					noon: "поўдзень",
					morning: "раніца",
					afternoon: "дзень",
					evening: "вечар",
					night: "ноч"
				}
			},
			defaultWidth: "any",
			formattingValues: {
				narrow: {
					am: "ДП",
					pm: "ПП",
					midnight: "поўн.",
					noon: "поўд.",
					morning: "ран.",
					afternoon: "дня",
					evening: "веч.",
					night: "ночы"
				},
				abbreviated: {
					am: "ДП",
					pm: "ПП",
					midnight: "поўн.",
					noon: "поўд.",
					morning: "ран.",
					afternoon: "дня",
					evening: "веч.",
					night: "ночы"
				},
				wide: {
					am: "ДП",
					pm: "ПП",
					midnight: "поўнач",
					noon: "поўдзень",
					morning: "раніцы",
					afternoon: "дня",
					evening: "вечара",
					night: "ночы"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(-?(е|я|га|і|ы|ае|ая|яя|шы|гі|ці|ты|мы))?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^((да )?н\.?\s?э\.?)/i,
				abbreviated: /^((да )?н\.?\s?э\.?)/i,
				wide: /^(да нашай эры|нашай эры|наша эра)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^д/i, /^н/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^[1234](-?[ыі]?)? кв.?/i,
				wide: /^[1234](-?[ыі]?)? квартал/i
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
				narrow: /^[слкмчжв]/i,
				abbreviated: /^(студз|лют|сак|крас|ма[йя]|чэрв|ліп|жн|вер|кастр|ліст|снеж)\.?/i,
				wide: /^(студзен[ья]|лют(ы|ага)|сакавіка?|красавіка?|ма[йя]|чэрвен[ья]|ліпен[ья]|жні(вень|ўня)|верас(ень|ня)|кастрычніка?|лістапада?|снеж(ань|ня))/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^с/i,
					/^л/i,
					/^с/i,
					/^к/i,
					/^м/i,
					/^ч/i,
					/^л/i,
					/^ж/i,
					/^в/i,
					/^к/i,
					/^л/i,
					/^с/i
				],
				any: [
					/^ст/i,
					/^лю/i,
					/^са/i,
					/^кр/i,
					/^ма/i,
					/^ч/i,
					/^ліп/i,
					/^ж/i,
					/^в/i,
					/^ка/i,
					/^ліс/i,
					/^сн/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^[нпасч]/i,
				short: /^(нд|ня|пн|па|аў|ат|ср|се|чц|ча|пт|пя|сб|су)\.?/i,
				abbreviated: /^(нядз?|ндз|пнд|пан|аўт|срд|сер|чцв|чац|птн|пят|суб).?/i,
				wide: /^(нядзел[яі]|панядзел(ак|ка)|аўтор(ак|ка)|серад[аы]|чацв(ер|ярга)|пятніц[аы]|субот[аы])/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^н/i,
					/^п/i,
					/^а/i,
					/^с/i,
					/^ч/i,
					/^п/i,
					/^с/i
				],
				any: [
					/^н/i,
					/^п[ан]/i,
					/^а/i,
					/^с[ер]/i,
					/^ч/i,
					/^п[ят]/i,
					/^с[уб]/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^([дп]п|поўн\.?|поўд\.?|ран\.?|дзень|дня|веч\.?|ночы?)/i,
				abbreviated: /^([дп]п|поўн\.?|поўд\.?|ран\.?|дзень|дня|веч\.?|ночы?)/i,
				wide: /^([дп]п|поўнач|поўдзень|раніц[аы]|дзень|дня|вечара?|ночы?)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: {
				am: /^дп/i,
				pm: /^пп/i,
				midnight: /^поўн/i,
				noon: /^поўд/i,
				morning: /^р/i,
				afternoon: /^д[зн]/i,
				evening: /^в/i,
				night: /^н/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 1
	}
};
export { g as be, g as default };
