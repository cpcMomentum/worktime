import { n as e, r as t, t as n } from "./match-Cgv7FUDx.chunk.mjs";
import { i as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
var i = {
	date: r({
		formats: {
			full: "EEEE d MMMM y",
			long: "d MMMM y",
			medium: "d MMM y",
			short: "dd.MM.y"
		},
		defaultWidth: "full"
	}),
	time: r({
		formats: {
			full: "HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: r({
		formats: {
			full: "{{date}} 'à' {{time}}",
			long: "{{date}} 'à' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, a = {
	lastWeek: "eeee 'la semaine dernière à' p",
	yesterday: "'hier à' p",
	today: "'aujourd’hui à' p",
	tomorrow: "'demain à' p'",
	nextWeek: "eeee 'la semaine prochaine à' p",
	other: "P"
}, o = {
	code: "fr-CH",
	formatDistance: t,
	formatLong: i,
	formatRelative: (e, t, n, r) => a[e],
	localize: e,
	match: n,
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { o as default, o as frCH };
