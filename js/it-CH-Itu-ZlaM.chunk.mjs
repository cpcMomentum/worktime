import { i as e, n as t, r as n, t as r } from "./match-B-e1JrQm.chunk.mjs";
import { i } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
var a = {
	date: i({
		formats: {
			full: "EEEE d MMMM y",
			long: "d MMMM y",
			medium: "d MMM y",
			short: "dd.MM.y"
		},
		defaultWidth: "full"
	}),
	time: i({
		formats: {
			full: "HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: i({
		formats: {
			full: "{{date}} {{time}}",
			long: "{{date}} {{time}}",
			medium: "{{date}} {{time}}",
			short: "{{date}} {{time}}"
		},
		defaultWidth: "full"
	})
}, o = {
	code: "it-CH",
	formatDistance: e,
	formatLong: a,
	formatRelative: n,
	localize: t,
	match: r,
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { o as default, o as itCH };
