import { n as e, r as t, t as n } from "./match-Cgv7FUDx.chunk.mjs";
import { t as r } from "./formatRelative-DGj-34nj.chunk.mjs";
import { i } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
var a = {
	date: i({
		formats: {
			full: "EEEE d MMMM y",
			long: "d MMMM y",
			medium: "d MMM y",
			short: "yy-MM-dd"
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
			full: "{{date}} 'à' {{time}}",
			long: "{{date}} 'à' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, o = {
	code: "fr-CA",
	formatDistance: t,
	formatLong: a,
	formatRelative: r,
	localize: e,
	match: n,
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
export { o as default, o as frCA };
