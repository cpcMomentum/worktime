import { n as e, r as t, t as n } from "./match-Cgv7FUDx.chunk.mjs";
import { i as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
import { t as i } from "./formatRelative-DGj-34nj.chunk.mjs";
var a = {
	date: r({
		formats: {
			full: "EEEE d MMMM y",
			long: "d MMMM y",
			medium: "d MMM y",
			short: "dd/MM/y"
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
}, o = {
	code: "fr",
	formatDistance: t,
	formatLong: a,
	formatRelative: i,
	localize: e,
	match: n,
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { o as default, o as fr };
