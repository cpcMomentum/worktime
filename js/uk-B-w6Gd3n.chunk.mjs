import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
import { t as i } from "./isSameWeek-IUVRx6Bb.chunk.mjs";
import { i as a } from "./normalizeDates-GspJxgT4.chunk.mjs";
// node_modules/date-fns/locale/uk/_lib/formatDistance.js
function o(e, t) {
	if (e.one !== void 0 && t === 1) return e.one;
	let n = t % 10, r = t % 100;
	return n === 1 && r !== 11 ? e.singularNominative.replace("{{count}}", String(t)) : n >= 2 && n <= 4 && (r < 10 || r > 20) ? e.singularGenitive.replace("{{count}}", String(t)) : e.pluralGenitive.replace("{{count}}", String(t));
}
function s(e) {
	return (t, n) => n && n.addSuffix ? n.comparison && n.comparison > 0 ? e.future ? o(e.future, t) : "за " + o(e.regular, t) : e.past ? o(e.past, t) : o(e.regular, t) + " тому" : o(e.regular, t);
}
var c = {
	lessThanXSeconds: s({
		regular: {
			one: "менше секунди",
			singularNominative: "менше {{count}} секунди",
			singularGenitive: "менше {{count}} секунд",
			pluralGenitive: "менше {{count}} секунд"
		},
		future: {
			one: "менше, ніж за секунду",
			singularNominative: "менше, ніж за {{count}} секунду",
			singularGenitive: "менше, ніж за {{count}} секунди",
			pluralGenitive: "менше, ніж за {{count}} секунд"
		}
	}),
	xSeconds: s({
		regular: {
			singularNominative: "{{count}} секунда",
			singularGenitive: "{{count}} секунди",
			pluralGenitive: "{{count}} секунд"
		},
		past: {
			singularNominative: "{{count}} секунду тому",
			singularGenitive: "{{count}} секунди тому",
			pluralGenitive: "{{count}} секунд тому"
		},
		future: {
			singularNominative: "за {{count}} секунду",
			singularGenitive: "за {{count}} секунди",
			pluralGenitive: "за {{count}} секунд"
		}
	}),
	halfAMinute: (e, t) => t && t.addSuffix ? t.comparison && t.comparison > 0 ? "за півхвилини" : "півхвилини тому" : "півхвилини",
	lessThanXMinutes: s({
		regular: {
			one: "менше хвилини",
			singularNominative: "менше {{count}} хвилини",
			singularGenitive: "менше {{count}} хвилин",
			pluralGenitive: "менше {{count}} хвилин"
		},
		future: {
			one: "менше, ніж за хвилину",
			singularNominative: "менше, ніж за {{count}} хвилину",
			singularGenitive: "менше, ніж за {{count}} хвилини",
			pluralGenitive: "менше, ніж за {{count}} хвилин"
		}
	}),
	xMinutes: s({
		regular: {
			singularNominative: "{{count}} хвилина",
			singularGenitive: "{{count}} хвилини",
			pluralGenitive: "{{count}} хвилин"
		},
		past: {
			singularNominative: "{{count}} хвилину тому",
			singularGenitive: "{{count}} хвилини тому",
			pluralGenitive: "{{count}} хвилин тому"
		},
		future: {
			singularNominative: "за {{count}} хвилину",
			singularGenitive: "за {{count}} хвилини",
			pluralGenitive: "за {{count}} хвилин"
		}
	}),
	aboutXHours: s({
		regular: {
			singularNominative: "близько {{count}} години",
			singularGenitive: "близько {{count}} годин",
			pluralGenitive: "близько {{count}} годин"
		},
		future: {
			singularNominative: "приблизно за {{count}} годину",
			singularGenitive: "приблизно за {{count}} години",
			pluralGenitive: "приблизно за {{count}} годин"
		}
	}),
	xHours: s({ regular: {
		singularNominative: "{{count}} годину",
		singularGenitive: "{{count}} години",
		pluralGenitive: "{{count}} годин"
	} }),
	xDays: s({ regular: {
		singularNominative: "{{count}} день",
		singularGenitive: "{{count}} днi",
		pluralGenitive: "{{count}} днів"
	} }),
	aboutXWeeks: s({
		regular: {
			singularNominative: "близько {{count}} тижня",
			singularGenitive: "близько {{count}} тижнів",
			pluralGenitive: "близько {{count}} тижнів"
		},
		future: {
			singularNominative: "приблизно за {{count}} тиждень",
			singularGenitive: "приблизно за {{count}} тижні",
			pluralGenitive: "приблизно за {{count}} тижнів"
		}
	}),
	xWeeks: s({ regular: {
		singularNominative: "{{count}} тиждень",
		singularGenitive: "{{count}} тижні",
		pluralGenitive: "{{count}} тижнів"
	} }),
	aboutXMonths: s({
		regular: {
			singularNominative: "близько {{count}} місяця",
			singularGenitive: "близько {{count}} місяців",
			pluralGenitive: "близько {{count}} місяців"
		},
		future: {
			singularNominative: "приблизно за {{count}} місяць",
			singularGenitive: "приблизно за {{count}} місяці",
			pluralGenitive: "приблизно за {{count}} місяців"
		}
	}),
	xMonths: s({ regular: {
		singularNominative: "{{count}} місяць",
		singularGenitive: "{{count}} місяці",
		pluralGenitive: "{{count}} місяців"
	} }),
	aboutXYears: s({
		regular: {
			singularNominative: "близько {{count}} року",
			singularGenitive: "близько {{count}} років",
			pluralGenitive: "близько {{count}} років"
		},
		future: {
			singularNominative: "приблизно за {{count}} рік",
			singularGenitive: "приблизно за {{count}} роки",
			pluralGenitive: "приблизно за {{count}} років"
		}
	}),
	xYears: s({ regular: {
		singularNominative: "{{count}} рік",
		singularGenitive: "{{count}} роки",
		pluralGenitive: "{{count}} років"
	} }),
	overXYears: s({
		regular: {
			singularNominative: "більше {{count}} року",
			singularGenitive: "більше {{count}} років",
			pluralGenitive: "більше {{count}} років"
		},
		future: {
			singularNominative: "більше, ніж за {{count}} рік",
			singularGenitive: "більше, ніж за {{count}} роки",
			pluralGenitive: "більше, ніж за {{count}} років"
		}
	}),
	almostXYears: s({
		regular: {
			singularNominative: "майже {{count}} рік",
			singularGenitive: "майже {{count}} роки",
			pluralGenitive: "майже {{count}} років"
		},
		future: {
			singularNominative: "майже за {{count}} рік",
			singularGenitive: "майже за {{count}} роки",
			pluralGenitive: "майже за {{count}} років"
		}
	})
}, l = (e, t, n) => (n ||= {}, c[e](t, n)), u = {
	date: e({
		formats: {
			full: "EEEE, do MMMM y 'р.'",
			long: "do MMMM y 'р.'",
			medium: "d MMM y 'р.'",
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
		formats: {
			full: "{{date}} 'о' {{time}}",
			long: "{{date}} 'о' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, d = [
	"неділю",
	"понеділок",
	"вівторок",
	"середу",
	"четвер",
	"п’ятницю",
	"суботу"
];
function f(e) {
	let t = d[e];
	switch (e) {
		case 0:
		case 3:
		case 5:
		case 6: return "'у минулу " + t + " о' p";
		case 1:
		case 2:
		case 4: return "'у минулий " + t + " о' p";
	}
}
function p(e) {
	return "'у " + d[e] + " о' p";
}
function m(e) {
	let t = d[e];
	switch (e) {
		case 0:
		case 3:
		case 5:
		case 6: return "'у наступну " + t + " о' p";
		case 1:
		case 2:
		case 4: return "'у наступний " + t + " о' p";
	}
}
var h = {
	lastWeek: (e, t, n) => {
		let r = a(e), o = r.getDay();
		return i(r, t, n) ? p(o) : f(o);
	},
	yesterday: "'вчора о' p",
	today: "'сьогодні о' p",
	tomorrow: "'завтра о' p",
	nextWeek: (e, t, n) => {
		let r = a(e), o = r.getDay();
		return i(r, t, n) ? p(o) : m(o);
	},
	other: "P"
}, g = {
	code: "uk",
	formatDistance: l,
	formatLong: u,
	formatRelative: (e, t, n, r) => {
		let i = h[e];
		return typeof i == "function" ? i(t, n, r) : i;
	},
	localize: {
		ordinalNumber: (e, t) => {
			let n = String(t?.unit), r = Number(e), i;
			return i = n === "date" ? r === 3 || r === 23 ? "-є" : "-е" : n === "minute" || n === "second" || n === "hour" ? "-а" : "-й", r + i;
		},
		era: n({
			values: {
				narrow: ["до н.е.", "н.е."],
				abbreviated: ["до н. е.", "н. е."],
				wide: ["до нашої ери", "нашої ери"]
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
					"1-й кв.",
					"2-й кв.",
					"3-й кв.",
					"4-й кв."
				],
				wide: [
					"1-й квартал",
					"2-й квартал",
					"3-й квартал",
					"4-й квартал"
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
					"Б",
					"К",
					"Т",
					"Ч",
					"Л",
					"С",
					"В",
					"Ж",
					"Л",
					"Г"
				],
				abbreviated: [
					"січ.",
					"лют.",
					"берез.",
					"квіт.",
					"трав.",
					"черв.",
					"лип.",
					"серп.",
					"верес.",
					"жовт.",
					"листоп.",
					"груд."
				],
				wide: [
					"січень",
					"лютий",
					"березень",
					"квітень",
					"травень",
					"червень",
					"липень",
					"серпень",
					"вересень",
					"жовтень",
					"листопад",
					"грудень"
				]
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: [
					"С",
					"Л",
					"Б",
					"К",
					"Т",
					"Ч",
					"Л",
					"С",
					"В",
					"Ж",
					"Л",
					"Г"
				],
				abbreviated: [
					"січ.",
					"лют.",
					"берез.",
					"квіт.",
					"трав.",
					"черв.",
					"лип.",
					"серп.",
					"верес.",
					"жовт.",
					"листоп.",
					"груд."
				],
				wide: [
					"січня",
					"лютого",
					"березня",
					"квітня",
					"травня",
					"червня",
					"липня",
					"серпня",
					"вересня",
					"жовтня",
					"листопада",
					"грудня"
				]
			},
			defaultFormattingWidth: "wide"
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
					"вів",
					"сер",
					"чтв",
					"птн",
					"суб"
				],
				wide: [
					"неділя",
					"понеділок",
					"вівторок",
					"середа",
					"четвер",
					"п’ятниця",
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
					midnight: "півн.",
					noon: "пол.",
					morning: "ранок",
					afternoon: "день",
					evening: "веч.",
					night: "ніч"
				},
				abbreviated: {
					am: "ДП",
					pm: "ПП",
					midnight: "півн.",
					noon: "пол.",
					morning: "ранок",
					afternoon: "день",
					evening: "веч.",
					night: "ніч"
				},
				wide: {
					am: "ДП",
					pm: "ПП",
					midnight: "північ",
					noon: "полудень",
					morning: "ранок",
					afternoon: "день",
					evening: "вечір",
					night: "ніч"
				}
			},
			defaultWidth: "any",
			formattingValues: {
				narrow: {
					am: "ДП",
					pm: "ПП",
					midnight: "півн.",
					noon: "пол.",
					morning: "ранку",
					afternoon: "дня",
					evening: "веч.",
					night: "ночі"
				},
				abbreviated: {
					am: "ДП",
					pm: "ПП",
					midnight: "півн.",
					noon: "пол.",
					morning: "ранку",
					afternoon: "дня",
					evening: "веч.",
					night: "ночі"
				},
				wide: {
					am: "ДП",
					pm: "ПП",
					midnight: "північ",
					noon: "полудень",
					morning: "ранку",
					afternoon: "дня",
					evening: "веч.",
					night: "ночі"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^(\d+)(-?(е|й|є|а|я))?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^((до )?н\.?\s?е\.?)/i,
				abbreviated: /^((до )?н\.?\s?е\.?)/i,
				wide: /^(до нашої ери|нашої ери|наша ера)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^д/i, /^н/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^[1234](-?[иі]?й?)? кв.?/i,
				wide: /^[1234](-?[иі]?й?)? квартал/i
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
				narrow: /^[слбктчвжг]/i,
				abbreviated: /^(січ|лют|бер(ез)?|квіт|трав|черв|лип|серп|вер(ес)?|жовт|лис(топ)?|груд)\.?/i,
				wide: /^(січень|січня|лютий|лютого|березень|березня|квітень|квітня|травень|травня|червня|червень|липень|липня|серпень|серпня|вересень|вересня|жовтень|жовтня|листопад[а]?|грудень|грудня)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^с/i,
					/^л/i,
					/^б/i,
					/^к/i,
					/^т/i,
					/^ч/i,
					/^л/i,
					/^с/i,
					/^в/i,
					/^ж/i,
					/^л/i,
					/^г/i
				],
				any: [
					/^сі/i,
					/^лю/i,
					/^б/i,
					/^к/i,
					/^т/i,
					/^ч/i,
					/^лип/i,
					/^се/i,
					/^в/i,
					/^ж/i,
					/^лис/i,
					/^г/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^[нпвсч]/i,
				short: /^(нд|пн|вт|ср|чт|пт|сб)\.?/i,
				abbreviated: /^(нед|пон|вів|сер|че?тв|птн?|суб)\.?/i,
				wide: /^(неділ[яі]|понеділ[ок][ка]|вівтор[ок][ка]|серед[аи]|четвер(га)?|п\W*?ятниц[яі]|субот[аи])/i
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
					/^н/i,
					/^п[он]/i,
					/^в/i,
					/^с[ер]/i,
					/^ч/i,
					/^п\W*?[ят]/i,
					/^с[уб]/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: {
				narrow: /^([дп]п|півн\.?|пол\.?|ранок|ранку|день|дня|веч\.?|ніч|ночі)/i,
				abbreviated: /^([дп]п|півн\.?|пол\.?|ранок|ранку|день|дня|веч\.?|ніч|ночі)/i,
				wide: /^([дп]п|північ|полудень|ранок|ранку|день|дня|вечір|вечора|ніч|ночі)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: {
				am: /^дп/i,
				pm: /^пп/i,
				midnight: /^півн/i,
				noon: /^пол/i,
				morning: /^р/i,
				afternoon: /^д[ен]/i,
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
export { g as default, g as uk };
